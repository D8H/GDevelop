/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#include "ObjectAssetSerializer.h"

#include "GDCore/Project/Object.h"
#include "GDCore/Extensions/Metadata/BehaviorMetadata.h"
#include "GDCore/Extensions/Metadata/MetadataProvider.h"
#include "GDCore/Extensions/Platform.h"
#include "GDCore/Project/Behavior.h"
#include "GDCore/Project/CustomBehavior.h"
#include "GDCore/Project/Layout.h"
#include "GDCore/Project/Project.h"
#include "GDCore/Serialization/SerializerElement.h"
#include "GDCore/Project/PropertyDescriptor.h"
#include "GDCore/Tools/Log.h"
#include "GDCore/IDE/Project/ResourcesInUseHelper.h"
#include "GDCore/Extensions/PlatformExtension.h"

namespace gd {

void ObjectAssetSerializer::SerializeTo(const gd::Project &project, const gd::Object &object, SerializerElement& element) {
  
  // TODO Export the AssetMetadata.
  // TODO Find the right object dimensions.

  auto cleanObject = object.Clone();
  cleanObject->SetTags("");
  cleanObject->GetVariables().Clear();
  cleanObject->GetEffects().Clear();
  for (auto&& behaviorName : cleanObject->GetAllBehaviorNames()) {
    cleanObject->RemoveBehavior(behaviorName);
  }
  
  cleanObject->SerializeTo(element.AddChild("object"));

  SerializerElement& resourcesElement = element.AddChild("resources");
  resourcesElement.ConsiderAsArrayOf("resource");
  gd::ResourcesInUseHelper resourcesInUse;
  cleanObject->GetConfiguration().ExposeResources(resourcesInUse);
  for (auto&& resource : resourcesInUse.GetAllImages()) {
    SerializerElement& resourceElement = resourcesElement.AddChild("resource");
    resourceElement.SetAttribute("name", resource);
    resourceElement.SetAttribute("file", resource);
    resourceElement.SetAttribute("kind", "image");
    resourceElement.SetBoolAttribute("alwaysLoaded", false);
    resourceElement.SetAttribute("metadata", "");
  }
  
  SerializerElement& requiredExtensionsElement = element.AddChild("requiredExtensions");
  requiredExtensionsElement.ConsiderAsArrayOf("requiredExtension");
  const gd::String& type = cleanObject->GetType();
  const auto separatorIndex = type.find(PlatformExtension::GetNamespaceSeparator());
  if (separatorIndex != std::string::npos) {
    gd::String extensionName = type.substr(0, separatorIndex);
    if (project.HasEventsFunctionsExtensionNamed(extensionName)) {
      SerializerElement& requiredExtensionElement = requiredExtensionsElement.AddChild("requiredExtension");
      requiredExtensionElement.SetAttribute("extensionName", extensionName);
      requiredExtensionElement.SetAttribute("extensionVersion", "1.0.0");
    }
  }

  // TODO This can be removed when the asset script no longer require it.
  SerializerElement& customizationElement = element.AddChild("customization");
  customizationElement.ConsiderAsArrayOf("empty");
}

}  // namespace gd
