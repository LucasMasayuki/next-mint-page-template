import LocalStorageAdapter from '../../infra/cache/local-storage-adapter';

const makeLocalStorageAdapter = (): LocalStorageAdapter =>
  new LocalStorageAdapter();

export default makeLocalStorageAdapter;
