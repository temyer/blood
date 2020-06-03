<template>
  <ul class="analyze-list">
    <li
      v-for="analyze in list"
      :key="analyze.id"
    >
    </li>
    <li class="card analyze-list__item analyze-list__item_empty">
      <img width="100" height="100" src="~@/assets/images/add.svg"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss">
.analyze-list {
  &__item {
    display: inline-block;
    width: 180px;
    height: 240px;
    cursor: pointer;
    transition: box-shadow $animation-fast;

    &:hover {
      box-shadow: 0 4px 2px -2px rgba(0,0,0,.24),
        0 3px 3px 0 rgba(0,0,0,.18),
        0 2px 6px 0 rgba(0,0,0,.16);
    }

    &_empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
