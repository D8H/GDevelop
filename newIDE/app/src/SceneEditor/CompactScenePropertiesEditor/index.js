// @flow
import { type I18n as I18nType } from '@lingui/core';
import * as React from 'react';
import { type UnsavedChanges } from '../../MainFrame/UnsavedChangesContext';
import VariablesList, {
  type HistoryHandler,
  type VariablesListInterface,
} from '../../VariablesList/VariablesList';
import { type ProjectScopedContainersAccessor } from '../../InstructionOrExpression/EventsScope';
import ErrorBoundary from '../../UI/ErrorBoundary';
import ScrollView, { type ScrollViewInterface } from '../../UI/ScrollView';
import { Column, Line, Spacer, marginsSize } from '../../UI/Grid';
import { Separator } from '../../CompactPropertiesEditor';
import Text from '../../UI/Text';
import { Trans, t } from '@lingui/macro';
import IconButton from '../../UI/IconButton';
import ShareExternal from '../../UI/CustomSvgIcons/ShareExternal';
import EventsRootVariablesFinder from '../../Utils/EventsRootVariablesFinder';
import { type ObjectEditorTab } from '../../ObjectEditor/ObjectEditorDialog';
import { CompactBehaviorSharedDataPropertiesEditor } from './CompactBehaviorSharedDataPropertiesEditor';
import {
  TopLevelCollapsibleSection,
  CollapsibleSubPanel,
} from '../../ObjectEditor/CompactObjectPropertiesEditor';
import { type ResourceManagementProps } from '../../ResourcesList/ResourceSource';
import Paper from '../../UI/Paper';
import { ColumnStackLayout, LineStackLayout } from '../../UI/Layout';
import { IconContainer } from '../../UI/IconContainer';
import RemoveIcon from '../../UI/CustomSvgIcons/Remove';
import useForceUpdate from '../../Utils/UseForceUpdate';
import ChevronArrowRight from '../../UI/CustomSvgIcons/ChevronArrowRight';
import ChevronArrowBottom from '../../UI/CustomSvgIcons/ChevronArrowBottom';
import ChevronArrowDownWithRoundedBorder from '../../UI/CustomSvgIcons/ChevronArrowDownWithRoundedBorder';
import ChevronArrowRightWithRoundedBorder from '../../UI/CustomSvgIcons/ChevronArrowRightWithRoundedBorder';
import Add from '../../UI/CustomSvgIcons/Add';
import Trash from '../../UI/CustomSvgIcons/Trash';
import Edit from '../../UI/CustomSvgIcons/ShareExternal';
import { useManageObjectBehaviors } from '../../BehaviorsEditor';
import SceneIcon from '../../UI/CustomSvgIcons/Scene';
import { mapFor } from '../../Utils/MapFor';
import { usePersistedScrollPosition } from '../../Utils/UsePersistedScrollPosition';
import CompactSelectField from '../../UI/CompactSelectField';
import SelectOption from '../../UI/SelectOption';
import { ChildObjectPropertiesEditor } from '../../ObjectEditor/CompactObjectPropertiesEditor/ChildObjectPropertiesEditor';
import { getSchemaWithOpenFullEditorButton } from '../../ObjectEditor/CompactObjectPropertiesEditor/CompactObjectPropertiesSchema';
import Help from '../../UI/CustomSvgIcons/Help';
import { getHelpLink } from '../../Utils/HelpLink';
import Window from '../../Utils/Window';
import CompactTextField from '../../UI/CompactTextField';
import { textEllipsisStyle } from '../../UI/TextEllipsis';
import Link from '../../UI/Link';
import {
  getVariantName,
  isVariantEditable,
  duplicateVariant,
  deleteVariant,
  ChildrenOverridingDepreciationAlert,
} from '../../ObjectEditor/Editors/CustomObjectPropertiesEditor';
import NewVariantDialog from '../../ObjectEditor/Editors/CustomObjectPropertiesEditor/NewVariantDialog';
import useAlertDialog from '../../UI/Alert/useAlertDialog';
import { type MessageDescriptor } from '../../Utils/i18n/MessageDescriptor.flow';
import { CompactEffectsListEditor } from '../../LayersList/CompactLayerPropertiesEditor/CompactEffectsListEditor';
import { CompactPropertiesEditorByVisibility } from '../../CompactPropertiesEditor/CompactPropertiesEditorByVisibility';
import propertiesMapToSchema from '../../PropertiesEditor/PropertiesMapToSchema';
import { useForceRecompute } from '../../Utils/UseForceUpdate';
import { makeSchema } from './CompactScenePropertiesSchema';
import EmptyMessage from '../../UI/EmptyMessage';

