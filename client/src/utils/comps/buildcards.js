export const build_browsecard = (item, current) => {
    var card = document.createElement('div')
    card.className = 'Feed__card'
    card.id = `feedcard_${item.id}`
    card.setAttribute('key', `card_${item.id}`)
    
    if(current.includes(item.id)) {
        const dogcard = document.getElementById(`feedcard_${item.id}`)
        dogcard.style.boxShadow = '0px 0px 2px 10px #E1AE5B'
        const button = document.getElementById(`btn_favorite_${item.id}`)
        button.innerHTML = 'Remove'
        console.log('theres a favorite getting a ring')
    }
    
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

    // create copy container
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
    copycont.appendChild(favorite)

    return card
}

export const build_favoritescard = (item) => {


} 
