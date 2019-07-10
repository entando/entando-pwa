import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import ItemCategoryList from 'ui/common/ItemCategoryList';
import { GET_CATEGORY_RESPONSE_OK } from 'mocks/category';

afterEach(cleanup);

describe('ItemCategoryList', () => {
  it('renders correct structure with correct items', () => {
    const { container } = render(
      <ItemCategoryList
        itemCategoryList={GET_CATEGORY_RESPONSE_OK}
        lang="it"
      />,
    );
    const elementChilds = container.firstChild.childNodes;
    expect(container.firstChild.className).toEqual('ItemCategoryList');
    expect(elementChilds.length).toEqual(GET_CATEGORY_RESPONSE_OK.length);
    for (let i = 0; i < GET_CATEGORY_RESPONSE_OK.length; i++) {
      expect(elementChilds[i]).toHaveTextContent(
        GET_CATEGORY_RESPONSE_OK[i].titles['it'],
      );
    }
  });
});
