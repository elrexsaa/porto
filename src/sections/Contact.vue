<template>
  <section 
    id="contact" 
    class="py-24 px-6 bg-indigo-600 dark:bg-indigo-900 text-white text-center transition-colors duration-300"
  >
    <div class="max-w-2xl mx-auto">
      <h3 class="text-3xl font-bold mb-6">Mari Berkolaborasi</h3>
      
      <p class="text-indigo-100 dark:text-indigo-200 mb-10 text-lg">
        Tertarik untuk memulai proyek baru atau sekadar menyapa? Silakan hubungi saya melalui platform di bawah ini.
      </p>

      <div class="flex flex-col items-center gap-8">
        <a 
          href="mailto:rexsaelga@gmail.com" 
          class="bg-white dark:bg-slate-100 text-indigo-600 dark:text-indigo-900 px-10 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          Email Me
        </a>

        <div class="flex items-center justify-center flex-wrap gap-4 md:gap-6 text-sm md:text-base font-medium">
          <a 
            href="https://instagram.com/elgarexsaa" 
            target="_blank"
            class="hover:text-indigo-200 dark:hover:text-white transition-colors"
          >
            Instagram
          </a>
          <span class="text-indigo-400 dark:text-indigo-700">/</span>
          
          <a 
            href="https://github.com/elrexsaa" 
            target="_blank"
            class="hover:text-indigo-200 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span class="text-indigo-400 dark:text-indigo-700">/</span>
          
          <a 
            href="https://wa.me/6287896507726" 
            target="_blank"
            class="hover:text-indigo-200 dark:hover:text-white transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-indigo-500/30 text-indigo-200 text-xs">
        &copy; {{ new Date().getFullYear() }} Elgaa. All rights reserved.
      </div>
    </div>
  </section>
</template>
