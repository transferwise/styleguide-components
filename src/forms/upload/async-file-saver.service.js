
class AsyncFileSaver {
  constructor($http) {
    this.$http = $http;
  }

  save(fieldName, file, httpOptions) {
    if (!httpOptions) {
      throw new Error('You must supply httpOptions');
    }
    const formData = new FormData();
    formData.append(fieldName, file);

    const $httpOptions = prepareHttpOptions(httpOptions);

    const method = $httpOptions.method ? $httpOptions.method : 'POST';
    delete $httpOptions.method;

    // For testing
    if (method === 'GET') {
      return this.$http.get($httpOptions.url, $httpOptions);
    }
    return this.$http.post($httpOptions.url, formData, $httpOptions);
  }
}


function prepareHttpOptions($inputOptions) {
  const $httpOptions = angular.copy($inputOptions);

  if (!$httpOptions.url) {
    throw new Error('You must supply a URL to post image data asynchronously');
  }
  if (!$httpOptions.headers) {
    $httpOptions.headers = {};
  }

  $httpOptions.headers['Content-Type'] = undefined;
  $httpOptions.transformRequest = angular.identity;

  return $httpOptions;
}

AsyncFileSaver.$inject = ['$http'];

export default AsyncFileSaver;
