export type ThemeMode = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'portfolio-theme';

export function isValidThemeMode(value: unknown): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

export function resolveInitialTheme(
  savedValue: string | null | undefined,
  fallback: ThemeMode = 'dark',
): ThemeMode {
  return isValidThemeMode(savedValue) ? savedValue : fallback;
}

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export interface ThemeTargetElement {
  classList: {
    toggle: (token: string, force?: boolean) => boolean | void;
  };
  setAttribute: (qualifiedName: string, value: string) => void;
  style: {
    colorScheme: string;
  };
}

export function applyThemeToElement(
  element: ThemeTargetElement,
  theme: ThemeMode,
): void {
  element.classList.toggle('dark', theme === 'dark');
  element.setAttribute('data-theme', theme);
  element.style.colorScheme = theme;
}
