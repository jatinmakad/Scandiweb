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
        <img
          src={Left}
          alt=""
          style={{
            position: "absolute",
            top: "43%",
            left: "0",
          }}
          onClick={() => this.props.toogleImage(this.props.value, "decrease")}
        />
        {this.props.data[`${this.props.count}`] ? (
          <img
            src={this.props.data[`${this.props.count}`]}
            alt=""
            style={{
              width: "140px",
              height: "200px",
              objectFit: "contain",
              marginBottom: "15px",
            }}
          />
        ) : (
          <img
            src={this.props.data[0]}
            alt=""
            style={{
              width: "140px",
              height: "200px",
              objectFit: "contain",
              marginBottom: "15px",
            }}
          />
        )}

        <img
          src={Right_icon}
          alt=""
          style={{
            position: "absolute",
            top: "43%",
            left: "80%",
          }}
          onClick={() => this.props.toogleImage(this.props.value, "increase")}
        />
      </CartImag>
    );
  }
}
const CartImag = styled.div`
  position: relative;
`;
const mapDispatchToProps = (dispatch) => {
  return {
    toogleImage: (index, value) => dispatch(toggleImageFunc(index, value)),
  };
};
export default connect(null, mapDispatchToProps)(CartImage);
