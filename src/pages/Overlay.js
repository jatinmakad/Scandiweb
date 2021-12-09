import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  decrement,
  increment,
  removeAmountFunc,
  toggleAmountFunc,
  toggleCartClose,
} from "../slice/cartSlice";
import Plus from "../Images/plus-square.svg";
import Minus from "../Images/minus-square.svg";
import Prices from "../components/Prices";
import { currencyFormatter } from "../helper/helper";
import OutsideClick from "../helper/OutsideClick";
import Link from "../helper/Link";
class Overlay extends Component {
  render() {
    const viewBag = {
      pointerEvents: this.props.cart.carts.length === 0 ? "none" : "fill",
      cursor: this.props.cart.carts.length === 0 ? "not-allowed" : "",
    };
    const { open, length } = this.props;
    if (!open) return null;
    return (
      <FadeOuter>
        <Fade>
          <OutsideClick filterClose={this.props.toogleClose}>
            <div>
              <MyBag>
                My Bag,
                <span
                  style={{
                    fontWeight: "300",
                  }}
                  key={length}
                >
                  {length} items
                </span>
              </MyBag>
              {length === 0 ? (
                <EmptyCart>Your cart is Empty</EmptyCart>
              ) : (
                <>
                  <div>
                    {this.props.cart.carts.map((g, index) => (
                      <OverlayCart key={index}>
                        <OverlayCartFirst>
                          <OverlayCartName key={g.name}>
                            {g.name}
                          </OverlayCartName>
                          <AttributesOuter>
                            {g.attributes.map((s, index) => (
                              <div key={index}>
                                <AttributesName key={s.att_id}>
                                  {s.att_id} :
                                </AttributesName>
                                <Attributes
                                  style={{
                                    background:
                                      s.att_type === "swatch"
                                        ? s.att_value
                                        : "transparent",
                                    color:
                                      s.att_type === "swatch"
                                        ? s.att_value
                                        : "black",
                                  }}
                                  key={s.att_value}
                                >
                                  {s.att_value}
                                </Attributes>
                              </div>
                            ))}
                          </AttributesOuter>
                          <OverlayCurrency>
                            {g.prices.map((s, index) => (
                              <Prices price={s} key={index} />
                            ))}
                          </OverlayCurrency>
                        </OverlayCartFirst>
                        <OverlayCountButton>
                          <OverlayCount>
                            <OverlayCountImage
                              src={Plus}
                              alt=""
                              onClick={() =>
                                this.props.amount(index, "increase")
                              }

                            />
                            <p key={g.count}>{g.count}</p>
                            <OverlayCountImage
                              src={Minus}
                              alt=""
                              onClick={
                                g.count <= 1
                                  ? () => this.props.remove(index)
                                  : () => this.props.amount(index, "decrease")
                              }
                            />
                          </OverlayCount>
                          <OverlayPrImage src={g?.gallery[0]}></OverlayPrImage>
                        </OverlayCountButton>
                      </OverlayCart>
                    ))}
                  </div>
                  <OverlayPrTotal>
                    <TotalText>Total</TotalText>
                    <p key={this.props.cart.grandTotal}>
                      {currencyFormatter(
                        this.props.cart.currency,
                        this.props.cart.grandTotal
                      )}
                    </p>
                  </OverlayPrTotal>
                </>
              )}
              <OverlayBag>
                <OverlayBagButton style={viewBag}>
                  <Link href="/cart">
                    <span
                      onClick={() => {
                        this.props.toogleClose();
                      }}
                    >
                      View Bag
                    </span>
                  </Link>
                </OverlayBagButton>
                <OverlayBagButton2>Check Out</OverlayBagButton2>
              </OverlayBag>
            </div>
          </OutsideClick>
        </Fade>
      </FadeOuter>
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
    toogleClose: () => dispatch(toggleCartClose()),
    increment: (index) => dispatch(increment(index)),
    decrement: (index) => dispatch(decrement(index)),
    amount: (index, pr) => dispatch(toggleAmountFunc(index, pr)),
    remove: (index) => dispatch(removeAmountFunc(index)),
  };
};

const FadeOuter = styled.div`
  position: fixed;
  top: 14%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;
const OverlayCountImage = styled.img`
  width: 25px;
  height: 25px;
`;
const Fade = styled.div`
  &::-webkit-scrollbar {
    width: 1px;
    border: 1px solid black;
  }
  position: fixed;
  top: 14%;
  left: 74%;
  background-color: #fff;
  padding: 30px;
  z-index: 1000;
  width: 325px;
  max-height: 540px;
  overflow-y: auto;
`;
const TotalText = styled.p`
  font-weight: 600;
`;
const Attributes = styled.button`
  border: 1px solid black;
  padding: 5px;
`;

const AttributesOuter = styled.div`
  line-height: 30px;
`;
const EmptyCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin-bottom: 40px;
`;
const AttributesName = styled.p``;
const MyBag = styled.div`
  font-weight: 700;
  margin-bottom: 30px;
`;
const OverlayCart = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const OverlayCartFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const OverlayCartName = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
`;
const OverlayCurrency = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
`;
const OverlayCountButton = styled.div`
  display: flex;
`;
const OverlayCount = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
`;
const OverlayPrImage = styled.img`
  width: 105px;
  height: 130px;
  align-self: center;
  object-fit: contain;
`;
const OverlayPrTotal = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0;
  justify-content: space-between;
  font-weight: 300;
  font-size: 16px;
  line-height: 0.1px;
  align-items: center;
`;
const OverlayBag = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const OverlayBagButton = styled.button`
  width: 140px;
  height: 43px;
  padding: 13px 32px;
  text-transform: uppercase;
  background-color: transparent;
  border: 1.6px solid black;
  font-weight: 600;
  line-height: 17px;
  cursor: pointer;
`;
const OverlayBagButton2 = styled.button`
  width: 140px;
  height: 43px;
  padding: 10px 25px;
  cursor: pointer;
  text-transform: uppercase;
  background-color: #5ece7b;
  border: none;
  color: #fff;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
