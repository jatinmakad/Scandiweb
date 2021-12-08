import React, { Component } from "react";
import styled from "styled-components";
class CartAttributes extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.data.map((s, index) => (
          <div key={index}>
            <p key={s.att_id}>{s.att_id}</p>
            <Attribute
              key={s.att_value}
              style={{
                background:
                  s.att_type === "swatch" ? s.att_value : "transparent",
                color: s.att_type === "swatch" ? s.att_value : "black",
              }}
            >
              {s.att_value}
            </Attribute>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
const Attribute = styled.button`
  padding: 5px;
  border: 1px solid black;
`;
export default CartAttributes;
