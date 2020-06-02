function validateField(dataKey, value, rulesObject) {
  const field = this.validationObject[dataKey];
  field.valid = true;

  Object.keys(rulesObject).some((ruleKey) => {
    const rule = rulesObject[ruleKey];
    const isValid = rule(value);

    if (!isValid) {
      field.valid = false;
      return true;
    }
    return false;
  });
  return field;
}

function getDataProxy(validation) {
  const vm = this;
  const valueProxy = {};
  Object.keys(validation).forEach((dataKey) => {
    let innerValue = '';
    Object.defineProperty(valueProxy, dataKey, {
      get() {
        return innerValue;
      },
      set(value) {
        const updatedFlags = validateField.call(
          vm, dataKey, value, validation[dataKey],
        );
        updatedFlags.touched = true;
        vm.validationObject[dataKey] = updatedFlags;
        innerValue = value;
      },
    });
  });

  return valueProxy;
}

function getInitialFields(validation) {
  const validationObject = {};

  Object.keys(validation).forEach((dataKey) => {
    validationObject[dataKey] = {
      touched: false,
      valid: false,
    };
  });
  return validationObject;
}

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        const { validation } = this.$options;
        if (validation) {
          this.validationObject = getInitialFields.call(this, validation);
          this.cachedValues = getDataProxy.call(this, validation);
        }
        return {};
      },
      beforeCreate() {
        const { validation } = this.$options;
        if (validation) {
          this.$options.computed = {
            ...this.$options.computed,
            $v() {
              Object.keys(validation).forEach((dataKey) => {
                if (this.cachedValues[dataKey] !== this[dataKey]) {
                  this.cachedValues[dataKey] = this[dataKey];
                }
              });

              const valid = Object.values(this.validationObject).every((field) => field.valid);
              return {
                ...this.validationObject,
                valid,
              };
            },
          };
        }
      },
    });
  },
};
