import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../services/employeesService";

export const useEmployee = (id) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => getEmployeeById(id),
        enabled: !!id
    });
};