"use server";

export const getStores = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8080/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return { error: "Database connection not found or other error occurred" };
  }
};
