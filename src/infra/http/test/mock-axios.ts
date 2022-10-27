import axios from 'axios';
import faker from 'faker';
import { Mocked } from 'vitest';

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number(),
});

export const mockAxios = (): Mocked<typeof axios> => {
  const mockedAxios = axios as Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
