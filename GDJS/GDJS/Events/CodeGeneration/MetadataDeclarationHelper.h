/*
 * GDevelop Core
 * Copyright 2008-2023 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#pragma once

#include "GDCore/IDE/Events/ArbitraryEventsWorker.h"
#include "GDCore/String.h"
#include <map>
#include <memory>
#include <vector>
#include <functional>

namespace gd {
class PlatformExtension;
class EventsFunctionsExtension;
class EventsBasedBehavior;
class BehaviorMetadata;
class EventsBasedObject;
class ObjectMetadata;
class EventsFunction;
class PropertyDescriptor;
class EventsFunctionsContainer;
class InstructionOrExpressionMetadata;
class ParameterContainerMetadata;
class InstructionOrExpressionContainerMetadata;
class AbstractEventsBasedEntity;
class NamedPropertyDescriptor;
} // namespace gd

namespace gd {

/**
 * \brief This file contains the logic to declare extension metadata from
 * events functions or events based behaviors.
 * These are basically adapters from gd::EventsFunctionsExtension, and children, to a
 * real extension declaration (like in `JsExtension.js` or `Extension.cpp` files).
 *
 * \ingroup IDE
 */
class GD_CORE_API MetadataDeclarationHelper {
public:

/**
 * Declare an extension from an events based extension.
 */
static void declareExtension(
  gd::PlatformExtension& extension,
  const gd::EventsFunctionsExtension& eventsFunctionsExtension
);

/**
 * Declare the dependencies of an extension from an events based extension.
 */
static void declareExtensionDependencies(
  gd::PlatformExtension& extension,
  const gd::EventsFunctionsExtension& eventsFunctionsExtension
);

static const gd::String& GetExtensionIconUrl(gd::PlatformExtension& extension);

/**
 * Declare the behavior for the given
 * events based behavior.
 */
static gd::BehaviorMetadata& declareBehaviorMetadata(
  gd::PlatformExtension& extension,
  const gd::EventsBasedBehavior& eventsBasedBehavior
);

/**
 * Declare the object for the given
 * events based object.
 */
static gd::ObjectMetadata& declareObjectMetadata(
  gd::PlatformExtension& extension,
  const gd::EventsBasedObject& eventsBasedObject
);

/**
 * Check if the name of the function is the name of a lifecycle function (for events-based behaviors),
 * that will be called automatically by the game engine.
 */
static bool isBehaviorLifecycleEventsFunction(const gd::String& functionName);

/**
 * Check if the name of the function is the name of a lifecycle function (for events-based objects),
 * that will be called automatically by the game engine.
 */
static bool isObjectLifecycleEventsFunction(const gd::String& functionName);

/**
 * Check if the name of the function is the name of a lifecycle function (for events-based extensions),
 * that will be called automatically by the game engine.
 */
static bool isExtensionLifecycleEventsFunction(const gd::String& functionName);

static gd::String removeTrailingDot(const gd::String& description);

/**
 * Declare the instruction (action/condition) or expression for the given
 * (free) events function.
 */
static gd::ParameterContainerMetadata& declareInstructionOrExpressionMetadata(
  gd::PlatformExtension& extension,
  const gd::EventsFunctionsExtension& eventsFunctionsExtension,
  const gd::EventsFunction& eventsFunction
);

static gd::String shiftSentenceParamIndexes(
  const gd::String& sentence,
  const int offset
);

/**
 * Declare the instruction (action/condition) or expression for the given
 * behavior events function.
 */
static gd::ParameterContainerMetadata& declareBehaviorInstructionOrExpressionMetadata(
  gd::PlatformExtension& extension,
  gd::BehaviorMetadata& behaviorMetadata,
  const gd::EventsBasedBehavior& eventsBasedBehavior,
  const gd::EventsFunction& eventsFunction
);

/**
 * Declare the instruction (action/condition) or expression for the given
 * object events function.
 */
static gd::ParameterContainerMetadata& declareObjectInstructionOrExpressionMetadata(
  gd::PlatformExtension& extension,
  gd::ObjectMetadata& objectMetadata,
  const gd::EventsBasedObject& eventsBasedObject,
  const gd::EventsFunction& eventsFunction
);

static gd::String GetStringifiedExtraInfo(const gd::PropertyDescriptor& property);

static gd::String uncapitalizedFirstLetter(const gd::String& string);

static void declarePropertyInstructionAndExpression(
  gd::PlatformExtension& extension,
  InstructionOrExpressionContainerMetadata& entityMetadata,
  const AbstractEventsBasedEntity& eventsBasedEntity,
  const NamedPropertyDescriptor& property,
  const gd::String& propertyLabel,
  const gd::String& expressionName,
  const gd::String& conditionName,
  const gd::String& actionName,
  const gd::String& toggleActionName,
  const gd::String& setterName,
  const gd::String& getterName,
  const gd::String& toggleFunctionName,
  const int valueParameterIndex,
  std::function<gd::ParameterContainerMetadata&(
                               gd::ParameterContainerMetadata& instructionOrExpression)>
          addObjectAndBehaviorParameters
);

/**
 * Declare the instructions (actions/conditions) and expressions for the
 * properties of the given events based behavior.
 * This is akin to what would happen by manually declaring a JS extension
 * (see `JsExtension.js` files of extensions).
 */
static void declareBehaviorPropertiesInstructionAndExpressions(
  gd::PlatformExtension& extension,
  gd::BehaviorMetadata& behaviorMetadata,
  const gd::EventsBasedBehavior& eventsBasedBehavior
);

/**
 * Declare the instructions (actions/conditions) and expressions for the
 * properties of the given events based object.
 * This is akin to what would happen by manually declaring a JS extension
 * (see `JsExtension.js` files of extensions).
 */
static void declareObjectPropertiesInstructionAndExpressions(
  gd::PlatformExtension& extension,
  gd::ObjectMetadata& objectMetadata,
  const gd::EventsBasedObject& eventsBasedObject
);

/**
 * Declare the instructions (actions/conditions) and expressions for the
 * properties of the given events based object.
 * This is akin to what would happen by manually declaring a JS extension
 * (see `JsExtension.js` files of extensions).
 */
static void declareObjectInternalInstructions(
  gd::PlatformExtension& extension,
  gd::ObjectMetadata& objectMetadata,
  const gd::EventsBasedObject& eventsBasedObject
);

/**
 * Add to the instruction (action/condition) or expression the parameters
 * expected by the events function.
 */
static void declareEventsFunctionParameters(
  const gd::EventsFunctionsContainer& eventsFunctionsContainer,
  const gd::EventsFunction& eventsFunction,
  gd::InstructionOrExpressionMetadata& instructionOrExpression,
  const int userDefinedFirstParameterIndex
);

/**
 * Add to the instruction (action/condition) or expression the parameters
 * expected by the events function.
 */
static void declareEventsFunctionParameters(
  const gd::EventsFunctionsContainer& eventsFunctionsContainer,
  const gd::EventsFunction& eventsFunction,
  gd::MultipleInstructionMetadata& multipleInstructionMetadata,
  const int userDefinedFirstParameterIndex
);

  virtual ~MetadataDeclarationHelper(){};

private:
  MetadataDeclarationHelper(){};

  static const gd::String defaultExtensionIconPath;

  
  static void AddParameter(gd::ParameterContainerMetadata& instructionOrExpression, const ParameterMetadata& parameter);


static const gd::String& GetExtensionCodeNamespacePrefix(
  const gd::EventsFunctionsExtension eventsFunctionsExtension
);

/** Generate the namespace for a free function. */
static const gd::String& GetFreeFunctionCodeNamespace(
  const gd::EventsFunction& eventsFunction,
  const gd::String& codeNamespacePrefix
);

static const gd::String& GetFreeFunctionCodeName(
  const EventsFunctionsExtension& eventsFunctionsExtension,
  const EventsFunction& eventsFunction
);


};

} // namespace gd
