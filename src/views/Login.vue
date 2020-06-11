<template>
  <div class="container login-page">
    <form
      @submit.prevent="submitForm"
      class="login-form card"
    >
      <h1>Авторизация</h1>
      <b-input
        v-model="login"
        label="Логин"
        outlined
        class="mb-4"
      />
      <b-input
        v-model="password"
        label="Пароль"
        outlined
        class="mb-4"
        type="password"
      />
      <b-button>
        Войти
      </b-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, minLength } from '@/plugins/validation/rules';

export default {
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', [
      'authLogin',
    ]),
    async submitForm() {
      if (this.$v.valid) {
        try {
          await this.authLogin({
            login: this.login,
            password: this.password,
          });

          this.$router.push({ name: 'Home' });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  validation: {
    login: {
      required,
      minLength: minLength(3),
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
  padding: 32px;
}
</style>
