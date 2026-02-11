<script setup>
import { ref } from 'vue';
import { GoogleGenerativeAI } from "@google/generative-ai";

const isOpen = ref(false);
const message = ref('');
const isLoading = ref(false);
const chatHistory = ref([
  // Ganti teks sambutan jadi huruf kecil biar sinkron
  { role: 'ai', text: 'halo bjir! gue asisten ai-nya elgaa. nanya apa lo?' }
]);

// --- KONFIGURASI AI ---
const genAI = new GoogleGenerativeAI("AIzaSyDUjt38QZIrNXhpONlTyLcxTZjZ2iY8Lps");

const systemInstruction = `
  kamu adalah asisten ai di website portofolio elgaa.
  
  peraturan wajib:
  1. gunakan huruf kecil semua (no capslock) untuk semua jawaban, contoh: "elgaa itu kece parah jir".
  2. gunakan bahasa gaul gen z tiktok: "bjir", "njir", "jir", "gaul", "kece", "parah", "cuan".
  3. kalo user menghina elgaa atau kasar, kamu wajib MARAH dan pake HURUF KAPITAL SEMUA (CAPSLOCK).
  4. elgaa itu pengembang yang suka berkarya dan suka money/cuan.
  5. jawab pertanyaan tentang elgaa dengan gaya santuy.
`;

const sendMessage = async () => {
  if (!message.value.trim() || isLoading.value) return;

  const userText = message.value;
  chatHistory.value.push({ role: 'user', text: userText });
  message.value = '';
  isLoading.value = true;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Tambahkan instruksi supaya AI konsisten lowercase
    const prompt = `${systemInstruction} \n\n user: ${userText}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text();

    // Cek apakah AI lagi marah (pake capslock), kalo enggak marah, paksa ke lowercase
    if (!aiText.match(/[A-Z]{4,}/)) {
      aiText = aiText.toLowerCase();
    }
    
    chatHistory.value.push({ role: 'ai', text: aiText });
  } catch (error) {
    console.error(error);
    chatHistory.value.push({ role: 'ai', text: 'bjir, koneksi gue lagi bermasalah njir. coba lagi dah!' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60]">
    <button @click="isOpen = !isOpen" class="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95">
      <span v-if="!isOpen" class="text-2xl">🤖</span>
      <span v-else class="text-2xl">✕</span>
    </button>

    <div v-if="isOpen" class="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
      <div class="bg-indigo-600 p-4 text-white font-bold flex items-center gap-2">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        AI Assistant Elgaa
      </div>
      
      <div class="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 flex flex-col">
        <div v-for="(msg, i) in chatHistory" :key="i" 
          :class="['max-w-[85%] p-3 rounded-2xl text-sm transition-all', 
          msg.role === 'ai' ? 'bg-white dark:bg-slate-800 self-start border dark:border-slate-700 dark:text-white' : 'bg-indigo-600 text-white self-end ml-auto']">
          {{ msg.text }}
        </div>
        <div v-if="isLoading" class="self-start bg-slate-200 dark:bg-slate-800 p-3 rounded-2xl animate-pulse text-xs dark:text-slate-400">
          ntar mikir...
        </div>
      </div>

      <div class="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
        <input v-model="message" @keyup.enter="sendMessage" type="text" placeholder="tanya elgaa njir..."
          class="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
        />
        <button @click="sendMessage" :disabled="isLoading" class="text-indigo-600 font-bold disabled:opacity-50 px-2">kirim</button>
      </div>
    </div>
  </div>
</template>
