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
          'HTTP-Referer': 'http://localhost:3000', // opcional
          'X-Title': 'METADATA', // opcional
        },
        body: JSON.stringify({
              model: 'openai/gpt-3.5-turbo',
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