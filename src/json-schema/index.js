import angular from 'angular';

import AllOfSchema from './all-of-schema/';
import ArraySchema from './array-schema/';
import BasicTypeSchema from './basic-type-schema/';
import GenericSchema from './generic-schema/';
import ObjectSchema from './object-schema/';
import OneOfSchema from './one-of-schema/';

export default angular.module('tw.styleguide.json-schema', [
  AllOfSchema,
  ArraySchema,
  BasicTypeSchema,
  GenericSchema,
  ObjectSchema,
  OneOfSchema
]).name;
