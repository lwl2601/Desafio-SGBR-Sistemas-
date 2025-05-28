<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">Meus Favoritos</h2>

    <div v-if="giphy.favorites.length === 0" class="py-8 text-center">
      <q-icon name="favorite_border" size="4rem" color="grey" />
      <p class="text-grey mt-4">Você ainda não tem favoritos</p>
    </div>

    <div v-else class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div v-for="gif in giphy.favorites" :key="gif.id" class="relative">
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
            icon="favorite"
            color="red"
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
import {onMounted} from 'vue';
import {useGiphyStore} from '../stores/useGiphyStore';

const giphy = useGiphyStore();

onMounted(() => {
  giphy.loadFavorites();
});

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
