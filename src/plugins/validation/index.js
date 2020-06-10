function getNestedPropsByString(obj, path) {
  return path.split('.').reduce((res, pathPart) => res[pathPart], obj);
}

function isNotNested(obj) {
  return Object.values(obj).every((v) => typeof v === 'function');
}

function validateField(value, rules) {
  return Object.values(rules).every((rule) => rule(value));
}

function isFieldTrue(state, field) {
  return Object.values(state).every((flags) => {
    if (Object.prototype.hasOwnProperty.call(flags, field)) {
      return flags[field];
    }
    return isFieldTrue(flags, field);
  });
}

function isAllValid(state) {
  return isFieldTrue(state, 'valid');
}

function isAllTouched(state) {
  return isFieldTrue(state, 'touched');
}

function getDataProxy(vm, validation) {
  const valueProxy = {};
  Object.keys(validation).forEach((dataKey) => {
    const dataProp = validation[dataKey];
    if (isNotNested(dataProp)) {
      valueProxy[dataKey] = {
        touched: false,
        valid: false,
      };
      let innerValue = '';
      Object.defineProperty(valueProxy[dataKey], 'value', {
        enumerable: false,
        get() {
          return innerValue;
        },
        set(value) {
          valueProxy[dataKey].touched = true;
          valueProxy[dataKey].valid = validateField(value, dataProp);
          innerValue = value;
        },
      });
    } else {
      valueProxy[dataKey] = getDataProxy(vm, dataProp);
    }
  });

  return valueProxy;
}

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        const { validation } = this.$options;
        if (validation) {
          this.cachedValues = getDataProxy(this, validation);
          this._$touched = false;
        }
        return {};
      },
      beforeCreate() {
        const { validation } = this.$options;
        if (validation) {
          this.$options.methods = {
            ...this.$options.methods,
            watchDeep(obj, parentPath = '') {
              Object.keys(obj).forEach((dataKey) => {
                const dataProp = obj[dataKey];
                if (isNotNested(dataProp)) {
                  const dataPath = `${parentPath}${dataKey}`;
                  const vmValue = getNestedPropsByString(this, dataPath);
                  const cachedValue = getNestedPropsByString(this.cachedValues, dataPath);
                  if (cachedValue.value !== vmValue) {
                    cachedValue.value = vmValue;
                  }
                } else {
                  this.watchDeep(dataProp, `${dataKey}.`);
                }
              });
            },
          };

          this.$options.computed = {
            ...this.$options.computed,
            $v() {
              this.watchDeep(validation);
              const valid = isAllValid(this.cachedValues);
              const touched = this._$touched || isAllTouched(this.cachedValues);
              if (touched) this._$touched = true;
              return {
                ...this.cachedValues,
                touched,
                valid,
              };
            },
          };
        }
      },
    });
  },
};
