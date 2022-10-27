import axios from 'axios';
import { describe, expect, Mocked, test, vi } from 'vitest';
import { mockHttpRequest } from '../../data/test/mock-http';
import { mockAxios, mockHttpResponse } from '../http/test/mock-axios';
import AxiosHttpClient from './axios-http-client';

vi.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe.concurrent('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  test('Should return correct error', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const promise = sut.request(mockHttpRequest());

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
