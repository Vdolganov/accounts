<script lang="ts" setup>
import { Field } from 'vee-validate';
import FieldErrorWrapper from '@/components/fields/FieldErrorWrapper.vue';

interface IProps {
  fieldName: string;
  required?: boolean;
  label?: string;
}

defineProps<IProps>();

function getErrorString(errors: string[]) {
  return (errors || []).join(';');
}
</script>

<template>
  <Field :name="fieldName" v-slot="{ errors: fieldErrors, field }">
    <FieldErrorWrapper :error="getErrorString(fieldErrors)" :required="required" :label="label">
      <slot :is-error="!!fieldErrors.length" :field="field"/>
    </FieldErrorWrapper>
  </Field>
</template>
