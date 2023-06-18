/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Register from "views/pages/Register.js";
import Login from "views/pages/Login.js";
import Logout from "views/pages/Logout.js";
import CreateProduct from "views/pages/CreateProduct.js";
import CreateProductType from "views/pages/CreateProductType.js";
import Sales from "views/pages/Sales";

var routes = [
  {
    path: "/",
    name: "Create Product",
    icon: "ni ni-box-2 text-green",
    component: <CreateProduct />,
    layout: "/admin",
  },
  {
    path: "/producttype/create",
    name: "Create Product Type",
    icon: "ni ni-box-2 text-info",
    component: <CreateProductType />,
    layout: "/admin",
  },
  {
    path: "/sales",
    name: "Sale",
    icon: "ni ni-bag-17 text-success",
    component: <Sales />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-curved-next text-red",
    component: <Logout />,
    layout: "/admin",
  },

];
export default routes;
