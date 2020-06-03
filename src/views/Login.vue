<template>
  <div class="container login-page">
    <form
      @submit.prevent="submitForm"
      class="login-form"
    >
      <input
        placeholder="login"
        v-model="login"
      />
      <input
        placeholder="password"
        v-model="password"
      />
      <button>Войти</button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from '@/plugins/validation/rules';

export default {
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      console.log('form submitted');
    },
  },
  validation: {
    login: {
      required,
      minLength: minLength(6),
    },
    password: {
      required,
    },
  },
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.login-form {
  display: flex;
  flex-direction: column;
}
</style>
