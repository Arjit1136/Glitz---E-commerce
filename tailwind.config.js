/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
      },
      fontWeight: {
        h1: '600',
        h2: '600',
        h3: '600',
        h4: '600',
        h5: '600',
        h6: '600',
      },
      lineHeight: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        lobster2: ['Lobster Two', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        Kaushan: ['Kaushan Script', 'cursive'],
        Rubik: ['Rubik', 'sans-serif'],
        Roboto: ['Roboto', "sans-serif"]
      },
      screens: {
        phone: '369px',
        phone1: '427px',
        phone2: '470px',
        phone3: '500px',
        tablet: '690px',
        laptop: '893px',
        desktop: '1280px',
      },
    },
  },
  plugins: [],
}
