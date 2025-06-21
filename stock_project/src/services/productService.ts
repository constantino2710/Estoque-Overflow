// productService.ts
import Parse from "@/api/parseClient";

export interface ProductInput {
  name: string;
  quantity: number;
  stockLimit: number;
  expirationDate?: string; // ISO string: "2025-06-20" ou similar
  image?: InstanceType<typeof Parse.File>;
}

export async function createProduct({
  name,
  quantity,
  stockLimit,
  expirationDate,
  image,
}: ProductInput) {
  const formattedDate = expirationDate ? new Date(expirationDate) : undefined;

  return await Parse.Cloud.run("createProduct", {
    name,
    quantity,
    stockLimit,
    expirationDate: formattedDate,
    image,
  });
}
