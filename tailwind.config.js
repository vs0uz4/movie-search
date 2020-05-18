module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/index.html',
      './src/**/*.svelte'
    ],
    options: {
      whitelist: ['bg-red-200'],
    }
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
