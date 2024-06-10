import React from 'react';

import Doctorcard from "../../components/Doctors/Doctorcard"
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/testimonial";

const Doctors = () => {
    return (
        <>
            <section className="bg-[#fff9ea]">
                <div className='container text-center'>
                    <h2 className='heading'> Find a Doctor </h2>
                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
                        <input
                            type='text'                            
                            className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor' 
                            placeholder='Search for doctors'
                        />
                        <button className='btn mt-0 rounded-[0px]'>Search</button>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-col-4 gap-5'>
                        {doctors.map(doctor => (
                            <Doctorcard key={doctor.id} doctor={doctor}/>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="xl:w-[470px] mx-auto">
                        <h2 className="heading text-center"> What our patient say </h2>
                        <p className="text_para text-center">
                            world-class care for everyone. Our health System offers unmatched, expert health care.
                        </p>
                    </div>

                    <Testimonial />
                </div>    
            </section>
        </>
    );
};

export default Doctors;