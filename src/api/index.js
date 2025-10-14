 // Central API export
 import * as equipmentApi from "./equipments.js";
 import * as dealerApi from "./dealers.js";
 import * as postApi from "./posts.js";
 import * as authApi from "./auth.js";

 export const api = {
     equipment: equipmentApi,
     dealer: dealerApi,
     post: postApi,
     auth: authApi
 };
