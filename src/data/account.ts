const mock = [
  { account_id: 1, document_number: "12345678900" },
  { account_id: 2, document_number: "98765432100" },
];

export const getAccountById = (accountId: number) => {
  return mock.find((acc) => acc.account_id === accountId);
};
