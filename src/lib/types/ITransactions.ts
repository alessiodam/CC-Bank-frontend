export default interface ITransaction {
  from_user: string;
  to_user: string;
  amount: string;
  id: number;
  note: string;
  date: string;
  tax: string;
}
