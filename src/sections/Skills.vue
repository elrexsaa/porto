<script setup>
import { skills } from '../data';
</script>

<template>
  <section id="skills" class="py-24 bg-white px-6">
    <div class="max-w-5xl mx-auto">
      <h3 class="text-3xl font-bold mb-12 text-center">Keahlian Teknis</h3>
      <div class="grid md:grid-cols-3 gap-12">
        <div v-for="(items, category) in skills" :key="category" class="space-y-4">
          <h4 class="capitalize text-indigo-600 font-semibold text-xl border-b pb-2">{{ category }}</h4>
          <ul class="flex flex-wrap gap-2">
            <li v-for="skill in items" :key="skill" 
                class="bg-slate-100 px-4 py-2 rounded-lg text-slate-700 text-sm font-medium">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
