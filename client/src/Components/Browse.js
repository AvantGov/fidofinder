// depends
import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from 'axios'

//utils
import { makeFavorites, makeRemoveFavorite } from "../utils/features/sessionSlice";



// comps
import Loading from "./Loading";


// css 
import '../CSS/Browse.css'



const Browse = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => {return state.session.favorites})
    const filteredSearch = useSelector(state => { return state.session.filteredSearch})
    const filteredSearchIDs = useSelector(state => { return state.session.filteredSearchIDs})
    const location = useLocation();
    // console.log('browse session reading session state ~/browse:', session)
    // ? can't use a controller here becuase it causes constant re-rending with useEffect 
    // ? (cause the controller changes, trigger UF, which changes the controller, which ...) so i had to make it a ref.
    var loadedData = useRef(false)
    var loadedContent = useRef(false)
    // ?
    var content = useRef([])
    var searchArr = useRef([])
    var local_favref = useRef([])

    const navlink_account = document.getElementById('navlink_account')
    const navlink_filtersearch = document.getElementById('navlink_filter')
    if (window.getComputedStyle(navlink_account).backgroundColor === 'rgb(216, 108, 100)') {
        console.log('changing back')
        navlink_account.style.backgroundColor = '#DADADA'
        navlink_account.style.boxShadow = '0px 0px 5px 2px #DADADA'
        navlink_account.style.color = '#1E2329'
        navlink_account.onmouseover = () => {
            if (location.pathname === '/browse') {
                navlink_account.style.backgroundColor = '#AD87A6'
                navlink_account.style.color = '#DADADA'
                navlink_account.style.boxShadow = '0px 0px 20px 2px #AD87A6'
            }
        }
        navlink_account.onmouseout = () => {
            if (location.pathname === ('/browse')) {
                navlink_account.style.backgroundColor = '#DADADA'
                navlink_account.style.boxShadow = '0px 0px 5px 2px #DADADA'
                navlink_account.style.color = '#1E2329'
            }
        }
    }
    if (window.getComputedStyle(navlink_filtersearch).backgroundColor === 'rgb(216, 108, 100)') {
        console.log('changing back')
        navlink_filtersearch.style.backgroundColor = '#DADADA'
        navlink_filtersearch.style.boxShadow = '0px 0px 5px 2px #DADADA'
        navlink_filtersearch.style.color = '#1E2329'
        navlink_filtersearch.onmouseover = () => {
            if (location.pathname === '/browse') {
                navlink_filtersearch.style.backgroundColor = '#AD87A6'
                navlink_filtersearch.style.color = '#DADADA'
                navlink_filtersearch.style.boxShadow = '0px 0px 20px 2px #AD87A6'
            }
        }
        navlink_filtersearch.onmouseout = () => {
            if (location.pathname === ('/browse')) {
                navlink_filtersearch.style.backgroundColor = '#DADADA'
                navlink_filtersearch.style.boxShadow = '0px 0px 5px 2px #DADADA'
                navlink_filtersearch.style.color = '#1E2329'
            }
        }
        
    }

    // used to fetch data then construct the elements that will hold the data, then injects.
    useEffect(() => {
        if (!filteredSearch.payload) {
            if (!loadedData.current && !loadedContent.current) {
                axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'fetch-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s',
                    },
                    params: {
                        size: 99
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
        } else {
            loadedData.current = true;
        }

        setTimeout(() => {
            if (filteredSearch.payload) {
                if (!loadedContent.current && loadedData.current) {
                    axios.post('https://frontend-take-home-service.fetch.com/dogs', filteredSearchIDs.payload, {
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
                                if (!favorites.includes(item.id)) {
                                    // create card with id and key of dog
                                    var wrapper = document.createElement('a')
                                    wrapper.href = `/browse/${item.id}`
                                    wrapper.className = 'Feed__cardWrapper'
                                    wrapper.id = `linkwrap_Feed_${item.id}`
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
    
                                    // add select option for adding to favorites list 
                                    var favorite = document.createElement('button')
                                    favorite.className = 'card__favorite'
                                    favorite.id =`btn_favorite_${item.id}`
                                    favorite.innerHTML = "Add to Favorites"
                                    favorite.onclick = ()=> { handleAddFavorite(item.id) }
                                    card.appendChild(favorite)
    
                                    wrapper.appendChild(card)
                                    inj.appendChild(wrapper)
                                    if (content.current.indexOf(item) === content.current.length - 1) {
                                        var load = document.getElementById('load_browse')
                                        load.style.display = 'none'
                                        return inj.style.display = 'flex'
                                    }
    
                                    return null
                                }
                            })
                        }
                        return loadedContent.current = true
                    })
                    .catch((err) => {
                        console.log('error on the content post', err)
                    })
                }
            } else {
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
                                if (!favorites.includes(item.id)) {
                                    // create card with id and key of dog
                                    var wrapper = document.createElement('a')
                                    wrapper.href = `/browse/${item.id}`
                                    wrapper.className = 'Feed__cardWrapper'
                                    wrapper.id = `linkwrap_Feed_${item.id}`
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
    
                                    // add select option for adding to favorites list 
                                    var favorite = document.createElement('button')
                                    favorite.className = 'card__favorite'
                                    favorite.id =`btn_favorite_${item.id}`
                                    favorite.innerHTML = "Add to Favorites"
                                    favorite.onclick = ()=> { handleAddFavorite(item.id) }
                                    card.appendChild(favorite)
    
                                    wrapper.appendChild(card)
                                    inj.appendChild(wrapper)
                                    if (content.current.indexOf(item) === content.current.length - 1) {
                                        var load = document.getElementById('load_browse')
                                        load.style.display = 'none'
                                        return inj.style.display = 'flex'
                                    }
    
                                    return null
                                }
                            })
                        }
                        return loadedContent.current = true
                    })
                    .catch((err) => {
                        console.log('error on the content post', err)
                    })
                }
            }
        },[1000])
        
        const handleAddFavorite = (dogid) => {
            if (!favorites.includes(dogid) && !local_favref.current.includes(dogid)) {
                dispatch(makeFavorites(dogid))
                local_favref.current.push(dogid)
                const dogcard = document.getElementById(`linkwrap_Feed_${dogid}`)
                dogcard.style.boxShadow = '0px 0px 2px 5px #E1AE5B'
                const button = document.getElementById(`btn_favorite_${dogid}`)
                button.innerHTML = 'Remove'
            } else if (local_favref.current.includes(dogid)) {
                if (window.confirm('do you really want to remove this dog from your favorites?')) {
                    dispatch(makeRemoveFavorite(dogid))
                    local_favref.current.pop(dogid)
                    const dogcard = document.getElementById(`linkwrap_Feed_${dogid}`)
                    dogcard.style.boxShadow = 'none'
                    const button = document.getElementById(`btn_favorite_${dogid}`)
                    button.innerHTML = 'Add to Favorites'
                }
            }
        }

        // get a node list of the favorites elems 
        var list_nodes = []
        favorites.map((dogid) => {
            return list_nodes.push(document.getElementById(`linkwrap_Feed_${dogid.payload}`))
        })
        list_nodes.map((item) => {
            if (list_nodes.indexOf(item) !== 0 && window.getComputedStyle(item).boxShadow !== '0px 0px 2px 5px #E1AE5B') {
                return item.style.boxShadow = '0px 0px 2px 5px #E1AE5B'   
            }
            return null
        })

        var list_btns = []
        favorites.map((dogid) => {
            return list_btns.push(document.getElementById(`btn_favorite_${dogid.payload}`))
        })
        console.log(list_btns)
        list_btns.map((item) => {
            if (list_btns.indexOf(item) !== 0 && window.innerHTML !== 'Remove') {
                return item.innerHTML = "Remove"
            }
            return null
        })

    },[loadedContent, loadedData, dispatch, favorites, filteredSearch, filteredSearchIDs])

    
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