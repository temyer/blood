<template>
  <ul class="analyze-list row">
    <li
      v-for="analyze in list"
      :key="analyze.id"
      class="card analyze-list__item"
      @click="$router.push(`/analyze/${analyze.id}`)"
    >
      <p class="analyze-list__text">
        <span>Создан:</span>
        <b>{{ formatDate(new Date(analyze.createdAt)) }}</b>
      </p>
      <p
        v-if="analyze.updatedAt"
        class="analyze-list__text"
      >
        <span>Обновлен:</span>
        <b>{{ formatDate(new Date(analyze.updatedAt)) }}</b>
      </p>
    </li>
    <li class="card analyze-list__item analyze-list__item_empty"
      @click="$router.push('/analyze/create')"
    >
      <img width="100" height="100" src="~@/assets/images/add.svg"/>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '@/utils';

export default {
  props: {
    list: Array,
  },
  methods: {
    formatDate,
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

  &__text {
    display: flex;
    flex-direction: column;
  }
}
</style>
