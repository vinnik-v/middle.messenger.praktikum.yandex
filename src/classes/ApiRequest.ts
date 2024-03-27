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

type options = {
    timeout: number,
    data: Record<string, unknown> | null,
    headers: Record<string, string>,
}

export default class ApiRequest {
    get = (url: string, options: options) => {
        const { data } = options;

        const reqData = data ? queryStringify(data): '';
        
        return this.request(url + reqData, METHODS.GET, options);
    };
    post = (url: string, options: options) => {
        return this.request(url, METHODS.POST, options);
    };
    put = (url: string, options: options) => {
        return this.request(url, METHODS.GET, options);
    };
    delete = (url: string, options: options) => {
        return this.request(url, METHODS.GET, options);
    };

    request = (url: string, method: METHODS, options: options, timeout = 5000) => {
        const { data, headers } = options;
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.timeout = timeout;
          xhr.open(method, url);
          const headersEntries = Object.entries(headers);
          headersEntries.forEach(([key, value])=> {
            xhr.setRequestHeader(key, value);
          })
          
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) { 
                resolve(xhr);
              } else { 
                reject(new Error(`${xhr.status}: ${xhr.statusText}`));
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
