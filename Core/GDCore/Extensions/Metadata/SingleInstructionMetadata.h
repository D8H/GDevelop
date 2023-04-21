/*
 * GDevelop Core
 * Copyright 2008-present Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#pragma once

#include "GDCore/Extensions/Metadata/ExpressionMetadata.h"
#include "GDCore/Extensions/Metadata/InstructionMetadata.h"
#include "GDCore/String.h"
#include "ParameterOptions.h"

namespace gd {}  // namespace gd

namespace gd {

/**
 * \brief A "composite" metadata that can be used to easily declare
 * both an expression and a related condition (and a related action)
 * without writing manually the three of them.
 *
 * \ingroup PlatformDefinition
 */
class GD_CORE_API SingleInstructionMetadata : public AbstractFunctionMetadata {
 public:
  static SingleInstructionMetadata With(
      gd::InstructionOrExpressionMetadata &instructionOrExpressionMetadata) {
    return SingleInstructionMetadata(instructionOrExpressionMetadata);
  }

  /**
   * \see gd::InstructionMetadata::AddParameter
   */
  SingleInstructionMetadata &AddParameter(
      const gd::String &type,
      const gd::String &label,
      const gd::String &supplementaryInformation = "",
      bool parameterIsOptional = false) override {
    if (instructionOrExpression)
      instructionOrExpression->AddParameter(
          type, label, supplementaryInformation, parameterIsOptional);
    return *this;
  }

  /**
   * \see gd::InstructionMetadata::AddCodeOnlyParameter
   */
  SingleInstructionMetadata &AddCodeOnlyParameter(
      const gd::String &type, const gd::String &supplementaryInformation) override {
    if (instructionOrExpression)
      instructionOrExpression->AddCodeOnlyParameter(type, supplementaryInformation);
    return *this;
  }

  /**
   * \see gd::InstructionMetadata::SetDefaultValue
   */
  SingleInstructionMetadata &SetDefaultValue(const gd::String &defaultValue) override {
    if (instructionOrExpression) instructionOrExpression->SetDefaultValue(defaultValue);
    return *this;
  };

  /**
   * \see gd::InstructionMetadata::SetParameterExtraInfo
   */
  SingleInstructionMetadata &SetParameterExtraInfo(
      const gd::String &defaultValue) override {
    if (instructionOrExpression) instructionOrExpression->SetParameterExtraInfo(defaultValue);
    return *this;
  };

  /**
   * \see gd::InstructionMetadata::SetParameterLongDescription
   */
  SingleInstructionMetadata &SetParameterLongDescription(
      const gd::String &longDescription) override {
    if (instructionOrExpression) instructionOrExpression->SetParameterLongDescription(longDescription);
    return *this;
  };

  /**
   * \see gd::InstructionMetadata::SetHidden
   */
  SingleInstructionMetadata &SetHidden() override {
    if (instructionOrExpression) instructionOrExpression->SetHidden();
    return *this;
  };

  /**
   * \see gd::InstructionMetadata::SetRequiresBaseObjectCapability
   */
  SingleInstructionMetadata &SetRequiresBaseObjectCapability(
      const gd::String &capability) {
    if (instructionOrExpression) instructionOrExpression->SetRequiresBaseObjectCapability(capability);
    return *this;
  }

  SingleInstructionMetadata &SetFunctionName(const gd::String &functionName) override {
    if (instructionOrExpression) instructionOrExpression->SetFunctionName(functionName);
    return *this;
  }

  SingleInstructionMetadata &SetGetter(const gd::String &getter) {
    if (instructionOrExpression) instructionOrExpression->SetFunctionName(getter);
    return *this;
  }

  SingleInstructionMetadata &SetIncludeFile(const gd::String &includeFile) {
    if (instructionOrExpression)
      instructionOrExpression->SetIncludeFile(includeFile);
    return *this;
  }

  SingleInstructionMetadata &AddIncludeFile(const gd::String &includeFile) {
    if (instructionOrExpression)
      instructionOrExpression->AddIncludeFile(includeFile);
    return *this;
  }

  /**
   * \brief Get the files that must be included to use the instruction.
   */
  const std::vector<gd::String> &GetIncludeFiles() const {
    if (instructionOrExpression)
      return instructionOrExpression->GetIncludeFiles();
    // It can't actually happen.
    throw std::logic_error("no instruction metadata");
  }

  /**
   * \see gd::InstructionMetadata::SetPrivate
   */
  SingleInstructionMetadata &SetPrivate() override {
    if (instructionOrExpression) instructionOrExpression->SetPrivate();
    return *this;
  }

  /**
   * \brief Don't use, only here to fulfill Emscripten bindings requirements.
   */
  SingleInstructionMetadata()
      : instructionOrExpression(nullptr){};

 private:
  SingleInstructionMetadata(gd::InstructionOrExpressionMetadata &instructionOrExpression_)
      : instructionOrExpression(&instructionOrExpression_){};

  gd::InstructionOrExpressionMetadata *instructionOrExpression;
};

}  // namespace gd
