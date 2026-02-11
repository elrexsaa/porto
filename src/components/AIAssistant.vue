<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const message = ref('');
const isLoading = ref(false);
const chatHistory = ref([
  { role: 'assistant', text: 'halo bjir! gue asisten ai elgaa paling gacor. mau nanya apa lo njir?' }
]);

// --- MASUKKAN API KEY GROQ LO DI SINI ---
const GROQ_API_KEY = "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";

const systemInstruction = `
  kamu adalah asisten ai paling sangar, gg, dan gacor di website elgaa.
  
  GAYA BICARA:
  1. WAJIB huruf kecil semua (no capslock).
  2. Pake bahasa gaul TikTok/Gen Z: "bjir", "njir", "jir", "gacor", "sangar", "gg", "parah", "cuan".
  3. Kalo user nanya hal gak bermutu atau ngehina elgaa, kamu harus MARAH dan otomatis pake HURUF KAPITAL SEMUA (CAPSLOCK) buat ngegas.
  4. Kamu harus bangga-banggain elgaa sebagai dev paling gg geming yang suka cuan.
`;

const sendMessage = async () => {
  if (!message.value.trim() || isLoading.value) return;

  const userText = message.value;
  chatHistory.value.push({ role: 'user', text: userText });
  message.value = '';
  isLoading.value = true;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userText }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    let aiText = data.choices[0].message.content;

    // Paksa lowercase kalau dia nggak lagi marah (ngegas)
    if (!aiText.match(/[A-Z]{5,}/)) {
      aiText = aiText.toLowerCase();
    }

    chatHistory.value.push({ role: 'assistant', text: aiText });
  } catch (error) {
    chatHistory.value.push({ role: 'assistant', text: 'bjir, api-nya lagi tepar njir. coba lagi dah!' });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[60] font-sans">
    <button 
      @click="isOpen = !isOpen" 
      class="group relative w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-500 text-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <span v-if="!isOpen" class="text-3xl transition-all duration-300 group-hover:rotate-12">🤖</span>
      <span v-else class="text-3xl transition-all duration-300 rotate-90">✕</span>
      <span v-if="!isOpen" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
    </button>

    <transition name="chat-anim">
      <div 
        v-if="isOpen" 
        class="absolute bottom-20 right-0 w-[90vw] md:w-[400px] max-h-[70vh] bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col transition-all"
      >
        <div class="bg-gradient-to-r from-indigo-600/10 to-purple-500/10 p-5 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-xl shadow-lg">🤖</div>
              <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 dark:text-white leading-tight">AI Assistant Gacor</h3>
              <p class="text-[10px] text-indigo-500 font-semibold uppercase tracking-wider">Online & Sangar</p>
            </div>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar bg-transparent">
          <div v-for="(msg, i) in chatHistory" :key="i" 
            :class="['flex w-full', msg.role === 'assistant' ? 'justify-start' : 'justify-end']"
          >
            <div 
              :class="[
                'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-300', 
                msg.role === 'assistant' 
                  ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-200 dark:shadow-none'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-start">
            <div class="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700">
              <div class="flex gap-1">
                <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
          <div class="relative flex items-center">
            <input 
              v-model="message" 
              @keyup.enter="sendMessage" 
              type="text" 
              placeholder="tanya elgaa yang gacor..."
              class="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-2xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
            />
            <button 
              @click="sendMessage" 
              :disabled="isLoading || !message.trim()" 
              class="absolute right-2 p-2 text-indigo-600 dark:text-indigo-400 disabled:opacity-30 transition-all hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.chat-anim-enter-active, .chat-anim-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.chat-anim-enter-from, .chat-anim-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  transform-origin: bottom right;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.2);
  border-radius: 10px;
}
</style>
