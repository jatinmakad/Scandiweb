import { Component } from "react";
import { connect } from "react-redux";
import { emptyAttributes } from "../slice/cartSlice";
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPath: window.location.pathname };
  }
  onLocationChange = () => {
    this.setState({ currentPath: window.location.pathname });
    this.props.attribut();
  };
  componentDidMount() {
    window.addEventListener("popstate", this.onLocationChange);
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.onLocationChange);
  }
  render() {
    return this.state.currentPath === this.props.path
      ? this.props.children
      : null;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attribut: () => dispatch(emptyAttributes()),
  };
};
export default connect(null, mapDispatchToProps)(Routes);
