<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './sections/Hero.vue';
import About from './sections/About.vue';
import Skills from './sections/Skills.vue';
import Projects from './sections/Projects.vue';
import Contact from './sections/Contact.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<style>
html { scroll-behavior: smooth; }
</style>
