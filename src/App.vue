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

// Fungsi untuk menghitung progress scroll (Reading Progress Bar)
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
  // Inisialisasi efek muncul saat scroll
  observeReveal();
  
  // Tambahkan listener untuk progress bar
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // Bersihkan listener saat komponen dilepas agar tidak boros RAM
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

    <Footer />
    
  </div>
</template>

<style>
/* Pastikan CSS global seperti .reveal sudah ada di style.css.
  Kamu juga bisa menambahkan transisi smooth scroll di sini jika belum ada di CSS global.
*/
html {
  scroll-behavior: smooth;
}
</style>
