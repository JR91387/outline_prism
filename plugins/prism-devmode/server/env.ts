import { IsOptional } from "class-validator";
import { Environment } from "@server/env";
import { Public } from "@server/utils/decorators/Public";
import environment from "@server/utils/environment";

class PrismDevModeEnvironment extends Environment {
  /**
   * Enables the Prism one-click dev-mode bootstrap and the front-page button.
   * @Public so the client can show the button. NEVER set this in production.
   */
  @Public
  @IsOptional()
  public PRISM_DEVMODE = this.toBoolean(environment.PRISM_DEVMODE ?? "false");
}

export default new PrismDevModeEnvironment();
