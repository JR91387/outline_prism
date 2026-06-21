import * as React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import styled from "styled-components";
import Button from "~/components/Button";
import Flex from "~/components/Flex";
import Heading from "~/components/Heading";
import Scene from "~/components/Scene";
import Switch from "~/components/Switch";
import Text from "~/components/Text";
import SettingRow from "~/scenes/Settings/components/SettingRow";
import Icon from "./Icon";
import { logStore } from "./logStore";

/**
 * Development Mode settings tab (Hook.Settings, Account group). A user-toggled,
 * off-by-default capture of browser console logs into an in-app buffer that can
 * be viewed, copied, or exported as JSON — a debugging aid for the fork.
 *
 * @returns the Development Mode settings scene.
 */
function DebugLoggerSettings() {
  const { t } = useTranslation();
  const [enabled, setEnabled] = React.useState(logStore.enabled);
  // Bump to re-read the (non-observable) log buffer on demand.
  const [, refresh] = React.useReducer((x: number) => x + 1, 0);

  const handleToggle = (on: boolean) => {
    logStore.setEnabled(on);
    setEnabled(on);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(logStore.toJSON());
      toast.success(t("Copied to clipboard"));
    } catch {
      toast.error(t("Could not copy"));
    }
  };

  const handleExport = () => {
    const blob = new Blob([logStore.toJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prism-debug-log.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    logStore.clear();
    refresh();
  };

  return (
    <Scene title={t("Development Mode")} icon={<Icon />}>
      <Heading>{t("Development Mode")}</Heading>
      <Text as="p" type="secondary">
        {t(
          "Capture browser console logs in-app for debugging this workspace. Off by default — nothing is captured until you turn it on."
        )}
      </Text>

      <SettingRow
        name="prism-debug-logger"
        label={t("Capture console logs")}
        description={t(
          "Tees console output into an in-app buffer you can copy or export as JSON."
        )}
      >
        <Switch
          id="prism-debug-logger"
          name="prism-debug-logger"
          checked={enabled}
          onChange={handleToggle}
        />
      </SettingRow>

      {enabled && (
        <>
          <Toolbar gap={8}>
            <Button neutral onClick={refresh}>
              {t("Refresh")}
            </Button>
            <Button neutral onClick={handleCopy}>
              {t("Copy JSON")}
            </Button>
            <Button neutral onClick={handleExport}>
              {t("Export")}
            </Button>
            <Button neutral onClick={handleClear}>
              {t("Clear")}
            </Button>
          </Toolbar>
          <LogWindow>
            {logStore.entries.length === 0
              ? t("No logs captured yet.")
              : logStore.entries
                  .map((e) => `${e.time} [${e.level}] ${e.message}`)
                  .join("\n")}
          </LogWindow>
        </>
      )}
    </Scene>
  );
}

export default DebugLoggerSettings;

const Toolbar = styled(Flex)`
  margin: 16px 0 8px;
`;

const LogWindow = styled.pre`
  max-height: 360px;
  overflow: auto;
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.divider};
  background: ${(props) => props.theme.background};
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
`;
