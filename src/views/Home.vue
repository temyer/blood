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
import AnalyzeList from '@/components/home/AnalyzeList.vue';

export default {
  components: {
    AnalyzeList,
  },
  data() {
    return {
      analyzeList: [],
    };
  },
  computed: {},
};
</script>
