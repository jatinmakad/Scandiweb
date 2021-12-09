import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { filteredProduct } from "../slice/fetchSlice";
import "../styles/Header.css";
class HeaderList extends Component {
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
  render() {
    return (
      <Headerlist>
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
      </Headerlist>
    );
  }
}
const Headerlist = styled.ul`
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
const mapDispatchToProps = (dispatch) => {
  return {
    category: (id) => dispatch(filteredProduct(id)),
  };
};
export default connect(null, mapDispatchToProps)(HeaderList);
