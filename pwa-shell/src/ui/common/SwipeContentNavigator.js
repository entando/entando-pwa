import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Gesture } from 'react-with-gesture';
import { Redirect } from 'react-router-dom';

class SwipeContentNavigator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasSiblingContent: false,
      xMin: 0,
      xMax: 0,
      openURL: '',
    };
    this.handleCursorMoving = this.handleCursorMoving.bind(this);
  }

  checkContentSiblings() {
    const {
      nextURL,
      previousURL,
    } = this.props;

    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2;
    const hasNext = nextURL !== '';
    const hasPrev = previousURL !== '';
    this.setState({
      hasSiblingContent: hasPrev || hasNext || false,
      xMin: hasNext ? -w : 0,
      xMax: hasPrev ? w : 0,
      openURL: '',
    });
  }

  componentDidUpdate() {
    this.checkContentSiblings();
  }

  handleCursorMoving(event) {
    const { delta } = event;
    const { xMin, xMax } = this.state;
    if (xMax > 0 && delta[0] > xMax ) {
      this.setState({openURL: this.props.previousURL});
    } else if (xMin < 0 && delta[0] < xMin) {
      this.setState({openURL: this.props.nextURL});
    }
  }

  render() {
    const { openURL } = this.state;
    if (openURL) {
      return <Redirect to={openURL} push />;
    }
    const { children } = this.props;
    return (
      <Gesture event={{ passive: false }} onUp={this.handleCursorMoving}>
        {event => {
          let styleDrag = {};
          const { down, delta } = event;
          const canDrag = down && this.state.hasSiblingContent;
          if (canDrag) {
            const { xMax, xMin } = this.state;
            let left = (
              (delta[0] > 0 && xMax > 0) ||
              (delta[0] < 0 && xMin < 0)
            ) ? delta[0] : 0;
            styleDrag = { style: { position: 'relative', left } };
          }
          return (
            <div style={canDrag ? { overflow: 'hidden' }:{}}>
              <div { ...styleDrag }>
                { children }
              </div>
            </div>
          );
        }}
      </Gesture>
    );
  }
}

SwipeContentNavigator.propTypes = {
  previousURL: PropTypes.string,
  nextURL: PropTypes.string,
};

SwipeContentNavigator.defaultProps = {
  previousURL: '',
  nextURL: '',
};

export default SwipeContentNavigator;