import { SelectMulti } from "@components/element-custom";
import SelectSingle from "@components/element-custom/SelectSingle";
import Pagination from "@components/Pagination";
import ReleaseType from "@components/ReleaseType";
import { getCFFileChanglog, maxItemPerPage } from "@forged/curseforge";
import { File } from "@forged/types";
import { format, formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import FileLatest from "./FileLastest";

interface Props {
  files: File[];
  modId: number;
}

const Files: FC<Props> = ({ files }) => {
  const filesList = useMemo(() => files, [files]);

  const [list, setList] = useState<File[]>(filesList);
  const [getFilesIndex, setFilesIndex] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(maxItemPerPage);
  const [selectedReleaseType, setSelectedReleaseType] = useState(["All"]);
  const [orderBy, setOrderBy] = useState("Desc");

  const nbPage = useMemo(() => {
    return Math.ceil(
      list.filter(file => {
        const arrayType = [];
        if (selectedReleaseType.includes("All")) return true;
        if (selectedReleaseType.includes("Release")) arrayType.push(1);
        if (selectedReleaseType.includes("Beta")) arrayType.push(2);
        if (selectedReleaseType.includes("Alpha")) arrayType.push(3);
        return arrayType.includes(file.releaseType);
      }).length / itemPerPage
    );
  }, [list, itemPerPage, selectedReleaseType]);

  const handleReleaseTypeChange = useCallback((value: string[]) => {
    setFilesIndex(1);
    setSelectedReleaseType(value);
  }, []);

  const handleItemPerPageChange = useCallback((value: string) => {
    setFilesIndex(1);
    setItemPerPage(Number(value));
  }, []);

  const handlePageChange = (page: number) => {
    setFilesIndex(page);
  };

  const handleOrderByChange = useCallback(
    (value: string) => {
      if (value === orderBy) return;
      setFilesIndex(1);
      if (value === "Desc") {
        setList(filesList);
        setOrderBy("Desc");
      } else {
        setList([...filesList].reverse());
        setOrderBy("Asc");
      }
    },
    [filesList, orderBy]
  );

  return (
    <div className="p-4 border-2 border-t-alt bg-t-alt bg-opacity-30 shadow-xs shadow-tertiary">
      <h2 className="text-3xl small-case tracking-wider font-bold mb-4 border-b-2 border-t-alt pb-2 w-2/3">
        All files
      </h2>

      <FileLatest files={filesList} />

      <div>
        <h3 className="text-2xl font-semibold">File list</h3>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-48">
            <label className="text-lg font-semibold">Items per page</label>
            <SelectSingle
              values={["5", "10", "20", "50", "100"]}
              defaultValue={maxItemPerPage.toString()}
              onChange={handleItemPerPageChange}
            />
          </div>
          <div className="w-48">
            <label className="text-lg font-semibold">Order by</label>
            <SelectSingle
              values={["Asc", "Desc"]}
              defaultValue={orderBy}
              onChange={handleOrderByChange}
            />
          </div>
          <div className="">
            <label className="text-lg font-semibold">Release Type</label>
            <SelectMulti
              values={["All", "Release", "Alpha", "Beta"]}
              defaultValue="All"
              onChange={handleReleaseTypeChange}
            />
          </div>
        </div>
        <div className="flex justify-center w-full mb-4">
          <Pagination
            nbPage={nbPage}
            currentPage={getFilesIndex}
            onPageClick={setFilesIndex}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="flex flex-col bg-primary border-2 border-t-alt">
          {list
            .filter(file => {
              const arrayType = [];
              if (selectedReleaseType.includes("All")) return true;
              if (selectedReleaseType.includes("Release")) arrayType.push(1);
              if (selectedReleaseType.includes("Beta")) arrayType.push(2);
              if (selectedReleaseType.includes("Alpha")) arrayType.push(3);
              return arrayType.includes(file.releaseType);
            })
            .slice(
              (getFilesIndex - 1) * itemPerPage,
              (getFilesIndex - 1) * itemPerPage + itemPerPage
            )
            .map(file => (
              <div
                key={file.id}
                className="flex items-center gap-2 w-full odd:bg-t-alt odd:bg-opacity-50 px-4 py-2.5"
              >
                <ReleaseType type={file.releaseType} />
                <span className="text-xl font-semibold ml-2 flex-1">
                  {file.displayName}
                </span>
                <div className="flex gap-2 items-center ml-auto">
                  <span className="tracking-wider font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 4,
                    }).format(file.downloadCount)}
                    <i className="icon-download text-xs align-[2px] ml-1" />
                  </span>
                  <span className="font-light">
                    {format(new Date(file.fileDate), "MMM d, Y")}
                  </span>
                  <span className="text-xs">
                    (
                    {formatDistanceToNowStrict(new Date(file.fileDate), {
                      addSuffix: true,
                    })}
                    )
                  </span>
                  <Link href={file.downloadUrl}>
                    <a className="border-2 border-accent text-2xl w-10 h-10 flex items-center justify-center rounded-lg text">
                      <i className="icon-download text-accent" />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <div className="w-full flex justify-center mt-4">
          <Pagination
            nbPage={nbPage}
            currentPage={getFilesIndex}
            onPageClick={setFilesIndex}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Files;
