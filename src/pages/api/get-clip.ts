// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import * as https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { endpoint } = req.query;
  console.log(endpoint);

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  // AxiosError: unable to verify the first certificate
  const response = await axios
    .get(endpoint as string, {
      httpsAgent,
    })
    .catch((err) => {
      console.log(err);
      return err;
    });

  res.status(200).json(response.data);
}
