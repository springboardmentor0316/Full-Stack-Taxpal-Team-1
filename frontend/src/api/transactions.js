import api from "./axios";

// Fetch transactions by userId
export const getTransactions = async (userId) => {
  const res = await api.get(`/transactions/${userId}`);
  return res.data;
};

// Add new transaction
export const addTransaction = async (data) => {
  const res = await api.post("/transactions", data);
  return res.data;
};
