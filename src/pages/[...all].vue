<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center">
    <div i-carbon-sailboat-offshore text-8xl class="w-52 dark:bg-light-blue-700 bg-light-blue-500" />
    <p text="~ 2xl" font-extrabold>
      Esta ruta no existe
    </p>
    <button primary_btn @click="router.push('/')">
      <p i-carbon-home text="~ 2xl" class="font-extrabold m-0" />
      <p text="~ xl" m-0>
        Menu Principal
      </p>
    </button>
  </div>
</template>
