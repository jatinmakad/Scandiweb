import React, { Component } from "react";
import { connect } from "react-redux";
import Plus from "../Images/plus-square.svg";
import Minus from "../Images/minus-square.svg";
import styled from "styled-components";
import { removeAmountFunc, toggleAmountFunc } from "../slice/cartSlice";
import Prices from "../components/Prices";
import { currencyFormatter } from "../helper/helper";
import Link from "../helper/Link";
import CartAttributes from "../components/CartAttributes";
import CartImage from "../components/CartImage";
class Cart extends Component {
  render() {
    return (
      <CartMain>
        {this.props.cart.carts.length === 0 ? (
          <EmptyCart>
            <p>Your Cart is Empty</p>
            <Link href="/">
              <AddProduct>Add Product</AddProduct>
            </Link>
          </EmptyCart>
        ) : (
          <>
            <CartHeading>Cart</CartHeading>
            <div>
              {this.props.cart.carts.map((g, index) => (
                <CartHead key={index}>
                  <CartLeft>
                    <CartName key={g.name}>{g.name}</CartName>
                    <CartAttribute key={g.attribut}>
                      <AttributeOuter key={g.attributes}>
                        <CartAttributes data={g.attributes} />
                      </AttributeOuter>
                    </CartAttribute>
                    <CartPriceSection>
                      {g.prices.map((s, index) => (
                        <Prices price={s} key={index} />
                      ))}
                    </CartPriceSection>
                  </CartLeft>
                  <CartRight>
                    <CartCount>
                      <img
                        src={Plus}
                        alt=""
                        onClick={() =>
                          this.props.toogleCount(index, "increase")
                        }
                      />
                      <p style={{ fontSize: "20px" }} key={g.count}>
                        {g.count}
                      </p>
                      <img
                        src={Minus}
                        alt=""
                        onClick={
                          g.count <= 1
                            ? () => this.props.remove(index)
                            : () => this.props.toogleCount(index, "decrease")
                        }
                      />
                    </CartCount>
                    <CartImage data={g.gallery} count={g.co} value={index} />
                  </CartRight>
                </CartHead>
              ))}
              <CartTotal>
                <div>
                  {this.props.cart.carts.length === 0 ? (
                    ""
                  ) : (
                    <CartTotalText>Total</CartTotalText>
                  )}
                </div>
                <div key={this.props.cart.grandTotal}>
                  {currencyFormatter(
                    this.props.cart.currency,
                    this.props.cart.grandTotal
                  )}
                </div>
              </CartTotal>
            </div>
          </>
        )}
      </CartMain>
    );
  }
}

const CartMain = styled.div`
  width: 1350px;
  margin: 0 auto;
  height: 100%;
`;
const CartHeading = styled.h1`
  padding: 40px 0;
  width: 90%;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  border-bottom: 1px solid black;
`;
const CartHead = styled.div`
  display: flex;
  width: 90%;
  padding: 30px 0;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
`;
const CartTotalText = styled.p`
  font-weight: 600;
`;
const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 200px;
  p {
    font-size: 30px;
    line-height: 40px;
    margin-bottom: 30px;
  }
`;
const CartLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddProduct = styled.button`
  width: 200px;
  height: 43px;
  padding: 13px 32px;
  text-transform: uppercase;
  background-color: transparent;
  border: 1.6px solid black;
  font-weight: 600;
  line-height: 17px;
  cursor: pointer;
`;
const CartName = styled.p`
  font-size: 30px;
  font-weight: 600;
  line-height: 1px;
  margin-bottom: 25px;
`;
const CartAttribute = styled.div`
  margin-bottom: 30px;
`;
const CartPriceSection = styled.div`
  font-size: 24px;
  line-height: 0.1px;
`;
const CartRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const CartCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  line-height: 70px;
`;
const AttributeOuter = styled.div`
  line-height: 30px;
`;
const CartTotal = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  font-weight: 300;
  font-size: 30px;
  line-height: 0.1px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-top: 50px;
  margin-bottom: 80px;
`;
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toogleCount: (index, value) => dispatch(toggleAmountFunc(index, value)),
    remove: (index) => dispatch(removeAmountFunc(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
