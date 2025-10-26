import { supabase } from '../lib/supabase';
import { DashboardStats } from './types';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  // Employees count
  const { count: employees } = await supabase
    .from('employees')
    .select('*', { count: 'exact', head: true });

  // Clients count
  const { count: clients } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true });

  // Projects count
  const { count: projects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  // Revenue sum
  const { data: revenueRows } = await supabase
    .from('revenue')
    .select('amount');
  const revenue = revenueRows?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0;

  return {
    employees: employees || 0,
    clients: clients || 0,
    projects: projects || 0,
    revenue,
  };
}
