import creator from '../../helpers/creator';
import './BInput.scss';

const base = creator();

export default base.extend({
  name: 'b-input',
  inheritAttrs: false,
  props: {
    value: [String, Number],
    id: String,
    label: String,
    disabled: Boolean,
    required: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text',
    },
    outlined: Boolean,
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    innerId() {
      return this.id || `input-${this._uid}`; //eslint-disable-line
    },
    computedClasses() {
      return {
        'b-input_focused': this.isFocused || this.value,
        'b-input_filled': !this.outlined,
        'b-input_outlined': this.outlined,
      };
    },
  },
  methods: {
    handleFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.isFocused = false;
      this.$emit('blur', e);
      if (document.activeElement) document.activeElement.blur();
    },
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
    renderPrependIcon() {
      // return this.$createElement('div', {
      //   staticClass: 'b-input__icon b-input__prepend-icon',
      // }, 'D');
      return null;
    },
    renderAppendIcon() {
      return null;
    },
    renderLabel() {
      if (!this.label) return null;

      return this.$createElement('span', {
        staticClass: 'b-input__label',
        attrs: { for: this.innerId },
      }, this.label);
    },
    renderInput() {
      return this.$createElement('input', {
        ref: 'input',
        staticClass: 'b-input__input',
        domProps: { value: this.value },
        attrs: {
          ...this.$attrs,
          id: this.innerId,
          disabled: this.disabled,
          required: this.required,
          readonly: this.readonly,
          type: this.type,
        },
        on: {
          ...this.$listeners,
          focus: this.handleFocus,
          blur: this.handleBlur,
          input: this.handleInput,
        },
      });
    },
    renderContol() {
      return this.$createElement('div', {
        staticClass: 'b-input__control',
      }, [
        this.renderLabel(),
        this.renderInput(),
      ]);
    },
    renderContent() {
      return [
        this.renderPrependIcon(),
        this.renderContol(),
        this.renderAppendIcon(),
      ];
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'b-input',
      class: this.computedClasses,
    }, this.renderContent());
  },
});
