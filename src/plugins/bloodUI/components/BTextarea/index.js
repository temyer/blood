import BInput from '../BInput';
import './BTextarea.scss';

export default BInput.extend({
  name: 'b-textarea',
  props: {
    rows: {
      type: [String, Number],
      default: 10,
    },
    autosize: {
      type: Boolean,
      default: true,
    },
    resizable: Boolean,
  },
  data() {
    return {
      rowHeight: 8,
    };
  },
  computed: {
    computedClasses() {
      return {
        ...BInput.options.computed.computedClasses.call(this),
        'b-input_resizable': this.resizable,
        'b-input_autosize': this.autosize,
      };
    },
  },
  mounted() {
    if (this.autosize) {
      this.calculateAutosize();
    }
  },
  methods: {
    calculateAutosize() {
      const textarea = this.$refs.input;
      if (!textarea) return;

      textarea.style.height = '0';
      const height = textarea.scrollHeight;
      const minHeight = Number(this.rows) * Number(this.rowHeight);
      textarea.style.height = `${Math.max(minHeight, height)}px`;
    },
    handleInput(e) {
      BInput.options.methods.handleInput.call(this, e);
      if (this.autosize) {
        this.calculateAutosize();
      }
    },

    renderInput() {
      const textarea = BInput.options.methods.renderInput.call(this);
      textarea.tag = 'textarea';
      textarea.data.attrs.rows = this.rows;
      delete textarea.data.attrs.type;

      textarea.data.staticClass = 'b-input__textarea';
      return textarea;
    },
  },
});
