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
        :error-message="errorMessages.login"
        class="mb-4"
      >
        <template v-slot:prependIcon>
          <img width="24" height="24" src="~@/assets/images/person.svg"/>
        </template>
      </b-input>
      <b-input
        v-model="password"
        label="Пароль"
        outlined
        class="mb-4"
        type="password"
        :error-message="errorMessages.password"
      >
        <template v-slot:prependIcon>
          <img width="24" height="24" src="~@/assets/images/key.svg"/>
        </template>
      </b-input>
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
  computed: {
    errorMessages() {
      return {
        login: this.isErrorShown(this.$v.login) && 'Необходимо мин 3 символа',
        password: this.isErrorShown(this.$v.password) && 'Необходимо заполнить',
      };
    },
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
    isErrorShown(field) {
      return !field.valid && field.touched;
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
