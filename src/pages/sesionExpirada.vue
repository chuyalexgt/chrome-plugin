<script setup lang="ts">
const timer = ref(3)
onMounted(() => {
  const interval = setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      clearInterval(interval)
      window.location.replace('https://meddi.app')
    }
  }, 1000)
})
</script>

<template>
  <section w-full h-full flex justify-center items-center flex-col>
    <div i-carbon-hourglass text-8xl class="w-52 bg-light-blue-500" />
    <div text-xl>
      La sesión ha expirado
    </div>
    <div text-lg text-gray-600>
      serás redirigido en <span text-green-500>{{ timer }}</span>
    </div>
  </section>
</template>
