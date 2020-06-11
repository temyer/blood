import BInput from '../BInput';
import './BSelect.scss';

export default BInput.extend({
  name: 'b-select',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    itemValue: {
      type: String,
      default: 'id',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    noDataText: {
      type: String,
      default: 'Список пуст',
    },
    transition: {
      type: [String, Boolean],
      default: 'fade',
    },
  },
  data() {
    return {
      isMenuOpen: false,
      activeItem: {},
      focusIndex: 0,
    };
  },
  computed: {
    smartClickOutside() {
      return this.isMenuOpen && [{
        name: 'click-outside',
        value: this.handleBlur,
      }];
    },
  },
  watch: {
    activeItem(val) {
      const value = val ? val[this.itemValue] : null;
      this.$emit('input', value);
    },
    // items() {
    //   this.renderItems();
    // },
  },
  created() {
    if (this.value || this.value === 0) {
      const initValue = this.items.find((item) => item[this.itemValue] === this.value);
      this.activeItem = initValue;
    }
  },
  methods: {
    handleFocus(e) {
      BInput.options.methods.handleFocus.call(this, e);
      if (this.readonly || this.isMenuOpen) return;
      this.focusIndex = this.activeItem.id
        ? this.items.findIndex((item) => item === this.activeItem)
        : 0;
      this.isMenuOpen = true;
      this.$nextTick(() => {
        this.scrollItemToView();
      });
    },
    handleBlur(e) {
      BInput.options.methods.handleBlur.call(this, e);
      this.isMenuOpen = false;
    },
    handleKeydown(e) {
      const { keyCode } = e;
      // esc
      if (keyCode === 27) {
        return this.handleBlur(e);
      }
      // up down
      if (keyCode === 38 || keyCode === 40) {
        this.handleArrowKeyDown(keyCode);
      }
      // enter
      if (keyCode === 13) {
        e.preventDefault();
        this.handleListItemClick(this.items[this.focusIndex]);
      }
      // tab
      if (keyCode === 9) {
        e.preventDefault();
        this.handleArrowKeyDown(40); // имитация стрелки вниз
      }
      return this.$emit('keydown', e);
    },
    handleArrowKeyDown(keyCode) {
      // down
      if (keyCode === 38) {
        this.focusIndex -= 1;
        if (this.focusIndex < 0) {
          this.focusIndex = this.items.length - 1;
        }
      }
      // up
      if (keyCode === 40) {
        this.focusIndex += 1;
        if (this.focusIndex === this.items.length) {
          this.focusIndex = 0;
        }
      }

      this.scrollItemToView();
    },
    scrollItemToView() {
      if (this.$refs.list) {
        this.$refs.list.children[this.focusIndex].scrollIntoView({ block: 'nearest' });
      }
    },
    handleListItemClick(selectedItem) {
      this.activeItem = selectedItem;
      this.handleBlur();
    },
    renderListItem(item, index, clickable = true) {
      return this.$createElement('li', {
        staticClass: 'b-select__list-item',
        class: {
          'b-select__list-item_focused': index === this.focusIndex,
          'b-select__list-item_active': this.activeItem === item,
        },
        attrs: {
          tabindex: '0',
        },
        on: {
          click: () => {
            if (!clickable) {
              this.handleBlur();
            } else {
              this.handleListItemClick(item);
            }
          },
          mouseover: () => {
            this.focusIndex = index;
          },
        },
      }, item[this.itemText]);
    },
    renderItems() {
      const content = this.items.length
        ? this.items.map(this.renderListItem)
        : [this.renderListItem(
          { [this.itemValue]: -1, [this.itemText]: this.noDataText }, 0, false,
        )];
      return this.$createElement('ul', {
        staticClass: 'b-select__list',
        ref: 'list',
      }, content);
    },
    renderInput() {
      const field = BInput.options.methods.renderInput.call(this);
      field.data.attrs.readonly = true;
      field.data.attrs.tabindex = '-1';
      field.data.staticClass = 'b-select__field';
      field.data.on = {};

      field.data.domProps = { value: this.activeItem[this.itemText] };

      return field;
    },
    renderMenu() {
      if (!this.isMenuOpen) return null;
      return this.$createElement('div', {
        staticClass: 'b-select__menu',
      }, [this.renderItems()]);
    },
    renderTransition() {
      const content = this.renderMenu();
      if (!this.transition) return content;

      return this.$createElement('transition', {
        props: { name: this.transition },
      }, [content]);
    },
    renderContent() {
      return [
        this.renderPrependIcon(),
        this.renderContol(),
        this.renderAppendIcon(),
        this.renderTransition(),
      ];
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'b-input b-select',
      class: this.computedClasses,
      directives: this.smartClickOutside,
      attrs: {
        tabindex: '0',
      },
      on: {
        focus: this.handleFocus,
        click: this.handleFocus,
        blur: this.handleBlur,
        keydown: this.handleKeydown,
      },
    }, this.renderContent());
  },
});
