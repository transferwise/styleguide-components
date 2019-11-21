describe('AsyncTasksConfig', () => {
  let service;

  beforeEach(() => {
    angular.mock.module('tw.styleguide.services.async-tasks-config');

    angular.mock.inject(($injector) => {
      service = $injector.get('AsyncTasksConfig');
    });
  });

  describe('when calling setBaseUrl', () => {
    it('should set baseUrl', () => {
      const baseUrl = 'http://localhost';
      service.setBaseUrl(baseUrl);
      expect(service.baseUrl).toEqual(baseUrl);
    });
  });

  describe('when calling setHeader', () => {
    it('should set header', () => {
      const header = 'Authorization';
      const value = 'Bearer 1234567890';
      service.setHeader(header, value);
      expect(service.headers).toEqual({
        [header]: value
      });
    });

    it('should set multiple headers when needed', () => {
      const header = 'Authorization';
      const value = 'Bearer 1234567890';
      const header2 = 'Accept-Language';
      const value2 = 'en';
      service.setHeader(header, value);
      service.setHeader(header2, value2);
      expect(service.headers).toEqual({
        [header]: value,
        [header2]: value2
      });
    });
  });

  describe('when calling extendHttpOptions', () => {
    it('will extend options with defaults', () => {
      const httpOptions = {
        method: 'GET',
        url: '/path'
      };

      const extendedHttpOptions = service.extendHttpOptions(httpOptions);
      expect(extendedHttpOptions).toEqual({
        method: 'GET',
        url: '/path',
        headers: {}
      });
    });
    it('will extend options with predefined baseUrl and headers', () => {
      const baseUrl = 'http://localhost';
      const header = 'Authorization';
      const value = 'Bearer 1234567890';
      const httpOptions = {
        method: 'GET',
        url: '/path'
      };

      service.setBaseUrl(baseUrl);
      service.setHeader(header, value);

      const extendedHttpOptions = service.extendHttpOptions(httpOptions);
      expect(extendedHttpOptions).toEqual({
        method: 'GET',
        url: `${baseUrl}/path`,
        headers: {
          [header]: value
        }
      });
    });
  });
});
