(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.service('TwRequirementsService', TwRequirementsService);

	function TwRequirementsService() {
		this.cleanRequirementsModel = function(model, oldRequirements, newRequirements) {
			var oldFieldNames = getFieldNamesFromRequirement(oldRequirements);
			var newFieldNames = getFieldNamesFromRequirement(newRequirements);
			var obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
				return newFieldNames.indexOf(fieldName) < 0;
			});
			obsoleteFieldNames.forEach(function(fieldName) {
				delete model[fieldName];
			});
		};

		this.findRequirementByType = function(type, requirements) {
			if (!requirements) {
				return false;
			}
			for (var i=0; i < requirements.length; i++) {
				var modelType = requirements[i];
				if (modelType.type === type) {
					return modelType;
				}
			}
			return false;
		};

		this.prepRequirements = function(types) {
			types.forEach(function(type) {
				prepType(type);
			});
		};

		function getFieldNamesFromRequirement(modelRequirement) {
			var names = modelRequirement.fields.map(function(fieldGroup) {
				return fieldGroup.group.map(function(field) {
					return field.key;
				});
			});
			return Array.prototype.concat.apply([], names);
		}

		function prepType(type) {
			if (!type.label) {
				type.label = getTabName(type.type);
			}
		}

		function getTabName(tabType) {
			if (tabType && tabType.length > 0) {
				var tabNameWithSpaces = tabType.toLowerCase().split('_').join(' '); // String.replace method only replaces first instance
				return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
			} else {
				return '';
			}
		}
	}
})(window.angular);
