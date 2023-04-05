// depends
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


// media
import logo from '../assets/media/fidofinderlogo.png';

// css 
import '../CSS/Nav.css';


const Nav = () => {
    const showNav = useSelector(state => {return state.session.status})


    return(
        <div className='Nav'>
            <Link to={showNav ? '/browse' : '/'} className='logo_Link'>
                <div className='Nav__logoContainer'>
                    <img src={logo} className='logoContainer__logo' alt='logo home link' style={{height: '100px', width: '100px'}} />
                    <p className='logoContainer__name'>fidofinder</p>
                </div>
            </Link>
            <div className='Nav__navlinkContainer' style={{display: showNav ? 'flex' : 'none'}}>
                <Link to='/account' id='navlink_account' className='navlinkContainer__navlink'>My Account</Link>
                <Link to='/' id='navlink_filtersearch' className='navlinkContainer__navlink'>Filter Search</Link>
            </div>
        </div>
    );
};


export default Nav;