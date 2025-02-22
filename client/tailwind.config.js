/** @type {import('tailwindcss').Config} */

import { withUt } from "uploadthing/tw";

export default withUt({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})