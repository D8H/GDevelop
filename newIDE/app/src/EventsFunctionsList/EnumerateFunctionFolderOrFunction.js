// @flow

import { mapFor } from '../Utils/MapFor';

export const getFunctionFolderOrFunctionUnifiedName = (
  functionFolderOrFunction: gdFunctionFolderOrFunction
): string =>
  functionFolderOrFunction.isFolder()
    ? functionFolderOrFunction.getFolderName()
    : functionFolderOrFunction.getFunction().getName();

const recursivelyEnumerateFoldersInFolder = (
  folder: gdFunctionFolderOrFunction,
  prefix: string,
  result: {| path: string, folder: gdFunctionFolderOrFunction |}[]
) => {
  mapFor(0, folder.getChildrenCount(), i => {
    const child = folder.getChildAt(i);
    if (child.isFolder()) {
      const newPrefix = prefix
        ? prefix + ' > ' + child.getFolderName()
        : child.getFolderName();
      result.push({
        path: newPrefix,
        folder: child,
      });
      recursivelyEnumerateFoldersInFolder(child, newPrefix, result);
    }
  });
};

const recursivelyEnumerateFunctionsInFolder = (
  folder: gdFunctionFolderOrFunction,
  result: gdEventsFunction[]
) => {
  mapFor(0, folder.getChildrenCount(), i => {
    const child = folder.getChildAt(i);
    if (!child.isFolder()) {
      result.push(child.getFunction());
    } else {
      recursivelyEnumerateFunctionsInFolder(child, result);
    }
  });
};

export const enumerateFunctionsInFolder = (
  folder: gdFunctionFolderOrFunction
): gdEventsFunction[] => {
  if (!folder.isFolder()) return [];
  // $FlowFixMe[missing-empty-array-annot]
  const result = [];
  // $FlowFixMe[incompatible-type]
  recursivelyEnumerateFunctionsInFolder(folder, result);
  // $FlowFixMe[incompatible-type]
  return result;
};

export const enumerateFoldersInFolder = (
  folder: gdFunctionFolderOrFunction
): {| path: string, folder: gdFunctionFolderOrFunction |}[] => {
  if (!folder.isFolder()) return [];
  // $FlowFixMe[missing-empty-array-annot]
  const result = [];
  // $FlowFixMe[incompatible-type]
  recursivelyEnumerateFoldersInFolder(folder, '', result);
  // $FlowFixMe[incompatible-type]
  return result;
};

export const enumerateFoldersInContainer = (
  container: gdEventsFunctionsContainer
): {| path: string, folder: gdFunctionFolderOrFunction |}[] => {
  const rootFolder = container.getRootFolder();
  // $FlowFixMe[missing-empty-array-annot]
  const result = [];
  // $FlowFixMe[incompatible-type]
  recursivelyEnumerateFoldersInFolder(rootFolder, '', result);
  // $FlowFixMe[incompatible-type]
  return result;
};

export const getFunctionsInFolder = (
  functionFolderOrFunction: gdFunctionFolderOrFunction
): gdEventsFunction[] => {
  if (!functionFolderOrFunction.isFolder()) return [];
  return mapFor(0, functionFolderOrFunction.getChildrenCount(), i => {
    const child = functionFolderOrFunction.getChildAt(i);
    if (child.isFolder()) {
      return null;
    }
    return child.getFunction();
  }).filter(Boolean);
};

export const getFoldersAscendanceWithoutRootFolder = (
  functionFolderOrFunction: gdFunctionFolderOrFunction
): gdFunctionFolderOrFunction[] => {
  if (functionFolderOrFunction.isRootFolder()) return [];
  const parent = functionFolderOrFunction.getParent();
  if (parent.isRootFolder()) return [];
  return [parent, ...getFoldersAscendanceWithoutRootFolder(parent)];
};
