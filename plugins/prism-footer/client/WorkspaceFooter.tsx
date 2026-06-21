import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { richExtensions } from "@shared/editor/nodes";
import { TeamPreference } from "@shared/types";
import { ProsemirrorHelper } from "@shared/utils/ProsemirrorHelper";
import Editor from "~/components/Editor";
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
  const team = auth.team;
  if (!team) {
    return null;
  }

  const overrides = team.getPreference(TeamPreference.CollectionFooters);
  const override =
    document.collectionId && overrides
      ? overrides[document.collectionId]
      : undefined;
  const data = override ?? team.getPreference(TeamPreference.Footer);

  if (
    !data ||
    typeof data !== "object" ||
    ProsemirrorHelper.isEmptyData(data)
  ) {
    return null;
  }

  return (
    <Footer contentEditable={false}>
      {/* Feed the stored ProseMirror data via value + defaultValue, the way
          Outline's read-only editors do (Document.tsx); this renders rich.
          (A markdown string fed here renders raw — the client editor hydrates
          from ProseMirror data, not via markdown parsing.) */}
      <Editor
        readOnly
        embedsDisabled
        extensions={richExtensions}
        value={data}
        defaultValue={data}
      />
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
