import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TAccount, TApiAccount } from '@/types/accounts'
import { LOCAL_STORAGE_KEY } from '@/constants/accounts';
import { LocalStorageService } from '@/services/localStorage';
import { accountFromApiFormat, accountToApiFormat } from '@/utils/accountsFormatter';

const accountsStorage = new LocalStorageService(LOCAL_STORAGE_KEY, 'Списка аккаунтов');

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<TAccount[]>([]);


  function setAccounts(newAccounts: TAccount[]) {
    const map = new Map(accounts.value.map(acc => [acc.id, acc]));

    // обновляем существующие и добавляем новые
    newAccounts.forEach(acc => {
      map.set(acc.id, acc);
    });

    accounts.value = Array.from(map.values());

    accountsStorage.save<TApiAccount>(
      accounts.value.map(el => accountToApiFormat(el))
    );
  }

  function loadAccounts() {
    const apiAccounts = accountsStorage.load<TApiAccount>();
    accounts.value = apiAccounts.map((el) => accountFromApiFormat(el))
  }

  function removeAccount(accountId: string) {
    const updated = accountsStorage.removeById<TApiAccount>(accountId);
    if(!updated) {
      return;
    }
    const prepared = updated.map((el) => accountFromApiFormat(el));
    accounts.value = prepared;

  }

  return { accounts, setAccounts, loadAccounts, removeAccount }
})
