/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "ValueTypeMetadata.h"

#include "GDCore/CommonTools.h"
#include "GDCore/Serialization/SerializerElement.h"

namespace gd {

ValueTypeMetadata::ValueTypeMetadata() {}

void ValueTypeMetadata::SerializeTo(SerializerElement& element) const {
  element.SetAttribute("type", name);
  if (!supplementaryInformation.empty()) {
    element.SetAttribute("supplementaryInformation", supplementaryInformation);
  }
}

void ValueTypeMetadata::UnserializeFrom(const SerializerElement& element) {
  name = element.GetStringAttribute("type");
  if (element.HasAttribute("supplementaryInformation")) {
    supplementaryInformation =
        element.GetStringAttribute("supplementaryInformation");
  }
}

  // TODO factorize in a file with an enum and helpers?
  const gd::String ValueTypeMetadata::numberType = "number";
  const gd::String ValueTypeMetadata::stringType = "string";

  const gd::String &ValueTypeMetadata::GetExpressionValueType(const gd::String &parameterType) {
    if (parameterType == "number" || gd::ValueTypeMetadata::TypeIsExpression("number", parameterType)) {
      return ValueTypeMetadata::numberType;
    }
    if (parameterType == "string" || gd::ValueTypeMetadata::TypeIsExpression("string", parameterType)) {
      return ValueTypeMetadata::stringType;
    }
    return parameterType;
  }

}  // namespace gd
