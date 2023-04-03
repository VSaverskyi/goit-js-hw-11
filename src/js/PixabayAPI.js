import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34862822-8eb02c3fef422917f168c53cc';

  constructor() {
    this.query = null;
    this.page = 1;
    this.count = 40;
  }

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

    return await axios.get(`${this.#BASE_URL}`, {
      params: searchParams,
    });
  }
}
