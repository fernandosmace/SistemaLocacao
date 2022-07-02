import { Home } from "./components/Home";
import { Clientes } from "./components/Cliente/Clientes";
import { CreateCliente } from "./components/Cliente/CreateCliente";
import { UpdateCliente } from "./components/Cliente/UpdateCliente";
import { Filmes } from "./components/Filme/Filmes";
import { CreateFilme } from "./components/Filme/CreateFilme";
import { UpdateFilme } from "./components/Filme/UpdateFilme";
import { Locacoes } from "./components/Locacao/Locacoes";
import { CreateLocacao } from "./components/Locacao/CreateLocacao";
import { UpdateLocacao } from "./components/Locacao/UpdateLocacao";

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
  {
    path: "/create-filme",
    element: <CreateFilme />,
  },
  {
    path: "/update-filme/:id",
    element: <UpdateFilme />,
  },
  {
    path: "/locacoes",
    element: <Locacoes />,
  },
  {
    path: "/create-locacao",
    element: <CreateLocacao />,
  },
  {
    path: "/update-locacao/:id",
    element: <UpdateLocacao />,
  },
];

export default AppRoutes;
