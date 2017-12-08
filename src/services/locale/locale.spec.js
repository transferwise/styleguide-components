describe('TwDateService test', function() {
  'use strict';

  var LocaleService;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    LocaleService = $injector.get('TwLocaleService');
  }));

  describe('when getting the locale', function() {
    it('should return en-GB by default', function () {
      expect(LocaleService.getCurrent()).toBe('en-GB');
    });
  });

  describe('when setting the locale to a valid full locale', function() {
    beforeEach(function() {
      LocaleService.setCurrent('fr-FR');
    });
    it('should update the locale', function () {
      expect(LocaleService.getCurrent()).toBe('fr-FR');
    });
  });

  describe('when setting the locale to a valid language locale', function() {
    beforeEach(function() {
      LocaleService.setCurrent('fr');
    });
    it('should update the locale', function () {
      expect(LocaleService.getCurrent()).toBe('fr');
    });
  });

  describe('when setting the locale with uncapitalised country', function() {
    beforeEach(function() {
      LocaleService.setCurrent('fr-fr');
    });
    it('should change the case', function () {
      expect(LocaleService.getCurrent()).toBe('fr-FR');
    });
  });

  describe('when setting the locale with an incorrect value', function() {
    var setIncorrect;
    beforeEach(function() {
      setIncorrect = function() {
        LocaleService.setCurrent('xyz');
      }
    });
    it('should fall back to en-GB', function () {
      expect(LocaleService.getCurrent()).toBe('en-GB');
    });
  });
});
