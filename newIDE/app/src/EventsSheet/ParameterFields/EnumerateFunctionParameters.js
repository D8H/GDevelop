// @flow
import { mapVector } from '../../Utils/MapFor';
const gd: libGDevelop = global.gd;

export const enumerateParametersUsableInExpressions = (
  eventsFunctionsContainer: gdEventsFunctionsContainer,
  eventsFunction: gdEventsFunction
): Array<gdParameterMetadata> => {
  return mapVector(
    eventsFunction.getParametersForEvents(eventsFunctionsContainer),
    parameterMetadata =>
      parameterMetadata.isCodeOnly() ||
      parameterMetadata.getType().isObject() ||
      parameterMetadata.getType().isBehavior()
        ? null
        : parameterMetadata
  ).filter(Boolean);
};
