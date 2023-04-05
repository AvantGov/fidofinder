// depends
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// css 
import '../CSS/Account.css'



const Account = () => {
    const session = useSelector(state => {return state.session})
    // console.log('account chekcing store:', session)


    // turns the account nav icon a color so the user knows where we are 
    useEffect(() => {
        const activenavlink = document.getElementById('navlink_account')
        activenavlink.style.backgroundColor = '#D86C64'
        activenavlink.style.color = '#DADADA'
        activenavlink.style.boxShadow = '0px 0px 10px 2px #D86C64'
    },[])
    

    return(
        <div className='Account'>
            <div className='Account__profileContainer'>
                <p className='profileContainer__welcome'>Hello, {session.name.payload} ({session.email.payload})!</p>
                <p className='profileContainer__caption'>Welcome to your account page! Below you can view your favorites and use our match feature to get customized pet recommendations.</p>
                <div className='profileContainer__metaContainer'>
                    <p className='metaContainer__title'>Session Information</p>
                    <p className='metaContainer__info' id='caption_sessionID'>Session ID: {session.sessionID.payload}</p>
                    <p className='metaContainer__info' id='caption_timestamp'>Session start time: {session.timestamp.payload}</p>
                </div>
            </div>
            {session.favorites.length > 1 ? <Link to='/account/favorites' className='Account__link'>View Favorites</Link> : null}
            {session.favorites.length > 1 ? <Link to='/account/getMatch' className='Account__link'>Generate Match</Link> : null}
            
        </div>
    );
};

export default Account;