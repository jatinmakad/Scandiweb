import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class OutsideClick extends Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      window.scrollY < 200
    ) {
      this.props.filterClose();
    }
  }
  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
OutsideClick.propTypes = {
  children: PropTypes.element.isRequired,
};
export default connect(mapStateToProps)(OutsideClick);
