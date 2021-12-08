import React, { Component } from "react";
import { connect } from "react-redux";
import Plus from "../Images/plus-square.svg";
import Minus from "../Images/minus-square.svg";
import Right_icon from "../Images/chevron-right.svg";
import Left from "../Images/left.svg";
import styled from "styled-components";
import {
  removeAmountFunc,
  toggleAmountFunc,
  toggleImageFunc,
} from "../slice/cartSlice";
import Prices from "../components/Prices";
import { currencyFormatter } from "../helper/helper";

class Cart extends Component {
  render() {
    return (
      <CartMain>
        <CartHeading>Cart</CartHeading>
        <div>
          {this.props.cart.carts.map((g, index) => (
            <CartHead key={g.id}>
              <CartLeft>
                <CartName key={g.name}>{g.name}</CartName>
                <CartAttributes key={g.attribut}>
                  <AttributeOuter>
                    {g.attributes.map((s) => (
                      <>
                        <AttributeName key={s.att_id}>{s.att_id}</AttributeName>
                        <Attribute key={s.att_value}
                          style={{
                            background:
                              s.att_type === "swatch"
                                ? s.att_value
                                : "transparent",
                            color:
                              s.att_type === "swatch" ? s.att_value : "black",
                          }}
                        >
                          {s.att_value}
                        </Attribute>
                      </>
                    ))}
                  </AttributeOuter>
                </CartAttributes>
                <CartPriceSection>
                  {g.prices.map((s) => (
                    <Prices price={s} key={s} />
                  ))}
                </CartPriceSection>
              </CartLeft>

              <CartRight>
                <CartCount>
                  <img
                    src={Plus}
                    alt=""
                    onClick={() => this.props.toogleCount(index, "increase")}
                  />
                  <p style={{ fontSize: "20px" }}>{g.count}</p>
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
                <CartImage>
                  <img
                    src={Left}
                    alt=""
                    style={{
                      position: "absolute",
                      top: "43%",
                      left: "0",
                    }}
                    onClick={() => this.props.toogleImage(index, "decrease")}
                  />
                  {g.gallery[`${g.co}`] ? (
                    <img
                      src={g.gallery[`${g.co}`]}
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
                      src={g.gallery[0]}
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
                    onClick={() => this.props.toogleImage(index, "increase")}
                  />
                </CartImage>
              </CartRight>
            </CartHead>
          ))}
          <CartTotal>
            <div>
              {this.props.cart.carts.length === 0 ? (
                ""
              ) : (
                <p style={{ fontWeight: "600" }}>Total</p>
              )}
            </div>
            <div>
              {currencyFormatter(
                this.props.cart.currency,
                this.props.cart.grandTotal
              )}
            </div>
          </CartTotal>
        </div>
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
const CartLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const AttributeName = styled.p``;
const Attribute = styled.button`
  padding: 5px;
  border: 1px solid black;
`;
const CartName = styled.p`
  font-size: 30px;
  font-weight: 600;
  line-height: 1px;
  margin-bottom: 25px;
`;
const CartAttributes = styled.div`
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
const CartImage = styled.div`
  position: relative;
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
    toogleImage: (index, value) => dispatch(toggleImageFunc(index, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);