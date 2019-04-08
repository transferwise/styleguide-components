import angular from 'angular';

import AllOfSchema from './all-of-schema/';
import ArraySchema from './array-schema/';
import BasicTypeSchema from './basic-type-schema/';
import GenericSchema from './generic-schema/';
import ObjectSchema from './object-schema/';
import OneOfSchema from './one-of-schema/';
import Utils from './utils/';

export default angular.module('tw.json-schema', [
  AllOfSchema,
  ArraySchema,
  BasicTypeSchema,
  GenericSchema,
  ObjectSchema,
  OneOfSchema,
  Utils
]).name;
