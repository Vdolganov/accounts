<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface Props {
    value?: string | number;
    checked?: boolean;
    name: string;
    onBlur: (e: Event) => void;
    onInput: (e: Event | unknown) => void;
    onChange: (e: Event | unknown) => void;
    type?: string;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    error: false,
    disabled: false,
  });

  const showPassword = ref(false);
  const isPasswordType = computed(() => props.type === 'password');

  const inputType = computed(() => {
    if (isPasswordType.value && showPassword.value) {
      return 'text';
    }
    return props.type;
  });

  const inputClasses = computed(() => {
    const classes = [];

    // Базовые классы
    classes.push(
      props.disabled
        ? 'bg-gray-100 cursor-not-allowed opacity-60'
        : 'bg-white'
    );

    // Классы для состояния ошибки
    if (props.error) {
      classes.push(
        'border-red-500',
        'focus:ring-red-500',
        'focus:border-red-500'
      );
    } else {
      classes.push(
        'border-gray-300',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'hover:border-gray-400'
      );
    }

    // Добавляем отступ справа для текста show/hide
    if (isPasswordType.value) {
      classes.push('pr-16');
    }

    return classes.join(' ');
  });

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <input
        :type="inputType"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200"
        :class="inputClasses"
        v-bind="$attrs"
        @input="onInput"
        @blur="onBlur"
        @change="onChange"
      />

      <button
        v-if="isPasswordType && value"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium focus:outline-none"
        :class="[
          error ? 'text-red-600 hover:text-red-800' : 'text-blue-600 hover:text-blue-800',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]"
        @click="togglePassword"
        :disabled="disabled"
      >
        {{ showPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>
</template>
