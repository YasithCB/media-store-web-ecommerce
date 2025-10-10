import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const getTopRatedEquipments = async () => {
    return fetchWrapper("/equipment-posts/top-rated");
};

export const getAllEquipments = async () => {
    return fetchWrapper("/equipments");
};

export const getEquipmentById = async (id) => {
    return fetchWrapper(`/equipment-posts/subcategory/${id}`);
};

export const getOnSaleEquipments = async () =>
    fetchWrapper("/equipment-posts/on-sale");
