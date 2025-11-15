import { ref } from 'vue'

const theme = ref('light')

if (typeof document !== 'undefined') {
  document.documentElement.removeAttribute('data-theme')
}

const noop = () => {}

export function useTheme() {
  return {
    theme,
    toggleTheme: noop,
    setTheme: noop,
    locked: true,
  }
}
