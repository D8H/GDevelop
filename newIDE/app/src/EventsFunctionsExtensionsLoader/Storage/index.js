// @flow

export type EventsFunctionsExtensionOpener = {
  chooseEventsFunctionExtensionFile: () => Promise<?string>,
  readEventsFunctionExtensionFile: (filepath: string) => Promise<Object>,
};

export type EventsFunctionsExtensionWriter = {
  chooseEventsFunctionExtensionFile: (
    extensionName?: string
  ) => Promise<?string>,
  writeEventsFunctionsExtension: (
    extension: gdEventsFunctionsExtension,
    filepath: string
  ) => Promise<void>,
  chooseObjectAssetFile: (objectName?: string) => Promise<?string>,
  chooseAssetsFolder: (layoutName?: string) => Promise<?string>,
  writeObjectAsset: (
    project: gdProject,
    extension: gdObject,
    filepath: string
  ) => Promise<void>,
  writeLayoutObjectAssets: (
    project: gdProject,
    layout: gdLayout,
    directoryPath: string
  ) => Promise<void>,
};
