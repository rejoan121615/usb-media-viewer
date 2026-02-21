import { useMemo } from "react";
import Fuse, { IFuseOptions } from "fuse.js";

interface UseFuseSearchOptions<T> {
  keys: IFuseOptions<T>["keys"];
  threshold?: number; // 0 = exact match, 1 = match anything
}

function useFuseSearch<T>(
  query: string,
  dataList: T[],
  options: UseFuseSearchOptions<T>
): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(dataList, {
        keys: options.keys,
        threshold: options.threshold ?? 0.3,
      }),
    [dataList, options.keys, options.threshold]
  );

  const results = useMemo(() => {
    if (!query.trim()) return dataList;
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, dataList]);

  return results;
}

export default useFuseSearch;
