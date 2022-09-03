export interface ApiResponseOfListOfMinecraftGameVersion {
  data: MinecraftGameVersion[];
}

export interface ApiResponseOfListOfMinecraftModLoaderIndex {
  data: MinecraftModLoaderIndex[];
}

export interface ApiResponseOfMinecraftGameVersion {
  data: MinecraftGameVersion;
}

export interface ApiResponseOfMinecraftModLoaderVersion {
  data: MinecraftModLoaderVersion;
}

export interface Category {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  url: string;
  iconUrl: string;
  dateModified: string;
  isClass?: boolean;
  classId?: number;
  parentCategoryId?: number;
  displayIndex?: number;
}

export enum CoreApiStatus {
  Private = 1,
  Public,
}

export enum CoreStatus {
  Draft = 1,
  Test,
  PendingReview,
  Rejected,
  Approved,
  Live,
}

export interface FeaturedModsResponse {
  featured: Mod[];
  popular: Mod[];
  recentlyUpdated: Mod[];
}

export interface File {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: FileReleaseType;
  fileStatus: FileStatus;
  hashes: FileHash[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: SortableGameVersion[];
  dependencies: FileDependency[];
  exposeAsAlternative?: boolean;
  parentProjectFileId?: number;
  alternateFileId?: number;
  isServerPack?: boolean;
  serverPackFileId?: number;
  fileFingerprint: number;
  modules: FileModule[];
  changelog?: string;
}

export interface FileDependency {
  modId: number;
  relationType: FileRelationType;
}

export interface FileHash {
  value: string;
  algo: HashAlgo;
}

export interface FileIndex {
  gameVersion: string;
  fileId: number;
  filename: string;
  releaseType: FileReleaseType;
  gameVersionTypeId?: number;
  modLoader: ModLoaderType;
}

export interface FileModule {
  name: string;
  fingerprint: number;
}

export enum FileRelationType {
  EmbeddedLibrary = 1,
  OptionalDependency,
  RequiredDependency,
  Tool,
  Incompatible,
  Include,
}

export enum FileReleaseType {
  Release = 1,
  Beta,
  Alpha,
}

export enum FileStatus {
  Processing = 1,
  ChangesRequired,
  UnderReview,
  Approved,
  Rejected,
  MalwareDetected,
  Deleted,
  Archived,
  Testing,
  Released,
  ReadyForReview,
  Deprecated,
  Baking,
  AwaitingPublishing,
  FailedPublishing,
}

export interface FingerprintFuzzyMatch {
  id: number;
  file: File;
  latestFiles: File[];
  fingerprints: number[];
}

export interface FingerprintFuzzyMatchResult {
  fuzzuMatches: FingerprintFuzzyMatch[];
}

export interface FingerprintMatch {
  id: number;
  file: File;
  latestFiles: File[];
}

export interface FingerprintsMatchesResult {
  isCacheBuilt: boolean;
  exactMatches: FingerprintMatch[];
  exactFingerprints: number[];
  partialMatches: FingerprintMatch[];
  partialMatchFingerprints: {};
  additionalProperties: number[];
  installedFingerprints: number[];
  unmatchedFingerprints: number[];
}

export interface FolderFingerprint {
  foldername: string;
  fingerprints: number[];
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  dateModified: string;
  assets: GameAssets;
  status: CoreStatus;
  apiStatus: CoreApiStatus;
}

export interface GameAssets {
  iconUrl: string;
  tileUrl: string;
  coverUrl: string;
}

export interface GameVersionsByType {
  type: number;
  versions: string[];
}

export enum GameVersionStatus {
  Approved = 1,
  Deleted,
  New,
}

export interface GameVersionType {
  id: number;
  gameId: number;
  name: string;
  slug: string;
}

export enum GameVersionTypeStatus {
  Normal = 1,
  Deleted,
}

export interface GetCategoriesResponse {
  data: Category[];
}

export interface GetFeaturedModsResponse {
  data: FeaturedModsResponse;
}

export interface GetFilesResponse {
  data: File[];
}

export interface GetFingerprintMatchesResponse {
  data: FingerprintsMatchesResult;
}

export interface GetFingerprintsFuzzyMatchesResponse {
  data: FingerprintFuzzyMatchResult;
}

export interface GetGameResponse {
  data: Game;
}

export interface GetGamesResponse {
  data: Game[];
  pagination: Pagination;
}

export interface GetModFileResponse {
  data: File;
}

export interface GetModFilesResponse {
  data: File[];
  pagination: Pagination;
}

export interface GetModResponse {
  data: Mod;
}

export interface GetModsResponse {
  data: Mod[];
}

export interface GetVersionTypesResponse {
  data: GameVersionType[];
}

export interface GetVersionsResponse {
  data: GameVersionsByType[];
}

export interface GetFeaturedModsRequestBody {
  gameId: number;
  excludedModIds: number[];
  gameVersionTypeId?: number;
}

export interface GetFingerprintMatchesRequestBody {
  fingerprints: number;
}

export interface GetFuzzyMatchesRequestBody {
  gameId: number;
  fingerprints: FolderFingerprint[];
}

export interface GetModFilesRequestBody {
  fields: number[];
}

export interface GetModsByIdsListRequestBody {
  modIds: number[];
}

export enum HashAlgo {
  Sha1 = 1,
  Md5,
}

export interface MinecraftGameVersion {
  id: number;
  gameVersionId: number;
  versionString: string;
  jarDownloadUrl: string;
  jsonDownladUrl: string;
  approved: boolean;
  dateMModified: string;
  gameVersionTypeId: number;
  gameVerionStatus: GameVersionStatus;
  gameVersionTypeStatus: GameVersionTypeStatus;
}

export interface MinecraftModLoaderIndex {
  name: string;
  gameVersion: string;
  latest: boolean;
  recommended: boolean;
  dateModified: string;
  type: ModLoaderType;
}

export interface MinecraftModLoaderVersion {
  id: number;
  gameVerionId: number;
  minecraftGameVerionId: number;
  forgeVersion: string;
  name: string;
  type: ModLoaderType;
  downloadUrl: string;
  filename: string;
  installMethod: ModLoaderInstallMethod;
  latest: boolean;
  recommender: boolean;
  approved: boolean;
  dateModified: string;
  mavenVersionString: string;
  versionJson: string;
  libraruesInstallLocation: string;
  minecraftVersion: string;
  additionalFilesJson: string;
  modLoaderGameVersionId: number;
  modLoaderGameVersionTypeId: number;
  modLoaderGameVersionStatus: GameVersionStatus;
  modLoaderGameVersionTypeStatus: GameVersionTypeStatus;
  mcGameVersionId: number;
  mcGameVersinoTypeId: number;
  mcGameVersionTypeStatus: GameVersionTypeStatus;
  installProdilJson: string;
}

export interface Mod {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  links: ModLinks;
  summary: string;
  status: ModStatus;
  downloadCount: number;
  isFeatured: boolean;
  primaryCategoryId: number;
  categories: Category[];
  classId?: number;
  authors: ModAuthor[];
  logo: ModAsset;
  screenshots: ModAsset[];
  mainFileId: number;
  latestFiles: File[];
  latestFilesIndexes: FileIndex[];
  dateCreated: string;
  dateModified: string;
  dateReleased: string;
  allowModDistribution?: boolean;
  gamePopularityRank: number;
  thumbsUpCount: number;
}

export interface ModAsset {
  id: number;
  modId: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
}

export interface ModAuthor {
  id: number;
  name: string;
  url: string;
}

export interface ModLinks {
  websiteUrl: string;
  wikiUrl: string;
  issuesUrl: string;
  sourceUrl: string;
}

export enum ModLoaderInstallMethod {
  ForgeInstaller = 1,
  ForgeJarInstall,
  ForgeInstaller_v2,
}

export enum ModLoaderType {
  Any,
  Forge,
  Cauldron,
  LiteLoader,
  Fabric,
  Quilt,
}

export enum ModsSearchSortField {
  Featured = 1,
  Popularity,
  LastUpdated,
  Name,
  Author,
  TotalDownloads,
  Category,
  GameVersion,
}

export enum ModStatus {
  New = 1,
  ChangesRequired,
  UnderSoftReview,
  Approved,
  Rejected,
  ChangesMade,
  Inactive,
  Abandoned,
  Deleted,
  UnderReview,
}

export interface Pagination {
  index: number;
  pageSize: number;
  resultCount: number;
  totalCount: number;
}

export interface SearchModsResponse {
  data: Mod[];
  pagination: Pagination;
}

export interface SortableGameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId?: number;
}

export type SortOrder = "asc" | "desc";
