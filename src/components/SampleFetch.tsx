"use server";

export const getStore = async ({ id }: { id: number }) => {
  const response = await fetch(`http://127.0.0.1:8000/get-store/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data) {
    console.log(data);
    return data;
  }
};
