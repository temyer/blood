<template>
  <div>
    <div class="card">
      <add-analyze-form
        :is-edit="!!analyzeId"
        :initial-list="initialList"
        @saveAnalyze="handleSaveAnalyze"
        @deleteAnalyze="handleDeleteAnalyze"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AddAnalyzeForm from '@/components/add-analyze/AddAnalyzeForm.vue';

export default {
  components: {
    AddAnalyzeForm,
  },
  data() {
    return {
      initialList: null,
    };
  },
  computed: {
    ...mapGetters('analyzeList', [
      'getAnalyzeById',
    ]),
    analyzeId() {
      return Number(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions('analyzeList', [
      'addAnalyze',
      'editAnalyze',
      'deleteAnalyze',
    ]),
    handleSaveAnalyze(list) {
      if (this.analyzeId) {
        this.editAnalyze({ item: list, id: this.analyzeId });
      } else {
        this.addAnalyze(list);
      }

      this.$router.push({ name: 'Home' });
    },
    handleDeleteAnalyze() {
      if (this.analyzeId) {
        this.deleteAnalyze(this.analyzeId);
      }

      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    if (this.analyzeId) {
      this.initialList = this.getAnalyzeById(this.analyzeId);
    }
  },
};
</script>

<style lang="scss">

</style>
