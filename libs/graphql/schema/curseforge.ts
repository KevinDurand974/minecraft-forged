import { ModLoaderType } from "@forged/types";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ModLinks {
  @Field(type => String, { nullable: true })
  websiteUrl!: string;

  @Field(type => String, { nullable: true })
  wikiUrl!: string;

  @Field(type => String, { nullable: true })
  issuesUrl!: string;

  @Field(type => String, { nullable: true })
  sourceUrl!: string;
}

@ObjectType()
export class Category {
  @Field(type => Int)
  id!: number;

  @Field(type => String)
  name!: string;

  @Field(type => String, { nullable: true })
  slug?: string;

  @Field(type => String)
  url!: string;

  @Field(type => String)
  iconUrl!: string;

  @Field(type => String)
  dateModified!: string;

  @Field(type => Boolean, { nullable: true })
  isClass?: boolean;
}

@ObjectType()
export class ModAuthor {
  @Field(type => Int)
  id!: number;

  @Field(type => String)
  name!: string;

  @Field(type => String)
  url!: string;
}

@ObjectType()
export class ModAsset {
  @Field(type => Int)
  id!: number;

  @Field(type => Int)
  modId!: number;

  @Field(type => String)
  title!: string;

  @Field(type => String)
  description!: string;

  @Field(type => String)
  thumbnailUrl!: string;

  @Field(type => String)
  url!: string;
}

@ObjectType()
export class File {
  @Field(type => Int)
  id!: number;

  @Field(type => Int)
  modId!: number;

  @Field(type => Boolean)
  isAvailable!: boolean;

  @Field(type => String)
  displayName!: string;

  @Field(type => String)
  fileName!: string;

  @Field(type => Int)
  releaseType!: number;

  @Field(type => Int)
  fileStatus!: number;

  @Field(type => String)
  fileDate!: string;

  @Field(type => Int)
  fileLength!: number;

  @Field(type => Int)
  downloadCount!: number;

  @Field(type => String, { nullable: true })
  downloadUrl!: string;

  @Field(type => [String])
  gameVersions!: string[];

  @Field(type => [SortableGameVersion])
  sortableGameVersions!: SortableGameVersion[];

  @Field(type => [FileDependency])
  dependencies!: FileDependency[];

  @Field(type => Boolean, { nullable: true })
  isServerPack?: boolean;

  @Field(type => String, { nullable: true })
  changelog?: string;
}

@ObjectType()
export class FileIndex {
  @Field(type => String)
  gameVersion!: string;

  @Field(type => Int)
  fileId!: number;

  @Field(type => String)
  filename!: string;

  @Field(type => Int)
  releaseType!: number;

  @Field(type => Int, { nullable: true })
  gameVersionTypeId?: number;

  @Field(type => Int, { nullable: true })
  modLoader?: number;
}

@ObjectType()
export class SortableGameVersion {
  @Field(type => String)
  gameVersionName!: string;

  @Field(type => String)
  gameVersionPadded!: string;

  @Field(type => String)
  gameVersion!: string;

  @Field(type => String)
  gameVersionReleaseDate!: string;

  @Field(type => Int, { nullable: true })
  gameVersionTypeId?: number;
}

@ObjectType()
export class FileDependency {
  @Field(type => Int)
  modId!: number;

  @Field(type => Int)
  relationType!: number;
}

@ObjectType()
export class Pagination {
  @Field(type => Int)
  index!: number;

  @Field(type => Int)
  pageSize!: number;

  @Field(type => Int)
  resultCount!: number;

  @Field(type => Int)
  totalCount!: number;
}

@ObjectType()
export class Mod {
  @Field(type => Int)
  id!: number;

  @Field(type => String)
  name!: string;

  @Field(type => String)
  slug!: string;

  @Field(type => Int, { nullable: true })
  classId?: number;

  @Field(type => ModLinks)
  links!: ModLinks;

  @Field(type => String)
  summary!: string;

  @Field(type => Int)
  status!: number;

  @Field(type => Int)
  downloadCount!: number;

  @Field(type => Boolean)
  isFeatured!: boolean;

  @Field(type => [Category])
  categories!: Category[];

  @Field(type => [ModAuthor])
  authors!: ModAuthor[];

  @Field(type => ModAsset)
  logo!: ModAsset;

  @Field(type => [ModAsset])
  screenshots!: ModAsset[];

  @Field(type => Int)
  mainFileId!: number;

  @Field(type => [File])
  latestFiles!: File[];

  @Field(type => [FileIndex])
  latestFilesIndexes!: FileIndex[];

  @Field(type => String)
  dateCreated!: string;

  @Field(type => String)
  dateModified!: string;

  @Field(type => String)
  dateReleased!: string;

  @Field(type => Boolean, { nullable: true })
  allowModDistribution?: boolean;

  @Field(type => Int)
  gamePopularityRank!: number;
}

@ObjectType()
export class Mods {
  @Field(type => [Mod])
  mods!: Mod[];

  @Field(type => Pagination, { nullable: true })
  pagination?: Pagination;
}

@ObjectType()
export class GameVersionType {
  @Field(type => Int)
  id!: number;

  @Field(type => Int)
  gameId!: number;

  @Field(type => String)
  name!: string;

  @Field(type => String)
  slug!: string;
}

@ObjectType()
export class Version {
  @Field(type => String)
  version!: string;

  @Field(type => [String])
  list!: string[];
}

@ObjectType()
export class ModLoader {
  @Field(type => String)
  name!: ModLoaderType;
}

@ObjectType()
export class CompleteMod extends Mod {
  @Field(type => String)
  description!: string;

  @Field(type => [File])
  files!: File[];
}
