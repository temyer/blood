/* eslint no-param-reassign: 0 */
/* eslint no-underscore-dangle: 0 */
export default {
  bind(el, binding) {
    el.__clickOutsideEventHandler = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.__clickOutsideEventHandler);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.__clickOutsideEventHandler);
  },
};
