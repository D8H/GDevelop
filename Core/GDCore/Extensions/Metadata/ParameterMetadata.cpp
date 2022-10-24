/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "ParameterMetadata.h"

#include "GDCore/CommonTools.h"
#include "GDCore/Serialization/SerializerElement.h"

namespace gd {

ParameterMetadata::ParameterMetadata() : optional(false), codeOnly(false) {}

void ParameterMetadata::SerializeTo(SerializerElement& element) const {
  valueTypeMetadata.SerializeTo(element);
  element.SetAttribute("optional", optional);
  element.SetAttribute("description", description);
  element.SetAttribute("longDescription", longDescription);
  element.SetAttribute("codeOnly", codeOnly);
  element.SetAttribute("defaultValue", defaultValue);
  element.SetAttribute("name", name);
}

void ParameterMetadata::UnserializeFrom(const SerializerElement& element) {
  valueTypeMetadata.UnserializeFrom(element);
  optional = element.GetBoolAttribute("optional");
  description = element.GetStringAttribute("description");
  longDescription = element.GetStringAttribute("longDescription");
  codeOnly = element.GetBoolAttribute("codeOnly");
  defaultValue = element.GetStringAttribute("defaultValue");
  name = element.GetStringAttribute("name");
}

}  // namespace gd
