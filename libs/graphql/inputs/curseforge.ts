import type { SortOrder } from "@forged/types";
import { ModLoaderType, ModsSearchSortField } from "@forged/types";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class ModpackInput {
  @Field(type => Int, { nullable: true })
  sortField!: ModsSearchSortField;

  @Field(type => String, { nullable: true })
  sortOrder!: SortOrder;

  @Field(type => Int, { nullable: true })
  index!: number;

  @Field(type => Int, { nullable: true })
  modLoader!: ModLoaderType;

  @Field(type => String, { nullable: true })
  gameVersion!: string;
}
