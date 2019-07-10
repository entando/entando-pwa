import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import SwipeContentNavigator from 'ui/common/SwipeContentNavigator';
import { createMockHistory, mockRenderWithRouter } from 'testUtils';

afterEach(cleanup);

const defaultProps = {
  previousURL: '1.html',
  nextURL: '2.html',
};

const article = (
  <>
    <h1>Article 1</h1>
    <p>Hello hello I am a content.</p>
  </>
);
const history = createMockHistory();
jest.spyOn(history, 'push');

describe('SwipeContentNavigator', () => {
  console.log('please check componentDidMount for this');
  it('test swipe for previousURL', () => {
    const { container } = mockRenderWithRouter(
      <SwipeContentNavigator {...defaultProps}>
        {article}
      </SwipeContentNavigator>,
      history,
    );
    const touchstart = [{ pageX: 0, pageY: 0 }];
    const touchdest = [{ pageX: 513, pageY: 0 }];
    const window = (container.ownerDocument || container).defaultView;
    fireEvent.touchStart(container.firstChild, { touches: touchstart });
    fireEvent.touchMove(window, { touches: touchdest });
    fireEvent.touchEnd(window, { touches: touchdest });
    expect(history.push).toBeCalledWith(defaultProps.previousURL);
  });

  it('test swipe for nextURL', () => {
    const { container } = mockRenderWithRouter(
      <SwipeContentNavigator {...defaultProps}>
        {article}
      </SwipeContentNavigator>,
      history,
    );
    const touchstart = [{ pageX: 513, pageY: 0 }];
    const touchdest = [{ pageX: 0, pageY: 0 }];
    const window = (container.ownerDocument || container).defaultView;
    fireEvent.touchStart(container.firstChild, { touches: touchstart });
    fireEvent.touchMove(window, { touches: touchdest });
    fireEvent.touchEnd(window, { touches: touchdest });
    expect(history.push).toBeCalledWith(defaultProps.nextURL);
  });
});
