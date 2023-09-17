import { API_ADDRESS } from "@/constants/api-address.constant";
import axios from "axios";
import useSWR from "swr";

interface fetcherParam {
  page: number;
  per_page: number;
}

const fetcher = async (
  args: readonly [string, fetcherParam]
): Promise<any[]> => {
  const param = {
    re: "clipList",
    ln: args[1].page,
    cn: args[1].per_page,
    direction: "True",
  } as any;

  const queryString = new URLSearchParams(param).toString();

  const apiUrl = `${API_ADDRESS}?${queryString}`;

  const corsApiUrl = `/api/get-clip?endpoint=${encodeURIComponent(apiUrl)}`;

  const result = await axios.get(corsApiUrl);

  // convert result objects to array
  const keys = Object.keys(result.data);
  const values = Object.values(result.data);

  const resultArray = keys.map((key, index) => {
    return {
      id: key,
      ...(values[index] as any),
    };
  });

  // remove last element
  resultArray.pop();

  return resultArray;
};

// ln: page
// cn: per_page
export const useGetClips = (page: number, per_page: number) => {
  let option = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  };

  const param = {
    page: page,
    per_page: per_page,
  };

  const result = useSWR(["/clips", param], fetcher, option);

  return result;
};
