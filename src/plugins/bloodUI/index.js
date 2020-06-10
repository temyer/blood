import BInput from './components/BInput';
import BTextarea from './components/BTextarea';
import BSelect from './components/BSelect';
import BButton from './components/BButton';
import BLink from './components/BLink';

import clickOutside from './directives/click-outside';

export default {
  install(Vue) {
    Vue.component('b-input', BInput);
    Vue.component('b-textarea', BTextarea);
    Vue.component('b-select', BSelect);
    Vue.component('b-button', BButton);
    Vue.component('b-link', BLink);

    Vue.directive('click-outside', clickOutside);
  },
};
