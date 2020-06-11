<template>
  <div>
    <h1>Мои анализы</h1>
    <loading-wrapper
      :loading="loading"
      width="188"
      height="248"
    >
      <analyze-list
        :list="analyzeList"
      />
    </loading-wrapper>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AnalyzeList from '@/components/common/AnalyzeList.vue';
import LoadingWrapper from '@/components/common/LoadingWrapper';

export default {
  components: {
    LoadingWrapper,
    AnalyzeList,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState('analyzeList', [
      'analyzeList',
    ]),
  },
  async created() {
    try {
      await this.getAnalyzeList();
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
  methods: mapActions('analyzeList', [
    'getAnalyzeList',
  ]),
};
</script>
