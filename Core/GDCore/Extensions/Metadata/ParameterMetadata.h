/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */

#ifndef PARAMETER_METADATA_H
#define PARAMETER_METADATA_H
#if defined(GD_IDE_ONLY)
#include <map>
#include <memory>

#include "GDCore/String.h"
#include "GDCore/Extensions/Metadata/ValueTypeMetadata.h"

namespace gd {
class Project;
class Layout;
class EventsCodeGenerator;
class EventsCodeGenerationContext;
class SerializerElement;
}  // namespace gd

namespace gd {

/**
 * \brief Describe a parameter of an instruction (action, condition) or of an
 * expression: type, user-friendly description, etc...
 *
 * \ingroup Events
 */
class GD_CORE_API ParameterMetadata {
 public:
  ParameterMetadata();
  virtual ~ParameterMetadata(){};

  /**
   * \brief Return the type of the parameter.
   * \see gd::ValueTypeMetadata::TypeIsObject
   */
  const gd::ValueTypeMetadata &GetType() const { return valueTypeMetadata; }
  
  /**
   * \brief Return the type of the parameter.
   * \see gd::ValueTypeMetadata::TypeIsObject
   */
  gd::ValueTypeMetadata &GetType() { return valueTypeMetadata; }

  /**
   * \brief Set the type of the parameter.
   */
  ParameterMetadata &SetType(const gd::ValueTypeMetadata &type_) {
    valueTypeMetadata = type_;
    return *this;
  }

  /**
   * \brief Return the name of the parameter.
   *
   * Name is optional, and won't be filled for most parameters of extensions.
   * It is useful when generating a function from events, where parameters must
   * be named.
   */
  const gd::String &GetName() const { return name; }

  /**
   * \brief Set the name of the parameter.
   *
   * Name is optional, and won't be filled for most parameters of extensions.
   * It is useful when generating a function from events, where parameters must
   * be named.
   */
  ParameterMetadata &SetName(const gd::String &name_) {
    name = name_;
    return *this;
  }

  /**
   * \brief Return true if the parameter is optional.
   */
  bool IsOptional() const { return optional; }

  /**
   * \brief Set if the parameter is optional.
   */
  ParameterMetadata &SetOptional(bool optional_ = true) {
    optional = optional_;
    return *this;
  }

  /**
   * \brief Return the description of the parameter
   */
  const gd::String &GetDescription() const { return description; }

  /**
   * \brief Set the description of the parameter.
   */
  ParameterMetadata &SetDescription(const gd::String &description_) {
    description = description_;
    return *this;
  }

  /**
   * \brief Return true if the parameter is only meant to be completed during
   * compilation and must not be displayed to the user.
   */
  bool IsCodeOnly() const { return codeOnly; }

  /**
   * \brief Set if the parameter is only meant to be completed during
   * compilation and must not be displayed to the user.
   */
  ParameterMetadata &SetCodeOnly(bool codeOnly_ = true) {
    codeOnly = codeOnly_;
    return *this;
  }

  /**
   * \brief Get the default value for the parameter.
   */
  const gd::String &GetDefaultValue() const { return defaultValue; }

  /**
   * \brief Set the default value, if the parameter is optional.
   */
  ParameterMetadata &SetDefaultValue(const gd::String &defaultValue_) {
    defaultValue = defaultValue_;
    return *this;
  }

  /**
   * \brief Get the user friendly, long description for the parameter.
   */
  const gd::String &GetLongDescription() const { return longDescription; }

  /**
   * \brief Set the user friendly, long description for the parameter.
   */
  ParameterMetadata &SetLongDescription(const gd::String &longDescription_) {
    longDescription = longDescription_;
    return *this;
  }

  /** \name Serialization
   */
  ///@{
  /**
   * \brief Serialize the ParameterMetadata to the specified element
   */
  void SerializeTo(gd::SerializerElement &element) const;

  /**
   * \brief Load the ParameterMetadata from the specified element
   */
  void UnserializeFrom(const gd::SerializerElement &element);
  ///@}

  // TODO: Deprecated public fields. Any direct usage should be moved to
  // getter/setter.
  bool optional;                        ///< True if the parameter is optional

  gd::String description;  ///< Description shown in editor
  bool codeOnly;  ///< True if parameter is relative to code generation only,
                  ///< i.e. must not be shown in editor
 private:
  gd::ValueTypeMetadata valueTypeMetadata; ///< Parameter type
  gd::String longDescription;  ///< Long description shown in the editor.
  gd::String defaultValue;     ///< Used as a default value in editor or if an
                               ///< optional parameter is empty.
  gd::String name;             ///< The name of the parameter to be used in code
                               ///< generation. Optional.
};

}  // namespace gd

#endif
#endif  // PARAMETER_METADATA_H
