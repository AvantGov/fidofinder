import { useDispatch, useSelector } from "react-redux";
import { makeFavorites, makeRemoveFavorite } from "../features/sessionSlice";
 
export const useFavorites = (dogid) => {
    const dispatch = useDispatch();
    const current = useSelector(state => state.session.favorites)

    if (!current.includes(dogid)) {
        dispatch(makeFavorites(dogid))
        const dogcard = document.getElementById(`feedcard_${dogid}`)
        dogcard.style.boxShadow = '0px 0px 2px 10px #E1AE5B'
        const button = document.getElementById(`btn_favorite_${dogid}`)
        button.innerHTML = 'Remove'
    } else if (current.includes(dogid)) {
        if (window.confirm('do you really want to remove this dog from your favorites?')) {
            dispatch(makeRemoveFavorite(dogid))
            const dogcard = document.getElementById(`feedcard_${dogid}`)
            dogcard.style.boxShadow = 'none'
            const button = document.getElementById(`btn_favorite_${dogid}`)
            button.innerHTML = 'Add to Favorites'
        }
    }
}