// services/stockService.ts
import Parse from "@/api/parseClient";

export async function getLastStockUpdates() {
  return await Parse.Cloud.run("getLastStockUpdates");
}
