import React from "react";
import { render } from "react-dom";
import { Layout } from "antd";
import { Provider } from "mobx-react";
import "antd/dist/antd.css";
import "./styles.css";
import Store from "./models/Store.js";
import Page from './components/Page'
const { Header, Content } = Layout;
const store = new Store();
render(
  <Provider store={store}>
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div className="header">
            <img
              width="150px"
              src="https://www.sdvor.com/assets/frontend/old/images/icon/logo.61196ea8527e.svg"
            />
            <h2>Не сдавайтесь, стройтесь!</h2>
          </div>
        </Header>
        <Content>
          <div>
         <Page/>
          </div>
        </Content>
      </Layout>
    </div>
  </Provider>,
  document.getElementById("root")
);
