import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
function useFetch(url) {
    let [responseData, setResponseData] = useState([]);
    const fetchData = useCallback(() => {
        axios({
            "method": "GET",
            "url": url,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }, "params": {
                "language_code": "en"
            }
        })
            .then((response) => {
                setResponseData(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    useEffect(() => {
        fetchData()
    }, [fetchData])

    return responseData;
}
export { useFetch };