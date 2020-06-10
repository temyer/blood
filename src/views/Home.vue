<template>
  <div>
    <h1>Мои анализы</h1>
    <div>
      <analyze-list
        :list="analyzeList"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AnalyzeList from '@/components/home/AnalyzeList.vue';

export default {
  components: {
    AnalyzeList,
  },
  computed: {
    ...mapState('analyzeList', [
      'analyzeList',
    ]),
  },
};
</script>
