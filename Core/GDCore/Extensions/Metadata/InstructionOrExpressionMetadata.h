/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */

#pragma once

#include "ParameterContainerMetadata.h"

#include <algorithm>
#include <functional>
#include <map>
#include <memory>

#include "GDCore/Events/Instruction.h"
#include "GDCore/String.h"
#include "ParameterMetadata.h"
#include "ParameterOptions.h"

namespace gd {
class Project;
class Layout;
class EventsCodeGenerator;
class EventsCodeGenerationContext;
class SerializerElement;
}  // namespace gd

namespace gd {

/**
 * \brief Describe user-friendly information about an instruction (action or
 * condition), its parameters and the function name as well as other information
 * for code generation.
 *
 * \ingroup Events
 */
class GD_CORE_API InstructionOrExpressionMetadata : ParameterContainerMetadata {
 public:
  /**
   * Construct an empty InstructionMetadata.
   * \warning Don't use this - only here to fullfil std::map requirements.
   */
  InstructionOrExpressionMetadata();

  virtual ~InstructionOrExpressionMetadata(){};

  virtual const gd::String &GetFullName() const = 0;
  virtual const gd::String &GetDescription() const = 0;
  virtual const gd::String &GetGroup() const = 0;
  virtual ParameterMetadata &GetParameter(size_t i) = 0;
  virtual const ParameterMetadata &GetParameter(size_t i) const = 0;
  virtual size_t GetParametersCount() const = 0;
  virtual const std::vector<ParameterMetadata> &GetParameters() const = 0;
  virtual const gd::String &GetIconFilename() const = 0;
  virtual const gd::String &GetSmallIconFilename() const = 0;

  /**
   * Get the help path of the instruction, relative to the GDevelop
   * documentation root.
   */
  virtual const gd::String &GetHelpPath() const = 0;

  /**
   * Set the help path of the instruction, relative to the GDevelop
   * documentation root.
   */
  virtual InstructionOrExpressionMetadata &SetHelpPath(const gd::String &path) = 0;

  /**
   * Check if the instruction is private - it can't be used outside of the
   * object/ behavior that it is attached too.
   */
  virtual bool IsPrivate() const = 0;

  /**
   * Set that the instruction is private - it can't be used outside of the
   * object/ behavior that it is attached too.
   */
  virtual InstructionOrExpressionMetadata &SetPrivate() = 0;

  /**
   * Check if the instruction can be used in layouts or external events.
   */
  virtual bool IsRelevantForLayoutEvents() const = 0;

  /**
   * Check if the instruction can be used in function events.
   */
  virtual bool IsRelevantForFunctionEvents() const = 0;

  /**
   * Check if the instruction can be used in asynchronous function events.
   */
  virtual bool IsRelevantForAsynchronousFunctionEvents() const = 0;

  /**
   * Check if the instruction can be used in custom object events.
   */
  virtual bool IsRelevantForCustomObjectEvents() const = 0;

  /**
   * Set that the instruction can be used in layouts or external events.
   */
  virtual InstructionOrExpressionMetadata &SetRelevantForLayoutEventsOnly() = 0;

  /**
   * Set that the instruction can be used in function events.
   */
  virtual InstructionOrExpressionMetadata &SetRelevantForFunctionEventsOnly() = 0;

  /**
   * Set that the instruction can be used in asynchronous function events.
   */
  virtual InstructionOrExpressionMetadata &SetRelevantForAsynchronousFunctionEventsOnly() = 0;

  /**
   * Set that the instruction can be used in custom object events.
   */
  virtual InstructionOrExpressionMetadata &SetRelevantForCustomObjectEventsOnly() = 0;

  /**
   * \brief Set the instruction to be hidden in the IDE.
   *
   * Used mainly when an instruction is deprecated.
   */
  virtual InstructionOrExpressionMetadata &SetHidden() override = 0;

  /**
   * \brief Set the group of the instruction in the IDE.
   */
  virtual InstructionOrExpressionMetadata &SetGroup(const gd::String &str) = 0;

  /**
   * \brief Return true if the instruction must be hidden in the IDE.
   */
  virtual bool IsHidden() const = 0;

  /**
   * \brief Add a parameter to the instruction metadata.
   *
   * \param type One of the type handled by GDevelop. This
   * will also determine the type of the argument used when calling the function
   * in the generated code.
   * \param description Description for parameter
   * \param supplementaryInformation Additional information that can be used for
   * rendering or logic. For example:
   * - If type is "object", this argument will describe which objects are
   * allowed. If this argument is empty, all objects are allowed.
   * - If type is "operator", this argument will be used to display only
   * pertinent operators. \param parameterIsOptional true if the parameter must
   * be optional, false otherwise.
   *
   * \see EventsCodeGenerator::GenerateParametersCodes
   */
  virtual InstructionOrExpressionMetadata &AddParameter(
      const gd::String &type,
      const gd::String &label,
      const gd::String &supplementaryInformation = "",
      bool parameterIsOptional = false) override = 0;

  /**
   * \brief Add a parameter not displayed in editor.
   *
   * \param type One of the type handled by GDevelop. This will also determine
   * the type of the argument used when calling the function in the generated
   * code. \param supplementaryInformation Depends on `type`. For example, when
   * `type == "inlineCode"`, the content of supplementaryInformation is inserted
   * in the generated code.
   *
   * \see EventsCodeGenerator::GenerateParametersCodes
   */
  virtual InstructionOrExpressionMetadata &AddCodeOnlyParameter(
      const gd::String &type, const gd::String &supplementaryInformation) override = 0;

  /**
   * \brief Set the default value used in editor (or if an optional parameter is
   * empty during code generation) for the last added parameter.
   *
   * \see AddParameter
   */
  virtual InstructionOrExpressionMetadata &SetDefaultValue(const gd::String &defaultValue_) override = 0;

  /**
   * \brief Set the long description shown in the editor for the last added
   * parameter.
   *
   * \see AddParameter
   */
  virtual InstructionOrExpressionMetadata &SetParameterLongDescription(
      const gd::String &longDescription) override = 0;

  /**
   * \brief Set the additional information, used for some parameters
   * with special type (for example, it can contains the type of object accepted
   * by the parameter), for the last added parameter.
   *
   * \see AddParameter
   */
  virtual InstructionOrExpressionMetadata &SetParameterExtraInfo(const gd::String &extraInfo) override = 0;

  /**
   * \brief Add the default parameters for an instruction manipulating the
   * specified type ("string", "number") with the default operators.
   *
   * \note The type "string" can be declined in several subtypes.
   * \see ParameterMetadata
   */
  virtual InstructionOrExpressionMetadata &UseStandardOperatorParameters(
      const gd::String &type, const ParameterOptions &options);

  /**
   * \brief Add the default parameters for an instruction comparing the
   * specified type ("string", "number") with the default relational operators.
   *
   * \note The type "string" can be declined in several subtypes.
   * \see ParameterMetadata
   */
  virtual InstructionOrExpressionMetadata &UseStandardRelationalOperatorParameters(
      const gd::String &type, const ParameterOptions &options);

  /**
   * \brief Mark this (object) instruction as requiring the specified
   * capability, offered by the base object. This is useful for some objects
   * that don't support this capability, so that the editor can hide the
   * instruction as it does not apply to them.
   */
  virtual InstructionOrExpressionMetadata &SetRequiresBaseObjectCapability(
      const gd::String& capability) override = 0;

  /**
   * \brief Get the required specified capability for this (object) instruction,
   * or an empty string if there is nothing specific required.
   */
  virtual const gd::String &GetRequiredBaseObjectCapability() const = 0;

 private:
};

}  // namespace gd

