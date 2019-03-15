import { OPEN_DRAWER, CLOSE_DRAWER } from 'state/drawer/types';

export const openDrawer = () => ({
  type: OPEN_DRAWER,
});

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});
