// depends
import React from 'react';
import { Link } from 'react-router-dom';

// media
import logo from '../assets/media/fidofinderlogo.png';

// css 
import '../CSS/Nav.css';


const Nav = () => {

    return(
        <div className='Nav'>
            <Link to='/' className='logo_Link'>
                <div className='Nav__logoContainer'>
                    <img src={logo} className='logoContainer__logo' alt='logo home link' style={{height: '100px', width: '100px'}} />
                    <p className='logoContainer__name'>fidofinder</p>
                </div>
            </Link>
            <div className='Nav__navlinkContainer'>
                <Link to='/' className='navlinkContainer__navlink'>My Account</Link>
                <Link to='/' className='navlinkContainer__navlink'>Filter Search</Link>
            </div>
        </div>
    );
};


export default Nav;