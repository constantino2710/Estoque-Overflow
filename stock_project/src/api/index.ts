import Parse from 'parse/dist/parse.min.js';

// Inicialização direta
const appId = '9yO8szbeCy8P0ZiBPWh5zwMwEucXO2oVRmPGYIRf';
const jsKey = 'fEuqZaA9Zbjl1j9lgSmrLslMyRIV29d4mPpujinE';
const serverURL = 'https://parseapi.back4app.com/';

Parse.initialize(appId, jsKey);
Parse.serverURL = serverURL;

console.log("Parse configurado com:", { appId, jsKey, serverURL });

export default Parse;

type ProductInput = {
  name: string;
  quantity: number;
};

// Criação de produto com uso da master key
export async function createProduct({ name, quantity }: ProductInput) {
  try {
    const Product = new Parse.Object('Products');
    console.log('Saving product:', { name, quantity });
    Product.set('name', name);
    Product.set('quantity', quantity);

    const acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);
    Product.setACL(acl);

    const savedProduct = await Product.save(null, { useMasterKey: true }); // <- Aqui está a master key sendo usada
    console.log("Produto salvo:", savedProduct);
    return savedProduct;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
}
