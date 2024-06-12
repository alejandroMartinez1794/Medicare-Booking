import { useState } from 'react';

import SignupImg from "../assets/images/signup.gif"
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup   = () => {

    const [selectFile, setSelectFile] = useState (null);
    const [previewURL, setpreviewURL] = useState ("");
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: selectFile,
        gender:"",
        role:"patient"
    });

    const navigate = useNavigate();

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  
    }
    
    const handleFileInputChange = async (Event) => {
        const file = Event.target.files[0]

        const data = await uploadImageToCloudinary(file)
    
        setpreviewURL(data.url);
        setSelectFile(data.url);
        setFormData({ ...formData, photo: data.url });
    };

    const submitHandler = async event => {

        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch ( `${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const {message}= await res.json();

            if(!res.ok) {
                throw new Error(message);
            }

            setLoading(false)
            toast.success(message)
            navigate('/login');

        }   catch (err) {
            toast.error(err.message);
            setLoading(false);
        } 
    };

    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/*----------img box--------*/}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={SignupImg} alt="" className="w-full rounded-l-lg"/>
                        </figure>
                    </div>

                    {/*----------sign up form--------*/}
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an <span className="text-primaryColor"> account </span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                                    focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
                                    placeholder: text-textColor  cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="email"
                                    placeholder="Enter your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                                    focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
                                    placeholder: text-textColor  cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                                    focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
                                    placeholder: text-textColor  cursor-pointer"
                                    required
                                />
                            </div>

                            <div className="mb-5 flex items-center justify-between">

                                <label
                                    className="text-headingColor font-bold text-[16px] leading-7"
                                >
                                    Are you a:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3
                                        focus:outline-none"
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>

                                    </select>
                                </label>

                                <label
                                    name="role"
                                    className="text-headingColor font-bold text-[16px] leading-7"
                                >
                                    Gender:
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3
                                        focus:outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>

                                    </select>
                                </label>
                            </div>

                            <div className="mb-5 flex items-center gap-3">

                                {selectFile && (
                                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center
                                    justify-center">
                                        <img 
                                            src={previewURL} 
                                            alt="" 
                                            className="w-full rounded-full"
                                        />
                                    </figure>
                                )}

                                <div className="relative w-[130px] h-[50px]">
                                    <input
                                        type="file"
                                        name="photo"
                                        id="customfile"
                                        onChange={handleFileInputChange}
                                        accept=".jpg .png"
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="customfile"
                                        className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                                        text-[15px] leading-6 overflow-hidden bg-[#0066ff48] text-headingColor font-semibold rounded-lg
                                        truncate cursor-pointer"
                                    >
                                        Uploading Photo
                                    </label>    
                                </div>
                            </div>

                            <div className='mt-7'>
                                <button
                                    disabled={loading && true}
                                    type="submit"
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                >
                                    {loading ? (
                                        <HashLoader size={25} color="#ffffff"/> 
                                    )   : ( 
                                        'Sign Up'
                                    )}

                                </button>
                            </div>

                            <p className='mt-8 text-textColor text-center'>
                                Already have an account? 
                                <Link to= "/Login" 
                                className='text-primaryColor font-medium ml-1'> 
                                    Login
                                </Link>
                            </p>

                        </form>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Signup;
