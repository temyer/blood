<template>
  <div class="row add-analyze-row justify-between">
    <b-input
      label="Наименование"
      :value="analyzeRow.name"
      class="ml-4 mb-4"
      @input="handleFieldInput('name', $event)"
    />
    <b-input
      label="Значение"
      :value="analyzeRow.value"
      class="ml-4 mb-4"
      @input="handleFieldInput('value', $event)"
    />
    <b-select
      label="Ед. изм."
      :value="analyzeRow.unit"
      :items="items"
      item-text="unit"
      class="ml-4 mb-4"
      @input="handleFieldInput('unit', $event)"
    />
    <b-button
      class="add-analyze-row__delete-btn ml-4 mb-4"
      @click="deleteRow"
    >
      Удалить
    </b-button>
</div>
</template>

<script>
import { required } from '@/plugins/validation/rules';

export default {
  props: {
    analyzeRow: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      items: [
        { id: 1, unit: 'мкммоль/л' },
        { id: 2, unit: 'мкг/л' },
        { id: 3, unit: 'мМЕ/мл' },
        { id: 3, unit: 'пмоль/л' },
      ],
    };
  },
  methods: {
    handleFieldInput(field, value) {
      this.$emit('updateRowValues', {
        field, value, id: this.analyzeRow.id,
      });
    },
    deleteRow() {
      this.$emit('deleteRow', this.analyzeRow.id);
    },
  },
  validation: {
    analyzeRow: {
      name: {
        required,
      },
      value: {
        required,
      },
      unit: {
        required,
      },
    },
  },
};
</script>

<style lang="scss">
.add-analyze-row {
  &__delete-btn {
    background: blue;

    &:hover,
    &:focus {
      background: lighten(blue, 25);
    }
  }
}
</style>
