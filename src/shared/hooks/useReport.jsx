import { useState } from "react";
import toast from "react-hot-toast";
import { createReport as createReportRequest } from "../../services";

export const useReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReport = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createReportRequest(data);
      if (response.success) {
        toast.success("Reporte creado correctamente");
        // puedes hacer más cosas aquí si necesitas recargar datos, etc.
        return response.report; // devolver el reporte por si lo necesitas
      } else {
        toast.error(response.msg || "Error al crear el reporte");
        setError(response.msg);
      }
    } catch (err) {
      toast.error(err.message || "Error al crear el reporte");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createReport
  };
};