const gd: libGDevelop = global.gd;

export const styles = {
  icon: {
    fontSize: 18,
  },
  scrollView: {
    paddingTop: marginsSize,
    // In theory, should not be needed (the children should be responsible for not
    // overflowing the parent). In practice, even when no horizontal scroll is shown
    // on Chrome, it might happen on Safari. Prevent any scroll to be 100% sure no
    // scrollbar will be shown.
    overflowX: 'hidden',
  },
  hiddenContent: { display: 'none' },
  subPanelContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingLeft: marginsSize * 3,
    paddingRight: marginsSize,
  },
};

const behaviorsHelpLink = getHelpLink('/behaviors');
const sceneVariablesHelpLink = getHelpLink(
  '/all-features/variables/scene-variables'
);

type Props = {|
  project: gdProject,
  scene: gdLayout,
  resourceManagementProps: ResourceManagementProps,
  onUpdateBehaviorsSharedData: () => void,
  onEditSceneVariables: () => void,
  projectScopedContainersAccessor: ProjectScopedContainersAccessor,
  unsavedChanges?: ?UnsavedChanges,
  i18n: I18nType,
  historyHandler?: HistoryHandler,
|};

export const CompactScenePropertiesEditor = ({
  project,
  resourceManagementProps,
  scene,
  onUpdateBehaviorsSharedData,
  onEditSceneVariables,
  projectScopedContainersAccessor,
  unsavedChanges,
  i18n,
  historyHandler,
}: Props): React.Node => {
  const forceUpdate = useForceUpdate();
  const [isPropertiesFolded, setIsPropertiesFolded] = React.useState(false);
  const [isBehaviorsFolded, setIsBehaviorsFolded] = React.useState(false);
  const [isVariablesFolded, setIsVariablesFolded] = React.useState(false);
  const { showDeleteConfirmation } = useAlertDialog();
  const variablesListRef = React.useRef<?VariablesListInterface>(null);

  const allVisibleBehaviors = scene
    .getAllBehaviorSharedDataNames()
    .toJSArray()
    .map(behaviorName => scene.getBehaviorSharedData(behaviorName))
    .filter(
      behaviorSharedData =>
        behaviorSharedData
          .getProperties()
          .keys()
          .size() > 0
    );

  const helpLink = getHelpLink('/interface/scene-editor/');

  const [schemaRecomputeTrigger, forceRecomputeSchema] = useForceRecompute();
  const scrollViewRef = React.useRef<?ScrollViewInterface>(null);
  const scrollKey = 'scene-' + scene.ptr;

  const persistedScrollId = scene.getName();

  const onScroll = usePersistedScrollPosition({
    project,
    scrollViewRef,
    scrollKey,
    persistedScrollId,
    persistedScrollType: 'scene',
  });

  const propertiesSchema = React.useMemo(
    () => {
      if (schemaRecomputeTrigger) {
        // schemaRecomputeTrigger allows to invalidate the schema when required.
      }
      return makeSchema({
        i18n,
      });
    },
    [schemaRecomputeTrigger, i18n]
  );

  return (
    <ErrorBoundary
      componentTitle={<Trans>Scene properties</Trans>}
      scope="scene-editor-scene-properties"
    >
      <ScrollView
        ref={scrollViewRef}
        autoHideScrollbar
        style={styles.scrollView}
        key={scrollKey}
        onScroll={onScroll}
      >
        <Column
          expand
          noMargin
          id="scene-properties-editor"
          noOverflowParent
          useFullHeight
        >
          <ColumnStackLayout expand noOverflowParent>
            <LineStackLayout
              noMargin
              alignItems="center"
              justifyContent="space-between"
            >
              <LineStackLayout noMargin alignItems="center">
                <SceneIcon style={styles.icon} />
                <Text size="body" noMargin>
                  <Trans>{scene.getName()}</Trans>
                </Text>
                {helpLink && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      Window.openExternalURL(helpLink);
                    }}
                  >
                    <Help style={styles.icon} />
                  </IconButton>
                )}
              </LineStackLayout>
            </LineStackLayout>
            <CompactTextField
              value={scene.getName()}
              onChange={() => {}}
              disabled
            />
          </ColumnStackLayout>
          <TopLevelCollapsibleSection
            title={<Trans>Properties</Trans>}
            isFolded={isPropertiesFolded}
            toggleFolded={() => setIsPropertiesFolded(!isPropertiesFolded)}
            renderContent={() => (
              <ColumnStackLayout noMargin noOverflowParent>
                <CompactPropertiesEditorByVisibility
                  project={project}
                  schema={propertiesSchema}
                  instances={[scene]}
                  onInstancesModified={() => {
                    // TODO: undo/redo?
                  }}
                  resourceManagementProps={resourceManagementProps}
                  placeholder=""
                  // $FlowFixMe[incompatible-type]
                  onRefreshAllFields={forceRecomputeSchema}
                />
              </ColumnStackLayout>
            )}
          />
          <TopLevelCollapsibleSection
            title={<Trans>Behaviors</Trans>}
            isFolded={isBehaviorsFolded}
            toggleFolded={() => setIsBehaviorsFolded(!isBehaviorsFolded)}
            renderContent={() => (
              <ColumnStackLayout noMargin>
                {!allVisibleBehaviors.length && (
                  <Text size="body2" align="center" color="secondary">
                    <Trans>
                      There are no{' '}
                      <Link
                        href={behaviorsHelpLink}
                        onClick={() =>
                          Window.openExternalURL(behaviorsHelpLink)
                        }
                      >
                        behaviors
                      </Link>{' '}
                      with scene properties.
                    </Trans>
                  </Text>
                )}
                {allVisibleBehaviors.map(behaviorSharedData => {
                  const behaviorTypeName = behaviorSharedData.getTypeName();
                  const behaviorMetadata = gd.MetadataProvider.getBehaviorMetadata(
                    gd.JsPlatform.get(),
                    behaviorTypeName
                  );
                  const iconUrl = behaviorMetadata.getIconFilename();
                  return (
                    <CollapsibleSubPanel
                      key={behaviorSharedData.ptr}
                      renderContent={() => (
                        <CompactBehaviorSharedDataPropertiesEditor
                          project={project}
                          behaviorMetadata={behaviorMetadata}
                          behaviorSharedData={behaviorSharedData}
                          onBehaviorUpdated={() => {}}
                          resourceManagementProps={resourceManagementProps}
                        />
                      )}
                      isFolded={behaviorSharedData.isFolded()}
                      toggleFolded={() => {
                        behaviorSharedData.setFolded(
                          !behaviorSharedData.isFolded()
                        );
                        forceUpdate();
                      }}
                      titleIcon={
                        iconUrl ? (
                          <IconContainer
                            src={iconUrl}
                            alt={behaviorMetadata.getFullName()}
                            size={16}
                          />
                        ) : null
                      }
                      title={behaviorSharedData.getName()}
                    />
                  );
                })}
              </ColumnStackLayout>
            )}
          />
          <TopLevelCollapsibleSection
            title={<Trans>Scene Variables</Trans>}
            isFolded={isVariablesFolded}
            toggleFolded={() => setIsVariablesFolded(!isVariablesFolded)}
            onOpenFullEditor={() => onEditSceneVariables()}
            onAdd={() => {
              if (variablesListRef.current) {
                variablesListRef.current.addVariable();
              }
              setIsVariablesFolded(false);
            }}
            renderContentAsHiddenWhenFolded={
              true /* Allows to keep a ref to the variables list for add button to work. */
            }
            noContentMargin
            renderContent={() => (
              <VariablesList
                ref={variablesListRef}
                projectScopedContainersAccessor={
                  projectScopedContainersAccessor
                }
                directlyStoreValueChangesWhileEditing
                variablesContainer={scene.getVariables()}
                areObjectVariables
                size="compact"
                onComputeAllVariableNames={() =>
                  EventsRootVariablesFinder.findAllLayoutVariables(
                    project.getCurrentPlatform(),
                    project,
                    scene
                  )
                }
                historyHandler={historyHandler}
                toolbarIconStyle={styles.icon}
                compactEmptyPlaceholderText={
                  <Trans>
                    There are no{' '}
                    <Link
                      href={sceneVariablesHelpLink}
                      onClick={() =>
                        Window.openExternalURL(sceneVariablesHelpLink)
                      }
                    >
                      variables
                    </Link>{' '}
                    on this scene.
                  </Trans>
                }
                isListLocked={false}
              />
            )}
          />
          <Column noMargin expand justifyContent="center" useFullHeight>
            <EmptyMessage>
              <Trans>
                Click on an instance on the canvas or an object in the list to
                display their properties.
              </Trans>
            </EmptyMessage>
          </Column>
        </Column>
      </ScrollView>
    </ErrorBoundary>
  );
};
