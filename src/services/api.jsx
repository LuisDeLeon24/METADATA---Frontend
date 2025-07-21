import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/metadata/v1',
    timeout: 5000
});

apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const register = async (data) => {
    try {
        console.log(data)
        const res = await apiClient.post('/auth/register', data);

        return {
            success: true,
            status: res.status,
            data: res.data
        };
    } catch (e) {
        console.log(e.response.data)
        const msg = e.response?.data?.msg || 'Uknow error'
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getUsers = async () => {
    try {
        const res = await apiClient.get('/users');
        return {
            success: true,
            users: res.data.users,
            status: res.status
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido al obtener usuarios';
        return {
            error: true,
            msg,
            e
        };
    }
}

export const getAnalyses = async () => {
  try {
    const res = await apiClient.get('/analysis/');
    return {
      data: res.data.data,
      status: res.status
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error desconocido al obtener análisis';
    return {
      error: true,
      msg,
      e
    };
  }
};


export const getEvidence = async () => {
  try {
    const res = await apiClient.get('/evidences/');
    return {
      data: res.data.data,
      status: res.status
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error desconocido al obtener análisis';
    return {
      error: true,
      msg,
      e
    };
  }
};

export const getReport = async () => {
  try {
    const res = await apiClient.get('/report/');
    return {
      data: res.data.data,
      status: res.status
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error desconocido al obtener análisis';
    return {
      error: true,
      msg,
      e
    };
  }
};


export const createCase = async (data) => {
    try {
        const res = await apiClient.post('/cases', data);
        return {
            success: res.data.success,
            case: res.data.case,
            status: res.status
        }
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || "Error al crear el caso",
            e: error
        }
    }
}

export const getCases = async () => {
    try {
        const res = await apiClient.get('/cases');
        return {
            success: res.data.success,
            cases: res.data.cases,
            total: res.data.total,
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || "Error al obtener los casos",
            e: error
        }
    }
}

export const updateCase = async (id, data) => {
    try {
        const res = await apiClient.put(`/cases/${id}`, data);
        return {
            success: res.data.success,
            case: res.data.case,
            status: res.status
        }
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || "Error al actualizar el caso",
            e: error
        }
    }
}

export const getCaseById = async (caseId) => {
    try {
        const res = await apiClient.get(`/cases/${caseId}`);
        return {
            success: res.data.success,
            case: res.data.case,
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || "Error al obtener el caso",
            e: error
        }
    }
}

// Función para obtener análisis por caso (usando tu endpoint existente)
export const getAnalysisByCaseId = async (id) => {
    try {
        // Usa la ruta correcta del controlador
        const res = await apiClient.get(`/cases/analisis/${id}`);
        return {
            success: res.data.success,
            analyses: res.data.analyses,
            total: res.data.total,
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.msg || "Error al obtener los análisis del caso",
            e: error
        }
    }
}

// Función para obtener evidencias por caso (corrigiendo la ruta)
export const getEvidencesByCase = async (id) => {
    try {
        const res = await apiClient.get(`/evidences/${id}`);
        return {
            success: res.data.success,
            evidences: res.data.evidences,
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.message || "Error al obtener las evidencias del caso",
            e: error
        }
    }
}

// Función para crear un reporte
export const createReport = async (data) => {
    try {
        const res = await apiClient.post('/report', data);
        return {
            success: res.data.success,
            report: res.data.report,
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.message || "Error al crear el reporte",
            e: error
        }
    }
}

// Función para obtener un reporte por caso
export const getReportByCase = async (caseId) => {
    try {
        const res = await apiClient.get(`/report/case/${caseId}`);
        return {
            success: res.data.success,
            data: res.data.data, // Según tu backend usa res.data.data
            status: res.status
        };
    } catch (error) {
        return {
            error: true,
            msg: error.response?.data?.message || "Error al obtener el reporte del caso",
            e: error
        }
    }
}