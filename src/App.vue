<script setup>
import { onMounted, onUnmounted } from 'vue'; // Tambahkan onUnmounted
import { observeReveal } from '@/utils/reveal.js';
import Navbar from '@/components/Navbar.vue';
// ... import section lainnya

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
  observeReveal();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
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
