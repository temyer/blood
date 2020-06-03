module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/style/_vars.scss";
          @import "@/style/_indent.scss";
        `,
      },
    },
  },
};
