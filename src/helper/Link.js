import React, { Component } from 'react'
import styled from "styled-components";
class Link extends Component {
  onClick = (event) => {
    // prevent full page reload
    event.preventDefault();
    // update url
    window.history.pushState({}, "", this.props.href);

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };
  render() {
    
    return (
      <LinkMain href={this.props.href} onClick={this.onClick}>
      {this.props.children}
    </LinkMain>
    )
  }
}
const LinkMain = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;


export default Link
