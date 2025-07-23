import { useState } from 'react';
import { uploadEvidence } from '../../../services';

export function useUploadEvidence() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const saveEvidence = async (evidenceData) => {
    setIsSaving(true);
    setSaveError(null);

    const res = await uploadEvidence(evidenceData);

    if (res.error) {
      setSaveError(res.msg);
      return null;
    }

    return res.data;
  };

  return {
    saveEvidence,
    isSaving,
    saveError
  };
}
