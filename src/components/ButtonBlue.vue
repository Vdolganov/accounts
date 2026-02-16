<script lang="ts" setup>
interface IEmits {
  (e: 'click'): void;
}

const emit = defineEmits<IEmits>()
</script>
<template>
  <button type="button"
    class="
      p-3
      border-1
      border-dashed
      border-blue-300
      rounded-md
      text-blue-600
      bg-blue-50/50
      hover:bg-blue-100
      hover:border-blue-500
      hover:text-blue-700
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:ring-offset-2
      transition-all
      duration-200
    "
    @click="emit('click')"
  >
    <slot/>
  </button>
</template>
