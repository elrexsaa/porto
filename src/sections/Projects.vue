<script setup>
import { projects } from '../data';
</script>

<template>
  <section id="projects" class="py-24 px-6 bg-slate-50">
    <div class="max-w-6xl mx-auto">
      <h3 class="text-3xl font-bold mb-12">Project Terpilih</h3>
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="project in projects" :key="project.title" 
             class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <h4 class="text-2xl font-bold mb-3">{{ project.title }}</h4>
          <p class="text-slate-600 mb-6 leading-relaxed">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tech in project.tech" :key="tech" 
                  class="text-[10px] uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
              {{ tech }}
            </span>
          </div>
          <a :href="project.link" class="text-slate-900 font-semibold hover:text-indigo-600 inline-flex items-center gap-2">
            View Project <span>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
