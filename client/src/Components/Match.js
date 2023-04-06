// depends 
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from 'axios';

// comps 
import Loading from "./Loading";

// css
import '../CSS/Match.css'


const Match = () => {
    const favorites = useSelector(state => {return state.session.favorites})
    const nav = useNavigate();
    var ready = useRef();

    useEffect(() => {
        axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
            }
        })
        .then((res) => {
            getMatch(res.data.match.payload)
            ready.current = true
        })
        .catch((err) => {
            console.log('get match failer:', err)
        })

        const getMatch = async (dogid) => {
            await axios.post('https://frontend-take-home-service.fetch.com/dogs', [dogid], {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                }
            })
            .then((res) => {
                const dog = res.data[0];
                console.log(dog)
                var match = document.getElementById('cont_match')
                var loading = document.getElementById('cont_matchloading')

                if (!document.getElementById(`img_${dog.id}`)) {
                // add image 
                var img = document.createElement('img')
                img.className = 'match__image'
                img.src = dog.img
                img.id = `img_${dog.id}`
                img.alt = `dog named ${dog.name}`
                img.style.height = '600px'
                img.style.width = '600px'
                img.style.objectFit = 'cover'
                img.style.objectPosition = 'center'
                match.appendChild(img)

                // create copt container
                var copycont = document.createElement('div')
                copycont.className = 'match__copycont'
                copycont.id = `copycont_${dog.id}`
                match.appendChild(copycont)

                // add name 
                var name = document.createElement('p')
                name.className = 'match__name'
                name.id = `name_${dog.id}`
                name.innerHTML = dog.name
                copycont.appendChild(name)
                
                // add breed 
                var breed = document.createElement('p')
                breed.className = 'match__breed'
                breed.id = `breed_${dog.id}`
                breed.innerHTML = `Breed: ${dog.breed}`
                copycont.appendChild(breed)

                // add age
                var age = document.createElement('p')
                age.className = 'match__age'
                age.id = `age_${dog.id}`
                age.innerHTML = `Age: ${dog.age}`
                copycont.appendChild(age)

                // add location   
                var doglocation = document.createElement('p')
                doglocation.className = 'match__doglocation'
                doglocation.id = `doglocation_${dog.id}`
                doglocation.innerHTML = `Location: ${dog.zip_code}`
                copycont.appendChild(doglocation)

                // show and hide 
                match.style.display = 'flex'
                loading.style.display = 'none'
                }
            })
            .catch((err) => {
                console.log('match error:', err)
                    window.alert('there was an issue getting your match. aborting application.')
                    window.location.reload()
                    nav('/')
            })
        }
    },[favorites, nav])

    return (
        <div className="Match">
            <h1 className="Match__title">Your Match:</h1>
            <div className="Match__matchContainer" id="cont_match" style={{display: "none"}}></div>  
            <div className="Match__loadingContainer" id="cont_matchloading" style={{height: '100%', width: '100%'}}>
                <Loading /> 
            </div>
        </div>
    );
};


export default Match;