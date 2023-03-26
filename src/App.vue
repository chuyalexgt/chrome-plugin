<script setup>
const changeStyles = () => {
  const element = document.getElementById($selectedElement.id)
  element.style.backgroundColor = 'red'
  element.style.color = 'white'
}
</script>

<template>
  <div>
    <button @click="changeStyles">
      Cambiar estilos
    </button>
    <p :id="$selectedElement.id" :class="$selectedElement.classes">
      Elemento seleccionado
    </p>
  </div>
</template>
