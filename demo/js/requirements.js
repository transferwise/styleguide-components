angular.module('tw.styleguide.docs', [])
  .config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }])
  .controller('PageController', function () {
    this.log = function (message) { console.log(message); };

    this.fieldsetBasic = {
      legend: "Legend",
      fields: [{
        type: "text",
        name: "Control label",
        key: "keyName"
      }]
    };
    this.fieldsetBasicModel = {
      keyName: "Example"
    };
  });
