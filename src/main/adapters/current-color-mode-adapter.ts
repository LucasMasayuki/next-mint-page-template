import makeLocalStorageAdapter from '../../main/factories/local-storage-adapter-factory';
import { ColorModes } from '../../utils/constants';

export const setCurrentColorMode = (colorMode: ColorModes): void => {
  makeLocalStorageAdapter().set('color-mode', colorMode);
};

export const getCurrentColorMode = (): ColorModes => {
  return makeLocalStorageAdapter().get('color-mode');
};
