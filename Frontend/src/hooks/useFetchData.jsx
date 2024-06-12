import React, { useEffect, useState } from 'react';

const useFetchData = (url) => {
    
    const [data, setData]  = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url, {
                header: {Athorization: `Bearer $('token')}`}
            })
        }
    },[]);
    
    return (
        <div>useFetchData</div>
    );
};

export default useFetchData;