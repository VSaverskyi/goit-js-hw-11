import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34862822-8eb02c3fef422917f168c53cc';

  query = null;
  page = 1;
  count = 40;

  // basedSearchParams = {
  //   key: this.#API_KEY,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: 'true',
  //   page: this.page,
  //   per_page: this.count,
  // };
  async fetchPhotos() {
    const searchParams = new URLSearchParams({
      q: this.query,
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.count,
    });
    try {
      return await axios.get(`${this.#BASE_URL}`, {
        params: searchParams,
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
