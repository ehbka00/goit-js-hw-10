import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_BuW2aIpoH1YkFLwwCEJVWMnPx5a73VkrSjCD0fKDykBTnpuDXCqJYIlVXp4tXiUR";

export async function fetchCatsBreeds(breedSelect, error, loader) {
    await axios.get('https://api.thecatapi.com/v1/breeds').
    then(response => {
        if (response.status !== 200) {
            throw new Error("Error status " + response.status);
        }

        return getBreedsArray(response.data);
    })
    .then(data => {
       const breedsList = data.map(({id, name}) => {
        return `<option id="${id}">${name}</option>`;
       }).join("");

       breedSelect.innerHTML = breedsList;
    })
    .catch((errorMsg) => {
        handleFetchError(breedSelect, error, loader);
    });
}

export async function fetchCatByBreed (breedId, catDesc, breedSelect, error) {
    await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).
    then(response => {
        if (response.status !== 200 ) {
            throw new Error("Error status " + response.status);
        }
        return response.data[0];
    })
    .then(catsInfo => {
        catDesc.innerHTML = `<img class="breed-img"src=${catsInfo.url} alt=${catsInfo.breeds[0].alt_names}>
        <div class="details"><h2>${catsInfo.breeds[0].name}</h2><p>${catsInfo.breeds[0].description}</p><p><b>Temperament:${catsInfo.breeds[0].temperament}</b></p></div>`;
    })
    .catch((errorMsg) => {
        handleFetchError(breedSelect, error)
    });
}

function  handleFetchError(breedSelect, error) {
    breedSelect.classList.toggle('hide-elem');
    error.classList.toggle('hide-elem');
}

function getBreedsArray(data) {
    return data.map(breed => ({ id: breed.id, name: breed.name }));   
}