import { Query, Resolver } from "type-graphql";

import { Exemple } from "../schema";

@Resolver(Exemple)
export class ExempleResolver {
  @Query(() => Exemple)
  exemple(): Exemple {
    return {
      id: 1,
      user_id: "ssvc6847sd26fsxv24sfv",
      name: "Kevin",
      age: 65,
      createdAt: "2022-07-01T16:24:23.203Z",
      updatedAt: "2022-07-01T16:24:23.203Z",
    };
  }
}
