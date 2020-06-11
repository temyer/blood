<template>
  <div class="nav pl-4 pr-4 mb-4">
    <div class="nav-centered row">
      <h2 class="nav-logo">
        Blood
      </h2>
      <ul class="nav-list">
        <li
            v-for="link in navLinks"
            :key="link.to"
            class="nav-list__item mr-3"
        >
            <b-link
              :to="link.to"
              class="nav-link"
              texted
              v-text="link.text"
            />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navLinks: [
        {
          text: 'Мой анализы',
          to: '/',
        },
        {
          text: 'Профиль',
          to: '/me',
        },
        {
          text: 'Выйти',
          to: '/logout',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 120px;
  background: $navbar-color;
  box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  color: $nav-link-color;
}

.nav-centered {
  align-items: baseline;
}

.nav-logo {
  margin-right: 8rem;
}

.nav-list {
  display: flex;
  align-items: center;

  &__item {
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
