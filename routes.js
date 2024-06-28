import {register,login,getCategorie,getProducts,CategoriesProductsName,getProductById,MOodifierStock,GetDiscount} from "./controller.js"


const routes = (app) => {
  app.route('/api/signup').post(register);
  app.route('/api/signin').post(login);
  app.route('/categories').get(getCategorie);
  app.route('/products').get(getProducts);
  app.route('/categoriesProductsName').get(CategoriesProductsName);
  app.route("/product/:id").get(getProductById);
  app.route("/ModifierStock").post(MOodifierStock);
  app.route("/GetDiscount").get(GetDiscount);
  // app.route("/InsertDiscount").post(InsertDiscount);
  // app.route("/logout").post(logout);

}

export default routes

