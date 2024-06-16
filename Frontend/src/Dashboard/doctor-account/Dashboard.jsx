import React from 'react';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { useGetPRofile } from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";


const Dashboard = () => {

    const { data, loading, error } = useGetPRofile(
        `${BASE_URL}/doctors/profile/me`
    );

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                {loading && !error && <Loader />}
                {error && !loading && <Error />}
            
                {!loading && !error && data && (
                    <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                    
                    </div>
                )};
            </div>
        </section>
    )
};



export default Dashboard;