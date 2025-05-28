<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">Categorias</h2>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <q-card
        v-for="category in categories"
        :key="category.name"
        class="cursor-pointer transition-shadow hover:shadow-lg"
        @click="selectCategory(category.name)"
      >
        <q-card-section class="text-center">
          <q-icon :name="category.icon" size="2rem" color="primary" />
          <div class="mt-2 text-lg font-medium">{{ category.name }}</div>
          <div class="text-grey-7 text-sm">{{ category.description }}</div>
        </q-card-section>
      </q-card>
    </div>

    <div v-if="giphy.gifs.length > 0" class="mt-8">
      <h3 class="mb-4 text-xl font-bold">GIFs da Categoria</h3>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div v-for="gif in giphy.gifs" :key="gif.id" class="relative">
          <q-img
            :src="gif.images.fixed_height.url"
            class="rounded"
            :ratio="16 / 9"
          />
          <div class="absolute right-2 top-2 flex gap-2">
            <q-btn
              @click="giphy.toggleFavorite(gif)"
              round
              flat
              size="sm"
              :icon="isFavorite(gif) ? 'favorite' : 'favorite_border'"
              :color="isFavorite(gif) ? 'red' : 'white'"
            />
            <q-btn
              @click="downloadGif(gif.images.original.url)"
              round
              flat
              size="sm"
              icon="download"
              color="white"
            />
            <q-btn
              @click="shareGif(gif.images.original.url)"
              round
              flat
              size="sm"
              icon="share"
              color="white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useGiphyStore} from '../stores/useGiphyStore';
import {categories} from '../config/categories';

const giphy = useGiphyStore();

onMounted(() => {
  giphy.loadFavorites();
});

const selectCategory = categoryName => {
  giphy.fetchByCategory(categoryName);
};

const isFavorite = gif => {
  return giphy.favorites.some(fav => fav.id === gif.id);
};

function downloadGif(url) {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'giphy.gif';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function shareGif(url) {
  if (navigator.share) {
    navigator.share({
      title: 'Veja este GIF!',
      url,
    });
  } else {
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  }
}
</script>
