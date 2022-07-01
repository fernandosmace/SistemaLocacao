import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Clientes } from "./components/Cliente/Clientes";
import { CreateCliente } from "./components/Cliente/CreateCliente";
import { UpdateCliente } from "./components/Cliente/UpdateCliente";

export const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/create-cliente",
    element: <CreateCliente />,
  },
  {
    path: "/update-cliente/:id",
    element: <UpdateCliente />,
  },
];

export default AppRoutes;
