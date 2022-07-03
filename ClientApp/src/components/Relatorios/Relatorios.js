import { Typography, Tabs } from "antd";
import ClientesEmAtraso from "./ClientesEmAtraso";
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
        style={{
          height: 500,
        }}
      >
        <TabPane tab={"Clientes em Atraso"} key={1}>
          <ClientesEmAtraso />
        </TabPane>
        <TabPane tab={"Filmes nunca alugados"} key={2}>
          Filmes nunca alugados
        </TabPane>
        <TabPane tab={"Cinco mais alugados no último ano"} key={3}>
          Cinco mais alugados no último ano
        </TabPane>
        <TabPane tab={"Três menos alugados da última semana"} key={4}>
          Três menos alugados da última semana
        </TabPane>
        <TabPane tab={"Segundo maior cliente"} key={5}>
          Segundo maior cliente
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Relatorios;
