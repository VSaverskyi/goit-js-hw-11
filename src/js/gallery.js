import { PixabayAPI } from './PixabayAPI';
import createGalleryCards from '../templates/gallery-card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const pixabayAPI = new PixabayAPI();

const handleSearchFormSubmit = async e => {
  e.preventDefault();

  galleryEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden');
  pixabayAPI.page = 1;

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  pixabayAPI.query = searchQuery.value.trim();
  if (pixabayAPI.query === '') {
    searchQuery.value = '';
    return;
  }

  try {
    const { data } = await pixabayAPI.fetchPhotos();

    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      searchQuery.value = '';
      return;
    }

    galleryEl.innerHTML = createGalleryCards(data.hits);

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    let gallery = new SimpleLightbox('.gallery a');

    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    Notify.failure(err);
  }

  searchQuery.value = '';
};

const handleLoadMoreBtnClick = async () => {
  pixabayAPI.page += 1;

  try {
    const { data } = await pixabayAPI.fetchPhotos();
    if (pixabayAPI.page > data.totalHits / pixabayAPI.count) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));

    let gallery = new SimpleLightbox('.gallery a');
    gallery.refresh();
  } catch (err) {
    Notify.failure(err);
  }
};

formEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
