import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../services/employeesService";

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEmployee,
        onMutate: async (id) => {
            await queryClient.cancelQueries(["employees"]);

            const prevData = queryClient.getQueryData(["employees"]);

            queryClient.setQueryData(["employees"], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        rows: page.rows.filter((emp) => emp.id !== id),
                    })),
                };
            });

            return { prevData };
        },
        onError: (err, id, context) => {
            queryClient.setQueryData(["employees"], context.prevData);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["employees"]);
        },
    });
};
