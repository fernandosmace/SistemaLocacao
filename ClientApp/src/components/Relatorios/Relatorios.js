import { Typography, Tabs } from "antd";
import ClientesEmAtraso from "./ClientesEmAtraso";
import FilmesNuncaAlugados from "./FilmesNuncaAlugados";
import FilmesMaisAlugadosAno from "./FilmesMaisAlugadosAno";
import FilmesMenosAlugadosSemana from "./FilmesMenosAlugadosSemana";
import SegundoMaiorCliente from "./SegundoMaiorCliente";
const { Title } = Typography;
const { TabPane } = Tabs;

const Relatorios = () => {
  return (
    <div>
      <Typography>
        <Title>Relatórios</Title>
      </Typography>
      <br />
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        size="large"
        style={{
          height: 500,
        }}
      >
        <TabPane tab={"Clientes em atraso"} key={1}>
          <ClientesEmAtraso />
        </TabPane>
        <TabPane tab={"Filmes nunca alugados"} key={2}>
          <FilmesNuncaAlugados />
        </TabPane>
        <TabPane tab={"Cinco filmes mais alugados no último ano"} key={3}>
          <FilmesMaisAlugadosAno />
        </TabPane>
        <TabPane tab={"Três filmes menos alugados da última semana"} key={4}>
          <FilmesMenosAlugadosSemana />
        </TabPane>
        <TabPane tab={"Segundo maior cliente"} key={5}>
          <SegundoMaiorCliente />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Relatorios;
