import useSWRInfinite from "swr/infinite";
import { getRoomsAndInfo } from "../actions/liveblocks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PAGE_LOAD_COUNT = 10; 
const INITIAL_PAGE_MULTIPLIER = 1; 
const REFRESH_TIME_MS = 10_000; 

const NO_CURSOR = Symbol();

export function usePageLinks() {
  const [reachedEnd, setReachedEnd] = useState(false);

  const result = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (pageIndex === 0 || !previousPageData) {
        return NO_CURSOR; 
      }

      if (!previousPageData.nextCursor) {
        return null;
      }

      return previousPageData.nextCursor;
    },
    async (cursor) => {
      const data = await getRoomsAndInfo({
        cursor: cursor === NO_CURSOR ? undefined : cursor,
        limit: PAGE_LOAD_COUNT,
      });

      if (!data.nextCursor) {
        setReachedEnd(true);
      }

      return data;
    },
    {
      refreshInterval: REFRESH_TIME_MS,
      initialSize: INITIAL_PAGE_MULTIPLIER,
    }
  );

  const isLoadingMore =
    result.isLoading ||
    (result.size > 0 &&
      result.data &&
      typeof result.data[result.size - 1] === "undefined");

  const pathname = usePathname();
  useEffect(() => {
    result.mutate();
  }, [pathname]);

  return { ...result, reachedEnd, isLoadingMore };
}
