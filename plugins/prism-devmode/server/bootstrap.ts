import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { CollectionPermission, UserRole } from "@shared/types";
import slugify from "@shared/utils/slugify";
import teamCreator from "@server/commands/teamCreator";
import { createContext } from "@server/context";
import env from "@server/env";
import { ApiKey, Collection, Document, Team, User } from "@server/models";
import { DocumentHelper } from "@server/models/helpers/DocumentHelper";
import type { APIContext } from "@server/types";
import { type DemoDoc, demoCollections } from "./content";

const TEAM_NAME = "Prism Dev";

/** Where the Claude user's API key is written so the agent can read it. */
export const TOKEN_FILE = path.join(
  env.FILE_STORAGE_LOCAL_ROOT_DIR,
  "prism-devmode",
  "claude-token.txt"
);

async function createDoc(
  context: ReturnType<typeof createContext>,
  collection: Collection,
  node: DemoDoc,
  parentDocumentId: string | null
) {
  const document = await Document.createWithCtx(context, {
    version: 2,
    parentDocumentId,
    collectionId: collection.id,
    teamId: collection.teamId,
    lastModifiedById: collection.createdById,
    createdById: collection.createdById,
    title: node.title,
    text: node.text,
  });
  document.content = await DocumentHelper.toJSON(document);
  await document.publish(context, {
    collectionId: collection.id,
    silent: true,
  });
  for (const child of node.children ?? []) {
    await createDoc(context, collection, child, document.id);
  }
}

/**
 * Provisions the Prism dev workspace: a team, two admin users (Jerry + Claude),
 * the demo collections/pages, and an API key for Claude (written to TOKEN_FILE).
 * Runs inside the route's transaction (ctx.state.transaction).
 *
 * @param ctx the route API context (must carry an open transaction).
 * @returns the team and the admin user to sign in.
 */
export async function provisionDevWorkspace(ctx: APIContext) {
  const { transaction } = ctx.state;

  const team = await teamCreator(ctx, {
    name: TEAM_NAME,
    subdomain: slugify(TEAM_NAME),
    authenticationProviders: [],
  });

  const admin = await User.createWithCtx(ctx, {
    name: "Jerry",
    email: "jerry@prism.local",
    teamId: team.id,
    role: UserRole.Admin,
  });

  const claude = await User.createWithCtx(ctx, {
    name: "Claude",
    email: "claude@prism.local",
    teamId: team.id,
    role: UserRole.Admin,
  });

  const context = createContext({ ...ctx, transaction, user: admin });

  for (const def of demoCollections) {
    const collection = await Collection.createWithCtx(context, {
      name: def.name,
      icon: def.icon,
      color: def.color,
      description: def.description,
      teamId: team.id,
      createdById: admin.id,
      sort: Collection.DEFAULT_SORT,
      permission: CollectionPermission.ReadWrite,
    });
    for (const node of def.docs) {
      await createDoc(context, collection, node, null);
    }
  }

  const apiKey = await ApiKey.createWithCtx(ctx, {
    name: "prism-devmode (Claude)",
    userId: claude.id,
  });
  await mkdir(path.dirname(TOKEN_FILE), { recursive: true });
  await writeFile(TOKEN_FILE, `${apiKey.value ?? ""}\n`, "utf8");

  return { team, admin };
}

/** @returns the existing team if the installation is already provisioned. */
export async function existingTeam(ctx: APIContext) {
  return Team.findOne({ transaction: ctx.state.transaction });
}
