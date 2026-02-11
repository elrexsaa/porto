<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const message = ref('');
const chatHistory = ref([
  { role: 'ai', text: 'Halo! Saya asisten AI Elgaa. Ada yang bisa saya bantu?' }
]);

const sendMessage = () => {
  if (!message.value.trim()) return;
  
  // Tambah pesan user
  chatHistory.value.push({ role: 'user', text: message.value });
  
  // Simulasi respon (Nanti bisa disambung ke API)
  setTimeout(() => {
    chatHistory.value.push({ 
      role: 'ai', 
      text: 'Maaf, Elgaa sedang mengajari saya cara berpikir. Segera hadir!' 
    });
  }, 1000);
  
  message.value = '';
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60]">
    <button 
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
    >
      <span v-if="!isOpen" class="text-2xl">🤖</span>
      <span v-else class="text-2xl">✕</span>
    </button>

    <div v-if="isOpen" class="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
      <div class="bg-indigo-600 p-4 text-white font-bold flex justify-between">
        <span>AI Assistant</span>
      </div>
      
      <div class="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
        <div v-for="(msg, i) in chatHistory" :key="i" 
          :class="['max-w-[80%] p-3 rounded-2xl text-sm', 
          msg.role === 'ai' ? 'bg-white dark:bg-slate-800 self-start border dark:border-slate-700' : 'bg-indigo-600 text-white self-end ml-auto']">
          {{ msg.text }}
        </div>
      </div>

      <div class="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
        <input 
          v-model="message"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Tanya sesuatu..."
          class="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
        />
        <button @click="sendMessage" class="text-indigo-600 font-bold">Send</button>
      </div>
    </div>
  </div>
</template>
