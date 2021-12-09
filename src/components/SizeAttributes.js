import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AddAttributes } from "../slice/cartSlice";
class SizeAttributes extends Component {
  render() {
    const { value, displayValue } = this.props.item;
    const styles = {
      cursor: "pointer",
      background:
        this.props.type === "swatch"
          ? this.props.cart.attributes[0]?.att_value === displayValue &&
            this.props.cart.attributes[0]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[1]?.att_value === displayValue &&
              this.props.cart.attributes[1]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[2]?.att_value === displayValue &&
              this.props.cart.attributes[2]?.att_id === this.props.newId
            ? "black"
            : value
          : this.props.type === "text"
          ? this.props.cart.attributes[0]?.att_value === displayValue &&
            this.props.cart.attributes[0]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[1]?.att_value === displayValue &&
              this.props.cart.attributes[1]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[2]?.att_value === displayValue &&
              this.props.cart.attributes[2]?.att_id === this.props.newId
            ? "black"
            : "#fff"
          : "",
      color:
        this.props.type === "swatch"
          ? this.props.cart.attributes[0]?.att_value === displayValue &&
            this.props.cart.attributes[0]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[1]?.att_value === displayValue &&
              this.props.cart.attributes[1]?.att_id === this.props.newId
            ? "black"
            : this.props.cart.attributes[2]?.att_value === displayValue &&
              this.props.cart.attributes[2]?.att_id === this.props.newId
            ? "black"
            : value
          : this.props.type === "text"
          ? this.props.cart.attributes[0]?.att_value === displayValue &&
            this.props.cart.attributes[0]?.att_id === this.props.newId
            ? "#fff"
            : this.props.cart.attributes[1]?.att_value === displayValue &&
              this.props.cart.attributes[1]?.att_id === this.props.newId
            ? "#fff"
            : this.props.cart.attributes[2]?.att_value === displayValue &&
              this.props.cart.attributes[2]?.att_id === this.props.newId
            ? "#fff"
            : "black"
          : "",
    };
    return (
      <Wrapper
        style={styles}
        onClick={() =>
          this.props.attributes(
            this.props.productId,
            this.props.id,
            displayValue,
            this.props.type
          )
        }
        key={value}
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
