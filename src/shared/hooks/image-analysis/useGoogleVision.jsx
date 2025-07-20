import { useState, useCallback } from 'react';

const GOOGLE_VISION_URL = 'https://vision.googleapis.com/v1/images:annotate';

export function useGoogleVision(apiKey) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeImage = useCallback(
    async (base64Image, features = [
      { type: 'LABEL_DETECTION'},
      { type: 'WEB_DETECTION'},
      { type: 'OBJECT_LOCALIZATION'}
    ]) => {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const response = await fetch(`${GOOGLE_VISION_URL}?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features,
              },
            ],
          }),
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          throw new Error(data.error?.message || 'Error en la respuesta de Google Vision');
        }

        setResult(data.responses[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [apiKey]
  );

  return { analyzeImage, result, loading, error };
}