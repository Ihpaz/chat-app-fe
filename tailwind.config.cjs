module.exports = {
  important: true,
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      minWidth: {
        '1/3': '33.333333%'
      },
      maxHeight: {
        '5/6': '83.333333%'
      },
      backgroundColor: {
        'base': '#F1F4FC',
        'primary': '#C3073F',
        'secondary': '#950740',
        'tertiary': '#6F2232',
        'dark': '#1A1A1D',
        'blackout': '#171717',
        'light': '#F0F0F0',
        'extraprimary': '#BB4735',
        'extraorange': '#FB6D48',
        'extrasalmon': '#D74B76',
        'extragrapes': '#673F69',
      },
      textColor: {
        'primary': '#C3073F',
        'disabled': '#4E4E50',
        'tertiary': '#6F2232',
        'secondary': '#950740',
        'extraprimary': '#BB4735',
        'extraorange': '#FB6D48',
        'extrasalmon': '#D74B76',
        'extragrapes': '#673F69',
      },
      colors: {
        'primary': '#C3073F',
        'auth-primary': '#5c0100'
      },
      blur: {
        xs: '2px',
      },
      // dropShadow: {
      //   glow: [
      //     "0 0px 20px rgba(204, 36, 24, 0.35)",
      //     "0 0px 65px rgba(255, 255, 255, 0.2)"
      //   ]
      // }
    }
  },
  plugins: [
    // require('@tailwindcss/transition'),
    require('flowbite/plugin'),
  ],
}
