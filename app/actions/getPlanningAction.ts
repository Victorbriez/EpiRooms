"use server";

import { ActivityProps } from "@/types/ActivityInterface";

export async function getPlanningAction(
  date: string
): Promise<ActivityProps[]> {
  const url = `https://lille-epirooms.epitest.eu/?date=${date}`;

  try {
    const response = await fetch(url, {
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
    console.error("Error fetching planning:", error);
    throw new Error("Failed to fetch planning");
  }
}
