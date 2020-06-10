import creator from '../../helpers/creator';
import './BClickable.scss';

const base = creator();

export default base.extend({
  name: 'b-clickable',
  props: {
    outlined: Boolean,
    texted: Boolean,
  },
  computed: {
    computedClasses() {
      return {
        'b-clickable_outlined': this.outlined && !this.texted,
        'b-clickable_filled': !this.outlined && !this.texted,
        'b-clickable_texted': this.texted,
      };
    },
  },
  methods: {
    renderPrependIcon() {
      // return this.$createElement('div', {
      //   staticClass: 'b-clickable__icon',
      // }, 'D');
      return null;
    },
    renderControl() {
      return this.$createElement('span', {
        staticClass: 'b-clickable__slot',
      }, this.$slots.default);
    },
    renderContent() {
      return [
        this.renderPrependIcon(),
        this.renderControl(),
      ];
    },
  },
  render(h) {
    return h(this.tag, {
      staticClass: 'b-clickable',
      class: this.computedClasses,
      attrs: this.$attrs,
      on: this.$listeners,
    }, this.renderContent());
  },
});
