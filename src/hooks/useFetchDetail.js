import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetail = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(endpoint);
            setData(response.data);
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]); 

    return { data, loading };
};

export default useFetchDetail;
