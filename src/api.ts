const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* -------- LIVE -------- */
export const getLiveData = async () => {
  const res = await fetch(`${BASE_URL}/live`);
  if (!res.ok) throw new Error("Failed to fetch live data");
  return res.json();
};

/* -------- SUMMARY -------- */
export const getSummaryData = async () => {
  const res = await fetch(`${BASE_URL}/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary data");
  return res.json();
};

/* -------- HISTORY -------- */
export const getHistoryData = async () => {
  const res = await fetch(`${BASE_URL}/history`);
  if (!res.ok) throw new Error("Failed to fetch history data");
  return res.json();
};