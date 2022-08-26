import PackItem from "@components/PackItem";
import { File } from "@forged/graphql/schema";
import { closestIndexTo, format } from "date-fns";
import { FC, useMemo } from "react";

interface Props {
  files: File[];
}

const groupBy = (arr: any[], property: string) => {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) memo[x[property]] = [];
    memo[x[property]].push(x);
    return memo;
  }, {});
};

const compare = (a: string, b: string) =>
  b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" });

const filesFilter = (files: File[]) => {
  const versionMap = new Map<string, File[]>();
  files.forEach(file => {
    const version =
      file.gameVersions.find(field => field.startsWith("1.")) || "no-version";
    versionMap.set(
      version,
      versionMap.has(version) ? [...versionMap.get(version)!, file] : [file]
    );
  });
  const showVersion = new Map<string, File[]>();

  versionMap.forEach((versionFiles, key, map) => {
    const releaseTypeFiltered = groupBy(versionFiles, "releaseType");
    for (const releaseType in releaseTypeFiltered) {
      const arrayList = releaseTypeFiltered[releaseType];
      const newerIndex = closestIndexTo(
        new Date(),
        arrayList.map((file: File) => new Date(file.fileDate))
      );
      showVersion.set(
        key,
        showVersion.has(key)
          ? [...showVersion.get(key)!, arrayList[newerIndex!]]
          : [arrayList[newerIndex!]]
      );
    }
  });
  return new Map(
    [...showVersion.entries()].sort((a, b) => compare(a[0], b[0]))
  );
};

const SidebarFiles: FC<Props> = ({ files }) => {
  const selectedFiles = useMemo(() => filesFilter(files), [files]);

  const whichRelease = (type: number) => {
    let letter = "";
    let classe =
      "px-2 py-2 pt-3 font-bold rounded-lg flex justify-center items-center w-12 h-12";
    switch (type) {
      case 1:
        letter = "R";
        classe = classe + " bg-green-600";
        break;
      case 2:
        letter = "B";
        classe = classe + " bg-blue-600";
        break;
      case 3:
        letter = "A";
        classe = classe + " bg-gray-500";
        break;
    }
    return <div className={classe}>{letter}</div>;
  };

  return (
    <PackItem title={`File${files.length > 1 ? "s" : ""}`}>
      <div className="flex flex-col gap-4">
        {[...selectedFiles.keys()].map(version => {
          return (
            <div
              key={version}
              className="flex flex-col gap-4 pb-8 border-b-2 border-primary last:border-b-0 last:pb-0"
            >
              <h3 className="font-bold text-xl tracking-wider text-center">
                {version}
              </h3>
              {selectedFiles.get(version)!.map(file => (
                <div key={file.id} className="flex gap-2 items-center">
                  {whichRelease(file.releaseType)}
                  <div className="flex flex-col">
                    <h4 className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                      {file.displayName}
                    </h4>
                    <p className="text-xs">
                      {format(new Date(file.fileDate), "MMM d, Y")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </PackItem>
  );
};

export default SidebarFiles;
