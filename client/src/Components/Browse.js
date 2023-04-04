// depends
import React, {useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from 'axios'



// comps
import Loading from "./Loading";


// css 
import '../CSS/Browse.css'


const Browse = () => {
    const session = useSelector(state => {return state.session})
    const nav = useNavigate();
    console.log('browse session reading session state ~/browse:', session)

    
    // ? can't use a controller here becuase it causes constant re-rending with useEffect 
    // ? (cause the controller changes, trigger UF, which changes the controller, which ...) so i had to make it a ref.
    var loadedData = useRef(false)
    var loadedContent = useRef(false)
    // ?
    var content = useRef([])
    var searchArr = useRef([])
    


    // used to fetch data then construct the elements that will hold the data, then injects.
    useEffect(() => {
        if (!loadedData.current && !loadedContent.current) {
            axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                },
                params: {
                    size: 10
                }
            })
            .then((res) => {
                console.log('ref upd:', searchArr.current)
                searchArr.current = res.data.resultIds
                return loadedData.current = true
            })
            .catch((err) => {
                console.log("error from the browse get:", err)
            })
        }

        setTimeout(() => {
            if (!loadedContent.current && loadedData.current) {
                axios.post('https://frontend-take-home-service.fetch.com/dogs', searchArr.current, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                    },
                })
                .then((res) => {
                    console.log('get content:', res)
                    content.current = res.data
                    if (content.current.length > 0 && !loadedContent.current) {
                        // get the container
                        const inj = document.getElementById('inj_browsefeed')
                        
                        content.current.map((item) => {
                        // create card with id and key of dog
                        var wrapper = document.createElement('a')
                        wrapper.href = `/browse/${item.id}`
                        wrapper.className = 'Feed__cardWrapper'
                        wrapper.id = 'linkwrap_Feed'
                        wrapper.addEventListener('click', (e) => {e.preventDefault()})

                        var card = document.createElement('div')
                        card.className = 'Feed__card'
                        card.id = `feedcard_${item.id}`
                        card.setAttribute('key', `card_${item.id}`)
                        // add image 
                        var img = document.createElement('img')
                        img.className = 'card__image'
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
                        copycont.className = 'card__copycont'
                        copycont.id = `copycont_${item.id}`
                        card.appendChild(copycont)

                        // add name 
                        var name = document.createElement('p')
                        name.className = 'card__name'
                        name.id = `name_${item.id}`
                        name.innerHTML = item.name
                        copycont.appendChild(name)
                        
                        // add breed 
                        var breed = document.createElement('p')
                        breed.className = 'card__breed'
                        breed.id = `breed_${item.id}`
                        breed.innerHTML = `Breed: ${item.breed}`
                        copycont.appendChild(breed)
                        // add age
                        var age = document.createElement('p')
                        age.className = 'card__age'
                        age.id = `age_${item.id}`
                        age.innerHTML = `Age: ${item.age}`
                        copycont.appendChild(age)
                        // add location   
                        var doglocation = document.createElement('p')
                        doglocation.className = 'card__doglocation'
                        doglocation.id = `doglocation_${item.id}`
                        doglocation.innerHTML = `Location: ${item.zip_code}`
                        copycont.appendChild(doglocation)

                        wrapper.appendChild(card)
                        inj.appendChild(wrapper)
                        if (content.current.indexOf(item) === content.current.length - 1) {
                            var load = document.getElementById('load_browse')
                            load.style.display = 'none'
                            return inj.style.display = 'flex'
                        }

                        return null
                        })
                    }
                    return loadedContent.current = true
                })
                .catch((err) => {
                    console.log('error on the content post', err)
                })
            }
        },[1000])
    },[loadedContent, loadedData])

    
    return(
        <div className="Browse">
            <div className="Browse__LoadingContainer" id='load_browse' style={{height: '100vh'}}>
                <Loading />
            </div>
            <div className="Browse__Feed" id="inj_browsefeed" style={{display: 'none'}}>

            </div>
        </div>
    );
};

export default Browse