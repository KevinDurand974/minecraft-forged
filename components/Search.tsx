import { SearchArgs } from "@forged/types";
import { FC, useEffect, useState } from "react";
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  filter,
  map,
} from "rxjs";

interface Props {
  loaded: boolean;
  fetchQuery: (queryArg: Partial<SearchArgs>) => void;
}

const Search: FC<Props> = ({ loaded, fetchQuery }) => {
  const [oldSearch, setOldSearch] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(loaded);
  const search$ = new BehaviorSubject(search).asObservable();
  const oldSearch$ = new BehaviorSubject(oldSearch).asObservable();

  useEffect(() => {
    const sub$ = search$
      .pipe(
        combineLatestWith(oldSearch$),
        map(([search, old]) => ({ search, old })),
        filter(({ search }) => search.length > 2),
        filter(({ search, old }) => search !== old),
        filter(() => !isSearching),
        debounceTime(500)
      )
      .subscribe(({ search, old }) => {
        if (old !== "" && old === search) return false;
        setIsSearching(true);
        if (search !== "sclear" && old !== "osclear") {
          setOldSearch(search);
          fetchQuery({ index: 0, searchFilter: search });
        } else {
          setOldSearch("");
          setSearch("");
          fetchQuery({ index: 0 });
        }
      });

    if (isSearching && loaded) setIsSearching(false);

    return () => sub$.unsubscribe();
  }, [search$, oldSearch, fetchQuery, isSearching, loaded, oldSearch$]);

  const handleReset = () => {
    setSearch("sclear");
    setOldSearch("osclear");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-2 py-2 bg-tertiary relative flex">
      <div className="flex justify-center items-center w-11">
        {!isSearching ? (
          <i className="icon-iconly-bold-search text-2xl" />
        ) : (
          <div className="relative animate-spin">
            <i className="icon-more" />
            <i className="icon-more absolute inset-0 animate-ping" />
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Search a Modpack..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-3 py-2 border-none bg-transparent tracking-wider text-lg font-semibold outline-none"
      />
      <button
        className="flex gap-2 items-center text-lg font-semibold bg-s-alt py-1 px-3 opacity-50 transition duration-200 hover:bg-secondary hover:opacity-100"
        onClick={handleReset}
      >
        <i className="icon-iconly-outline-delete" />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default Search;