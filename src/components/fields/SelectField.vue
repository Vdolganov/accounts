<script setup lang="ts">
import { computed } from 'vue';
import { type SelectOption } from '@/types/accounts';

interface Props {
  value?: string | number;
  checked?: boolean;
  name: string;
  onBlur: (e: Event) => void;
  onInput: (e: Event | unknown) => void;
  onChange: (e: Event | unknown) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  error: false,
  disabled: false,
  required: false,
});


const selectClasses = computed(() => {
  const classes = ['pr-10'];

  if (props.disabled) {
    classes.push('bg-gray-100 cursor-not-allowed opacity-60');
  } else if (props.error) {
    classes.push(
      'border-red-500',
      'focus:ring-red-500',
      'focus:border-red-500',
      'bg-white'
    );
  } else {
    classes.push(
      'border-gray-300',
      'focus:ring-blue-500',
      'focus:border-blue-500',
      'hover:border-gray-400',
      'bg-white'
    );
  }

  return classes.join(' ');
});

const iconColorClasses = computed(() => {
  if (props.disabled) return 'text-gray-300';
  return props.error ? 'text-red-500' : 'text-gray-400';
});

const getOptionValue = (option: SelectOption): string | number => {
  return option.value;
};

const getOptionLabel = (option: SelectOption): string => {
  return option.label
};
</script>


<template>
  <div class="w-full">
    <div class="relative">
      <select :id="id" :value="value" :disabled="disabled" :required="required" :aria-invalid="!!error"
        class="w-full px-3 py-2 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 transition-colors duration-200"
        :class="selectClasses" v-bind="$attrs" @change="onChange" @blur="$emit('blur')">
        <option v-if="placeholder" value="" disabled
          :selected="value === '' || value === null || value === undefined">
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="getOptionValue(option)" :value="getOptionValue(option)"
          :disabled="option.disabled" class="py-1 px-2 hover:bg-blue-100 hover:text-blue-900">
          {{ getOptionLabel(option) }}
        </option>
      </select>

      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" :class="iconColorClasses">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</template>
