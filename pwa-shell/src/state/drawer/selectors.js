import { createSelector } from 'reselect';

export const getDrawer = state => state.drawer;

export const isOpen = createSelector(
  getDrawer,
  drawer => drawer.isOpen,
);
