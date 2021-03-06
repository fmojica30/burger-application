import React, { Component } from "react";
import axios from "../../axios-order";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";

import Order from "../../Components/Order/Order";
import * as actions from "../../store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.tokenf);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});
const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(actions.fetchOrders(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
