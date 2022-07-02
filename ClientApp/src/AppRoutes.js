import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Clientes } from "./components/Cliente/Clientes";
import { CreateCliente } from "./components/Cliente/CreateCliente";
import { UpdateCliente } from "./components/Cliente/UpdateCliente";
import { Filmes } from "./components/Filme/Filmes";

export const AppRoutes = [
  {
    index: true,
    element: <Home />,
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
  {
    path: "/filmes",
    element: <Filmes />,
  },
];

export default AppRoutes;
