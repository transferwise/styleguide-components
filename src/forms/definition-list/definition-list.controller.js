class DefinitionListController {
  $onInit() {
    if (!this.fields.forEach) {
      return;
    }
    this.fields.forEach((field) => {
      if (field.group) {
        field.group.forEach((fieldSection) => {
          if (fieldSection.displayFormat &&
            fieldSection.displayFormat.indexOf('||') > 0) {
            fieldSection.displayFormat = fieldSection.displayFormat.substring(
              0,
              fieldSection.displayFormat.indexOf('||')
            );
          }
        });
      } else if (field.displayFormat &&
        field.displayFormat.indexOf('||') > 0) {
        field.displayFormat = field.displayFormat.substring(
          0,
          field.displayFormat.indexOf('||')
        );
      }
    });
  }
  
  // eslint-disable-next-line
  getValueLabel(options, value) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        return options[i].label;
      }
    }
    return value;
  }

  // eslint-disable-next-line
  mask(value) {
    return new Array(value.length + 1).join('*');
  }
}

export default DefinitionListController;
