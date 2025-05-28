<template>
  <div>
    <q-input
      v-model="searchTerm"
      @keyup.enter="search"
      placeholder="Buscar GIFs..."
      class="mb-4"
      outlined
      dense
    >
      <template v-slot:append>
        <q-icon name="search" class="cursor-pointer" @click="search" />
      </template>
    </q-input>

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
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useGiphyStore} from '../stores/useGiphyStore';

const giphy = useGiphyStore();
const searchTerm = ref('');

onMounted(() => {
  giphy.fetchTrending();
  giphy.loadFavorites();
});

const search = () => {
  if (searchTerm.value) {
    giphy.fetchSearch(searchTerm.value);
  }
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
