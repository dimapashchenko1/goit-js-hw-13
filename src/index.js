import './sass/styles.scss';

import getRefs from './js/refs';
import ApiService from './js/fetchAPI';

import imgCardTpl from './templates/gallery-card.hbs';

import Notiflix from 'notiflix';

const refs = getRefs();
const apiService = new ApiService();

refs.form.addEventListener('submit', onImgSearch);
refs.loadBtn.addEventListener('click', onImgLoad);

async function onImgSearch(evt) {
  evt.preventDefault();
  apiService.resetPage();
  clearImgBox();
  refs.loadBtn.classList.add('hidden');

  apiService.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();

  if (apiService.searchQuery === '') {
    return;
  }

  try {
    const result = await apiService.fetchImages();

    ImgMarkup(result.hits);

    if (result.hits.length === 0) {
      refs.loadBtn.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);

    refs.loadBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onImgLoad() {
  try {
    const result = await apiService.fetchImages();

    if (refs.imgBox.querySelectorAll('.photo-card').length === result.totalHits) {
      getTotalImgCount();
    } else {
      ImgMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

function ImgMarkup(data) {
  refs.imgBox.insertAdjacentHTML('beforeend', imgCardTpl(data));
}

function clearImgBox() {
  refs.imgBox.innerHTML = '';
}

function getTotalImgCount() {
  refs.loadBtn.style.display = 'none';

  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}
