<template>
  <form class="analyze-form">
    <h2 class="analyze-form__title">
      Добавить анализ
    </h2>
    <div class="row">
      <b-input
        label="Наименование"
        v-model="text"
        class="mr-4"
      />
      <b-input
        label="Значение"
        v-model="area"
        class="mr-4"
      />
      <b-select
        label="Ед. изм."
        v-model="select"
        :items="items"
      />
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      area: '',
      select: '',
      items: [
        { id: 1, text: 'мкммоль/л' },
        { id: 2, text: 'мкг/л' },
        { id: 3, text: 'мМЕ/мл' },
        { id: 3, text: 'пмоль/л' },
      ],
    };
  },
};
</script>

<style lang="scss">
.analyze-form {
  min-width: 600px;
}
</style>
