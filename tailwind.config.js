/** @type {import('tailwindcss').Config} */
export default {
  /** lo que hace "content" es decirle a tailwind en qué archivos esperar que haya código de tailwind para que lo agregue a la compilación */
  /** Tailwind son aprox 15K o 18K línea de código de CSS, entonces lo que hará content es escanear cierto archivos e identificar qué clases de tailwind se está utilizando, para únicamente añadir esas clases al archivo final de CSS, con la finalidad de no agregar las 18K de líneas */
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    fontFamily: {
			sans: ['Commissioner','Fjalla One', 'Jost', 'Croissant One', 'sans-serif']
		},
    extend: {}
  },
  plugins: [],
}

