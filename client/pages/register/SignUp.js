import React, { useState } from 'react'
import { FetchCreateUser, FetchUser, UploadImg } from '../../api/FetchPlan'
import RegisterCard from '../../components/registercard/RegisterCard'
import ToastMessage from '../../components/toastmessage/ToastMessage';
import './signup.css'
import { hot } from 'react-hot-loader';


const SignUp = () => {
    const [toastResponse, setToastResponse] = useState({});

    const signUpUser = async(data, formData) => {        
        const response = await FetchCreateUser(data);
        setToastResponse(response);

        if(response.data){
            localStorage.setItem('token', response.token);
            window.location = '/home';
        }

        const imgResponse = await UploadImg(formData, response.data._id);

        console.log(imgResponse);

    }  

    return (
        <div className="signupWrapper">              
            <RegisterCard signUpUser ={ signUpUser }/>
            {!toastResponse.statusCode  ? null : <ToastMessage response={toastResponse}/>}     
        </div>
    )
}

export default hot(module)(SignUp);