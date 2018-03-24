import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => {
  class HocComponent extends React.Component {
    render() {
      const { socket } = this.context;
      return <Component socket={socket} {...this.props} />;
    }
  }
  HocComponent.contextTypes = {
    socket: PropTypes.object,
  };
  return HocComponent;
};
