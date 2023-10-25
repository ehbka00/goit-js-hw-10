import { fetchCatsBreeds, fetchCatByBreed } from "./js/cat-api.js";
import SlimSelect from 'slim-select'

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catDesc = document.querySelector(".cat-info");

getCatsBreeds()

async function getCatsBreeds() {
    loader.classList.toggle('hide-elem');
    await fetchCatsBreeds(breedSelect, error, loader);
    loader.classList.toggle('hide-elem');
    breedSelect.classList.toggle('hide-elem');

    new SlimSelect({
        select: '.breed-select',
      })
}

async function getCatsInfoById(selectedId) {
    catDesc.innerHTML = '';
   loader.classList.toggle('hide-elem');
   await fetchCatByBreed(selectedId, catDesc,breedSelect, error);
   loader.classList.toggle('hide-elem');
}

const breedSelected = () => {
    const selectedOption = breedSelect.options[breedSelect.selectedIndex];
    getCatsInfoById(selectedOption.id);
}

breedSelect.addEventListener("change", breedSelected);