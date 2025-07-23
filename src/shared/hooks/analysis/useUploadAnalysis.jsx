import { useState } from 'react';
import { uploadAnalysis } from '../../../services';

export function useUploadAnalysis() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const saveAnalysis = async (analysisData) => {
    setIsSaving(true);
    setSaveError(null);

    const res = await uploadAnalysis(analysisData);

    if (res.error) {
      setSaveError(res.msg);
      return null;
    }

    return res.data;
  };

  return {
    saveAnalysis,
    isSaving,
    saveError
  };
}
