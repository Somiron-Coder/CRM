import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
  setSession: (user: User | null, profile: Profile | null) => void;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isAuthInitialized: false,

  setSession: (user, profile) => {
    set({ user, profile, isAuthenticated: !!user });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, isAuthenticated: false });
  },

  initializeAuth: async () => {
    // Check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({
        user: session.user,
        profile,
        isAuthenticated: true,
        isAuthInitialized: true,
      });
    } else {
      set({ isAuthInitialized: true });
    }
  },
}));