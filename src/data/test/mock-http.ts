// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import {
  HttpClient,
  HttpMethod,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../prootocols/http/http-client';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement([
    HttpMethod.GET,
    HttpMethod.DELETE,
    HttpMethod.POST,
    HttpMethod.PUT,
  ]),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;

  method?: string;

  body?: any;

  headers?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
