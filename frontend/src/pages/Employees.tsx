import React, { useMemo, useCallback } from 'react';
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
  InputAdornment,
  Skeleton,
  Paper,
  Typography,
  Chip,
  Card,
  Stack,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Download as DownloadIcon, 
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';
import { DataGrid } from '../components/DataGrid';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/auth';

interface Employee {
  id: string;
  position: string;
  department: string;
  salary: number;
  join_date: string;
  skills: string[];
  profiles: {
    name: string;
    email: string;
    role: string;
  };
}

interface EmployeeFormData {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  skills: string;
}

const useExportToCSV = () => {
  return useCallback((rows: any[], columns: any[], filename: string) => {
    const header = columns.map((col: any) => col.label).join(',');
    const csvRows = rows.map(row =>
      columns.map((col: any) => {
        const value = col.id.split('.').reduce((acc: any, key: string) => acc?.[key], row);
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}` : value;
      }).join(',')
    );
    const csvContent = [header, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);
};

const LoadingSkeleton = () => (
  <Stack spacing={2}>
    {[1, 2, 3].map((i) => (
      <Skeleton
        key={i}
        variant="rectangular"
        sx={{ borderRadius: 2 }}
        height={80}
      />
    ))}
  </Stack>
);

const departments = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
];

const Employees: React.FC = () => {
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [error, setError] = React.useState<string>('');
  const [search, setSearch] = React.useState('');
  const queryClient = useQueryClient();
  const exportToCSV = useExportToCSV();
  const { register, handleSubmit, reset, setValue } = useForm<EmployeeFormData>();
  const { isAuthInitialized } = useAuthStore();

  // Optimized data fetching with suspense and stale-while-revalidate
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*, profiles(name, email, role)');
      if (error) throw error;
      return data as Employee[];
    },
    enabled: isAuthInitialized,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
    refetchOnWindowFocus: false
  });

  // Optimized mutations with proper error handling
  const mutation = useMutation<void, Error, EmployeeFormData>({
    mutationFn: async (data: EmployeeFormData) => {
      if (selectedEmployee) {
        const { error } = await supabase
          .from('employees')
          .update({
            position: data.position,
            department: data.department,
            salary: data.salary,
            skills: data.skills.split(',').map(s => s.trim()),
          })
          .eq('id', selectedEmployee.id);

        if (error) throw error;
      } else {
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: data.email,
          password: 'temppass123',
          email_confirm: true,
        });

        if (authError) throw authError;

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([{
              id: authData.user.id,
              email: data.email,
              name: data.name,
              role: 'employee',
            }]);

          if (profileError) throw profileError;

          const { error: employeeError } = await supabase
            .from('employees')
            .insert([{
              profile_id: authData.user.id,
              position: data.position,
              department: data.department,
              salary: data.salary,
              skills: data.skills.split(',').map(s => s.trim()),
            }]);

          if (employeeError) throw employeeError;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      handleCloseDialog();
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (employee: Employee) => {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employee.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: Error) => {
      setError(error.message);
    }
  });

  const handleOpenDialog = useCallback((employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
      setValue('position', employee.position);
      setValue('department', employee.department);
      setValue('salary', employee.salary);
      setValue('skills', employee.skills.join(', '));
    } else {
      setSelectedEmployee(null);
      reset();
    }
    setIsDialogOpen(true);
  }, [setValue, reset]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedEmployee(null);
    reset();
  }, [reset]);

  const columns = useMemo(() => [
    { 
      id: 'profiles.name',
      label: 'Name',
      render: (value: string) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      )
    },
    { id: 'profiles.email', label: 'Email' },
    { id: 'position', label: 'Position' },
    { 
      id: 'department',
      label: 'Department',
      render: (value: string) => (
        <Chip
          label={value}
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.main + '1A',
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        />
      )
    },
    { 
      id: 'salary',
      label: 'Salary',
      format: (value: number) => (
        <Typography sx={{ fontWeight: 500, color: theme.palette.success.main }}>
          ${value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: 'skills',
      label: 'Skills',
      render: (value: string[]) => (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {value.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                bgcolor: theme.palette.customGray[100],
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Stack>
      ),
    },
  ], [theme.palette]);

  // Memoized filtered employees
  const filteredEmployees = useMemo(() => {
    const searchLower = search.toLowerCase();
    return employees.filter((emp) => (
      emp.profiles.name.toLowerCase().includes(searchLower) ||
      emp.profiles.email.toLowerCase().includes(searchLower) ||
      emp.position.toLowerCase().includes(searchLower) ||
      emp.department.toLowerCase().includes(searchLower) ||
      emp.skills.some(skill => skill.toLowerCase().includes(searchLower))
    ));
  }, [employees, search]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAuthInitialized || isLoading) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <SEO title="Employees" />
        <LoadingSkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
      <SEO 
        title="Employees" 
        description="Manage your agency's employees - view, add, edit, and track employee information"
        keywords="employees, team management, staff, human resources"
      />
      
      <Card 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 3,
          background: `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}0A 100%)`,
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Employees
            </Typography>
            <Chip
              label={filteredEmployees.length}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main + '1A',
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              placeholder="Search employees..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <Tooltip title="Filter options">
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => exportToCSV(filteredEmployees, columns, 'employees.csv')}
              sx={{
                borderRadius: 2,
                px: 2,
              }}
            >
              Export
            </Button>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                borderRadius: 2,
                px: 3,
                boxShadow: 2,
              }}
            >
              Add Employee
            </Button>
          </Stack>
        </Box>

        <DataGrid
          columns={columns}
          rows={filteredEmployees}
          onEdit={handleOpenDialog}
          onDelete={(employee) => {
            if (window.confirm('Are you sure you want to delete this employee?')) {
              deleteMutation.mutate(employee);
            }
          }}
        />
      </Card>

      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <DialogContent>
            <Stack spacing={2}>
              {!selectedEmployee && (
                <>
                  <TextField
                    fullWidth
                    label="Name"
                    {...register('name')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email')}
                    variant="outlined"
                  />
                </>
              )}
              
              <TextField
                fullWidth
                label="Position"
                {...register('position')}
                variant="outlined"
              />
              
              <TextField
                fullWidth
                select
                label="Department"
                {...register('department')}
                variant="outlined"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                fullWidth
                label="Salary"
                type="number"
                {...register('salary')}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              
              <TextField
                fullWidth
                label="Skills"
                {...register('skills')}
                variant="outlined"
                placeholder="Enter skills separated by commas"
                helperText="e.g., JavaScript, React, TypeScript"
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2, px: 3 }}
            >
              {selectedEmployee ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="error"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(Employees);