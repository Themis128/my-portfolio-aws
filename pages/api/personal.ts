import { getPersonalDataServer } from "@/lib/personal-data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const personalData = await getPersonalDataServer();
    res.status(200).json(personalData);
  } catch (error) {
    console.error("Error fetching personal data:", error);
    res.status(500).json({ error: "Failed to fetch personal data" });
  }
}
