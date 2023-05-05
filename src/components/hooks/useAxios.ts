import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import React from 'react'
import {useState, useEffect} from 'react';

interface ApiResponse<T> {
  response: T | null;
  loading: boolean;
  error: any;
}

const useAxios = <T>(param: string): ApiResponse<T> => {

    const [response, setResponse] = useState<T | null>(null)
    const [error , setError] = useState<any>(null)
    const [loading , setLoading] = useState<boolean>(false)

    axios.defaults.baseURL = "https://api.coingecko.com/api/v3"

    const fetchData = async (param: string) => {
      try {
        setLoading(true);
        const response = await new Promise<AxiosResponse<T>>((resolve, reject) => {
          setTimeout(() => {
            axios(param)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          }, 2000); // Set timeout to 2 seconds
        });
        setResponse(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData(param)
    }, []);

  return {
    response, loading, error
  }
}

export default useAxios