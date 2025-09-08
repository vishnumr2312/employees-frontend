import apiClient from "../../../services/apiClient";

export const getDesignations = async () => {
    const { data } = await apiClient.get("/designations");
    return data;
};