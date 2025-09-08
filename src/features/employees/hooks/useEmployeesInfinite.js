import { useInfiniteQuery } from "@tanstack/react-query";
import { getEmployees } from "../services/employeesService";

export const useEmployeesInfinite = ({ search, limit = 10 }) => {
    return useInfiniteQuery({
        queryKey: ["employees", search],
        queryFn: ({ pageParam = 0 }) =>
            getEmployees({ pageParam, search, limit }),
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextOffset : undefined,
        staleTime: 1000 * 60,
    });
};
