<!-- components/FieldWrapper.vue -->
<script setup lang="ts">
interface Props {
  error?: string;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="w-full relative">
    <slot :error="!!props.error" />
    <span
      v-if="props.required"
      class="absolute top-0 right-2 text-red-500 font-bold"
      title="Обязательное поле"
    >*</span>

    <p v-if="props.error" class="mt-1 text-sm text-red-600">
      {{ props.error }}
    </p>
  </div>
</template>
