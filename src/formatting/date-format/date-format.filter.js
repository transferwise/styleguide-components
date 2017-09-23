function DateFormatFilter() {
    return function (date) {
        return date;
    };
}

export default angular
.module('tw.styleguide.formatting')
.filter('twDateFormat', DateFormatFilter).name;
