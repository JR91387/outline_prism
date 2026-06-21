import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { richExtensions } from "@shared/editor/nodes";
import { TeamPreference } from "@shared/types";
import { ProsemirrorHelper } from "@shared/utils/ProsemirrorHelper";
import Editor from "~/components/Editor";
import ErrorBoundary from "~/components/ErrorBoundary";
import { useTeamContext } from "~/components/TeamContext";
import useStores from "~/hooks/useStores";
import type Document from "~/models/Document";

type Props = {
  /** The document the footer is being rendered beneath. */
  document: Document;
};

/**
 * Renders the workspace footer — or the document's collection-specific override
 * — at the bottom of a document, read-only, using the same editor as the rest
 * of Outline. Resolution: the collection override wins, else the workspace
 * default; an empty/absent value renders nothing. Both are team preferences, so
 * this is admin-set and applies for everyone. Fork feature (prism-footer); the
 * single core seam (app/scenes/Document/components/Document.tsx) relative-imports
 * this component.
 *
 * @returns the footer block, or null when no footer is configured.
 */
function WorkspaceFooter({ document }: Props) {
  const { auth } = useStores();
  // On a public share auth.team is null; the share supplies a PublicTeam via
  // TeamContext (same pattern as PageTitle/customTheme). The Team model exposes
  // getPreference; PublicTeam exposes the footer fields directly.
  const team = useTeamContext() ?? auth.team;
  if (!team) {
    return null;
  }

  const overrides =
    "getPreference" in team
      ? team.getPreference(TeamPreference.CollectionFooters)
      : team.collectionFooters;
  const override =
    document.collectionId && overrides
      ? overrides[document.collectionId]
      : undefined;
  const footer =
    "getPreference" in team
      ? team.getPreference(TeamPreference.Footer)
      : team.footer;
  const raw = override ?? footer;

  // team.preferences is deeply @observable; under mobx 4 its nested arrays are
  // ObservableArrays that fail Array.isArray inside ProseMirror's
  // Fragment.fromJSON, crashing the editor. toJS converts to plain JS so it can
  // hydrate. (Outline's own editor avoids this because Document.data is
  // @observable.shallow, keeping its arrays plain.)
  const data = raw && typeof raw === "object" ? toJS(raw) : undefined;

  if (!data || ProsemirrorHelper.isEmptyData(data)) {
    return null;
  }

  return (
    <Footer contentEditable={false}>
      {/* ErrorBoundary isolates any footer render failure to the footer itself,
          so a malformed footer can never crash the whole document (matches
          Outline's own use of ErrorBoundary around editors). */}
      <ErrorBoundary showTitle={false}>
        {/* value + defaultValue feed the (toJS'd, plain) ProseMirror data the
            way Outline's read-only editors do, so it renders rich. */}
        <Editor
          readOnly
          embedsDisabled
          extensions={richExtensions}
          value={data}
          defaultValue={data}
        />
      </ErrorBoundary>
    </Footer>
  );
}

export default observer(WorkspaceFooter);

const Footer = styled.div`
  margin-top: 2em;
  padding-top: 1em;
  border-top: 1px solid ${(props) => props.theme.divider};
  font-size: 0.9em;

  .ProseMirror {
    padding: 0;
    min-height: auto;
  }
`;
