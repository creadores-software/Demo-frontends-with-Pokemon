import { Layout } from "antd";
import {} from "@ant-design/icons";

import "./App.css";
import PokemonList from "./components/PokemonList";
const { Content } = Layout;

function App() {
  return (
    <Content style={{ padding: "0 50px" }}>
      <div>
        <PokemonList />
      </div>
    </Content>
  );
}

export default App;
