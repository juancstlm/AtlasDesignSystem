var path = require('path')
const { getDefaultConfig } = require('expo/metro-config');
// Absolute path to your package
const packagePath = path.resolve(__dirname, '..')
    

// module.exports = {
//     resolver: {
//         nodeModulesPaths: [packagePath],
//         // rest of metro resolver options...
//     },
//     // rest of metro options...
//     watchFolders: [packagePath]
// };


/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.resolver.resolveRequest = (context, moduleName, platform) => {
// //   if (moduleName.startsWith('atlas-design-system')) {
// //     console.log({packagePath})
// //     // Logic to resolve the module name to a file path...
// //     // NOTE: Throw an error if there is no resolution.
// //     return {
// //       filePath: packagePath,
// //       type: 'sourceFile',
// //     };
// //   }

//   // Ensure you call the default resolver.
//   return context.resolveRequest(context, moduleName, platform);
// };

config.resolver.nodeModulesPaths = [...config.resolver.nodeModulesPaths, packagePath]

module.exports = config;
