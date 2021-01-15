// /**
//  * Barrel loading all helpers autmatically note here that does not get default exports
//  */
// const req = require.context(".", true, /\.\/[^/]+\/[^/]+\.js$/);

// req.keys().forEach((key) => {
//   var exportedFunctions = Object.keys(req(key));
//   exportedFunctions.forEach((exportedFunction) => {
//     module.exports[exportedFunction] = req(key)[exportedFunction];
//   });
// });

export * from "./beacon/beacon";
export * from "./beacon/hotspot";
