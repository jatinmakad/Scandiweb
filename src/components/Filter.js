import React, { Component } from "react";
import Arrow from "../Images/arrow.svg";
import styled from "styled-components";
import { toggleDropdownClose, toggleDropdown } from "../slice/fetchSlice";
import { connect } from "react-redux";
import { filterCurrency } from "../slice/cartSlice";
import OutsideClick from "../helper/OutsideClick";

class Filter extends Component {
  render() {
    return (
      <Dropdown>
        <DropdownBtn onClick={() => this.props.toogle()}>
          {this.props.cart.currency}
          <span style={{ paddingLeft: "7px" }}></span>
          {this.props.state.isDropdwonOpen ? (
            <img src={Arrow} alt="" />
          ) : (
            <img
              src={Arrow}
              alt=""
              style={{
                transform: "rotate(180deg)",
              }}
            />
          )}
        </DropdownBtn>

        {this.props.state.isDropdwonOpen && (
          <OutsideClick filterClose={this.props.toogle}>
            <DropdownContent>
              {this.props.state.currencies.map((g) => (
                <DropdownItem onClick={() => this.props.filter(g)} key={g}>
                  <p onClick={() => this.props.toogleClose()}>{g}</p>
                </DropdownItem>
              ))}
            </DropdownContent>
          </OutsideClick>
        )}
      </Dropdown>
    );
  }
}
const Dropdown = styled.div`
  width: 100px;
  position: relative;
  z-index: 1000;
`;
const DropdownBtn = styled.div`
  padding: 7px 14px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0);
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50%;
  justify-content: space-between;
`;
const DropdownItem = styled.div`
  cursor: pointer;
  transition: all 0.2s;
`;
const DropdownContent = styled.div`
  position: absolute;
  top: 130%;
  left: -20%;
  height: 180px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(133, 41, 41, 0.04);
  font-weight: 600;
  color: #333;
  width: 85%;
  z-index: 1000;
`;

const mapStateToProps = (state) => {
  return {
    state: state.product,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toogle: () => dispatch(toggleDropdown()),
    toogleClose: () => dispatch(toggleDropdownClose()),
    filter: (g) => dispatch(filterCurrency(g)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
