import { debounce } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { richExtensions } from "@shared/editor/nodes";
import { type ProsemirrorData, TeamPreference } from "@shared/types";
import { ProsemirrorHelper } from "@shared/utils/ProsemirrorHelper";
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
  const value =
    stored &&
    typeof stored === "object" &&
    !ProsemirrorHelper.isEmptyData(stored)
      ? stored
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
          toast.success(t("Footer saved"));
        } catch (_err) {
          toast.error(t("Could not save settings"));
        }
      }, 1000),
    [team, target, t]
  );

  React.useEffect(() => () => void handleSave.flush(), [handleSave]);

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
          "Content shown at the bottom of every document. Set a workspace-wide default, or override it for a specific collection. Leave empty for no footer. Changes save automatically as you edit."
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
    </Scene>
  );
}

export default observer(FooterSettings);

const Field = styled.div`
  max-width: 320px;
  margin: 12px 0 20px;
`;

const EditorFrame = styled.div`
  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.inputBorder};
  border-radius: 8px;
  min-height: 160px;
  background: ${(props) => props.theme.background};
`;
