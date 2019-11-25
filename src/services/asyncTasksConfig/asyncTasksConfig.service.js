class AsyncTasksConfig {
  constructor() {
    this.baseUrl = '';
    this.headers = {};
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setHeader(header, value) {
    this.headers[header] = value;
  }

  extendHttpOptions(inputOptions) {
    const httpOptions = angular.copy(inputOptions);
    httpOptions.headers = httpOptions.headers
      ? { ...httpOptions.headers, ...this.headers }
      : this.headers;
    if (httpOptions.url) {
      httpOptions.url = `${this.baseUrl}${httpOptions.url}`;
    }
    return httpOptions;
  }
}

export default AsyncTasksConfig;
