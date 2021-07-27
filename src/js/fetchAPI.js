const axios = require('axios');
const API_KEY = '22667057-2dc7c959a5419833a30fef1e8';
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiImgService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const response = await axios.get(url);

    this.page += 1;
    return response.data;
  }

  resetPage() {
    this.page = 1;
  }
}
