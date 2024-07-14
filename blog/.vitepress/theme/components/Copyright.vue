<template>
    <div class="bg-slate-900 text-sm text-slate-100 py-4 px-10 sm:px-20">
        <div class="flex flex-col sm:flex-row mx-auto flex-wrap justify-around text-slate-400">
            <div class="inline-flex flex-col leading-8">
                <span class="font-bold text-l mb-2 text-slate-100">Blog</span>
                <a class="hover:text-slate-300" :href="withBase('/pages/category.html')">Categrories</a>
                <a class="hover:text-slate-300" :href="withBase('/pages/archives.html')">Archives</a>
                <a class="hover:text-slate-300" :href="withBase('/pages/tags.html')">Tags</a>
            </div>
            <div class="inline-flex flex-col leading-8">
                <span class="font-bold text-l mb-2 text-slate-100">Interesting products</span>
                <a class="hover:text-slate-300" target="_blank" href="https://hangboss.github.io/mouseless/index.html">Mouseless</a>
            </div>
        </div>

        <div class="border-t border-gray-700 mt-4"></div>
        <div class="w-full text-center mt-4">Copyright © 2024 Saul Stone</div>
    </div>
</template>
<script lang="ts" setup>
import { withBase } from 'vitepress'
</script>

<style></style>
