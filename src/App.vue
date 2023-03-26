<template>
  <main font-sans text="center gray-700 dark:gray-200 relative">
    <Header />
    <section sm:p="x-4 y-2" class="flex min-h-[calc(100vh-130px)]">
      <div flex-1 flex flex-col justify-center items-center>
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </transition>
        </router-view>
      </div>
    </section>
  </main>
</template>

<style>
*::-webkit-scrollbar {
  width: 0.5rem;
}
*::-webkit-scrollbar-track {
  background-color: #84c6cf00;
  -webkit-box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.62);
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.62);
}
*::-webkit-scrollbar-thumb {
  border-radius: 7px;
  width: 0.6rem;
  background-color: #0071bc;
}

@keyframes gradient-rotate{
0% {
    background-position: 0% 50%;
}
50% {
    background-position: 100% 50%;
}
100% {
    background-position: 0% 50%;
}
}

.slide-enter-active, .slide-leave-active{
  transition: opacity 0.6s, transform 0.8s;
}

.slide-enter-from, .slide-leave-to{
  opacity: 0;
  transform: translateY(-50%)
}

.fade-enter-active, .fade-leave-active{
  transition: opacity 0.6s;
}

.fade-enter-from, .fade-leave-to{
  opacity: 0;
}
</style>
