
class AsyncFileSaver {
  constructor($http) {
    this.$http = $http;
  }

  save(fieldName, file, httpOptions, fileName) {
    if (!httpOptions) {
      throw new Error('You must supply httpOptions');
    }
    const formData = new FormData();
    const key = httpOptions.param || fieldName;
    formData.append(key, file, fileName);

    const $httpOptions = prepareHttpOptions(httpOptions);

    delete $httpOptions.method;

    // For testing
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

  // Content-Type = undefined allows the browser to choose the right type
  // https://stackoverflow.com/questions/41607656/purpose-of-content-type-undefined-in-angularjs-fileupload
  $httpOptions.headers['Content-Type'] = undefined;
  $httpOptions.transformRequest = angular.identity;

  return $httpOptions;
}

AsyncFileSaver.$inject = ['$http'];

export default angular
  .module('tw.styleguide.forms.upload.file-saver', [])
  .service('AsyncFileSaver', AsyncFileSaver)
  .name;
