export type EmptyForm = {
  id: string,
  amount: string,
  account: string,
  payee: string,
  repeat: string,
  note: string,
  date: any,
} & {
  [key: string]: string;
}

export type FormsData = EmptyForm[]