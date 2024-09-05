var path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// const extraNodeModules = {
//   "atlas-design-system": path.resolve(__dirname, "../src"),
//   react: path.resolve(__dirname, "node_modules/react"),
//   "react-native": path.resolve(__dirname, "node_modules/react-native"),
// };

const extraNodeModules = new Proxy(
  {
    "atlas-design-system": path.resolve(__dirname, "../src"),
    // Redirect any imports of 'react' or 'react-native' to the example app's node_modules
    react: path.resolve(__dirname, "node_modules/react"),
    "react-native": path.resolve(__dirname, "node_modules/react-native"),
    "moment": path.resolve(__dirname, "node_modules/moment"),
  },
  {
    get: (target, name) =>
      name in target
        ? target[name]
        : path.join(process.cwd(), `node_modules/${name}`),
  }
);

const watchFolders = [path.resolve(__dirname, "../src")];

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = extraNodeModules;
config.watchFolders = watchFolders;

module.exports = config;
