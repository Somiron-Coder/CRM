import React from 'react';
import { useAuthStore } from '../store/auth';
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

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'lead';
}

const Clients: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null);
  const [error, setError] = React.useState<string>('');
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm<Client>();

  const statuses = ['active', 'inactive', 'lead'];

  const { isAuthInitialized } = useAuthStore();
  // Fetch clients (only after auth is initialized)
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*');
      if (error) throw error;
      return data as Client[];
    },
    enabled: isAuthInitialized
  });

  // Create/Update client
  const mutation = useMutation<void, Error, Partial<Client>>({
    mutationFn: async (data: Partial<Client>) => {
      if (selectedClient) {
        // Update
        const { error } = await supabase
          .from('clients')
          .update(data)
          .eq('id', selectedClient.id);

        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('clients')
          .insert([data]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  // Delete client
  const deleteMutation = useMutation({
    mutationFn: async (client: Client) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', client.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error: Error) => {
      setError(error.message);
    }
    }
  );

  const handleOpenDialog = (client?: Client) => {
    if (client) {
      setSelectedClient(client);
      Object.entries(client).forEach(([key, value]) => {
        setValue(key as keyof Client, value);
      });
    } else {
      setSelectedClient(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedClient(null);
    reset();
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'company', label: 'Company' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'status', label: 'Status' },
  ];

  if (!isAuthInitialized || isLoading) {
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
          Add Client
        </Button>
      </Box>

      <DataGrid
        title="Clients"
        columns={columns}
        rows={clients}
        onEdit={handleOpenDialog}
        onDelete={(client) => {
          if (window.confirm('Are you sure you want to delete this client?')) {
            deleteMutation.mutate(client);
          }
        }}
      />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedClient ? 'Edit Client' : 'Add New Client'}
        </DialogTitle>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              {...register('name')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Company"
              {...register('company')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              {...register('phone')}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedClient ? 'Update' : 'Add'}
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

export default Clients;