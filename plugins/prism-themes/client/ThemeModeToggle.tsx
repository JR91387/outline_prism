import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import { TeamPreference } from "@shared/types";
import useCurrentTeam from "~/hooks/useCurrentTeam";

/**
 * Segmented Default/Advanced control for the workspace theme mode, shown in the
 * Theme section of Settings → Details. "Default" uses Outline's stock accent
 * colors; "Advanced" applies the selected Prism theme (chosen in Settings →
 * Themes) and overrides the accent. Saves immediately as a team preference so
 * the Themes page and the live app react at once. When Advanced, renders a note
 * explaining the accent override.
 *
 * @returns the theme-mode toggle.
 */
function ThemeModeToggle() {
  const team = useCurrentTeam();
  const { t } = useTranslation();
  const advanced = team.getPreference(TeamPreference.ThemeMode) === "advanced";

  const setMode = async (mode: "default" | "advanced") => {
    if ((mode === "advanced") === advanced) {
      return;
    }
    try {
      await team.save({
        preferences: { ...team.preferences, themeMode: mode },
      });
    } catch (_err) {
      toast.error(t("Could not save settings"));
    }
  };

  return (
    <Wrapper>
      <Segmented role="tablist">
        <Tab
          type="button"
          role="tab"
          aria-selected={!advanced}
          $active={!advanced}
          onClick={() => setMode("default")}
        >
          {t("Default")}
        </Tab>
        <Tab
          type="button"
          role="tab"
          aria-selected={advanced}
          $active={advanced}
          onClick={() => setMode("advanced")}
        >
          {t("Advanced")}
        </Tab>
      </Segmented>
      {advanced && (
        <Note>
          {t(
            "Accent colors are overridden by your Prism theme — choose one in Settings → Themes."
          )}
        </Note>
      )}
    </Wrapper>
  );
}

export default observer(ThemeModeToggle);

const Wrapper = styled.div`
  flex: 1 0 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 6px;
`;

const Segmented = styled.div`
  display: inline-flex;
  align-self: flex-start;
  padding: 2px;
  border-radius: 8px;
  background: ${(props) => props.theme.backgroundTertiary};
`;

const Tab = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  padding: 5px 16px;
  border-radius: 6px;
  color: ${(props) =>
    props.$active ? props.theme.text : props.theme.textSecondary};
  background: ${(props) =>
    props.$active ? props.theme.background : "transparent"};
  box-shadow: ${(props) => (props.$active ? props.theme.menuShadow : "none")};
  transition: background 100ms ease;
`;

const Note = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.textTertiary};
`;
