import Router from "koa-router";
import { Client } from "@shared/types";
import { transaction } from "@server/middlewares/transaction";
import { User } from "@server/models";
import type { APIContext } from "@server/types";
import { Hook, PluginManager } from "@server/utils/PluginManager";
import { signIn } from "@server/utils/authentication";
import config from "../plugin.json";
import { existingTeam, provisionDevWorkspace } from "./bootstrap";
import env from "./env";

// Inert unless PRISM_DEVMODE is set — the route is never even registered.
if (env.PRISM_DEVMODE) {
  const router = new Router();

  // GET /api/prism-devmode.enter — provisions the dev workspace on first hit
  // (idempotent: signs into the existing one afterwards), then signs the
  // browser in and redirects into the app. Unauthenticated by design.
  router.get("prism-devmode.enter", transaction(), async (ctx: APIContext) => {
    const existing = await existingTeam(ctx);

    if (existing) {
      const admin =
        (await User.findOne({
          where: { teamId: existing.id, email: "jerry@prism.local" },
          transaction: ctx.state.transaction,
        })) ??
        (await User.findOne({
          where: { teamId: existing.id },
          order: [["createdAt", "ASC"]],
          transaction: ctx.state.transaction,
        }));

      if (admin) {
        await signIn(ctx, "email", {
          user: admin,
          team: existing,
          isNewTeam: false,
          isNewUser: false,
          client: Client.Web,
        });
        return;
      }
    }

    const { team, admin } = await provisionDevWorkspace(ctx);
    await signIn(ctx, "email", {
      user: admin,
      team,
      isNewTeam: true,
      isNewUser: true,
      client: Client.Web,
    });
  });

  PluginManager.add([{ ...config, type: Hook.API, value: router }]);
}
