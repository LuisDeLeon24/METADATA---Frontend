import { useState } from 'react';

export function useImageToBase64() {
  const [base64, setBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = (file) => {
    setLoading(true);
    setError('');

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      const base64String = result.split(',')[1]; 
      setBase64(base64String);
      setLoading(false);
    };

    reader.onerror = () => {
      setError('Error al leer la imagen');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return { base64, convert, loading, error };
}