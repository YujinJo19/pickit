import { categories, Category } from "../data/categories";

export const getCategoryName = (categoryId: number): string => {
  const category = categories.find((c: Category) => c.id === categoryId);
  return category ? category.name : "알 수 없음";
};

export const getFullCategoryPath = (categoryId: number): string => {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return "알 수 없음";

  if (category.parentId) {
    const parent = categories.find((c) => c.id === category.parentId);
    return parent ? `${parent.name} > ${category.name}` : category.name;
  }

  return category.name;
};
