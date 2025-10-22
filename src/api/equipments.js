import { fetchWrapper } from "../utlis/fetchWrapper.js";

export const createEquipment = async (data) => {
    return fetchWrapper("/equipment-posts/", {
        method: "POST",
        body: JSON.stringify(data),
    });
};


export const getTopRatedEquipments = async () => {
    return fetchWrapper("/equipment-posts/top-rated");
};

export const getUsedEquipments = async () => {
    return fetchWrapper("/equipment-posts/used");
};

export const getBrandNewEquipments = async () => {
    return fetchWrapper("/equipment-posts/brand-new");
};

export const getRentEquipments = async () => {
    return fetchWrapper("/equipment-posts/rent");
};

export const getAllEquipments = async () => {
    return fetchWrapper("/equipment-posts");
};

export const getEquipmentById = async (id) => {
    return fetchWrapper(`/equipment-posts/subcategory/${id}`);
};

export const getEquipmentByName = async (name) => {
    return fetchWrapper(`/equipment-posts/name/${name}`);
};

export const getOnSaleEquipments = async () =>
    fetchWrapper("/equipment-posts/on-sale");
