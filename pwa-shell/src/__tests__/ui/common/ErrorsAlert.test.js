import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import 'jest-dom/extend-expect';
import 'fontawesome';
import { createMockStore, mockRenderWithIntl } from 'testUtils';

import ErrorsAlert from 'ui/common/ErrorsAlert';

const initState = {
  api: { useMocks: true },
  language: { defaultCode: 'it', code: 'it' },
};

afterEach(cleanup);

const messages = [
  'categoryfilter.selectTopic',
  'login.errorInvalidCredentials',
];

const onDismiss = jest.fn();

let store;

describe('ErrorsAlert', () => {
  beforeEach(() => {
    store = createMockStore(initState);
  });

  it('renders correct structure', () => {
    const { container } = mockRenderWithIntl(
      <ErrorsAlert messages={messages} onDismiss={onDismiss} />,
      store,
    );
    const msglist = container.querySelector('ul');
    const lastclosebtn = container.querySelector('.alert .close');
    fireEvent.click(lastclosebtn);
    expect(msglist).not.toEqual(null);
    expect(msglist.childNodes).toHaveLength(2);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('trying with one message', () => {
    const { container } = mockRenderWithIntl(
      <ErrorsAlert messages={[messages[0]]} onDismiss={onDismiss} />,
      store,
    );
    const msglist = container.querySelector('ul');
    const svgalert = container.querySelector('svg');
    const lonemsgcont = container.querySelector('.ErrorsAlert__message');
    expect(msglist).toEqual(null);
    expect(svgalert).not.toEqual(null);
    expect(lonemsgcont).not.toEqual(null);
  });
});
