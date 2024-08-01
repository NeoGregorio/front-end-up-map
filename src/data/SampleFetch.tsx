"use server";

export const getStores = async () => {
  const response = await fetch(`http://127.0.0.1:8000/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data) {
    return data;
  }
};
