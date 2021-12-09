import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Right_icon from "../Images/chevron-right.svg";
import Left from "../Images/left.svg";
import { toggleImageFunc } from "../slice/cartSlice";
class CartImage extends Component {
  render() {
    return (
      <CartImag>
        <CartImageLeft
          src={Left}
          alt=""
          onClick={() => this.props.toogleImage(this.props.value, "decrease")}
        />
        {this.props.data[`${this.props.count}`] ? (
          <CartImageInner src={this.props.data[`${this.props.count}`]} alt="" />
        ) : (
          <CartImageInner src={this.props.data[0]} alt="" />
        )}

        <CartImageRight
          src={Right_icon}
          alt=""
          onClick={() => this.props.toogleImage(this.props.value, "increase")}
        />
      </CartImag>
    );
  }
}
const CartImag = styled.div`
  position: relative;
`;
const CartImageLeft = styled.img`
  position: absolute;
  top: 43%;
  left: 0;
`;
const CartImageRight = styled.img`
  position: absolute;
  top: 43%;
  left: 80%;
`;
const CartImageInner = styled.img`
  width: 140px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 15px;
`;
const mapDispatchToProps = (dispatch) => {
  return {
    toogleImage: (index, value) => dispatch(toggleImageFunc(index, value)),
  };
};
export default connect(null, mapDispatchToProps)(CartImage);
