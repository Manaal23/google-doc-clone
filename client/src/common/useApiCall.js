import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function useApiCall() {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const fetchData = async ({method,path, data=null}) => {
        try{
            setLoading(true)
        const res = await axios(`${process.env.REACT_APP_BACKEND_URL}${path}`, {
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            data: data ? {...data} : null
            ,
            method: method
          })
          setLoading(false)
          return res;
        }catch(err){
          setLoading(false)
            if (err.response.status === 401){
                localStorage.clear()
                history.push('/')
            }
        }

    }

    return {loading, fetchData}

    }

export default useApiCall