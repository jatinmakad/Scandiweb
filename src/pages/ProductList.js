import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Prices from "../components/Prices";
import { productSingle } from "../slice/fetchSlice";
import Cart_Icon from "../Images/Common.svg";
import "../styles/Header.css";
import Link from "../helper/Link";
import { addCart } from "../slice/cartSlice";

class PrdouctsList extends Component {
  render() {
    const { name, inStock, gallery, prices, id } = this.props.products;
    const link_style = { textDecoration: "none", color: "black" };
    const outofStock_style = {
      display: inStock === true ? "none" : "block",
    };

    return (
      <div className={!inStock === true ? "outofstock" : ""} key={id}>
        <ProductMain
          onClick={() => this.props.single(this.props.products)}
          key={this.props.products}
        >
          <div className={inStock === true ? "" : "outStock"} key={inStock}>
            <OutofProduct style={outofStock_style}>out of stock</OutofProduct>
          </div>
          <CartIcon
            src={Cart_Icon}
            onClick={() => this.props.cart(this.props.products)}
          />
          <Link href="/product/id" style={link_style}>
            <Wrapper key={gallery[0]}>
              <img src={gallery[0]} alt="" />
            </Wrapper>
          </Link>
          <WrapperContent>
            <h1 key={name}>{name}</h1>
            <div key={prices}>
              {prices.map((s, index) => (
                <Prices price={s} key={index} />
              ))}
            </div>
          </WrapperContent>
        </ProductMain>
      </div>
    );
  }
}
const CartIcon = styled.img`
  position: absolute;
  top: 70%;
  left: 75%;
  width: 52px;
  height: 52px;
  display: none;
`;
const OutofProduct = styled.p`
  position: absolute;
  top: 45%;
  left: 25%;
  color: #8d8f9a;
  font-size: 26px;
  letter-spacing: 1px;
  line-height: 160%;
  z-index: 10000;
  text-transform: uppercase;
`;
const ProductMain = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  height: 444px;
  width: 386px;
  padding: 10px 20px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.3);
    ${CartIcon} {
      display: block;
    }
  }
`;

const Wrapper = styled.div`
  margin-bottom: 18px;
  img {
    height: 338px;
    width: 356px;
    background-clip: border-box;
    object-fit: contain;
  }
`;
const WrapperContent = styled.div`
  h1 {
    font-size: 25px;
    font-weight: 500;
    line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
    margin-bottom: 8px;
  }
  p {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 29px;
  }
`;
const mapDispatchToProps = (dispatch) => {
  return {
    single: (product) => dispatch(productSingle(product)),
    cart: (product) => dispatch(addCart(product)),
  };
};
export default connect(null, mapDispatchToProps)(PrdouctsList);
