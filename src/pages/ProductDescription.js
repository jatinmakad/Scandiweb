import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Prices from "../components/Prices";
import Size from "../components/Size";
import { addToCart } from "../slice/cartSlice";
import { switchImages } from "../slice/fetchSlice";
class ProductDescription extends Component {
  render() {
    const { name, id, gallery, description, prices, attributes } =
      this.props.state.productDescription;
    let regex = /(<([^>]+)>)/gi;
    let result = description.replace(regex, "");
    return (
      <ProductMain>
        <ProductLeft>
          <LeftImage>
            {gallery.map((gallery, index) => (
              <img
                src={gallery}
                alt=""
                onClick={() => this.props.switchImages(index)}
              />
            ))}
          </LeftImage>
          <RightImage>
            <img src={gallery[`${this.props.state.switchImage}`]} alt="" />
          </RightImage>
        </ProductLeft>
        <ProductRight>
          <h1>{name}</h1>
          <ProductSize>
            <div>
              {attributes.map((s) => (
                <Size size={s} productId={id} id={s.id} />
              ))}
            </div>
          </ProductSize>
          <ProductPrice>
            <h3>Price</h3>
            <div>
              {prices.map((s) => (
                <Prices price={s}  />
              ))}
            </div>
          </ProductPrice>
          <AddCart
        //  style={{
        //   pointerEvents: !this.props.cart.attributes?.length ? "none" : "",
        //   cursor: !this.props.cart.attributes?.length ? "not-allowed" : "pointer",
        // }}
          >
            <span
              onClick={() =>
                this.props.cart(this.props.state.productDescription, id, prices)
              }
            >
              {" "}
              Add To Cart
            </span>
          </AddCart>
          <ProductDescriptions>{result}</ProductDescriptions>
        </ProductRight>
      </ProductMain>
    );
  }
}
const ProductMain = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 100%;
`;
const ProductLeft = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const RightImage = styled.div`
  img {
    width: 450px;
  }
`;
const LeftImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 65px;
  img {
    padding-bottom: 10px;
  }
`;
const ProductRight = styled.div`
  flex: 0.4;
  padding: 50px;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 70px;
    font-size: 40px;
  }
`;
const ProductSize = styled.div`
  margin-bottom: 40px;
`;
const ProductPrice = styled.div`
  margin-bottom: 30px;
  h3 {
    font-size: 25px;
    font-style: normal;
    line-height: 30px;
    letter-spacing: 0em;
  }
  p {
    font-size: 28px;
    font-style: normal;
    line-height: 60px;
    letter-spacing: 0em;
  }
`;
const AddCart = styled.div`
  height: 60px;
  cursor: pointer;
  width: 350px;
  background-color: #5ece7b;
  margin-bottom: 40px;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
const ProductDescriptions = styled.p`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;
const mapStateToProps = (state) => {
  return {
    state: state.product,
    cart:state.cart
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    switchImages: (index) => dispatch(switchImages(index)),
    cart: (product, id, prices) => dispatch(addToCart(product, id, prices)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);
