
class AsyncFileSaver {
  constructor($http) {
    this.$http = $http;
  }

  save(fieldName, file, httpOptions) {
    if (!httpOptions) {
      throw new Error('You must supply httpOptions');
    }
    const formData = new FormData();
    const key = httpOptions.param || fieldName;

    if (file[0].name === 'blob') {
      formData.append(key, file, fieldName + file[0].ext);
    } else {
      formData.append(key, file);
    }

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
