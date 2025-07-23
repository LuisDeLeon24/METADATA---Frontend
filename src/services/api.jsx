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