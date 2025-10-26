import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
  Box,
  Stack,
  useTheme,
  Tooltip,
  alpha,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  format?: (value: any) => React.ReactNode;
  render?: (value: any) => React.ReactNode;
}

interface DataGridProps {
  columns: Column[];
  rows: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  title?: string;
}

export const DataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  onEdit,
  onDelete,
  title,
}) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memoize styles for better performance
  const styles = useMemo(() => ({
    tableContainer: {
      boxShadow: 'none',
      borderRadius: 2,
      overflow: 'hidden',
    },
    headerCell: {
      backgroundColor: alpha(theme.palette.primary.main, 0.02),
      color: theme.palette.text.secondary,
      fontWeight: 600,
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      padding: '12px 16px',
    },
    tableCell: {
      padding: '12px 16px',
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    row: {
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.02),
      },
    },
    actionButton: {
      padding: 1,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    },
    pagination: {
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: '16px 24px',
    },
  }), [theme]);

  const visibleRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows]
  );

  return (
    <Paper elevation={0} sx={styles.tableContainer}>
      {title && (
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={styles.headerCell}>
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell sx={styles.headerCell} align="right">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => (
              <TableRow hover key={index} sx={styles.row}>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={styles.tableCell}>
                    {column.render
                      ? column.render(column.id.split('.').reduce((acc: any, key: string) => acc?.[key], row))
                      : column.format
                        ? column.format(column.id.split('.').reduce((acc: any, key: string) => acc?.[key], row))
                        : column.id.split('.').reduce((acc: any, key: string) => acc?.[key], row)}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell sx={styles.tableCell} align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(row)}
                            sx={styles.actionButton}
                          >
                            <EditIcon fontSize="small" color="primary" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(row)}
                            sx={styles.actionButton}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="More options">
                        <IconButton
                          size="small"
                          sx={styles.actionButton}
                        >
                          <MoreVertIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={styles.pagination}
      />
    </Paper>
  );
};