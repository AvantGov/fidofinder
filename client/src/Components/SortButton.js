// depends 
import React from "react";
import { useLocation } from "react-router";

// css 
import '../CSS/SortButton.css';



const SortButton = () => {
    const location = useLocation();
    
    const handleSort = () => {
        if (location.pathname === '/account/favorites') {
            const container = document.getElementById('inj_browseFaveList');
            if (window.getComputedStyle(container).flexDirection === 'column') {
                return container.style.flexDirection = 'column-reverse'
            } else if (window.getComputedStyle(container).flexDirection === 'column-reverse') {
                return container.style.flexDirection = 'column'
            }

        } else if (location.pathname === '/browse') {
            const container = document.getElementById('inj_browsefeed')
            if (window.getComputedStyle(container).flexDirection === 'column') {
                return container.style.flexDirection = 'column-reverse'
            } else if (window.getComputedStyle(container).flexDirection === 'column-reverse') {
                return container.style.flexDirection = 'column'
            }
        }
    }
 



    return(
        <button className='App__sort' id='btn_sort' onClick={() => {handleSort()}}>&#8645;</button>
    )
}

export default SortButton;