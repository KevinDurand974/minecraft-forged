import { getModpacks } from "@forged/curseforge";
import { Arg, Args, Query, Resolver } from "type-graphql";

import { ModpackInput } from "../inputs";
import { Mod } from "../schema/curseforge";

@Resolver(Mod)
export class ModpackResolver {
  @Query(() => [Mod])
  async findMany(
    @Arg("args", type => ModpackInput, { nullable: true }) args: ModpackInput
  ): Promise<Mod[]> {
    const res = await getModpacks(args);
    if (!res?.data.length) return [];
    return res.data;
  }
}
