import BInput from './components/BInput';
import BTextarea from './components/BTextarea';

export default {
  install(Vue) {
    Vue.component('b-input', BInput);
    Vue.component('b-textarea', BTextarea);
  },
};
