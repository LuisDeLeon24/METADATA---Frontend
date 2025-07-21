import { useState } from 'react';

const OPENROUTER_API_KEY = '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';

export function useOpenRouterChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tusitio.com', // opcional
          'X-Title': 'Mi Aplicación React', // opcional
        },
        body: JSON.stringify({
          model: 'microsoft/mai-ds-r1:free',
          messages: [
            { role: 'user', content: message }
          ]
        }),
      });

      const data = await res.json();

      if (data?.choices?.length > 0) {
        setResponse(data.choices[0].message.content);
      } else {
        setError('No se recibió respuesta válida.');
      }
    } catch (err) {
      console.error(err);
      setError('Hubo un error al conectar con el modelo.');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading, error };
}