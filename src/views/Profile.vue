<template>
  <loading-wrapper
    :loading="loading"
    width="285"
    height="378"
  >
    <profile-card
      :user-data-initial="userData"
      :sex-list="sexList"
      @saveUser="saveUser"
    />
  </loading-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import ProfileCard from '@/components/profile/ProfileCard.vue';
import LoadingWrapper from '@/components/common/LoadingWrapper';

export default {
  components: {
    ProfileCard,
    LoadingWrapper,
  },
  data() {
    return {
      loading: true,
      sexList: [],
      userData: {
        name: '',
        age: '',
        sex: '',
      },
    };
  },
  async created() {
    try {
      await Promise.all([
        this.initUserData(),
        this.initSexList(),

      ]);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions('profile', [
      'getSexList',
      'saveUser',
      'getUser',
    ]),
    async initUserData() {
      const user = await this.getUser();
      this.userData = Object.assign(this.userData, user);
    },
    async initSexList() {
      this.sexList = await this.getSexList();
    },
  },
};
</script>

<style lang="scss">
.profile-card {
  &__save-btn {
    width: 100%;
  }
}
</style>
