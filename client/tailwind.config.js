/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "nemo-blue": {
          100: "#D8ECFE",
          200: "#BCDCFC",
          300: "#8CBEFA",
          400: "#648FF4",
          500: "#346CE8",
          600: "#1E48B4",
          700: "#183078",
          800: "#102444",
          900: "#0E162C",
          950: "#081020",
        },
        "nemo-orange": {
          100: "#FEF0DC",
          200: "#FADEB2",
          300: "#F6C87E",
          400: "#F2B04C",
          500: "#EE9F28",
          600: "#EC9006",
          700: "#E88504",
          800: "#E27602",
          900: "#DC6802",
          950: "#D24E02",
        },
      },
    },
  },
  plugins: [],
};
