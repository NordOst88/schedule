import {
  SET_VIEW_MODE,
  SET_USER,
  SET_EVENTS,
  SET_LIST_VIEW,
  SET_TIMEZONE,
  SET_TASK,
  SET_COLOR,
  SET_SELECTED_ITEMS,
  SET_SELECTED_ITEMS_VISIBILITY,
  SET_TABLE_EDIT_MODE,
  SET_FONT_SIZE,
} from './actions-types';

import { DEFAULT_FONT_SIZE, ADJUST_FONT_SIZE } from '../constants/constants';

const onTimezoneChange = (timezone) => ({ type: SET_TIMEZONE, timezone });
const onViewModeChange = (mode) => ({ type: SET_VIEW_MODE, mode });
const onSetUser = (user) => ({ type: SET_USER, user });
const onSetEvents = (events) => ({ type: SET_EVENTS, events });
const onSetListView = ({ target: { value } }) => ({ type: SET_LIST_VIEW, listView: value });
const onTaskChange = (task) => ({ type: SET_TASK, selectedTask: task });
const onSetTableEditMode = (tableEditMode) => ({ type: SET_TABLE_EDIT_MODE, tableEditMode });
const onEventColorChange = (colorPreset) => ({ type: SET_COLOR, colorPreset });
const onFontSizeChange = (fontSize) => {
  if (+fontSize === DEFAULT_FONT_SIZE) {
    return { type: SET_FONT_SIZE, fontSize: ADJUST_FONT_SIZE };
  }
  return { type: SET_FONT_SIZE, fontSize: DEFAULT_FONT_SIZE };
};
const onSetSelectedItems = (selectedRowKeys) => ({ type: SET_SELECTED_ITEMS, selectedRowKeys });
const onSetSelectedItemsVisibility = (isHiddenRowKeys) => ({
  type: SET_SELECTED_ITEMS_VISIBILITY,
  isHiddenRowKeys,
});

export {
  onViewModeChange,
  onSetUser,
  onSetEvents,
  onSetListView,
  onTimezoneChange,
  onTaskChange,
  onEventColorChange,
  onSetSelectedItems,
  onSetSelectedItemsVisibility,
  onSetTableEditMode,
  onFontSizeChange,
};
