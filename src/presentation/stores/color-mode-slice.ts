import { createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from 'presentation/app/store';
import {
  getCurrentColorMode,
  setCurrentColorMode,
} from '../../main/adapters/current-color-mode-adapter';
import { ColorModes } from '../../utils/constants';

export type ColorModeState = {
  colorMode: ColorModes;
};

const initialState: ColorModeState = {
  colorMode: getCurrentColorMode() ?? ColorModes.LIGHT,
};

export const colorModeSlice: Slice<ColorModeState> = createSlice({
  name: 'color-mode',
  initialState,
  reducers: {
    toogleColorMode: (state) => {
      state.colorMode =
        state.colorMode === ColorModes.DARK
          ? ColorModes.LIGHT
          : ColorModes.DARK;
      setCurrentColorMode(state.colorMode);
    },
  },
});

export const { toogleColorMode } = colorModeSlice.actions;

export const selectColorMode = (state: RootState) => state.colorMode;
