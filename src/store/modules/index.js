const requireModule = require.context(
  '.',
  false,
  /^((?!index).)+\.js$/,
);

const modules = {};

requireModule.keys().forEach((filePath) => {
  const storeModule = requireModule(filePath).default;
  const moduleName = filePath
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  storeModule.namespaced = true;
  modules[moduleName] = storeModule;
});

export default modules;
