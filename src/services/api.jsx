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

export const getLogs = async (params = {}) => {
  try {
    const res = await apiClient.get('/logs', { params });
    return {
      success: true,
      status: res.status,
      data: res.data.logs,
    };
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error desconocido al obtener logs';
    return {
      error: true,
      msg,
      e,
    };
  }
};

export const createLog = async (logData) => {
  try {
    const res = await apiClient.post('/logs', logData);
    return {
      success: true,
      status: res.status,
      data: res.data.log,
    };
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error desconocido al crear log';
    return {
      error: true,
      msg,
      e,
    };
  }
};

export const getUsers = async () => {
  try {
    const res = await apiClient.get('/users');
    return {
      success: true,
      data: res.data.users || res.data,
      status: res.status,
    };
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error desconocido al obtener usuarios';
    return {
      error: true,
      msg,
      e,
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

