// depends 
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

// css
import '../CSS/Match.css'


const Match = () => {
    const favorites = useSelector(state => {return state.session.favorites})

    useEffect(() => {
        axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
            }
        })
        .then((res) => {
            console.log('get match ran:', res)
        })
        .catch((err) => {
            console.log('get match failer:', err)
        })
    },[favorites])

    return (
        <div className="Match">
            i am the match!
        </div>
    );
};


export default Match;