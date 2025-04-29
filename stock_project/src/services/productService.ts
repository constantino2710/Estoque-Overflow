// services/productService.ts

import Parse from "@/api/parseClient";

type ProductInput = {
  name: string;
  quantity: number;
  stockLimit: number;
};

export async function createProduct({ name, quantity, stockLimit }: ProductInput) {
  console.log("Enviando para Parse:", { name, quantity, stockLimit }); // debug opcional
  return await Parse.Cloud.run("createProduct", { name, quantity, stockLimit });
}
