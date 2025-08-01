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
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'METADATA', 
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