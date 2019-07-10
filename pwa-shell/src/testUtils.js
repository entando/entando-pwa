import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { config } from '@entando/apimanager';
import { Provider as StateProvider } from 'react-redux';
import IntlProviderContainer from 'IntlProviderContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const createMockHistory = () =>
  createMemoryHistory({ initialEntries: ['/'] });

export const mockRenderWithRouter = (ui, history) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

export const createMockStore = (state = {}) => {
  const store = mockStore(state);
  config(store);
  return store;
};

export const mockRenderWithIntl = (ui, store) => ({
  ...render(
    <StateProvider store={store}>
      <IntlProviderContainer>{ui}</IntlProviderContainer>
    </StateProvider>,
  ),
  store,
});
