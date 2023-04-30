import {
  Layout,
  Button,
  Space,
  Tooltip,
  Form,
  Input,
  Avatar,
  Card,
} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";

import "./App.css";
import PokemonList from "./components/PokemonList";
const { Meta } = Card;
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
