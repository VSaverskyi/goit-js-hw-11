import { PixabayAPI } from './PixabayAPI';
import createGalleryCards from '../templates/gallery-card.hbs';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();

const handleSearchFormSubmit = e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  if (searchQuery.value === '') {
    return;
  }
  pixabayAPI.query = searchQuery.value.trim();

  searchQuery.value = '';

  pixabayAPI
    .fetchPhotos()
    .then(data => {
      console.log(data.hits);
      if (data.hits.length === 0) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.page = 1;

      galleryEl.innerHTML = createGalleryCards(data.hits);

      loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
};

formEl.addEventListener('submit', handleSearchFormSubmit);
