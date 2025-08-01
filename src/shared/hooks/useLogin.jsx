import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services"
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const { user, refreshUser } = useContext(UserContext)

    const login = async (email, password) => {

        setIsLoading(true)

        const response = await loginRequest({
            email,
            password
        })

        setIsLoading(false)

        if(response.error){
            return toast.error(response.error?.response?.data || 'Ocurrio un error al iniciar sesión, usuario no encontrado', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            })
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));
        refreshUser();
        

        toast.success('Sesion iniciada correctamente', {
            style: {
                background: 'green',
                color: 'white'
            }
        })

        if(userDetails.role === 'ADMIN'){
            navigate('/admin/dashboard')
        }else if(userDetails.role === 'USER'){
            navigate('/user/dashboard')
        }else if(userDetails.role === 'SEARCHER'){
            navigate('/searcher/dashboard')
        }

    }
    return {
        login,
        isLoading
    }
}