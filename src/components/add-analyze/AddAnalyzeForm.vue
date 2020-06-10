<template>
  <form
   class="analyze-form"
   @submit.prevent="addNewRow"
  >
    <div class="row justify-between align-center mb-4">
      <h2 class="analyze-form__title">
        {{ analyzeFormTitle }}
      </h2>
      <b-button
        v-if="isEdit"
        class="analyze-form__delete-btn"
        @click="removeAnalyze"
      >
        Удалить анализ
      </b-button>
    </div>
    <add-analyze-row
      ref="list"
      v-for="analyzeRow in analyzeList"
      :key="analyzeRow.id"
      :analyzeRow="analyzeRow"
      @updateRowValues="handleUpdateRow"
      @deleteRow="handleDeleteRow"
    />
    <div class="row justify-between pl-4">
      <b-button type="submit" class="mr-4 mb-4">
        Добавить значение
      </b-button>
      <b-button
        type="button"
        @click="saveAnalyze"
      >
        Сохранить анализ
      </b-button>
    </div>
  </form>
</template>

<script>
import AddAnalyzeRow from './AddAnalyzeRow.vue';

export default {
  components: {
    AddAnalyzeRow,
  },
  props: {
    isEdit: Boolean,
    initialList: Object,
  },
  data() {
    const analyzeList = this.initialList
      ? [...this.initialList.data]
      : [this.getNewRow()];

    return {
      analyzeList,
      items: [
        { id: 1, text: 'мкммоль/л' },
        { id: 2, text: 'мкг/л' },
        { id: 3, text: 'мМЕ/мл' },
        { id: 3, text: 'пмоль/л' },
      ],
    };
  },
  computed: {
    analyzeFormTitle() {
      return this.isEdit ? 'Редактировать анализ' : 'Добавить анализ';
    },
  },
  methods: {
    getNewRow() {
      return {
        id: +Date.now(),
        name: '',
        value: '',
        unit: '',
      };
    },
    isLastRowValid() {
      const lastChild = this.$refs.list[this.analyzeList.length - 1];
      return lastChild.$v.valid;
    },
    addNewRow() {
      if (this.isLastRowValid()) {
        this.analyzeList.push(this.getNewRow());
      }
    },
    handleDeleteRow(id) {
      if (this.analyzeList.length > 1) {
        this.analyzeList = this.analyzeList.filter((r) => r.id !== id);
      }
    },
    handleUpdateRow({ id, field, value }) {
      const row = this.analyzeList.find((r) => r.id === id);
      row[field] = value;
    },
    saveAnalyze() {
      if (this.isLastRowValid()) {
        this.$emit('saveAnalyze', this.analyzeList);
      }
    },
    removeAnalyze() {
      this.$emit('deleteAnalyze');
    },
  },
};
</script>

<style lang="scss">
.analyze-form {
  &__delete-btn {
    background: blue;

    &:hover,
    &:focus {
      background: lighten(blue, 25);
    }
  }
}
</style>
