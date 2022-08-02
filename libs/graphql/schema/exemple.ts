import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Exemple {
  @Field(type => Int)
  id!: number;

  @Field(type => ID)
  user_id!: string;

  @Field(type => String)
  name!: string;

  @Field(type => Int, { nullable: true })
  age?: number;

  @Field(type => String)
  createdAt!: string;

  @Field(type => String)
  updatedAt!: string;
}
