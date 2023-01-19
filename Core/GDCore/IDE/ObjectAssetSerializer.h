/*
 * GDevelop Core
 * Copyright 2008-2016 Florian Rival (Florian.Rival@gmail.com). All rights
 * reserved. This project is released under the MIT License.
 */
#ifndef GDCORE_OBJECT_ASSET_SERIALIZER_H
#define GDCORE_OBJECT_ASSET_SERIALIZER_H
#include "GDCore/Vector2.h"
#include <map>
#include <memory>
#include <vector>

#include "GDCore/Project/Behavior.h"
#include "GDCore/Project/ObjectConfiguration.h"
#include "GDCore/Project/EffectsContainer.h"
#include "GDCore/Project/VariablesContainer.h"
#include "GDCore/String.h"
#include "GDCore/Tools/MakeUnique.h"

namespace gd {
class Object;
class ExtensionDependency;
class PropertyDescriptor;
class Project;
class Layout;
class ArbitraryResourceWorker;
class InitialInstance;
class SerializerElement;
class EffectsContainer;
}  // namespace gd

namespace gd {

/**
 * \brief Represent an object of a platform
 * 
 * \ingroup IDE
 */
class GD_CORE_API ObjectAssetSerializer {
 public:
  /**
   * \brief Serialize the object into an asset.
   */
  static void SerializeTo(const gd::Project &project, const gd::Object &object, SerializerElement& element);

  ~ObjectAssetSerializer(){};

 private:
  ObjectAssetSerializer(){};
};

}  // namespace gd

#endif  // GDCORE_OBJECT_ASSET_SERIALIZER_H
