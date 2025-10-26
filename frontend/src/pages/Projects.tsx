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
  FormControl,
  InputLabel,
  Select,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { supabase } from '../lib/supabase';
import { DataGrid, type DataGridProps } from '../components/DataGrid';
import { useForm, Controller } from 'react-hook-form';

interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  client: {
    name: string;
    company: string;
  };
  project_members?: Array<{
    employee: {
      id: string;
      profiles: {
        name: string;
      };
    };
  }>;
}

interface ProjectFormData {
  name: string;
  description: string;
  client_id: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  team_members: string[];
}

type EmployeeWithProfile = {
  id: string;
  profiles: {
    name: string;
  };
};

const Projects: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [error, setError] = React.useState<string>('');
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue, control } = useForm<ProjectFormData>();

  const statuses = ['planned', 'in-progress', 'completed', 'on-hold'];

  // Fetch projects
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:clients(name, company),
          project_members(
            employee:employees(
              id,
              profiles:profiles(name)
            )
          )
        `);
      
      if (error) throw error;
      return data as Project[];
    }
  });

  // Fetch clients for dropdown
  const { data: clients = [] } = useQuery<{ id: string; name: string; company: string }[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, company');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch employees for team member selection
  const { data: employees = [] } = useQuery<EmployeeWithProfile[]>({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('id, profiles(name)');
      
      if (error) throw error;
      return data;
    }
  });

  // Create/Update project
  const mutation = useMutation<void, Error, ProjectFormData>({
    mutationFn: async (data: ProjectFormData) => {
      if (selectedProject) {
        // Update project
        const { error: projectError } = await supabase
          .from('projects')
          .update({
            name: data.name,
            description: data.description,
            client_id: data.client_id,
            start_date: data.start_date,
            end_date: data.end_date,
            budget: data.budget,
            status: data.status,
          })
          .eq('id', selectedProject.id);

        if (projectError) throw projectError;

        // Update team members
        const { error: teamError } = await supabase
          .from('project_members')
          .delete()
          .eq('project_id', selectedProject.id);

        if (teamError) throw teamError;

        const teamMembers = data.team_members.map(employeeId => ({
          project_id: selectedProject.id,
          employee_id: employeeId,
          role: 'member',
        }));

        const { error: insertTeamError } = await supabase
          .from('project_members')
          .insert(teamMembers);

        if (insertTeamError) throw insertTeamError;
      } else {
        // Create project
        const { data: newProject, error: projectError } = await supabase
          .from('projects')
          .insert([{
            name: data.name,
            description: data.description,
            client_id: data.client_id,
            start_date: data.start_date,
            end_date: data.end_date,
            budget: data.budget,
            status: data.status,
          }])
          .select()
          .single();

        if (projectError) throw projectError;

        // Add team members
        const teamMembers = data.team_members.map(employeeId => ({
          project_id: newProject.id,
          employee_id: employeeId,
          role: 'member',
        }));

        const { error: teamError } = await supabase
          .from('project_members')
          .insert(teamMembers);

        if (teamError) throw teamError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  // Delete project
  const deleteMutation = useMutation<void, Error, Project>({
    mutationFn: async (project: Project) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setValue('name', project.name);
      setValue('description', project.description);
      setValue('client_id', project.client_id);
      setValue('start_date', project.start_date);
      setValue('end_date', project.end_date);
      setValue('budget', project.budget);
      setValue('status', project.status);
      // Get team members IDs
      const teamMembers = project.project_members?.map(pm => pm.employee.id) || [];
      setValue('team_members', teamMembers);
    } else {
      setSelectedProject(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
    reset();
  };

  const columns: DataGridProps['columns'] = [
    { id: 'name', label: 'Project Name' },
    { id: 'client.name', label: 'Client' },
    { id: 'status', label: 'Status' },
    {
      id: 'budget',
      label: 'Budget',
      render: (value: number) => `$${value.toLocaleString()}`
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Project
        </Button>
      </Box>

      <DataGrid
        rows={projects}
        columns={columns}
        onEdit={handleOpenDialog}
        onDelete={(project) => {
          if (window.confirm('Are you sure you want to delete this project?')) {
            deleteMutation.mutate(project as Project);
          }
        }}
      />

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <DialogTitle>
            {selectedProject ? 'Edit Project' : 'New Project'}
          </DialogTitle>
          <DialogContent>
            <Box mb={2}>
              <TextField
                {...register('name')}
                label="Project Name"
                fullWidth
                margin="dense"
              />
            </Box>
            <Box mb={2}>
              <TextField
                {...register('description')}
                label="Description"
                fullWidth
                multiline
                rows={4}
                margin="dense"
              />
            </Box>
            <Box mb={2}>
              <TextField
                {...register('client_id')}
                select
                label="Client"
                fullWidth
                margin="dense"
              >
                {clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name} ({client.company})
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                {...register('start_date')}
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="dense"
              />
              <TextField
                {...register('end_date')}
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="dense"
              />
            </Box>
            <Box mb={2}>
              <TextField
                {...register('budget')}
                type="number"
                label="Budget"
                fullWidth
                margin="dense"
                InputProps={{
                  startAdornment: <span>$</span>
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                {...register('status')}
                select
                label="Status"
                fullWidth
                margin="dense"
              >
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="team-members-label">Team Members</InputLabel>
                <Controller
                  control={control}
                  name="team_members"
                  defaultValue={[]}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      multiple
                      labelId="team-members-label"
                      value={value}
                      onChange={onChange}
                      renderValue={(selected) => (
                        <Box display="flex" flexWrap="wrap" gap={0.5}>
                          {(selected as string[]).map((value) => {
                            const employee = employees.find((e) => e.id === value);
                            return (
                              <Chip
                                key={value}
                                label={employee?.profiles?.name || value}
                              />
                            );
                          })}
                        </Box>
                      )}
                    >
                      {employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {employee.profiles?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedProject ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Projects;