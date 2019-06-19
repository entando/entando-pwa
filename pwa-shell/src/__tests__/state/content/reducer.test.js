import reducer from 'state/content/reducer';
import {
  setContentList,
  setSelectedContent,
  setContentFilter,
  setCategoryFilter,
  setSortingFilter,
  pushContentList,
  setContentListMeta,
  unsetSelectedContent,
  setRequiresAuth,
  setRequiresAuthMap,
} from 'state/content/actions';
import { htmlSanitizer } from 'helpers';
import { GET_CONTENTS_RESPONSE_OK } from 'mocks/content';

jest.mock('helpers', () => ({
  htmlSanitizer: jest.fn(x => x),
}));

describe('state/content/reducer', () => {
  it('should return an object', () => {
    const state = reducer();
    expect(typeof state).toBe('object');
  });

  describe('content listing (setContentList, pushContentList)', () => {
    let state = reducer({}, setContentList(GET_CONTENTS_RESPONSE_OK));

    it('should define the content list and has same length on mock content list', () => {
      expect(state.list).toBeDefined();
      expect(state.list).toHaveLength(GET_CONTENTS_RESPONSE_OK.length);
      expect(state.list[0].id).toEqual(GET_CONTENTS_RESPONSE_OK[0].id);
    });

    it('should push an additional content list and increases to 1 on content list length', () => {
      const addtlContent = [{ id: 'JTG', typeCode: 'NWS' }];
      state = reducer(state, pushContentList(addtlContent));
      const realListSize = GET_CONTENTS_RESPONSE_OK.length;
      expect(state.list).toHaveLength(GET_CONTENTS_RESPONSE_OK.length + 1);
      expect(state.list[realListSize].id).toEqual(addtlContent[0].id);
    });
  });

  describe('selecting contents test (setSelectedContent, unsetSelectedContent)', () => {
    const selected = GET_CONTENTS_RESPONSE_OK[0];
    let state = reducer({}, setSelectedContent(selected));
    it('should set the selected content and invoked htmlSanitizer', () => {
      expect(state.selected).toBeDefined();
      expect(state.selected).toEqual(selected);
      expect(htmlSanitizer).toHaveBeenCalledWith(selected.html);
    });

    it('should unset the selected content', () => {
      state = reducer(state, unsetSelectedContent());
      expect(state.selected).toEqual({ html: '' });
    });
  });

  describe('filtering test (setContentFilter, setCategoryFilter, setSortingFilter)', () => {
    let state = reducer();

    it('filters should exist and has the correct contentType and filter', () => {
      state = reducer(state, setContentFilter('oi', 'NWS'));
      expect(state.filters).toBeDefined();
      expect(state.filters).toHaveProperty('NWS', 'oi');
    });

    it('categoryFilters should exist and has the correct contentType and filter', () => {
      state = reducer(state, setCategoryFilter('wa', 'YWA'));
      expect(state.categoryFilters).toBeDefined();
      expect(state.categoryFilters).toHaveProperty('YWA', 'wa');
    });

    it('sortingFilters should exist and has the correct contentType and filter', () => {
      state = reducer(state, setSortingFilter('ti', 'PES'));
      expect(state.sortingFilters).toBeDefined();
      expect(state.sortingFilters).toHaveProperty('PES', 'ti');
    });
  });

  describe('setContentListMeta test', () => {
    let state = reducer();
    it('should define list metas with setContentListMeta', () => {
      state = reducer(state, setContentListMeta({ page: 1, pageSize: 10 }));
      expect(state.listMeta).toBeDefined();
      expect(state.listMeta).toHaveProperty('page', 1);
      expect(state.listMeta).toHaveProperty('pageSize', 10);
    });
  });

  describe('requiresAuthMap test', () => {
    let state = reducer();
    it('should have the parameters store in requiresAuthMap', () => {
      state = reducer(state, setRequiresAuth('aw', true));
      expect(state.requiresAuthMap).toBeDefined();
      expect(state.requiresAuthMap).toHaveProperty('aw', true);
    });

    it('should have populated a map in requiresAuthMap', () => {
      const themap = [
        { id: 'NWS1', groups: ['free'] },
        { id: 'NWS2', groups: ['notfree'] },
      ];
      state = reducer(state, setRequiresAuthMap(themap));
      expect(state.requiresAuthMap).toHaveProperty('NWS1', false);
      expect(state.requiresAuthMap).toHaveProperty('NWS2', true);
    });
  });
});
