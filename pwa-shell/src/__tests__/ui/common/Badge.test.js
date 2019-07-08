import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Badge from 'ui/common/Badge';

afterEach(cleanup);

describe('Badge', () => {
  it('renders the correct text and snapshot', () => {
    const message = 'Hello World';
    const { container, getByText } = render(<Badge>{message}</Badge>);
    expect(getByText(message)).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span
        class="Badge "
      >
        Hello World
      </span>
    `);
  });

  it('renders the correct text, classname, and snapshot', () => {
    const message = 'Hello Again World',
      classname = 'choi';
    const { getByText } = render(
      <Badge className={classname}>{message}</Badge>,
    );
    const badge = getByText(message);
    expect(badge).toBeInTheDocument();
    expect(badge.className).toEqual(`Badge ${classname}`);
  });
});
