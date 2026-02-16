import { ACCOUNT_TYPES } from "@/constants/accounts";

export type TAccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];

// Базовый интерфейс с общими полями
interface IAccountBase {
  marks: string;
  login: string;
}

interface IAccountLocal extends IAccountBase {
  type: typeof ACCOUNT_TYPES.Local;
  password: string;
}

interface IAccountLdap extends IAccountBase {
  type: typeof ACCOUNT_TYPES.Ldap;
  password: null;
}


export type TAccountData = IAccountLocal | IAccountLdap;

export type TAccount = TAccountData & { id: string }

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type TApiAccount = Omit<TAccount, 'marks'> & { marks: { text: string }[] }
