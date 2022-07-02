import { Routes, Route } from "react-router-dom";
import { Clientes } from "./components/Cliente/Clientes";
import { CreateCliente } from "./components/Cliente/CreateCliente";
import { UpdateCliente } from "./components/Cliente/UpdateCliente";
import { Filmes } from "./components/Filme/Filmes";
import { CreateFilme } from "./components/Filme/CreateFilme";
import { UpdateFilme } from "./components/Filme/UpdateFilme";
import { Locacoes } from "./components/Locacao/Locacoes";
import { CreateLocacao } from "./components/Locacao/CreateLocacao";
import { UpdateLocacao } from "./components/Locacao/UpdateLocacao";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Locacoes />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/create-cliente" element={<CreateCliente />} />
      <Route path="/update-cliente/:id" element={<UpdateCliente />} />
      <Route path="/filmes" element={<Filmes />} />
      <Route path="/create-filme" element={<CreateFilme />} />
      <Route path="/update-filme/:id" element={<UpdateFilme />} />
      <Route path="/locacoes" element={<Locacoes />} />
      <Route path="/create-locacao" element={<CreateLocacao />} />
      <Route path="/update-locacao/:id" element={<UpdateLocacao />} />
    </Routes>
  );
};
