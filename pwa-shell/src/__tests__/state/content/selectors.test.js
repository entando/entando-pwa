import { FILTER_OPERATORS } from '@entando/utils';
import {
  getContentList,
  getContentListMeta,
  getListHasMorePages,
  getSelectedContent,
  getSelectedContentId,
  getNextToSelectedContent,
  getPreviousFromSelectedContent,
  getStandardFilters,
  getCategoryFilters,
  getSortingFilters,
  getRequiresAuthMap,
} from 'state/content/selectors';
import { GET_CONTENTS_RESPONSE_OK } from 'mocks/content';
import { contentTypeCodeList, sortingFilters } from 'state/appConfig';

const filters = contentTypeCodeList.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: {
      formValues: { typeCode: [curr] },
      operators: { typeCode: FILTER_OPERATORS.EQUAL },
    },
  }),
  {},
);

const STATE = {
  content: {
    list: GET_CONTENTS_RESPONSE_OK,
    listMeta: { page: 1, pageSize: 5, totalItems: 5 },
    filters,
    requiresAuthMap: { NWS: false },
    categoryFilters: {},
    sortingFilters,
    selected: GET_CONTENTS_RESPONSE_OK[1],
  },
};

describe('state/content/selectors', () => {
  it('getContentList returns the mock content list', () => {
    expect(getContentList(STATE)).toEqual(GET_CONTENTS_RESPONSE_OK);
  });
  it('getContentListMeta returns the listMeta', () => {
    expect(getContentListMeta(STATE)).toEqual(STATE.content.listMeta);
  });
  it('getListHasMorePages returns true since pageSize is pretty less', () => {
    expect(getListHasMorePages(STATE)).toEqual(true);
  });
  it('getSelectedContent returns item #2 in content List', () => {
    expect(getSelectedContent(STATE)).toEqual(GET_CONTENTS_RESPONSE_OK[1]);
  });
  it('getSelectedContentId returns Id of selected content', () => {
    expect(getSelectedContentId(STATE)).toEqual(GET_CONTENTS_RESPONSE_OK[1].id);
  });
  it('getNextToSelectedContent returns #3 in content list', () => {
    expect(getNextToSelectedContent(STATE)).toEqual(
      GET_CONTENTS_RESPONSE_OK[2],
    );
  });
  it('getPreviousFromSelectedContent returns first item in content list', () => {
    expect(getPreviousFromSelectedContent(STATE)).toEqual(
      GET_CONTENTS_RESPONSE_OK[0],
    );
  });
  it('getStandardFilters returns filters in state', () => {
    expect(getStandardFilters(STATE)).toEqual(filters);
  });
  it('getStandardFilters returns blank', () => {
    expect(getCategoryFilters(STATE)).toEqual({});
  });
  it('getSortingFilter returns sortingFilters from state', () => {
    expect(getSortingFilters(STATE)).toEqual(sortingFilters);
  });
  it('getRequiresAuthMap has 1 item which is NWS with a value of false', () => {
    const authmap = getRequiresAuthMap(STATE);
    expect(Object.keys(authmap).length).toEqual(1);
    expect(authmap).toHaveProperty('NWS', false);
  });
});
