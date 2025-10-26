import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { DataGrid } from '../components/DataGrid';
import { useForm } from 'react-hook-form';

interface Revenue {
  id: string;
  project_id: string;
  amount: number;
  type: 'project-payment' | 'retainer' | 'consultation' | 'other';
  date: string;
  status: 'pending' | 'received' | 'overdue';
  description: string;
  project?: {
    name: string;
  };
}

interface RevenueFormData {
  project_id: string;
  amount: number;
  type: 'project-payment' | 'retainer' | 'consultation' | 'other';
  date: string;
  status: 'pending' | 'received' | 'overdue';
  description: string;
}

const types = ['project-payment', 'retainer', 'consultation', 'other'];
const statuses = ['pending', 'received', 'overdue'];

const RevenuePage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRevenue, setSelectedRevenue] = React.useState<Revenue | null>(null);
  const [error, setError] = React.useState<string>('');
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<RevenueFormData>();

  // Fetch revenue
  const { data: revenues = [], isLoading } = useQuery({
    queryKey: ['revenues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('revenue')
        .select('*, project:projects(name)');
      if (error) throw error;
      return data as Revenue[];
    }
  });

  // Fetch projects for dropdown
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name');
      if (error) throw error;
      return data;
    }
  });

  // Create/Update revenue
  const mutation = useMutation<void, Error, RevenueFormData>({
    mutationFn: async (data: RevenueFormData) => {
      if (selectedRevenue) {
        // Update
        const { error } = await supabase
          .from('revenue')
          .update(data)
          .eq('id', selectedRevenue.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('revenue')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  // Delete revenue
  const deleteMutation = useMutation({
    mutationFn: async (revenue: Revenue) => {
      const { error } = await supabase
        .from('revenue')
        .delete()
        .eq('id', revenue.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['revenues'] });
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  const handleOpenDialog = (revenue?: Revenue) => {
    if (revenue) {
      setSelectedRevenue(revenue);
      setValue('project_id', revenue.project_id);
      setValue('amount', revenue.amount);
      setValue('type', revenue.type);
      setValue('date', revenue.date);
      setValue('status', revenue.status);
      setValue('description', revenue.description);
    } else {
      setSelectedRevenue(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedRevenue(null);
    reset();
  };

  const columns = [
    { id: 'project.name', label: 'Project' },
    { id: 'amount', label: 'Amount', format: (value: number) => `$${value.toLocaleString()}` },
    { id: 'type', label: 'Type' },
    { id: 'date', label: 'Date', format: (value: string) => new Date(value).toLocaleDateString() },
    { id: 'status', label: 'Status' },
    { id: 'description', label: 'Description' },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Revenue
        </Button>
      </Box>

      <DataGrid
        title="Revenue"
        columns={columns}
        rows={revenues}
        onEdit={handleOpenDialog}
        onDelete={(revenue) => {
          if (window.confirm('Are you sure you want to delete this revenue record?')) {
            deleteMutation.mutate(revenue);
          }
        }}
      />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedRevenue ? 'Edit Revenue' : 'Add New Revenue'}
        </DialogTitle>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <DialogContent>
            <TextField
              fullWidth
              select
              label="Project"
              {...register('project_id')}
              margin="normal"
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              {...register('amount')}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Type"
              {...register('type')}
              margin="normal"
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              {...register('date')}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Status"
              {...register('status')}
              margin="normal"
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Description"
              {...register('description')}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedRevenue ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RevenuePage;
