import { debounce } from "lodash";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { richExtensions } from "@shared/editor/nodes";
import { type ProsemirrorData, TeamPreference } from "@shared/types";
import { ProsemirrorHelper } from "@shared/utils/ProsemirrorHelper";
import Button from "~/components/Button";
import Editor from "~/components/Editor";
import Heading from "~/components/Heading";
import { InputSelect, type Option } from "~/components/InputSelect";
import Scene from "~/components/Scene";
import Text from "~/components/Text";
import { withUIExtensions } from "~/editor/extensions";
import useCurrentTeam from "~/hooks/useCurrentTeam";
import useStores from "~/hooks/useStores";
import Icon from "./Icon";

const WORKSPACE = "workspace";

/** Full rich editor extensions (headings, tables, callouts, etc.) so the footer
 * editor has the same schema as document editing — basicExtensions omits them. */
const extensions = withUIExtensions(richExtensions);

/**
 * Workspace Footer settings page (Hook.Settings). An admin authors rich content
 * with the full editor; it is saved to team preferences and rendered read-only
 * at the bottom of every document by WorkspaceFooter. A target selector chooses
 * the workspace-wide default or a per-collection override. Admin-gated via the
 * plugin's `enabled` predicate.
 *
 * @returns the Workspace Footer settings scene.
 */
function FooterSettings() {
  const team = useCurrentTeam();
  const { collections } = useStores();
  const { t } = useTranslation();
  const [target, setTarget] = React.useState<string>(WORKSPACE);

  const collectionFooters = team.getPreference(
    TeamPreference.CollectionFooters
  );
  const stored =
    target === WORKSPACE
      ? team.getPreference(TeamPreference.Footer)
      : collectionFooters && collectionFooters[target];
  // Only feed real content to the editor; an empty/absent footer starts blank.
  // (Loading an empty doc into the editor has tripped fromJSON.)
  // toJS: team.preferences is deeply @observable; mobx-4 ObservableArrays fail
  // Array.isArray in ProseMirror's Fragment.fromJSON. Convert to plain JS.
  const value =
    stored &&
    typeof stored === "object" &&
    !ProsemirrorHelper.isEmptyData(stored)
      ? toJS(stored)
      : undefined;

  const handleSave = React.useMemo(
    () =>
      debounce(async (getValue: (asString?: boolean) => ProsemirrorData) => {
        // asString=false returns ProseMirror data, which the footer field stores
        // and WorkspaceFooter hydrates read-only into rich content.
        const data = getValue(false);
        const empty = !data || ProsemirrorHelper.isEmptyData(data);
        try {
          const preferences = { ...team.preferences };
          if (target === WORKSPACE) {
            preferences.footer = empty ? undefined : data;
          } else {
            const map = { ...preferences.collectionFooters };
            if (empty) {
              delete map[target];
            } else {
              map[target] = data;
            }
            preferences.collectionFooters = map;
          }
          await team.save({ preferences });
        } catch (_err) {
          toast.error(t("Could not save settings"));
        }
      }, 1000),
    [team, target, t]
  );

  React.useEffect(() => () => void handleSave.flush(), [handleSave]);

  // Edits auto-save (debounced); the Save button flushes any pending save and
  // confirms, so there is a clear save affordance on the settings page.
  const handleSaveClick = React.useCallback(() => {
    void handleSave.flush();
    toast.success(t("Footer saved"));
  }, [handleSave, t]);

  const options: Option[] = [
    { type: "item", label: t("Workspace default"), value: WORKSPACE },
    ...collections.orderedData.map((collection) => ({
      type: "item" as const,
      label: collection.name,
      value: collection.id,
    })),
  ];

  return (
    <Scene title={t("Workspace Footer")} icon={<Icon />}>
      <Heading>{t("Workspace Footer")}</Heading>
      <Text as="p" type="secondary">
        {t(
          "Content shown at the bottom of every document. Set a workspace-wide default, or override it for a specific collection. Leave empty for no footer."
        )}
      </Text>

      <Field>
        <InputSelect
          label={t("Apply to")}
          options={options}
          value={target}
          onChange={setTarget}
        />
      </Field>

      <EditorFrame>
        {/* key re-mounts the editor when switching targets so it reloads the
            selected target's content into defaultValue. */}
        <Editor
          key={target}
          defaultValue={value}
          onChange={handleSave}
          extensions={extensions}
          placeholder={`${t("Add a footer")}…`}
        />
      </EditorFrame>

      <SaveRow>
        <Button onClick={handleSaveClick} neutral>
          {t("Save")}
        </Button>
      </SaveRow>
    </Scene>
  );
}

export default observer(FooterSettings);

const Field = styled.div`
  max-width: 320px;
  margin: 12px 0 20px;
`;

// Roomy, page-like surface (not a tight box) so the editor's selection toolbar
// and block menu have space — matches how Outline edits content elsewhere.
const EditorFrame = styled.div`
  margin: 8px 0 16px;
  padding: 16px 20px;
  min-height: 240px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.divider};
`;

const SaveRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
