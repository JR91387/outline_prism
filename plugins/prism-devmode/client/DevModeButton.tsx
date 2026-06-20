import * as React from "react";
import styled from "styled-components";

/**
 * Front-page "Dev Mode" button, rendered on the login / create-workspace screen
 * when PRISM_DEVMODE is on. Navigates to the server route that provisions a
 * populated dev workspace (team + users + demo content + API key) and signs the
 * browser in. Self-contained in this plugin; the only core edit is a 2-line
 * import+render in Login.tsx.
 *
 * @returns the dev-mode entry button.
 */
export function DevModeButton() {
  return (
    <Wrapper>
      <Button href="/api/prism-devmode.enter">🛠 Enter Dev Mode</Button>
      <Hint>
        provisions a populated workspace + users + content, then signs you in
      </Hint>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 12px;
  border: 1px dashed ${(props) => props.theme.divider};
  border-radius: 8px;
  width: 100%;
`;

const Button = styled.a`
  display: inline-block;
  font-family: ${(props) => props.theme.fontFamilyMono};
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  color: ${(props) => props.theme.accentText};
  background: ${(props) => props.theme.accent};
  text-decoration: none;

  &:hover {
    opacity: 0.9;
  }
`;

const Hint = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.textTertiary};
  text-align: center;
`;
