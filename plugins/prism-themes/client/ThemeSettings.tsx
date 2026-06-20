import { observer } from "mobx-react";
import { PaletteIcon } from "outline-icons";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { TeamPreference } from "@shared/types";
import Heading from "~/components/Heading";
import Scene from "~/components/Scene";
import Text from "~/components/Text";
import useCurrentTeam from "~/hooks/useCurrentTeam";
import { ThemePreview } from "./ThemePreview";
import { themeList } from "./registry";

/**
 * Workspace Themes settings page (Hook.Settings). Lists the selectable
 * full-surface themes; choosing one saves it as a team preference, applying it
 * for everyone. "Default" clears the selection back to stock Outline. The whole
 * page is admin-gated via the plugin's `enabled` predicate.
 *
 * @returns the Themes settings scene.
 */
function ThemeSettings() {
  const team = useCurrentTeam();
  const { t } = useTranslation();
  const raw = team.getPreference(TeamPreference.Theme);
  const selected = typeof raw === "string" ? raw : undefined;

  const save = async (id: string | null) => {
    try {
      await team.save({
        preferences: { ...team.preferences, theme: id ?? undefined },
      });
      toast.success(t("Settings saved"));
    } catch (_err) {
      toast.error(t("Could not save settings"));
    }
  };

  return (
    <Scene title={t("Themes")} icon={<PaletteIcon />}>
      <Heading>{t("Themes")}</Heading>
      <Text as="p" type="secondary">
        {t(
          "Choose a workspace-wide theme. It applies to everyone on the team and replaces the default look."
        )}
      </Text>

      <DefaultButton
        type="button"
        onClick={() => save(null)}
        $active={!selected}
      >
        {t("Default")} {selected ? "" : "✓"}
      </DefaultButton>

      <Grid>
        {themeList.map((theme) => (
          <ThemePreview
            key={theme.id}
            theme={theme}
            selected={selected === theme.id}
            onSelect={() => save(theme.id)}
          />
        ))}
      </Grid>
    </Scene>
  );
}

export default observer(ThemeSettings);

const DefaultButton = styled.button<{ $active: boolean }>`
  align-self: flex-start;
  margin: 4px 0 16px;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) =>
    props.$active ? props.theme.accentText : props.theme.text};
  background: ${(props) =>
    props.$active ? props.theme.accent : props.theme.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.inputBorder};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`;
