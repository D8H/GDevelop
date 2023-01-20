// @flow
import {
  serializeToJSObject,
  serializeToObjectAsset,
} from '../../Utils/Serializer';
import { mapFor } from '../../Utils/MapFor';
import optionalRequire from '../../Utils/OptionalRequire';
const fs = optionalRequire('fs-extra');
const path = optionalRequire('path');
const remote = optionalRequire('@electron/remote');
const dialog = remote ? remote.dialog : null;

const writeJSONFile = (object: Object, filepath: string): Promise<void> => {
  if (!fs) return Promise.reject(new Error('Filesystem is not supported.'));

  try {
    const content = JSON.stringify(object, null, 2);
    return fs.ensureDir(path.dirname(filepath)).then(
      () =>
        new Promise((resolve, reject) => {
          fs.writeFile(filepath, content, (err: ?Error) => {
            if (err) {
              return reject(err);
            }

            return resolve();
          });
        })
    );
  } catch (stringifyException) {
    return Promise.reject(stringifyException);
  }
};

const addSpacesToPascalCase = (pascalCaseName: string): string => {
  let name = pascalCaseName.replace(/([A-Z]+[a-z]|\d+)/g, ' $1');
  name = name.substring(1);
  return name;
};

export default class LocalEventsFunctionsExtensionWriter {
  static chooseEventsFunctionExtensionFile = (
    extensionName?: string
  ): Promise<?string> => {
    if (!dialog) return Promise.reject('Not supported');
    const browserWindow = remote.getCurrentWindow();

    return dialog
      .showSaveDialog(browserWindow, {
        title: 'Export an extension of the project',
        filters: [
          {
            name: 'GDevelop 5 "events based" extension',
            extensions: ['json'],
          },
        ],
        defaultPath: extensionName || 'Extension.json',
      })
      .then(({ filePath }) => {
        if (!filePath) return null;
        return filePath;
      });
  };

  static writeEventsFunctionsExtension = (
    extension: gdEventsFunctionsExtension,
    filepath: string
  ): Promise<void> => {
    const serializedObject = serializeToJSObject(extension);
    return writeJSONFile(serializedObject, filepath).catch(err => {
      console.error('Unable to write the events function extension:', err);
      throw err;
    });
  };

  static chooseObjectAssetFile = (objectName?: string): Promise<?string> => {
    if (!dialog) return Promise.reject('Not supported');
    const browserWindow = remote.getCurrentWindow();

    return dialog
      .showSaveDialog(browserWindow, {
        title: 'Export an object of the project',
        filters: [
          {
            name: 'GDevelop 5 object configuration',
            extensions: ['asset.json'],
          },
        ],
        defaultPath:
          (objectName && addSpacesToPascalCase(objectName)) || 'Object',
      })
      .then(({ filePath }) => {
        if (!filePath) return null;
        return filePath;
      });
  };

  static chooseAssetsFolder = (layoutName?: string): Promise<?string> => {
    if (!dialog) return Promise.reject('Not supported');
    const browserWindow = remote.getCurrentWindow();

    return dialog
      .showOpenDialog(browserWindow, {
        title: 'Export all object of the scene into a folder',
        properties: ['openDirectory', 'createDirectory'],
        filters: [],
        defaultPath: '',
      })
      .then(({ filePaths }) =>
        filePaths && filePaths.length > 0 ? filePaths[0] : null
      );
  };

  static writeObjectAsset = (
    project: gdProject,
    exportedObject: gdObject,
    filepath: string
  ): Promise<void> => {
    const serializedObject = serializeToObjectAsset(project, exportedObject);
    return writeJSONFile(serializedObject, filepath).catch(err => {
      console.error('Unable to write the object:', err);
      throw err;
    });
  };

  static writeLayoutObjectAssets = (
    project: gdProject,
    layout: gdLayout,
    directoryPath: string
  ): Promise<any> => {
    return Promise.all(
      mapFor(0, layout.getObjectsCount(), i => {
        const exportedObject = layout.getObjectAt(i);

        const serializedObject = serializeToObjectAsset(
          project,
          exportedObject
        );
        return writeJSONFile(
          serializedObject,
          path.join(
            directoryPath,
            addSpacesToPascalCase(exportedObject.getName()) + '.asset.json'
          )
        ).catch(err => {
          console.error('Unable to write the object:', err);
          throw err;
        });
      })
    );
  };
}
