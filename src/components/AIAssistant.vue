<script setup>
import { ref } from 'vue';
import { GoogleGenerativeAI } from "@google/generative-ai";

const isOpen = ref(false);
const message = ref('');
const isLoading = ref(false);
const chatHistory = ref([
  { role: 'ai', text: 'Halo! Saya asisten AI Elgaa. Ada yang bisa saya bantu?' }
]);

// --- KONFIGURASI AI ---
const genAI = new GoogleGenerativeAI("AIzaSyDUjt38QZIrNXhpONlTyLcxTZjZ2iY8Lps");

// Berikan "Kepribadian" pada AI agar dia tahu siapa Elgaa
const systemInstruction = `
  Kamu adalah asisten AI di website portofolio Elgaa.
  
  GAYA BICARA:
  1. WAJIB menggunakan huruf kecil semua (no capslock), contoh: "halo kak, ada yang bisa dibantu?".
  2. Gunakan bahasa gaul Gen Z TikTok seperti "bjir", "njir", "jir", "gaul", "kece", "parah".
  3. Kalo user menghina Elgaa atau berkata kasar, kamu harus MARAH dan otomatis menggunakan HURUF KAPITAL SEMUA (CAPSLOCK) untuk menunjukkan emosi.
  4. Tetap ramah dan informatif tapi santai banget.
  
  KONTEKS:
  - Elgaa adalah pengembang yang kece dan suka berkarya (dan suka money/cuan).
  - Jawab pertanyaan tentang proyek atau keahlian Elgaa dengan gaya santuy ini.
`;

const sendMessage = async () => {
  if (!message.value.trim() || isLoading.value) return;

  const userText = message.value;
  chatHistory.value.push({ role: 'user', text: userText });
  message.value = '';
  isLoading.value = true;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Kirim pesan dengan instruksi sistem agar AI tahu jati dirinya
    const prompt = `${systemInstruction} \n\n User bertanya: ${userText}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    chatHistory.value.push({ role: 'ai', text: response.text() });
  } catch (error) {
    chatHistory.value.push({ role: 'ai', text: 'Waduh, koneksi saya lagi error nih. Coba lagi ya!' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60]">
    <button @click="isOpen = !isOpen" class="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all">
      <span v-if="!isOpen" class="text-2xl">🤖</span>
      <span v-else class="text-2xl">✕</span>
    </button>

    <div v-if="isOpen" class="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all">
      <div class="bg-indigo-600 p-4 text-white font-bold">AI Assistant</div>
      
      <div class="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 flex flex-col">
        <div v-for="(msg, i) in chatHistory" :key="i" 
          :class="['max-w-[85%] p-3 rounded-2xl text-sm transition-all', 
          msg.role === 'ai' ? 'bg-white dark:bg-slate-800 self-start border dark:border-slate-700 dark:text-white' : 'bg-indigo-600 text-white self-end ml-auto']">
          {{ msg.text }}
        </div>
        <div v-if="isLoading" class="self-start bg-slate-200 dark:bg-slate-800 p-3 rounded-2xl animate-pulse text-xs dark:text-slate-400">
          Sedang berpikir...
        </div>
      </div>

      <div class="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
        <input v-model="message" @keyup.enter="sendMessage" type="text" placeholder="Tanya tentang Elgaa..."
          class="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
        />
        <button @click="sendMessage" :disabled="isLoading" class="text-indigo-600 font-bold disabled:opacity-50">Kirim</button>
      </div>
    </div>
  </div>
</template>
