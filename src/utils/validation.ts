import * as yup from 'yup';
import { ACCOUNT_TYPES } from '@/constants/accounts';

export const accountSchema = yup.object({
  id: yup.string().required(),
  type: yup
    .string()
    .oneOf([ACCOUNT_TYPES.Local, ACCOUNT_TYPES.Ldap])
    .required('Тип обязателен'),
  marks: yup.string().required('Метка обязательна'),
  login: yup.string().required('Логин обязателен'),
  password: yup.string().when('type', (typeVal, schema) => {
    const type = (typeVal[0] || '') as unknown as string;
    if (type === ACCOUNT_TYPES.Local) {
      return schema.required('Пароль обязателен');
    }
    return schema.notRequired().nullable();
  }),
});

export const accountsFormSchema = yup.object({
  accounts: yup.array().of(accountSchema),
});
