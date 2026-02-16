<script lang="ts" setup>
import ValidationWrapper from '@/components/fields/ValidationWrapper.vue';
import TextField from '@/components/fields/TextField.vue';

interface IProps {
  fieldName: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

defineProps<IProps>();
</script>

<template>
  <ValidationWrapper :field-name="fieldName" :required="required">
    <template #default="{ isError, field }">
      <TextField
        v-bind="field"
        :error="isError"
        :type="type"
        :placeholder="placeholder"
      />
    </template>
  </ValidationWrapper>
</template>
