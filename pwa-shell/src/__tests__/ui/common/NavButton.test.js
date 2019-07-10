import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import 'fontawesome';
import NavButton from 'ui/common/NavButton';

afterEach(cleanup);

const defaultProps = {
  icon: 'bell',
  className: 'choochoo',
};

describe('NavButton', () => {
  it('renders the content and check class name', () => {
    const { container } = render(<NavButton {...defaultProps} />);
    const icon = container.querySelector('.cursor-pointer');
    const maincontainer = container.firstChild;
    expect(icon).toBeInTheDocument();
    expect(container.querySelector('sup')).not.toBeInTheDocument();
    expect(maincontainer.className).toEqual('NavButton choochoo');
  });

  it('check if onclick works and it has badgetext', () => {
    const onClick = jest.fn();
    const theProps = {
      ...defaultProps,
      onClick,
      badgeText: 'Hello hello',
    };
    const { container, getByText } = render(<NavButton {...theProps} />);
    const icon = container.querySelector('.cursor-pointer');
    const badgeText = getByText(theProps.badgeText);

    fireEvent.click(icon);
    expect(icon).toBeInTheDocument();
    expect(badgeText).toBeInTheDocument();
    expect(container.querySelector('.NavButton__Badge')).toHaveTextContent(
      theProps.badgeText,
    );
    expect(onClick).toBeCalled();
  });
});
