import { Category, GetCategoriesResponse } from "@forged/types";

import { baseApi } from ".";

export const getCFCategories = async (): Promise<Category[] | null> => {
  try {
    const response = await baseApi.get("categories");
    const data: GetCategoriesResponse = response.data;

    if (!data) return null;

    return data.data.map(cat => {
      if (cat.slug === null || cat.slug === "") {
        cat.slug = cat.name.toLowerCase().replace(/\s/g, "").replace(/\W/, "-");
      }
      return cat;
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};
