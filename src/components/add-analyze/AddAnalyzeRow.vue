<template>
  <div class="row add-analyze-row">
    <b-input
      label="Наименование"
      :value="analyzeRow.name"
      class="mr-4 add-analyze-row__widest"
      @input="handleFieldInput('name', $event)"
    />
      <b-input
      label="Значение"
      :value="analyzeRow.value"
      class="mr-4"
      @input="handleFieldInput('value', $event)"
    />
    <b-select
      label="Ед. изм."
      :value="analyzeRow.unit"
      :items="items"
      item-text="unit"
      @input="handleFieldInput('unit', $event)"
    />
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
  &__widest {
    flex: 1 1 0;
  }
}
</style>
