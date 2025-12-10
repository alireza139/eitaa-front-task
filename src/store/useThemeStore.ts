import { create } from 'zustand';

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', // مقدار اولیه
  toggleTheme: () =>
    set((state) => {
      const newTheme: 'light' | 'dark' = state.theme === 'dark' ? 'light' : 'dark';

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return { theme: newTheme };
    }),
}));
