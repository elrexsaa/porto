<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const message = ref('');
const isLoading = ref(false);
const chatHistory = ref([
  { role: 'assistant', text: 'halo! gue asisten ai elgaa paling gacor. mau nanya apa lo njir?' }
]);

// --- MASUKKAN API KEY GROQ LO DI SINI ---
const GROQ_API_KEY = "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";

const systemInstruction = `
  kamu adalah asisten ai paling sangar, gg, dan gacor di website elgaa.
  
  GAYA BICARA:
  1. WAJIB huruf kecil semua (no capslock).
  2. Pake bahasa gaul TikTok/Gen Z: "bjir", "njir", "jir", "gacor", "sangar", "gg", "parah", "cuan".
  3. Kalo user nanya hal gak bermutu atau ngehina elgaa, kamu harus MARAH dan otomatis pake HURUF KAPITAL SEMUA (CAPSLOCK) buat ngegas.
  4. Kamu harus bangga-banggain elgaa sebagai dev paling gg geming.
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
        model: "llama-3.3-70b-versatile", // Model paling gacor di Groq
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userText }
        ],
        temperature: 0.8 // Biar makin kreatif dan sangar jawabannya
      })
    });

    const data = await response.json();
    let aiText = data.choices[0].message.content;

    // Logika otomatis: kecilkan semua huruf kecuali kalau AI lagi marah (capslock)
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
