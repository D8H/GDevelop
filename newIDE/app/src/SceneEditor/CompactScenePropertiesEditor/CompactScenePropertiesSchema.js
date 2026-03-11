// @flow

import * as React from 'react';
import { type I18n as I18nType } from '@lingui/core';
import { t } from '@lingui/macro';
import {
  type Schema,
  type Field,
  type SectionTitle,
} from '../../PropertiesEditor/PropertiesEditorSchema';
import { styles } from '.';
import Instance from '../../UI/CustomSvgIcons/Instance';

const getTitleRow = ({ i18n }: {| i18n: I18nType |}): Field => ({
  name: 'Title',
  type: 'row',
  preventWrap: true,
  children: [
    {
      name: 'Instance',
      title: i18n._(t`Instance`),
      renderLeftIcon: className => (
        <Instance className={className} style={styles.icon} />
      ),
      getValue: (scene: gdLayout) => scene.getName(),
      nonFieldType: 'title',
      defaultValue: i18n._(t`Different objects`),
    },
  ],
});

const getResourcesPreloadingField = ({
  i18n,
}: {|
  i18n: I18nType,
|}): Field => ({
  name: 'ResourcesPreloading',
  getLabel: () => i18n._(t`Resources preloading`),
  valueType: 'string',
  getChoices: () => [
    {
      value: 'inherit',
      label: i18n._(t`Use the project setting`),
    },
    {
      value: 'at-startup',
      label: i18n._(t`Always preload at startup`),
    },
    {
      value: 'never',
      label: i18n._(t`Never preload`),
    },
  ],
  getValue: (scene: gdLayout) => scene.getResourcesPreloading(),
  setValue: (scene: gdLayout, newValue: string) =>
    scene.setResourcesPreloading(newValue),
});

export const makeSchema = ({ i18n }: {| i18n: I18nType |}): Schema => {
  return [
    getTitleRow({ i18n }),
    {
      name: 'ResourcesPreloading',
      type: 'row',
      preventWrap: true,
      removeSpacers: true,
      children: [getResourcesPreloadingField({ i18n })],
    },
  ];
};
