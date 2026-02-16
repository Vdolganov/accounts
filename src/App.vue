<!-- App.vue или AccountsView.vue -->
<script setup lang="ts">
import AccountFormRow from '@//components/AccountFormRow.vue';
import ButtonBlue from '@/components/ButtonBlue.vue';
import { useAccountsStore } from '@/stores/accounts';
import { PlusIcon } from '@radix-icons/vue';
import { accountsFormSchema } from '@/utils/validation';
import { useFieldArray, useForm, useIsFormTouched, useSetFormTouched } from 'vee-validate';
import type { TAccount } from '@/types/accounts';
import { onMounted, watch } from 'vue';
import { ACCOUNT_TYPES } from '@/constants/accounts';

const accountsStore = useAccountsStore();

const { values, validate, errors } = useForm({
  initialValues: { accounts: [] },
  validationSchema: accountsFormSchema,
});

const { fields, push, remove } = useFieldArray("accounts");
const isFormTouched = useIsFormTouched();
const setFormTouched = useSetFormTouched();

function deleteAccount(index: number) {
  const account: TAccount | undefined = values.accounts[index] as TAccount | undefined;
  if (account?.id) {
    accountsStore.removeAccount(account.id);
    remove(index);
  }
}

async function addAccount() {
  const validationResult = await validate();
  if (validationResult.valid) setFormTouched(false);
  push({
    id: crypto.randomUUID(),
    type: ACCOUNT_TYPES.Ldap,
    marks: '',
    login: '',
    password: null
  });
}

function initForm() {
  accountsStore.loadAccounts();
  accountsStore.accounts.forEach(account => push(account));
}

function isAccountValid(index: number) {
  const prefix = `accounts[${index}]`;

  return !Object.keys(errors.value).some(key =>
    key.startsWith(prefix)
  );
}

async function validateAndSet(val: TAccount[]) {
  if(!isFormTouched.value) return;
  const validationResult = await validate();
  const validAccounts = val.filter((el, index) => {
    return isAccountValid(index)
  })
  accountsStore.setAccounts(validAccounts);
  if (validationResult.valid) {
    setFormTouched(false);
  }

}

watch(
  () => values.accounts,
  validateAndSet,
  { deep: true }
);

watch(
  () => isFormTouched.value,
  (val) => {
    if(val) {
      validateAndSet(values.accounts);
    }
  }
)

onMounted(() => initForm());
</script>

<template>
  <div class="min-h-full flex flex-col">
    <header class="relative bg-white shadow-sm flex-none">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-row w-full gap-2 items-center">
        <h1 class="text-3xl font-bold tracking-tight text-blue-600">Учетные записи</h1>
        <ButtonBlue @click="addAccount">
          <PlusIcon />
        </ButtonBlue>
      </div>
    </header>

    <div class="flex-1 overflow-auto">
      <div class="mx-auto max-w-7xl relative max-h-[calc(100vh-100px)]">
        <div class="sticky top-1 z-10 bg-white">
          <div
            class="grid grid-cols-[1fr_1fr_1fr_1fr_50px] gap-[10px] px-4 py-2 border-b border-gray-300 font-semibold">
            <div>Метка</div>
            <div>Тип</div>
            <div>Логин</div>
            <div>Пароль</div>
            <div></div>
          </div>
        </div>
        <div class="flex flex-col gap-[10px] px-4 py-6">
          <AccountFormRow v-for="(field, index) in fields" :key="field.key" :index="index"
            @delete="deleteAccount(index)" />
        </div>
      </div>
    </div>
  </div>
</template>
