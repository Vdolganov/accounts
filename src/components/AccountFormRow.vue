<script lang="ts" setup>
import SelectFieldWrapped from '@/components/fields/wrappedFields/SelectFieldWrapped.vue';
import TextFieldWrapped from '@/components/fields/wrappedFields/TextFieldWrapped.vue';
import { ACCOUNT_TYPES } from '@/constants/accounts';
import ButtonBlue from './ButtonBlue.vue';
import { TrashIcon } from '@radix-icons/vue';
import { computed } from 'vue';
import { useFieldValue } from 'vee-validate'

interface IProps {
  index: number;
}

interface IEmits {
  (e: 'delete'): void;
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>();

const type = useFieldValue(`accounts[${props.index}].type`)

const options = [
  {
    value: ACCOUNT_TYPES.Ldap,
    label: 'LDAP',
  },
  {
    value: ACCOUNT_TYPES.Local,
    label: 'Локальная',
  },
]

const gridClass = computed(() => type.value === ACCOUNT_TYPES.Local ? 'grid-cols-[1fr_1fr_1fr_1fr_50px]' : 'grid-cols-[1fr_1fr_2fr_50px]')

</script>

<template>
  <div class="grid gap-[10px] w-full items-start w-full p-4 border border-gray-200 rounded-lg" :class="gridClass">
    <TextFieldWrapped :field-name="`accounts[${index}].marks`" placeholder="Метка" required
      class="w-full" />

    <SelectFieldWrapped :field-name="`accounts[${index}].type`" :options="options" placeholder="Тип"
      label="Тип" class="w-full" required />

    <TextFieldWrapped :field-name="`accounts[${index}].login`" placeholder="Логин"
      class="w-full" required />

    <TextFieldWrapped v-if="type === ACCOUNT_TYPES.Local"
      type="password" :field-name="`accounts[${index}].password`" placeholder="Пароль" class="w-full" required />

    <!-- Кнопка удаления -->
    <div class="flex items-end lg:items-start justify-end lg:justify-start">
      <ButtonBlue @click="emit('delete')">
        <TrashIcon class="w-4 h-4" />
      </ButtonBlue>
    </div>
  </div>
</template>
