// depends 
import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

// comps
import Welcome from './Welcome';
import Loading from './Loading';

// utils
import { makeSessionID,makeTimestamp,makeEmail,makeName,makeStatus,makeFavorites } from '../utils/features/sessionSlice';



// css 
import '../CSS/Login.css';

const Login = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [controller, setController] = useState({
        UUID: uuidv4(),
        uin_name: '',
        uin_email: '',
        loginStatus: false,
        attempting: false
    })
    
    const trylogin = async (name, email) => {
        setController({...controller, attempting: true})
        await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
            name: name,
            email: email
        }, {
            withCredentials: true,
            headers: {
                'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('login response', res)
            handleNewSession()
            setTimeout(() => {setController({...controller, attempting: false})}, [2500])
            setTimeout(() => {nav('/browse')}, [2500])
        })
        .catch((err) => {
            window.alert("login attempt failed, please try again.", err)
        })
    }

    const handleLoginAttempt = () => {
        trylogin(controller.uin_name, controller.uin_email)
    }

    const handleNewSession = () => {
            dispatch(makeSessionID(controller.UUID))
            dispatch(makeTimestamp(new Date().toString()))
            dispatch(makeEmail(controller.uin_email))
            dispatch(makeName(controller.uin_name))
            dispatch(makeFavorites({
                favorites: []
            }))
            setTimeout(() => {dispatch(makeStatus(true))}, 1500)
    }



    return (
        <div className='Login'>
            <div className='Login__loadingContainer' style={{height: '100vh', width: '100%', display: controller.attempting ? "flex" : "none"}}>
                <Loading />
            </div>
            <div className='Login_welcomeContainer' style={{height: '100%', width: '100%', display: controller.attempting ? "none" : 'flex'}}>
                <Welcome />
            </div>
            <p className='Login__caption' style={{display: controller.attempting ? 'none' : 'block'}}>Please login with the fields below:</p>

            <div className='Login__inputContainer'style={{display: controller.attempting ? 'none' : 'flex'}}>
                <label className='inputContainer__label' id='lbl_loginname' htmlFor=''>Name:</label>
                <input name='login_name' className='inputContainer__input' id='inp_loginname' type='text' placeholder='Adam Smith' onChange={(e) => {setController({...controller, uin_name: e.target.value})}}/>
            </div>
            <div className='Login__inputContainer' style={{display: controller.attempting ? 'none' : 'flex'}}>
                <label className='inputContainer__label' id='lbl_loginemail' htmlFor=''>Email:</label>
                <input name='login_email' className='inputContainer__input' id='inp_loginemail' type='text' pattern='/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/' placeholder='john@appleseed.com' onChange={(e) => {setController({...controller, uin_email: e.target.value})}} />
            </div>

            <button className='Login__submit' id='btn_loginsubmit' testId='btn_loginsubmit' onClick={() => {handleLoginAttempt()}} style={{display: controller.attempting ? 'none' : 'block'}}>Login</button>
        </div>
    );
};

export default Login;