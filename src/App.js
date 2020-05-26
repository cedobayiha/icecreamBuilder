import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import IcecreamBuilder from './Containers/IcecremBuilder/IcecreamBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './Containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route exact path="/" component={IcecreamBuilder} />
          </Switch>

          {/* <IcecreamBuilder /> */}
        </Layout>
      </div>
    )
  };
}

export default App;
