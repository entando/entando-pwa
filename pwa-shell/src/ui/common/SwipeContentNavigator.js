import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Gesture } from 'react-with-gesture';
import { withRouter } from 'react-router';

class SwipeContentNavigator extends PureComponent {
  state = {
    hasSiblingContent: false,
    xMin: 0,
    xMax: 0,
  };

  constructor(props) {
    super(props);
    this.handleCursorMoving = this.handleCursorMoving.bind(this);
  }

  checkContentSiblings() {
    const { nextURL, previousURL } = this.props;
    const w =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      2;
    const hasNext = nextURL !== '';
    const hasPrev = previousURL !== '';
    this.setState({
      hasSiblingContent: hasPrev || hasNext,
      xMin: hasNext ? -w : 0,
      xMax: hasPrev ? w : 0,
    });
  }

  componentDidMount() {
    this.checkContentSiblings();
  }

  componentDidUpdate() {
    this.checkContentSiblings();
  }

  handleCursorMoving(event) {
    const { history } = this.props;
    const { delta } = event;
    const { xMin, xMax } = this.state;
    if (xMax > 0 && delta[0] > xMax) {
      history.push(this.props.previousURL);
    } else if (xMin < 0 && delta[0] < xMin) {
      history.push(this.props.nextURL);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <Gesture
        event={{ passive: false }}
        onUp={this.handleCursorMoving}
        className="gesture"
      >
        {event => {
          let styleDrag = {};
          const { down, delta } = event;
          const canDrag = down && this.state.hasSiblingContent;
          if (canDrag) {
            const { xMax, xMin } = this.state;
            const left =
              (delta[0] > 0 && xMax > 0) || (delta[0] < 0 && xMin < 0)
                ? delta[0]
                : 0;
            styleDrag = { style: { position: 'relative', left } };
          }
          return (
            <div style={canDrag ? { overflow: 'hidden' } : {}}>
              <div {...styleDrag}>{children}</div>
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
  history: PropTypes.object.isRequired,
};

SwipeContentNavigator.defaultProps = {
  previousURL: '',
  nextURL: '',
};

export default withRouter(SwipeContentNavigator);
