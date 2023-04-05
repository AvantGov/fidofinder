// depends
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


// comps
import Loading from "./Loading";


// css 
import '../CSS/FavoriteList.css'



const FavoriteList = () => {
    const favorites = useSelector(state => {return state.session.favorites})
    var rendered = useRef(false)
    var data = useRef([])

    console.log('coming from the favorites list:',favorites)

    useEffect(() => {
        const reqdata = []
        favorites.map((item) => {
            // ? there is a dummy in the first slot bc of store init
            if (favorites.indexOf(item) === 0) { return null }
            // ? so we have to ignore it 

            return reqdata.push(item.payload)
        })

        if (reqdata.length > 1) {
            axios.post('https://frontend-take-home-service.fetch.com/dogs', reqdata, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                }
            })
            .then((res) => {
                console.log('post req',res )
                data.current = res.data   
                setTimeout(() => {if(!rendered.current) {handleListRender()}},[200])
            })
            .catch((err) => {
                console.log(err)
            })
        }

        const handleListRender = () => {
            const inj = document.getElementById('inj_browseFaveList')
                        
            data.current.map((item) => {
            // create card with id and key of dog
            var wrapper = document.createElement('a')
            wrapper.href = `/browse/${item.id}`
            wrapper.className = 'FaveList__cardWrapper'
            wrapper.id = `linkwrap_FaveList_${item.id}`
            wrapper.addEventListener('click', (e) => {e.preventDefault()})

            var card = document.createElement('div')
            card.className = 'FaveList__card'
            card.id = `FaveListcard_${item.id}`
            card.setAttribute('key', `card_${item.id}`)
           
            // add image 
            var img = document.createElement('img')
            img.className = 'card__image_f'
            img.src = item.img
            img.id = `img_${item.id}`
            img.alt = `dog named ${item.name}`
            img.style.height = '300px'
            img.style.width = '300px'
            img.style.objectFit = 'cover'
            img.style.objectPosition = 'center'
            card.appendChild(img)

            // create copt container
            var copycont = document.createElement('div')
            copycont.className = 'card__copycont_f'
            copycont.id = `copycont_${item.id}`
            card.appendChild(copycont)

            // add name 
            var name = document.createElement('p')
            name.className = 'card__name_f'
            name.id = `name_${item.id}`
            name.innerHTML = item.name
            copycont.appendChild(name)
            
            // add breed 
            var breed = document.createElement('p')
            breed.className = 'card__breed_f'
            breed.id = `breed_${item.id}`
            breed.innerHTML = `Breed: ${item.breed}`
            copycont.appendChild(breed)

            // add age
            var age = document.createElement('p')
            age.className = 'card__age_f'
            age.id = `age_${item.id}`
            age.innerHTML = `Age: ${item.age}`
            copycont.appendChild(age)

            // add location   
            var doglocation = document.createElement('p')
            doglocation.className = 'card__doglocation_f'
            doglocation.id = `doglocation_${item.id}`
            doglocation.innerHTML = `Location: ${item.zip_code}`
            copycont.appendChild(doglocation)

            wrapper.appendChild(card)
            inj.appendChild(wrapper)
            if (data.current.indexOf(item) === data.current.length - 1) {
                var load = document.getElementById('load_favelist')
                load.style.display = 'none'
                return inj.style.display = 'flex'
            }
            return rendered.current = true
        }
        )}

    },[favorites])

    useEffect(() => {

    },[])

    return(
        <div className="FavoriteList">
            <div className="FavoriteList__welcomeContainer">
                <h1 className="welcomeContainer__title">Favorites</h1>
                <p className="welcomeContainer__caption">Below is a list of the dogs that you have saved as your favorites. <br/><br /> They will not appear in searches.</p>
            </div>
            <div className="FavoriteList__loadingContainer" id='load_favelist'>
                <Loading />
            </div>
            <div className="FavoriteList__listContainer" id="inj_browseFaveList" style={{display: 'none'}}>

            </div>
        </div>
    );
};

export default FavoriteList;