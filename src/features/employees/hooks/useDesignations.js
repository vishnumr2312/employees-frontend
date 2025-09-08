import { useQuery } from "@tanstack/react-query";
import { getDesignations } from "../services/designationsService";

export const useDesignations = () => {
    return useQuery({
        queryKey: ["designations"],
        queryFn: async () => {
            const res = await getDesignations();
            return res.data;
        },
    });
};