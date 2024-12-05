import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '12rem',
        '2xl': '12rem',
      },
    },
  },
  plugins: [],
}
export default config
