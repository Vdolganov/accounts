import type { TAccount, TApiAccount } from "@/types/accounts";

export function accountToApiFormat(account: TAccount): TApiAccount {
  const marksArray = (account.marks || '').split(';').map(acc => ({ text: acc.trim() }));
  return {
    ...account,
    marks: marksArray,
  }
}


export function accountFromApiFormat(account: TApiAccount): TAccount {
  const marksString = account.marks.reduce((acc, el, index) => {
    return `${acc}${el.text}${index === account.marks.length - 1 ? '' : ';'}`
  }, '')
  return {
    ...account,
    marks: marksString,
  }
}
