import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import IcecreamBuilder from './Containers/IcecremBuilder/IcecreamBuilder';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>

          <IcecreamBuilder />
        </Layout>

      </div>
    )
  };
}

export default App;
