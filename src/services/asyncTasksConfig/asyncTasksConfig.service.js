class AsyncTasksConfig {
  constructor() {
    this.apiUrl = '';
    this.headers = {};
  }

  setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setHeader(header, value) {
    this.headers[header] = value;
  }

  extendHttpOptions(inputOptions) {
    const httpOptions = angular.copy(inputOptions);
    httpOptions.headers = httpOptions.headers
      ? angular.extend(httpOptions.headers, this.headers)
      : this.headers;
    if (httpOptions.url) {
      httpOptions.url = `${this.apiUrl}${httpOptions.url}`;
    }
    return httpOptions;
  }
}

export default AsyncTasks;
