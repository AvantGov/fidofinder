// depends 
import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Welcome from './Welcome';

// css 
import '../CSS/Login.css';

const Login = () => {
    const [controller, setController] = useState({
        UUID: uuidv4(),
        uin_name: '',
        uin_email: '',
        loginStatus: false

    })

    const handleLoginAttempt = () => {
        // will handle the submission to the login endpoint
        console.log("handling submission for login attempt:", controller)
    }

    return (
        <div className='Login'>
            <Welcome />
            <p className='Login__caption'>Please login with the fields below.</p>

            <div className='Login__inputContainer'>
                <label className='inputContainer__label' id='lbl_loginname' htmlFor=''>Name:</label>
                <input name='login_name' className='inputContainer__input' id='inp_loginname' type='text' placeholder='Adam Smith' onChange={(e) => {setController({...controller, uin_name: e.target.value})}}/>
            </div>
            <div className='Login__inputContainer'>
                <label className='inputContainer__label' id='lbl_loginemail' htmlFor=''>Email:</label>
                <input name='login_email' className='inputContainer__input' id='inp_loginemail' type='text' pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' placeholder='john@appleseed.com' onChange={(e) => {setController({...controller, uin_email: e.target.value})}} />
            </div>

            <button className='Login__submit' id='btn_loginsubmit' onClick={() => {handleLoginAttempt()}}>Login</button>


        </div>
    );
};

export default Login;