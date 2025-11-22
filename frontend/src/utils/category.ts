import { categories, Category } from "../data/categories";

// 1. 단일 카테고리 이름 반환
export const getCategoryName = (categoryId: number): string => {
  const category = categories.find((c: Category) => c.id === categoryId);
  return category ? category.name : "알 수 없음";
};

// 2. 전체 경로 반황 상위->하위
export const getFullCategoryPath = (categoryId: number): string => {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return "알 수 없음";

  if (category.parentId) {
    const parent = categories.find((c) => c.id === category.parentId);
    return parent ? `${parent.name} > ${category.name}` : category.name;
  }

  return category.name;
};

// 3. 상위 카테고리 리스트
export const getParentCategories = (): Category[] =>
  categories.filter((category) => category.parentId === null);

// 4. 특정 상위 카테고리의 하위 카테고리 리스트
export const getChildCategories = (parentId: number): Category[] =>
  categories.filter((category) => category.parentId === parentId);

export const getParentIdFromCategoryId = (categoryId: number): number => {
  const category = categories.find((c) => c.id === categoryId);
  return category?.parentId || 0;
};
