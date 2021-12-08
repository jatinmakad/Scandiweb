import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./pages/Header";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProductDescription from "./pages/ProductDescription";
import Route from "./helper/Routes";
import { fetchProduct } from "./slice/fetchSlice";

class App extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Route path="/product/id">
          <ProductDescription />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/">
          <Product />
        </Route>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetch: () => dispatch(fetchProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
