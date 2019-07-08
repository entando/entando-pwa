import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Page from 'ui/common/Page';

afterEach(cleanup);

const defaultProps = {
  willUnmount: () => {},
};

describe('Page', () => {
  it('renders the simple content and correct structure', () => {
    const message = 'This is a simple text. Nothing more nothing less.';
    const { container, getByText } = render(
      <Page {...defaultProps}>{message}</Page>,
    );
    const contel = getByText(message);
    expect(contel).toBeInTheDocument();
    expect(container.firstChild.className).toEqual('Page ');
    expect(container.firstChild.childNodes.length).toEqual(2);
  });

  it('renders correct main classList and children content', () => {
    const article = (
      <>
        <h1>Article 1</h1>
        <p>Hello hello I am a content.</p>
      </>
    );
    const props = {
      footer: 'By Entando',
      className: 'yoyo',
    };
    const { container, getByText } = render(
      <Page {...{ ...defaultProps, ...props }}>{article}</Page>,
    );

    const footel = getByText(props.footer);
    const contel = container.querySelector('.Page__content');
    expect(container.firstChild.className).toEqual('Page yoyo');
    expect(contel.childNodes.length).toEqual(2);
    expect(footel).toBeInTheDocument();
    expect(footel.innerHTML).toEqual(props.footer);

    // expect(container.firstChild.className).toEqual('Page ');
    // expect(container.firstChild.childNodes.length).toEqual(2);
  });
});
