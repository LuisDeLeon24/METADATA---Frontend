import { useState } from "react";
import toast from "react-hot-toast";
import {
  getCases as getCasesRequest,
  createCase as createCaseRequest,
  updateCase as updateCaseRequest,
  getAnalysisByCaseId as getAnalysisByCaseIdRequest,
  getEvidencesByCase as getEvidencesByCaseRequest
} from "../../services";

export const useCases = () => {
  const [cases, setCases] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [evidences, setEvidences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCases = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCasesRequest();
      if (response.success) {
        setCases(response.cases);
      } else {
        setError(response.msg || "Error al obtener los casos");
        toast.error(response.msg || "Error al obtener los casos");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createCase = async (data) => {
    setIsLoading(true);
    try {
      const response = await createCaseRequest(data);
      if (response.success) {
        toast.success("Caso creado correctamente");
        fetchCases();
      } else {
        toast.error(response.msg || "Error al crear el caso");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCase = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await updateCaseRequest(id, data);
      if (response.success) {
        toast.success("Caso actualizado correctamente");
        fetchCases();
      } else {
        toast.error(response.msg || "Error al actualizar el caso");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalysesByCaseId = async (id) => {
    setIsLoading(true);
    try {
      const response = await getAnalysisByCaseIdRequest(id);
      console.log("Response from getAnalysisByCaseIdRequest:", response);
      if (response.success) {
        setAnalyses(response.analyses);
      } else {
        toast.error(response.msg || "Error al obtener los análisis del caso");
      }
    } catch (err) {
      toast.error(err.message || "Error al obtener los análisis del caso");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvidencesByCase = async (id) => {
    setIsLoading(true);
    try {
      const response = await getEvidencesByCaseRequest(id);
      if (response.success) {
        setEvidences(response.evidences);
      } else {
        toast.error(response.msg || "Error al obtener las evidencias del caso");
      }
    } catch (err) {
      toast.error(err.message || "Error al obtener las evidencias del caso");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cases,
    analyses,
    evidences,
    isLoading,
    error,
    fetchCases,
    createCase,
    updateCase,
    fetchAnalysesByCaseId,
    fetchEvidencesByCase
  };
};
