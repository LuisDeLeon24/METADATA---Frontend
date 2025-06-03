// src/theme.js
import { extendTheme, } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#e6f4ff',   // Un azul muy claro
    100: '#b3d9ff',  // Azul claro
    200: '#80bfff',
    300: '#4dadff',
    400: '#1aa3ff',
    500: '#008ae6',  // Azul principal - más vibrante
    600: '#0073cc',
    700: '#005cb3',
    800: '#00478f',
    900: '#00336b',   // Azul oscuro
  },
  accent: {
    50: '#fff0e6',   // Un naranja muy claro
    100: '#ffe0b3',  // Naranja claro
    200: '#ffcc80',
    300: '#ffb84d',
    400: '#ffa31a',
    500: '#ff8c00',  // Naranja principal - similar al anterior
    600: '#e67700',
    700: '#cc6300',
    800: '#b34f00',
    900: '#993b00',   // Naranja oscuro
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Inter', sans-serif`,
};

const styles = {
  global: {
    body: {
      bg: 'gray.50',
      color: 'gray.800',
    },
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, fonts, styles, config });

export default theme;