import { useState } from "react";
import toast from "react-hot-toast";
import { getEvidenceByUser as getEvidenceByUserRequest } from "../../services";

export const useEvidence = () => {
  const [evidences, setEvidences] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getEvidences = async (userId) => {
    setIsFetching(true);

    const result = await getEvidenceByUserRequest(userId);

    setIsFetching(false);

    if (result.error) {
      toast.error(result.msg || "Error al obtener las evidencias del usuario");
      return;
    }

    setEvidences(result.data);
  };

  return {
    evidences,
    getEvidences,
    isFetching
  };
};