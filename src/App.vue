<script setup>
import { onMounted, onUnmounted } from 'vue';
import { observeReveal } from '@/utils/reveal.js';
import Navbar from '@/components/Navbar.vue';
import Hero from '@/sections/Hero.vue';
import About from '@/sections/About.vue';
import Skills from '@/sections/Skills.vue';
import Projects from '@/sections/Projects.vue';
import Contact from '@/sections/Contact.vue';
import Footer from '@/components/Footer.vue';
import AIAssistant from '@/components/AIAssistant.vue';

/**
 * Fungsi untuk mengupdate lebar progress bar di atas layar
 * berdasarkan posisi scroll pengguna.
 */
const handleScroll = () => {
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  }
};

onMounted(() => {
  // Inisialisasi efek muncul (reveal) untuk elemen dengan class .reveal
  observeReveal();
  
  // Menambahkan event listener untuk fitur Reading Progress Bar
  window.addEventListener('scroll', handleScroll);

  // Inisialisasi tema saat halaman pertama kali dimuat
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

onUnmounted(() => {
  // Membersihkan event listener saat komponen dihancurkan
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    
    <Navbar />

    <main>
      <Hero class="reveal" />
      
      <About class="reveal" />
      
      <Skills class="reveal" />
      
      <Projects class="reveal" />
      
      <Contact class="reveal" />
    </main>

    <AIAssistant />

    <Footer />
    
  </div>
</template>

<style>
/* Smooth scrolling untuk navigasi internal link */
html {
  scroll-behavior: smooth;
}

/* Memastikan transisi Dark Mode terasa halus di seluruh elemen */
* {
  @apply transition-colors duration-300;
}
</style>
