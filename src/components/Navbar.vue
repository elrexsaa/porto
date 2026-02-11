<script setup>
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);
const isDark = ref(false);
const isReloading = ref(false);

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const handleReload = () => {
  isReloading.value = true;
  setTimeout(() => window.location.reload(), 300);
};

onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <nav :class="['fixed top-0 w-full z-50 transition-all duration-300 border-b', isReloading ? 'opacity-0' : 'opacity-100', 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-100 dark:border-slate-800']">
    
    <div id="scroll-progress" class="absolute bottom-0 left-0 h-[2px] bg-indigo-600 dark:bg-indigo-400 transition-all duration-150" style="width: 0%"></div>

    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <div @click="handleReload" class="text-xl font-bold tracking-tighter text-indigo-600 dark:text-indigo-400 cursor-pointer hover:scale-105 transition-transform">
        Elgaaa
      </div>
      
      <div class="flex items-center gap-6">
        <div class="hidden md:flex gap-8">
          <a v-for="link in navLinks" :key="link.name" :href="link.href" 
             class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
            {{ link.name }}
          </a>
        </div>

        <button @click="toggleDark" class="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xl hover:ring-2 ring-indigo-500 transition-all">
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-slate-600 dark:text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
