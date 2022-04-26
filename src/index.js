console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', (event) => {
    fetchImages()
    fetchBreeds()
    
});

let breeds; 
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

let fetchImages = () => {
    fetch(imgUrl)
    .then((response) => response.json())
    .then(function(data) {

        let images = data.message
        for (const imageUrl of images) {
            addImage(imageUrl)
        }
    })
    .catch(function (error) {
        console.error(`Fetch failed: ${error}`)
    })
}

let addImage = (imgSource) => {
    let imagesContainer = document.getElementById('dog-image-container');
    let item = `<img src="${imgSource}" />`
    imagesContainer.innerHTML += item
}


const breedUrl = 'https://dog.ceo/api/breeds/list/all' 


let fetchBreeds = () => {
    fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
        breeds = Object.keys(data.message)

        updateBreedListing(breeds);
        breedDropdownListener();
    })
    .catch(function (error) {
        console.error(`Fetch failed: ${error}`)
    })
}


let createBreed = (breed) => {
 
    let breedsContainer = document.getElementById('dog-breeds');

    let li = document.createElement('li')
    li.textContent = breed
    breedsContainer.appendChild(li)

    li.addEventListener('click', (event) => {
        event.target.style.color = 'red'
       event.target.classList.add('li-style');  
    })
    
    
}

let updateBreedListing = (breeds) => {
    

    let breedsContainer = document.getElementById('dog-breeds');
    breedsContainer.innerHTML = '';

    breeds.forEach( (breed) =>  createBreed(breed) );
}

let filterBreeds = (alphabet) => {
    let filteredBreeds = breeds.filter(breed => breed.startsWith(alphabet))
    updateBreedListing(filteredBreeds)
    
}

let breedDropdownListener = () => {
    
    let breedSelect = document.getElementById('breed-dropdown');

    breedSelect.addEventListener('change', (event) => {
        let alphabet = event.target.value
        filterBreeds(alphabet)
    })
}