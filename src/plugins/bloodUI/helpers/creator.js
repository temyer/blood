import Vue from 'vue';

export default function (...mixins) {
  return Vue.extend({ mixins });
}
