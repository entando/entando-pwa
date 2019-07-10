import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import 'fontawesome';
import TopBar from 'ui/common/TopBar';
import { createMockHistory, mockRenderWithRouter } from 'testUtils';

afterEach(cleanup);

const leftItems = <div className="hey" />;

const rightItems = [<div className="hey" />, <span className="jay" />];

const history = createMockHistory();
jest.spyOn(history, 'push');

describe('TopBar', () => {
  it('renders correct elements', () => {
    const { container } = mockRenderWithRouter(
      <TopBar
        contentType="YOLO"
        leftItems={leftItems}
        rightItems={rightItems}
      />,
      history,
    );
    const navleft = container.querySelector('.nav-left');
    const navright = container.querySelector('.nav-right');
    expect(navleft.childNodes.length).toEqual(1);
    expect(navright.childNodes.length).toEqual(2);
    expect(navright.childNodes[0].className).toEqual('nav-item');
    expect(navright.childNodes[0].firstChild.className).toEqual('hey');
  });

  it('renders correct elements with different right nav and test click middle logo', () => {
    const { container } = mockRenderWithRouter(
      <TopBar
        contentType="HUH"
        leftItems={leftItems}
        rightItems={rightItems[1]}
      />,
      history,
    );
    fireEvent.click(container.querySelector('.brand'));
    const navright = container.querySelector('.nav-right');
    expect(navright.childNodes.length).toEqual(1);
    expect(navright.childNodes[0].firstChild.className).toEqual('jay');
    expect(history.push).toBeCalledWith('/content/HUH');
  });
});
