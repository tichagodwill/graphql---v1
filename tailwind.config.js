/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    colors: {
      'muted-blue': '#1e293b', 
      'light-gray': '#e5e7eb', 
      'midnigh-express': '#1e293b', 
      'noble-black': '#1c2027', 
    },
    boxShadow: {
      'custom': '0 2px 10px rgba(0, 0, 0, 0.3)', // Custom box shadow
    },
  },
};
export const plugins = [];
