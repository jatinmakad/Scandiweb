import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ProductList from "./ProductList";

class Product extends Component {
  render() {
    return (
      <ProductWrapper>
      <h2>{this.props.state.productCategory}</h2>
        <ProductMain>
          {this.props.state.product.map((product,index) =>
            product.category === `${this.props.state.productCategory}` ? (
              <ProductList products={product} key={product.id}/>
            ) : this.props.state.productCategory === "all" ? (
              <ProductList products={product}  key={index}/>
            ) : (
              ""
            )
          )}
        </ProductMain>
      </ProductWrapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    state: state.product,
  };
};
const ProductWrapper = styled.div`
width: 90%;
margin: 0 auto;
 h2{
   font-size: 55px;
   text-transform: capitalize;
   font-weight: 500;
   letter-spacing: 1px;
   line-height: 100px;
   padding-left: 30px;
 }
`
const ProductMain = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
`;

export default connect(mapStateToProps)(Product);
