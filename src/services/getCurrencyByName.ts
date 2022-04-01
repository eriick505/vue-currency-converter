import { api, type ResponseData } from ".";
import type { ICurrencyResponseData } from "@/types/currency";

export const getCurrencyByName = (
  name?: string
): Promise<ResponseData<ICurrencyResponseData>> => api.get("/USD");
