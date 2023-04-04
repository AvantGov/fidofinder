// depends 
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";



// css 
import '../CSS/LogoutButton.css';
import { makeAccountDetails, makeEmail, makeExpired, makeLocation, makeName, makeSessionID, makeStatus, makeTimestamp } from "../utils/features/sessionSlice";


const LogoutButton = () => {
    const session = useSelector(state => {return state.session})
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogoutAttempt = async () => {
        await axios.post('https://frontend-take-home-service.fetch.com/auth/logout',{
            name: session.name,
            email: session.email
        }, {
            withCredentials: true,
            headers: {
                'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('logoutran', res.status)
                dispatch(makeAccountDetails({}))
                dispatch(makeName(''))
                dispatch(makeEmail(''))
                dispatch(makeSessionID(''))
                dispatch(makeExpired(true))
                dispatch(makeLocation({}))
                dispatch(makeTimestamp(0))
                dispatch(makeStatus(false))
                window.alert('you have been signed out')
                nav('/')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log('error on logout:', err)
        })
    }



    return(
        <button className='App__logout' id='btn_logout' onClick={() => {handleLogoutAttempt()}} style={{dsiplay: session.showLogOut ? 'block' : 'none'}}>&#9996;</button>
    )
}

export default LogoutButton;