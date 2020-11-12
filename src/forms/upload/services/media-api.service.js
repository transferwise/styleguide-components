import angular from 'angular';

/**
 * MediaApiService exposes the Media API of Google Spot's microapps.
 * We are only supporting media uploads with this API for web apps rendered
 * in an iframe within predefined TransferWise's Google Spot App hosts.
 * https://developers.google.com/pay/spot/eap/reference/media-api
 */
class MediaApiService {
  constructor($window, $document, $q) {
    this.$window = $window;
    this.$document = $document;
    this.$q = $q;
    this.microappsHostnames = ['www.microapps.google.com', 'microapps-prod-tt.sandbox.google.com'];
  }

  captureFromMedia(isLiveCameraUpload) {
    const request = {
      allowedMimeTypes: ['image/jpeg', ...(isLiveCameraUpload ? [] : ['application/pdf'])],
      allowedSources: ['camera', ...(isLiveCameraUpload ? [] : ['files'])]
    };

    const deferred = this.$q.defer();

    this.$window.microapps.requestMedia(request)
      .then((response) => {
        const file = this.getBlobFromMedia(response);
        return deferred.resolve(file);
      }).catch(error => deferred.reject(error));

    return deferred.promise;
  }

  /**
   * Checks if page is in an iframe within TransferWise's predefined
   * hosts and microapps is available in the window.
   * https://developers.google.com/pay/spot/eap/guides/development-setup
   */
  hasMediaUploadSupport() {
    return (
      this.$window.self !== this.$window.top && (
        this.microappsHostnames.includes(this.resolveParentHost()) && !!this.$window.microapps
      )
    );
  }

  getParentUrl() {
    if (
      this.$document[0].location.ancestorOrigins !== undefined && (
        this.$document[0].location.ancestorOrigins.length > 0
      )
    ) {
      return this.$document[0].location.ancestorOrigins[0];
    }
    return this.$document[0].referrer;
  }

  resolveParentHost() {
    const parser = this.$document[0].createElement('a');
    parser.href = this.getParentUrl();
    return parser.host;
  }

  /**
   * Converts media response to blob.
   * https://developers.google.com/pay/spot/eap/reference/media-api
   */
  // eslint-disable-next-line
  getBlobFromMedia({ bytes, mimeType }) {
    const bytesCharacters = atob(bytes);
    const byteArray = new Array(bytesCharacters.length);

    for (let i = 0; i < bytesCharacters.length; i++) {
      byteArray[i] = bytesCharacters.charCodeAt(i);
    }

    const bytesArray = new Uint8Array(byteArray);
    return new Blob([bytesArray], { type: mimeType });
  }
}

MediaApiService.$inject = ['$window', '$document', '$q'];

export default angular
  .module('tw.styleguide.forms.upload.media-api', [])
  .service('MediaApiService', MediaApiService)
  .name;
