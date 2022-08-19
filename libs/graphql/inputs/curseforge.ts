import type { SortOrder } from "@forged/types";
import { ModLoaderType, ModsSearchSortField } from "@forged/types";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CFSearchInput {
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

  @Field(type => Int, { nullable: true })
  gameId!: number;

  @Field(type => Int, { nullable: true })
  classId!: number;

  @Field(type => Int, { nullable: true })
  categoryId!: number;

  @Field(type => String, { nullable: true })
  searchFilter!: string;

  @Field(type => Int, { nullable: true })
  gameVersionTypeId!: number;

  @Field(type => String, { nullable: true })
  slug!: string;

  @Field(type => Int, { nullable: true })
  pageSize!: number;
}
