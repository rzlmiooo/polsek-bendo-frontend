import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, status } = req.body;

  try {
    const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}skck/status`, { id, status });
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
}
