import Parse from "@/api/parseClient";

type ProductInput = {
  name: string;
  quantity: number;
};

export async function createProduct({ name, quantity }: ProductInput) {
  return await Parse.Cloud.run("createProduct", { name, quantity });
}
