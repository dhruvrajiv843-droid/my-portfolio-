import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyThemeToElement,
  resolveInitialTheme,
  toggleThemeMode,
  type ThemeTargetElement,
} from './theme';

test('resolveInitialTheme defaults to dark and honors saved dark/light preference', () => {
  assert.equal(resolveInitialTheme(null), 'dark');
  assert.equal(resolveInitialTheme(undefined), 'dark');
  assert.equal(resolveInitialTheme('invalid'), 'dark');
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
});

test('toggleThemeMode switches cleanly between dark and light', () => {
  assert.equal(toggleThemeMode('dark'), 'light');
  assert.equal(toggleThemeMode('light'), 'dark');
});

test('applyThemeToElement toggles dark class, data-theme, and colorScheme', () => {
  const classes = new Set<string>(['dark']);
  const attrs: Record<string, string> = {};
  const mockEl: ThemeTargetElement = {
    classList: {
      toggle(token: string, force?: boolean) {
        if (force === undefined) {
          if (classes.has(token)) {
            classes.delete(token);
            return false;
          }
          classes.add(token);
          return true;
        }
        if (force) classes.add(token);
        else classes.delete(token);
        return force;
      },
    },
    setAttribute(name: string, value: string) {
      attrs[name] = value;
    },
    style: {
      colorScheme: 'dark',
    },
  };

  applyThemeToElement(mockEl, 'light');
  assert.equal(classes.has('dark'), false);
  assert.equal(attrs['data-theme'], 'light');
  assert.equal(mockEl.style.colorScheme, 'light');

  applyThemeToElement(mockEl, 'dark');
  assert.equal(classes.has('dark'), true);
  assert.equal(attrs['data-theme'], 'dark');
  assert.equal(mockEl.style.colorScheme, 'dark');
});
