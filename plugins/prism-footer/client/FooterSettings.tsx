import { debounce } from "lodash";
import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { TeamPreference } from "@shared/types";
import Editor from "~/components/Editor";
import Heading from "~/components/Heading";
import { InputSelect, type Option } from "~/components/InputSelect";
import Scene from "~/components/Scene";
import Text from "~/components/Text";
import useCurrentTeam from "~/hooks/useCurrentTeam";
import useStores from "~/hooks/useStores";
import Icon from "./Icon";

const WORKSPACE = "workspace";

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
  const value =
    target === WORKSPACE
      ? team.getPreference(TeamPreference.Footer) || ""
      : (collectionFooters && collectionFooters[target]) || "";

  const handleSave = React.useMemo(
    () =>
      debounce(async (getValue: (asString: boolean) => string) => {
        const markdown = getValue(false);
        try {
          const preferences = { ...team.preferences };
          if (target === WORKSPACE) {
            preferences.footer = markdown.trim() ? markdown : undefined;
          } else {
            const map = { ...preferences.collectionFooters };
            if (markdown.trim()) {
              map[target] = markdown;
            } else {
              delete map[target];
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
