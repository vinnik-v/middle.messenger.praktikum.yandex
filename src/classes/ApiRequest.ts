const BASE_API_URI = 'https://ya-praktikum.tech';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data: Record<string, unknown>) {
  if (!data) return undefined;
  if (typeof data === 'object') {
    return '?' + Object.entries(data).map(item => {
      let elem = item[1];
      if (Array.isArray(item[1])) {
        elem = item[1].join()
      } else if (typeof item[1] === 'object') {
        elem = JSON.stringify(item[1]);
      }

      return item[0] + '=' + elem;
    }).join('&');
  } else throw new Error('Wrond data type');
}

type Options = {
  timeout?: number,
  data: Record<string, unknown> | null,
  headers: Record<string, string>,
  credentials?: string
}

type HTTPMethod = (path: string, options: Options) => Promise<XMLHttpRequest>;
type Request = (path: string, method: METHODS, options: Options, timeout?: number) => Promise<XMLHttpRequest>;

export default class ApiRequest {

  _apiUrl: string = '';
  _baseApiUrl: string = '';

  constructor(apiSubUrl: string) {
    this._apiUrl = BASE_API_URI + apiSubUrl;
  }

  get: HTTPMethod = (path, options) => {
    const { data } = options;

    const reqData = data ? queryStringify(data) : '';

    return this.request(path + reqData, METHODS.GET, options);
  };
  post: HTTPMethod = (path, options) => {
    return this.request(path, METHODS.POST, options);
  };
  put: HTTPMethod = (path, options) => {
    return this.request(path, METHODS.PUT, options);
  };
  delete: HTTPMethod = (path, options) => {
    return this.request(path, METHODS.DELETE, options);
  };

  request: Request = (path, method, options, timeout = 5000) => {
    const { data, headers, credentials } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open(method, this._apiUrl + path);
      const headersEntries = Object.entries(headers);
      headersEntries.forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      })

      credentials && credentials === 'include' ? xhr.withCredentials = true : undefined;

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(
            xhr.status === 401 ? 'Ошибка авторизации, проверьте логин и пароль' :
              xhr.status === 400 ? JSON.parse(xhr.response).reason ? `Ошибка: ${JSON.parse(xhr.response).reason}` : 'Неизвестная ошибки' :
                `Ошибка ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`));
      xhr.ontimeout = () => reject(new Error('Превышен таймаут'));

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
