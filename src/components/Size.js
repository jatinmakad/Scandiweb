import React, { Component } from "react";
import styled from "styled-components";
import SizeAttributes from "./SizeAttributes";

class Size extends Component {
  render() {
    const { id, items, type, index } = this.props.size;
    return (
      <Wrapper key={index}>
        <WrapperInner key={id}>{id}</WrapperInner>
        {items.map((s, index) => (
          <SizeAttributes
            item={s}
            key={index}
            type={type}
            productId={this.props.productId}
            newId={id}
            id={this.props.id}
          />
        ))}
      </Wrapper>
    );
  }
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 20px;
`;
const WrapperInner = styled.p`
  margin-right: 30px;
  font-size: 20px;
`;
export default Size;
