/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
};
