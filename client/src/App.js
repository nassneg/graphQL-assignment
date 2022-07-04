import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import "antd/dist/antd.css";
import Home from "./components/pages/Home";
import More from "./components/pages/MoreInfoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:id" element={<More />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
