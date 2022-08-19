import { GameVersion } from "@forged/types";
import { FC, useEffect, useRef, useState } from "react";
import { debounceTime, fromEvent, map } from "rxjs";

interface Props {
  current: string;
  onClick: (version: string) => void;
  minecraftVersions: GameVersion[];
}

const SidebarVersion: FC<Props> = ({ onClick, current, minecraftVersions }) => {
  const [getVersions, setVersions] = useState(minecraftVersions);
  const refInput = useRef(null);

  // Search System
  useEffect(() => {
    if (!refInput?.current) return;

    const input$ = fromEvent<InputEvent>(refInput.current, "input");
    const sub$ = input$
      .pipe(
        map(({ target }) => (target as HTMLInputElement).value),
        debounceTime(500)
      )
      .subscribe(search => {
        if (search) {
          const newListVersion = minecraftVersions
            .map((version: GameVersion) => {
              const newList = version.list.filter(listVersion =>
                RegExp(`${search}`, "i").test(listVersion)
              );
              return { ...version, list: newList };
            })
            .filter((version: GameVersion) => version.list.length);
          setVersions(newListVersion);
        } else {
          setVersions(minecraftVersions);
        }
      });

    return () => sub$.unsubscribe();
  }, [minecraftVersions, getVersions]);

  // Handle click Version
  const handleClick = (version: string) => {
    onClick(version);
  };

  // List Version HTML's
  let versionList;
  if (getVersions.length) {
    versionList = getVersions.map((versionObj: GameVersion) => (
      <div
        className="flex flex-col border-t-2 first:border-t-0 border-primary"
        key={versionObj.version}
      >
        {versionObj.list.map(version => (
          <button
            className={`px-5 py-2 w-full text-right border-b-1 last:border-b-0 border-t-alt transition-all duration-300 font-bold tracking-wider hover:bg-opacity-90 hover:bg-accent hover:pr-8 ${
              current === version ? "bg-accent pr-8" : "bg-tertiary"
            }`}
            key={version}
            onClick={() => handleClick(version)}
          >
            <span>
              {version
                .replace("-", "")
                .replace(/(.*)Snapshot/, "Snapshot - $1")}
            </span>
          </button>
        ))}
      </div>
    ));
  } else {
    versionList = (
      <div className="px-5 py-2 bg-tertiary w-full tracking-wider text-center font-light">
        No version matches this search...
      </div>
    );
  }

  return (
    <div>
      <div className="bg-secondary p-2 text-lg w-full text-left font-semibold">
        <i
          className={`icon-iconly-outline-arrow-right-square before:transition before:duration-300`}
        />{" "}
        <span>Version</span>
      </div>
      <div className="flex pl-3 items-center border-t border-b border-opacity-80 border-primary bg-tertiary bg-opacity-50">
        <i className="icon-iconly-outline-search text-lg" />
        <input
          type="text"
          placeholder="Search version..."
          ref={refInput}
          className="bg-transparent w-full px-4 py-2"
        />
      </div>
      <div className="w-full flex flex-col max-h-48 overflow-auto">
        <button
          className={`px-5 py-2 w-full text-right transition-all duration-300 font-bold tracking-wider hover:bg-opacity-90 hover:bg-accent hover:pr-8 ${
            current === "all" ? "bg-accent pr-8" : "bg-tertiary"
          }`}
          onClick={() => handleClick("all")}
        >
          <span>All</span>
        </button>
        {versionList}
      </div>
    </div>
  );
};

export default SidebarVersion;
