<script setup>
import { onMounted } from 'vue';
import { observeReveal } from '@/utils/reveal.js';
import Navbar from '@/components/Navbar.vue';
import Hero from '@/sections/Hero.vue';
import About from '@/sections/About.vue';
import Skills from '@/sections/Skills.vue';
import Projects from '@/sections/Projects.vue';
import Contact from '@/sections/Contact.vue';
import Footer from '@/components/Footer.vue';

onMounted(() => {
  observeReveal();
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
