import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import "../styles/Header.css";
import Logo from "../Images/main_logo.svg";
import Cart from "../Images/Empty Cart.svg";
import Filter from "../components/Filter";
import { filteredProduct } from "../slice/fetchSlice";
import { toggleCart, toggleCartClose } from "../slice/cartSlice";
import Overlay from "./Overlay";
import Link from "../helper/Link";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
    };
  }
  handler = (id) => {
    this.setState({
      category: id,
    });
  };
  setHidden = () => {
    document.body.style.overflow = "hidden";
  };
  render() {
    return (
      <HeaderMain>
        <HeaderInner>
          <HeaderList>
            <li
              onClick={() => {
                this.props.category("all");
                this.handler("all");
              }}
              className={this.state.category === "all" ? "active" : ""}
            >
              All
            </li>
            <li
              onClick={() => {
                this.props.category("clothes");
                this.handler("clothes");
              }}
              className={this.state.category === "clothes" ? "active" : ""}
            >
              Clothes
            </li>
            <li
              onClick={() => {
                this.props.category("tech");
                this.handler("tech");
              }}
              className={this.state.category === "tech" ? "active" : ""}
            >
              Tech
            </li>
          </HeaderList>
          <Link href="/">
            <img src={Logo} alt="" />
          </Link>
          <HeaderLastMain>
            <Filter />
            <HeaderCart
              onClick={() => {
                this.props.toogle();
                this.setHidden();
              }}
            >
              <img src={Cart} alt="" />
              <p>{this.props.cart.carts.length}</p>
            </HeaderCart>
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
    category: (id) => dispatch(filteredProduct(id)),
    toogle: () => dispatch(toggleCart()),
    toogleCartClose: () => dispatch(toggleCartClose()),
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
const HeaderList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 35%;
  list-style: none;
  li {
    height: 100px;
    cursor: pointer;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-style: normal;
    line-height: 19px;
  }
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
