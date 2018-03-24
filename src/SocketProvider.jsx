/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import bindSocketListeners from './bind-socket-listeners';

export class RawSocketProvider extends React.Component {
  state = {
    socket: null,
  }
  getChildContext = () => {
    return { socket: this.state.socket };
  }
  componentWillMount = () => {
    const doConnect = this.props.connect;
    if (doConnect) {
      this.connect();
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.doConnect && !nextProps.doConnect) {
      this.disconnect();
    }
    else if (!this.props.doConnect && nextProps.doConnect) {
      this.connect();
    }
  }
  componentWillUnmount = () => {
    this.disconnect();
  }
  disconnect = () => {
    const { socket } = this.state;
    if (socket) {
      socket.close();
      this.setState({ socket: null });
    }
  }
  connect = () => {
    const { socket } = this.state;
    if (socket) {
      console.warn('Already connected');
    }
    else {
      const { dispatch, serverUrl, listeners } = this.props;
      const s = io.connect(serverUrl);
      this.setState({
        socket,
      });
      bindSocketListeners(listeners, s, dispatch);
    }
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

RawSocketProvider.childContextTypes = {
  socket: PropTypes.object,
};

RawSocketProvider.propTypes = {
  doConnect: PropTypes.bool,
};

RawSocketProvider.defaultProps = {
  doConnect: true,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(RawSocketProvider);
