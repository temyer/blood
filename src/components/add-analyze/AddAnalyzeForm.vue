<template>
  <form>
    <b-input
      label="label"
      v-model="text"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      area: '',
    };
  },
};
</script>
