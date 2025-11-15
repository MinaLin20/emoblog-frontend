import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        bg: {
          page: 'var(--bg-page)',
          sidebar: 'var(--bg-sidebar)',
        },
        surface: {
          card: 'var(--surface-card)',
          overlay: 'var(--surface-overlay)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          invert: 'var(--text-invert)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          divider: 'var(--divider)',
        },
        icon: {
          DEFAULT: 'var(--icon-default)',
          active: 'var(--icon-active)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          info: 'var(--accent-info)',
          success: 'var(--accent-success)',
          warning: 'var(--accent-warning)',
          error: 'var(--accent-error)',
        },
        btn: {
          primary: 'var(--btn-primary-bg)',
          'primary-hover': 'var(--btn-primary-bg-hover)',
          'primary-pressed': 'var(--btn-primary-bg-pressed)',
          'primary-fg': 'var(--btn-primary-fg)',
          secondary: 'var(--btn-secondary-bg)',
          'secondary-hover': 'var(--btn-secondary-bg-hover)',
          'secondary-pressed': 'var(--btn-secondary-bg-pressed)',
          'secondary-fg': 'var(--btn-secondary-fg)',
        },
        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
          placeholder: 'var(--input-placeholder)',
        },
        focus: {
          ring: 'var(--focus-ring)',
        },
        link: {
          DEFAULT: 'var(--text-link)',
          hover: 'var(--text-link-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'display-1': ['48px', { lineHeight: '56px', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-1': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'title-1': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'title-2': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-1': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-2': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'caption-1': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'mono-1': ['14px', { lineHeight: '20px', fontWeight: '500', fontFamily: '"JetBrains Mono", "Fira Mono", monospace' }],
      },
      borderRadius: {
        card: 'var(--radius-l)',
        input: 'var(--radius-m)',
        button: 'var(--radius-m)',
        pill: 'var(--radius-full)',
      },
      boxShadow: {
        'elevation-1': 'var(--shadow-elevation-1)',
        'elevation-2': 'var(--shadow-elevation-2)',
        'elevation-3': 'var(--shadow-elevation-3)',
      },
      borderColor: {
        DEFAULT: 'var(--border-default)',
      },
      ringColor: {
        DEFAULT: 'var(--focus-ring)',
      },
      opacity: {
        disabled: 'var(--state-disabled-opacity)',
      },
    },
  },
  plugins: [],
}
