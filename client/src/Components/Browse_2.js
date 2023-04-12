import React, {useEffect, useRef, useState} from "react";
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

const Browse_2 = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => {return state.session.favorites})
    const filteredSearch = useSelector(state => { return state.session.filteredSearch})
    const filteredSearchIDs = useSelector(state => { return state.session.filteredSearchIDs})
    const loadedContent = useRef(false)

    // when comp mounts start searching for dogs, 
    // then get the dog info, 
    // then build out the cards and append to the container, 
    // flip styles on the last one. 
    useEffect(() => {
        if(!loadedContent.current) {
            search().then((res) => {
                console.log('from the browse:',res)

                getDogs(res.data.resultIds).then((res) => {
                    const inj = document.getElementById('inj_browsefeed')
                    
                    res.data.map((item) => {
                        if(res.data.indexOf(item) === res.data.length - 1) {
                            var load = document.getElementById('load_browse')
                            setTimeout(() => {
                                load.style.display = 'none'
                                inj.style.display = 'flex'
                            },[1000])
                        }
                        return inj.appendChild(build_browsecard(item, favorites[0].payload.favorites))
                    })
                    const nl_favebtn = document.getElementsByClassName('card__favorite')
                    for (const btn of nl_favebtn) {
                        btn.addEventListener('click', (e) => {
                            if (!favorites[0].payload.favorites.includes(e.target.id.replace('btn_favorite_',''))) {
                                makeFavorites(e.target.id.replace('btn_favorite_',''))
                                console.log('i got clicked cause im not in the faves list.')
                                // ! right now some reason redux isn't updating the favorites here so i am going to have to modularize it. 
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },[])



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

export default Browse_2;