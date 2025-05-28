<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-none" style="overflow-x: hidden">
    <!-- HEADER -->
    <q-header
      class="flex items-center justify-between bg-[#1976D2] px-4 text-white shadow md:px-6"
      style="height: 64px; min-height: 64px"
    >
      <div class="flex h-full items-center">
        <!-- Botão menu mobile -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          class="mr-2 md:hidden"
          @click="drawerOpen = !drawerOpen"
          aria-label="Abrir menu"
        />
        <!-- Nova Logo -->
        <img
          src="https://static.wixstatic.com/media/ae1269_8d32833c5b104e819bd87d54fa8440f7~mv2.png"
          alt="Logo"
          class="mr-2 h-12 md:mr-4 md:h-20"
        />
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <span
          class="max-w-[120px] truncate text-sm font-bold uppercase tracking-wider md:max-w-none md:text-base"
          >Léo Wisbistcki Ludwig</span
        >
        <q-avatar size="40px" class="shadow-lg">
          <img
            src="https://static.wixstatic.com/media/ae1269_8a1d35f8ce66450e8f742a02c7228f99~mv2.png"
            alt="Avatar Léo Wisbistcki Ludwig"
          />
        </q-avatar>
      </div>
    </q-header>

    <!-- SIDEBAR -->
    <q-drawer
      v-model="drawerOpen"
      :mini="!drawerPinned && !drawerHovered && $q.screen.gt.sm"
      :overlay="$q.screen.lt.md"
      show-if-above
      side="left"
      bordered
      class="bg-[#061A40] text-white"
      @mouseenter="drawerHovered = true"
      @mouseleave="drawerHovered = false"
    >
      <div class="flex items-center justify-end pb-1 pr-2 pt-2">
        <q-btn
          dense
          round
          flat
          size="sm"
          :icon="drawerPinned ? 'push_pin' : 'push_pin_outlined'"
          :color="drawerPinned ? 'primary' : 'white'"
          @click="drawerPinned = !drawerPinned"
          :aria-label="drawerPinned ? 'Desafixar menu' : 'Fixar menu'"
          class="hidden md:inline-flex"
        />
      </div>
      <q-list class="pt-2">
        <q-item
          clickable
          to="/"
          active-class="bg-[#1976D2] text-white font-bold shadow rounded-lg"
          exact
        >
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item
          clickable
          to="/favoritos"
          active-class="bg-[#1976D2] text-white font-bold shadow rounded-lg"
        >
          <q-item-section avatar><q-icon name="groups" /></q-item-section>
          <q-item-section>Favoritos</q-item-section>
        </q-item>
        <q-item
          clickable
          to="/categorias"
          active-class="bg-[#1976D2] text-white font-bold shadow rounded-lg"
        >
          <q-item-section avatar><q-icon name="inventory_2" /></q-item-section>
          <q-item-section>Categorias</q-item-section>
        </q-item>
        <q-item
          clickable
          to="/sobre"
          active-class="bg-[#1976D2] text-white font-bold shadow rounded-lg"
        >
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>Sobre</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- CONTEÚDO -->
    <q-page-container
      class="min-h-screen bg-[#F3F4F6] p-2 md:p-8"
      style="overflow-y: auto"
    >
      <div class="min-h-[400px] rounded-xl bg-white p-2 shadow md:p-8">
        <div class="mb-6 flex justify-center md:mb-8">
          <h1
            class="from-blue-600 via-pink-500 to-yellow-400 animate-pulse bg-gradient-to-r bg-clip-text text-center text-xl font-extrabold uppercase tracking-widest text-transparent drop-shadow-lg md:text-3xl"
          >
            GIFS REVOLUCIONÁRIOS EM TEMPO REAL 🚀
          </h1>
        </div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref, getCurrentInstance} from 'vue';
const {
  proxy: {$q},
} = getCurrentInstance();

const drawerOpen = ref(false);
const drawerPinned = ref(false);
const drawerHovered = ref(false);
</script>
