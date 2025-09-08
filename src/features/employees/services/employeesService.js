import apiClient from "../../../services/apiClient";

export const getEmployees = async ({ pageParam = 0, search = "", limit = 10 }) => {
    const { data } = await apiClient.get("/employees", {
        params: {
            search,
            limit,
            offset: pageParam,
        },
    });
    return {
        rows: data.data.rows,
        nextOffset: pageParam + data.data.rows.length,
        hasMore: data.data.rows.length === limit,
    };
};

export const createEmployee = async (employeeData) => {
    const { data } = await apiClient.post("/employees/add", employeeData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

export const getEmployeeById = async (id) => {
    const result = await apiClient.get(`/employees/${id}`);
    return result.data.data;
};

export const updateEmployee = async (id, formData) => {
    const { data } = await apiClient.put(`/employees/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
}

export const deleteEmployee = async (id) => {
    const res = await apiClient.delete(`/employees/${id}`);
    return res.data;
};