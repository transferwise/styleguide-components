import angular from 'angular';
import Component from './component';

import BasicTypeSchema from '../basic-type-schema';
import ObjectSchema from '../object-schema';
import ArraySchema from '../array-schema';
import AllOfSchema from '../all-of-schema';
import OneOfSchema from '../one-of-schema';

export default angular
  .module('tw.json-schema.generic', [
    BasicTypeSchema,
    ObjectSchema,
    ArraySchema,
    AllOfSchema,
    OneOfSchema
  ])
  .component('genericSchema', Component).name;
