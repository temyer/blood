<template>
  <form
    class="card profile-card"
    @submit.prevent="handleSaveUser"
  >
    <h2>Мой профиль</h2>
    <b-input
      v-model="userData.name"
      label="Имя"
      outlined
      class="mb-4"
    />
    <b-input
      v-model="userData.age"
      label="Возраст"
      outlined
      class="mb-4"
    />
    <b-select
      v-model="userData.sex"
      label="Пол"
      outlined
      :items="sexList"
      class="mb-4"
    />
    <b-button
      class="profile-card__save-btn"
    >
      Сохранить
    </b-button>
  </form>
</template>

<script>
import { required, isInt } from '@/plugins/validation/rules';

export default {
  props: {
    sexList: Array,
    userDataInitial: Object,
  },
  data() {
    return {
      userData: { ...this.userDataInitial },
    };
  },
  methods: {
    handleSaveUser() {
      if (this.$v.valid) {
        this.$emit('saveUser', {
          name: this.userData.name,
          age: this.userData.age,
          sex: this.userData.sex,
        });
      }
    },
  },
  validation: {
    userData: {
      name: { required },
      age: { isInt },
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
