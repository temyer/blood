<template>
  <form
   class="analyze-form"
   @submit.prevent="addNewRow"
  >
    <h2 class="analyze-form__title">
      Добавить анализ
    </h2>
    <add-analyze-row
      v-for="analyzeRow in analyzeList"
      :key="analyzeRow.id"
      :analyzeRow="analyzeRow"
      @updateRowValues="handleUpdateRow"
    />
    <button
      type="submit"
    >add</button>
  </form>
</template>

<script>
import AddAnalyzeRow from './AddAnalyzeRow.vue';

let analyzeId = -1;

export default {
  components: {
    AddAnalyzeRow,
  },
  data() {
    return {
      analyzeList: [this.getNewRow()],
      items: [
        { id: 1, text: 'мкммоль/л' },
        { id: 2, text: 'мкг/л' },
        { id: 3, text: 'мМЕ/мл' },
        { id: 3, text: 'пмоль/л' },
      ],
    };
  },
  methods: {
    getNewRow() {
      analyzeId += 1;
      return {
        id: analyzeId,
        name: '',
        value: '',
        unit: '',
      };
    },
    addNewRow() {
      this.analyzeList.push(this.getNewRow());
    },
    handleUpdateRow({ id, field, value }) {
      const row = this.analyzeList.find((r) => r.id === id);
      row[field] = value;
    },
  },
};
</script>

<style lang="scss">
.analyze-form {
  min-width: 600px;
}
</style>
