<script lang="ts" setup>
import ValidationWrapper from '@/components/fields/ValidationWrapper.vue';
import SelectField from '@/components/fields/SelectField.vue';
import type { SelectOption } from '@/types/accounts';

interface IProps {
  fieldName: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
}

defineProps<IProps>();
</script>

<template>
  <ValidationWrapper :field-name="fieldName" :required="required">
    <template #default="{ isError, field }">
      <SelectField
        v-bind="field"
        :error="isError"
        :options="options"
        :placeholder="placeholder"
      />
    </template>
  </ValidationWrapper>
</template>
