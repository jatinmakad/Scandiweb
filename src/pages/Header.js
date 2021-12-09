import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "../styles/Header.css";
import Logo from "../Images/main_logo.svg";
import Cart from "../Images/Empty Cart.svg";
import Filter from "../components/Filter";
import {
  toggleCart,
  toggleCartClose,
  toggleCartOpen,
} from "../slice/cartSlice";
import Overlay from "./Overlay";
import Link from "../helper/Link";
import HeaderList from "../components/HeaderList";
class Header extends Component {
  render() {
    const header_style = {
      pointerEvents: this.props.cart.carts.length === 0 ? "none" : "fill",
      cursor: this.props.cart.carts.length === 0 ? "not-allowed" : "pointer",
    };
    return (
      <HeaderMain>
        <HeaderInner>
          <HeaderList />
          <Link href="/">
            <img src={Logo} alt="" />
          </Link>
          <HeaderLastMain>
            <Filter />
            <div style={header_style}>
              <HeaderCart
                onClick={() => {
                  this.props.toogle();
                }}
              >
                <img src={Cart} alt="" />
                <p>{this.props.cart.carts.length}</p>
              </HeaderCart>
            </div>

            <Overlay
              open={this.props.cart.isCartOpen}
              length={this.props.cart.carts.length}
            />
          </HeaderLastMain>
        </HeaderInner>
      </HeaderMain>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.product,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toogle: () => dispatch(toggleCart()),
    toogleCartClose: () => dispatch(toggleCartClose()),
    toogleCartOpen: () => dispatch(toggleCartOpen()),
  };
};

const HeaderMain = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const HeaderInner = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLastMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 12%;
  justify-content: space-between;
`;
const HeaderCart = styled.div`
  position: relative;
  img {
    width: 28px;
  }
  p {
    font-size: 15px;
    background-color: black;
    color: #fff;
    border-radius: 50%;
    padding: 4px 6px;
    position: absolute;
    top: -45%;
    left: 100%;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
