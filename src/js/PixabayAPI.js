export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34862822-8eb02c3fef422917f168c53cc';

  query = null;
  page = 1;
  count = 40;

  basedSearchParams = {
    key: this.#API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: this.page,
    per_page: this.count,
  };
  fetchPhotos() {
    const searchParams = new URLSearchParams({
      q: this.query,
      ...this.basedSearchParams,
    });

    return fetch(`${this.#BASE_URL}?${searchParams}`).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    });
  }
}
