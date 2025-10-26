-- Create tables for NEXUVA Agency CRM

-- Enable Row Level Security (RLS)
alter default privileges revoke execute on functions from public;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  role text check (role in ('admin', 'manager', 'employee')) default 'employee',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create employees table
create table public.employees (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  position text not null,
  department text not null,
  salary numeric not null,
  join_date date default now(),
  skills text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create clients table
create table public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  email text unique not null,
  phone text,
  status text check (status in ('active', 'inactive', 'lead')) default 'lead',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create projects table
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  client_id uuid references public.clients(id) on delete set null,
  start_date date not null,
  end_date date,
  budget numeric not null,
  status text check (status in ('planned', 'in-progress', 'completed', 'on-hold')) default 'planned',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create project_members table (for managing team members)
create table public.project_members (
  project_id uuid references public.projects(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete cascade,
  role text not null,
  primary key (project_id, employee_id)
);

-- Create tasks table
create table public.tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  description text not null,
  status text check (status in ('pending', 'in-progress', 'completed')) default 'pending',
  assigned_to uuid references public.employees(id) on delete set null,
  due_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create revenue table
create table public.revenue (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete set null,
  amount numeric not null,
  type text check (type in ('project-payment', 'retainer', 'consultation', 'other')) not null,
  date date not null,
  status text check (status in ('pending', 'received', 'overdue')) default 'pending',
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.employees enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.tasks enable row level security;
alter table public.revenue enable row level security;

-- Create RLS policies
create policy "Users can view their own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Add more policies based on your requirements