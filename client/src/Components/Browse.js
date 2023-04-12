// depends
import React, {useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import axios from 'axios'

//utils
import { makeFavorites, makeRemoveFavorite } from "../utils/features/sessionSlice";
import { build_browsecard } from "../utils/comps/buildcards";
import { getDogs, search } from "../utils/handlers/api_dogs";

// hooks 
import { useFavorites } from "../utils/hooks/useFavorites";


// comps
import Loading from "./Loading";


// css 
import '../CSS/Browse.css'




const Browse = () => {
    const dispatch = useDispatch();
    const h_favorites = useFavorites()
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

    // const navlink_account = document.getElementById('navlink_account')
    // const navlink_filtersearch = document.getElementById('navlink_filter')
    // if (window.getComputedStyle(navlink_account).backgroundColor === 'rgb(216, 108, 100)') {
    //     console.log('changing back')
    //     navlink_account.style.backgroundColor = '#DADADA'
    //     navlink_account.style.boxShadow = '0px 0px 5px 2px #DADADA'
    //     navlink_account.style.color = '#1E2329'
    //     navlink_account.onmouseover = () => {
    //         if (location.pathname === '/browse') {
    //             navlink_account.style.backgroundColor = '#AD87A6'
    //             navlink_account.style.color = '#DADADA'
    //             navlink_account.style.boxShadow = '0px 0px 20px 2px #AD87A6'
    //         }
    //     }
    //     navlink_account.onmouseout = () => {
    //         if (location.pathname === ('/browse')) {
    //             navlink_account.style.backgroundColor = '#DADADA'
    //             navlink_account.style.boxShadow = '0px 0px 5px 2px #DADADA'
    //             navlink_account.style.color = '#1E2329'
    //         }
    //     }
    // }

    // if (window.getComputedStyle(navlink_filtersearch).backgroundColor === 'rgb(216, 108, 100)') {
    //     console.log('changing back')
    //     navlink_filtersearch.style.backgroundColor = '#DADADA'
    //     navlink_filtersearch.style.boxShadow = '0px 0px 5px 2px #DADADA'
    //     navlink_filtersearch.style.color = '#1E2329'
    //     navlink_filtersearch.onmouseover = () => {
    //         if (location.pathname === '/browse') {
    //             navlink_filtersearch.style.backgroundColor = '#AD87A6'
    //             navlink_filtersearch.style.color = '#DADADA'
    //             navlink_filtersearch.style.boxShadow = '0px 0px 20px 2px #AD87A6'
    //         }
    //     }
    //     navlink_filtersearch.onmouseout = () => {
    //         if (location.pathname === ('/browse')) {
    //             navlink_filtersearch.style.backgroundColor = '#DADADA'
    //             navlink_filtersearch.style.boxShadow = '0px 0px 5px 2px #DADADA'
    //             navlink_filtersearch.style.color = '#1E2329'
    //         }
    //     }
        
    // }

    // used to fetch data then construct the elements that will hold the data, then injects.
    useEffect(() => {
        if (!filteredSearch.payload) {
            if (!loadedData.current && !loadedContent.current) {
                search().then((res) => {
                    console.log('ran a dog search from browse:', res)
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
                    getDogs(filteredSearchIDs.payload).then((res) => {
                        console.log('get content:', res)
                        content.current = res.data
                        if (content.current.length > 0 && !loadedContent.current) {
                            // get the container
                            const inj = document.getElementById('inj_browsefeed')
                            
                            content.current.map((item) => {
                                if (!favorites.includes(item.id)) {
                                    inj.appendChild(build_browsecard(item))
                                    if (content.current.indexOf(item) === content.current.length - 1) {
                                        var load = document.getElementById('load_browse')
                                        load.style.display = 'none'
                                        return inj.style.display = 'flex'
                                    }
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
                                    inj.appendChild(build_browsecard(item))
                                    if (content.current.indexOf(item) === content.current.length - 1) {
                                        var load = document.getElementById('load_browse')
                                        load.style.display = 'none'
                                        return inj.style.display = 'flex'
                                    }
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
            }
        },[1000])
        
        // ! will need to make sure to add this functionality to the card after it is created
        const handleAddFavorite = (dogid) => {
            if (!favorites.includes(dogid) && !local_favref.current.includes(dogid)) {
                dispatch(makeFavorites(dogid))
                local_favref.current.push(dogid)
                const dogcard = document.getElementById(`feedcard_${dogid}`)
                dogcard.style.boxShadow = '0px 0px 2px 15px #E1AE5B'
                const button = document.getElementById(`btn_favorite_${dogid}`)
                button.innerHTML = 'Remove'
            } else if (local_favref.current.includes(dogid)) {
                if (window.confirm('do you really want to remove this dog from your favorites?')) {
                    dispatch(makeRemoveFavorite(dogid))
                    local_favref.current.pop(dogid)
                    const dogcard = document.getElementById(`feedcard_${dogid}`)
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
            if (list_nodes.indexOf(item) !== 0 && window.getComputedStyle(item).boxShadow !== '0px 0px 2px 15px #E1AE5B') {
                return item.style.boxShadow = '0px 0px 2px 15px #E1AE5B'   
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