import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./pages/Header";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProductDescription from "./pages/ProductDescription";
import Route from "./helper/Routes";
import { fetchProduct, toggleDropdownClose } from "./slice/fetchSlice";
import { toggleCartClose } from "./slice/cartSlice";

class App extends Component {
  componentDidMount() {
    this.props.fetch();
    if (performance.navigation.type === 1) {
      this.props.dropdownClose();
      this.props.cartClose();
    }
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
    dropdownClose: () => dispatch(toggleDropdownClose()),
    cartClose: () => dispatch(toggleCartClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
