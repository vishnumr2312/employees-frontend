import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../services/employeesService";

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries(["employees"]);
        },
    });
};
