import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AddAttributes } from "../slice/cartSlice";

class SizeAttributes extends Component {
  render() {
    const { value, displayValue } = this.props.item;
    return (
      <Wrapper
        style={{
          background: this.props.type === "swatch" ? value : "",
          color:
            this.props.type === "swatch"
              ? value
              : "black" &&
                this.props.cart.attributes[0]?.att_value === displayValue &&
                this.props.cart.attributes[0]?.att_id === this.props.newId
              ? "red"
              : this.props.cart.attributes[1]?.att_value === displayValue &&
                this.props.cart.attributes[1]?.att_id === this.props.newId
              ? "red"
              : this.props.cart.attributes[2]?.att_value === displayValue &&
                this.props.cart.attributes[2]?.att_id === this.props.newId
              ? "red"
              : "black",
        }}
        onClick={() =>
          this.props.attributes(
            this.props.productId,
            this.props.id,
            displayValue,
            this.props.type
          )
        }
      >
        {value}
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  border: 2px solid black;
  padding: 8px;
  margin-right: 8px;
  font-size: 18px;
`;
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    attributes: (first, second, third, fourth) =>
      dispatch(AddAttributes(first, second, third, fourth)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SizeAttributes);
