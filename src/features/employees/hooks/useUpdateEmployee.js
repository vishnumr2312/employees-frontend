import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../services/employeesService";

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }) => updateEmployee(id, formData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["employee", variables.id]);
        },
    });
};