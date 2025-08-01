import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://metadata-backend-a4er.onrender.com/metadata/v1',
    timeout: 50000000
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

export const uploadEvidence = async (evidenceData) => {
  try {
    const res = await apiClient.post('/evidences/', evidenceData);
    return {
      success: true,
      status: res.status,
      data: res.data
    };
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error al subir evidencia';
    return {
      error: true,
      msg,
      e
    };
  }
};

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

export const getAllReports = async () => {
    try{
        const res = await apiClient.get('/report/');
        return {
            data: res.data.data,
            status: res.status
        };
    }catch(e){
        const msg = e.response?.data?.message || 'Error desconocido al obtener reportes';
        return {
        error: true,
        msg,
        e
        }; 
    }
}


export const getLogs = async () => {
    try {
        const res = await apiClient.get('/logs/');
        return {
            data: res.data.logs,
            total: res.data.total,
            status: res.status
        };
    } catch (e) {
        const msg = e.response?.data?.message || 'Error desconocido al obtener logs';
        return {
            error: true,
            msg,
            e
        };
    }
}


export const createLog = async (logData) => {
  try {
    const res = await apiClient.post('/evidences/', evidenceData);
    return res.data; 
  } catch (e) {
    const msg = e.response?.data?.message || 'Error al obtener evidencias';
    return {
      error: true,
      msg,
      e
    };
  }
};


export const uploadAnalysis = async (analysisData) => {
  try {
    const res = await apiClient.post('/analysis/', analysisData);
    return {
      success: true,
      status: res.status,
      data: res.data
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error al guardar análisis';
    return {
      error: true,
      msg,
      e
    };
  }
};

export const getCasesByResearcher = async () => {
  try {
    const res = await apiClient.get('/cases/my-cases');
    return {
      success: true,
      status: res.status,
      data: res.data.data 
    };
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error al obtener casos';
    return {
      error: true,
      msg,
      e,
    };
  }
};

export const getEvidenceByUser = async (userId) => {
  try {
    const res = await apiClient.get('/evidences/user');
    return {
      success: true,
      status: res.status,
      data: res.data.evidences  // acá entregamos el array en data
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error al obtener evidencias';
    return {
      error: true,
      msg,
      e
    };
  }
};

export const getAnalysesByResearcher = async (userId) => {
  try {
    const res = await apiClient.get('/analysis/');
    const allAnalyses = res.data.data || [];

    const filtered = allAnalyses.filter(
      (a) => a.evidenciaID?.case?.researcher === userId
    );

    return {
      success: true,
      status: res.status,
      data: filtered
    };
  } catch (e) {
    const msg = e.response?.data?.message || 'Error al obtener análisis';
    return {
      error: true,
      msg,
      e
    };
  }
};

export const osint = async (user) => {
    try {
        const res = await apiClient.get(`/osint/case/${caseId}`);
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

export const analyzeSocialUser = async (username) => {
  try {
    const res = await apiClient.post('/osint/social-analyzer', { username });
    console.log('Respuesta API:', res);
    return {
      success: true,
      data: res.data,
      status: res.status
    };
  } catch (error) {
    console.error('Error completo analyzeSocialUser:', error);
    console.error('Error response data:', error.response?.data);
    const msg = 
      error.response?.data?.error || 
      error.response?.data?.msg || 
      error.message || 
      'Error al ejecutar el análisis social api';
    return {
      error: true,
      msg,
      e: error
    };
  }
};