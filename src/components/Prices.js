import React, { Component } from "react";
import { connect } from "react-redux";
import { currencyFormatter } from "../helper/helper";
class Prices extends Component {
  render() {
    const { currency, amount } = this.props.price;
    return (
      <React.Fragment>
        {currency === `${this.props.state.currency}`
          ? currencyFormatter(currency, amount)
          : ""}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.cart,
  };
};
export default connect(mapStateToProps)(Prices);
