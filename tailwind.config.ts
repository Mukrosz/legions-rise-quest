import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#6e0e1e',
        obsidian: '#121212',
        parchment: '#f5edda',
        bronze: '#b87333',
        laurel: '#2e6f40',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
        marcellus: ['Marcellus SC', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        forum: ['Forum', 'serif'],
        spectral: ['Spectral', 'Georgia', 'serif'],
      },
      animation: {
        'panel-wipe': 'panelWipe 0.3s ease-out',
        'laurel-glow': 'laurelGlow 2s ease-in-out infinite',
      },
      keyframes: {
        panelWipe: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        laurelGlow: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

