import { supabase } from '../lib/supabase';

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const register = async (userData: {
  email: string;
  password: string;
  name: string;
  role?: string;
}) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });
  if (authError) throw authError;
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: userData.email,
          name: userData.name,
          role: userData.role || 'employee',
        },
      ]);
    if (profileError) throw profileError;
  }
  return authData;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return profile;
};