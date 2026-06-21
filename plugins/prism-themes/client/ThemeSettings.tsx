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

  // Filter bar derived from the distinct brand groups present, so adding a new
  // branded set (just tag its themes with `group`) surfaces a new button here
  // with no code change. Hidden entirely when no grouped themes exist.
  const all = t("All");
  const general = t("General");
  const brandGroups = React.useMemo(
    () =>
      Array.from(
        new Set(themeList.map((th) => th.group).filter((g): g is string => !!g))
      ).sort(),
    []
  );
  const filters = brandGroups.length ? [all, general, ...brandGroups] : [];
  const [filter, setFilter] = React.useState(all);
  const shown = themeList.filter((th) =>
    filter === all ? true : filter === general ? !th.group : th.group === filter
  );

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

      {filters.length > 0 && (
        <Filters role="tablist" $disabled={!advanced}>
          {filters.map((f) => (
            <FilterButton
              key={f}
              type="button"
              $active={filter === f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </FilterButton>
          ))}
        </Filters>
      )}

      <Grid $disabled={!advanced} aria-disabled={!advanced}>
        {shown.map((theme) => (
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

const Filters = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 4px 0 16px;
  opacity: ${(props) => (props.$disabled ? 0.45 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 16px;
  border: 1px solid
    ${(props) => (props.$active ? props.theme.accent : props.theme.divider)};
  background: ${(props) => (props.$active ? props.theme.accent : "transparent")};
  color: ${(props) =>
    props.$active ? props.theme.accentText : props.theme.text};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 120ms ease;

  &:hover {
    border-color: ${(props) => props.theme.accent};
  }
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
