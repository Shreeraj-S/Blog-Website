import { useState, useEffect} from "react";

const useFetch = (uri) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController(); 
        const getData = async () =>{
            const response = await fetch(uri, {signal: controller.signal});
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Sorry we are unable to get data at the moment please try again later 😓')
            }
        };
        setTimeout(() => {
            getData().then(data => {
                setData(data)
            }).catch(error => {
                setError(error.message)
            });
            setisPending(false)
        }, 1000)

        return (() => controller.abort());
    }, [uri])

    const createData = async data => {
        const response = await fetch(uri, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        return response.json();
    };

    const deleteData = async () => {
        const response = await fetch(uri, {
            method: 'DELETE'
        })
        return response;
    };

    return {data, isPending, error, createData, deleteData };
}

export default useFetch;