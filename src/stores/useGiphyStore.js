import {defineStore} from 'pinia';
import {useQuasar} from 'quasar';
import api from '../services/giphyApi';
import {ref} from 'vue';

export const useGiphyStore = defineStore('giphy', () => {
  const gifs = ref([]);
  const categories = ref([]);
  const favorites = ref([]);
  const $q = useQuasar();

  // Carrega favoritos do localStorage
  const loadFavorites = () => {
    favorites.value = $q.localStorage.getItem('favorites') || [];
  };

  const saveFavorites = () => {
    $q.localStorage.set('favorites', favorites.value);
  };

  const toggleFavorite = gif => {
    const exists = favorites.value.find(item => item.id === gif.id);
    if (exists) {
      favorites.value = favorites.value.filter(item => item.id !== gif.id);
    } else {
      favorites.value.push(gif);
    }
    saveFavorites();
  };

  const fetchTrending = async () => {
    const {data} = await api.get('/gifs/trending');
    gifs.value = data.data;
  };

  const fetchSearch = async term => {
    const {data} = await api.get('/gifs/search', {
      params: {q: term},
    });
    gifs.value = data.data;
  };

  const fetchCategories = async () => {
    const {data} = await api.get('/gifs/categories');
    categories.value = data.data;
  };

  const fetchByCategory = async categoryName => {
    const {data} = await api.get('/gifs/search', {
      params: {q: categoryName},
    });
    gifs.value = data.data;
  };

  return {
    gifs,
    categories,
    favorites,
    fetchTrending,
    fetchSearch,
    fetchCategories,
    fetchByCategory,
    toggleFavorite,
    loadFavorites,
  };
});
