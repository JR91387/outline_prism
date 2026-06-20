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
  const advanced = team.getPreference(TeamPreference.ThemeMode) === "advanced";

  // Serialize saves so fast clicks can't fire overlapping team.save() calls
  // (which race, error, and wedge the picker). Last click wins: while a save is
  // in flight, remember the latest requested id and apply it once done.
  const savingRef = React.useRef(false);
  const pendingRef = React.useRef<string | null>(null);

  const save = async (id: string) => {
    if (savingRef.current) {
      pendingRef.current = id;
      return;
    }
    savingRef.current = true;
    try {
      await team.save({
        preferences: { ...team.preferences, theme: id },
      });
      if (!pendingRef.current) {
        toast.success(t("Settings saved"));
      }
    } catch (_err) {
      toast.error(t("Could not save settings"));
    } finally {
      savingRef.current = false;
      const next = pendingRef.current;
      pendingRef.current = null;
      if (next && next !== id) {
        void save(next);
      }
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

      {!advanced && (
        <Prompt>
          {t(
            "Switch Theme to Advanced in Settings → Details to choose a theme."
          )}
        </Prompt>
      )}

      <Grid $disabled={!advanced} aria-disabled={!advanced}>
        {themeList.map((theme) => (
          <ThemePreview
            key={theme.id}
            theme={theme}
            selected={advanced && selected === theme.id}
            onSelect={() => advanced && save(theme.id)}
          />
        ))}
      </Grid>
    </Scene>
  );
}

export default observer(ThemeSettings);

const Prompt = styled.p`
  margin: 4px 0 16px;
  padding: 10px 14px;
  border: 1px dashed ${(props) => props.theme.divider};
  border-radius: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
`;

const Grid = styled.div<{ $disabled: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  opacity: ${(props) => (props.$disabled ? 0.45 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
  filter: ${(props) => (props.$disabled ? "grayscale(0.6)" : "none")};
  transition: opacity 120ms ease;
`;
