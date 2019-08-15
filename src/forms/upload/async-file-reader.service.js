
class AsyncFileReader {
  constructor($q) {
    this.$q = $q;
  }

  read(file) {
    const reader = new FileReader();
    const deferred = this.$q.defer();

    // When the reader finishes loading resolve the promise
    reader.onload = (event) => {
      deferred.resolve(event.target.result);
    };

    reader.onerror = (event) => {
      deferred.reject(event);
    };

    // Load the file
    reader.readAsDataURL(file);

    return deferred.promise;
  }
}

AsyncFileReader.$inject = ['$q'];

export default AsyncFileReader;
