import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        offwhite: '#CBD2D0',
        black: '#080708',
        white: '#FFFDFD',
        primary: '#F0E100',
        secondary: '#3772FF',
      },
    },
    fontSize: {
      base: ['1rem', '1rem'],
    },
  },
  plugins: [],
};
export default config;
