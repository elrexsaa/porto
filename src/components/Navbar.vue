<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
</script>

<template>
  <nav class="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div 
  @click="window.location.reload()" 
  class="text-xl font-bold tracking-tighter text-indigo-600 cursor-pointer hover:opacity-80 transition"> PORTFOLIO. </div>
      
      <div class="hidden md:flex gap-8">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" 
           class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">
          {{ link.name }}
        </a>
      </div>

      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="isMenuOpen" class="md:hidden bg-white border-b px-6 py-4 flex flex-col gap-4">
      <a v-for="link in navLinks" :key="link.name" :href="link.href" @click="isMenuOpen = false"
         class="text-slate-600 font-medium">
        {{ link.name }}
      </a>
    </div>
  </nav>
</template>
