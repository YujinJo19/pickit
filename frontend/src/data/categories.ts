export interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

export const categories: Category[] = [
  { id: 1, name: "여성의류", parentId: null },
  { id: 2, name: "쥬얼리", parentId: null },
  { id: 3, name: "패션소품", parentId: null },
  { id: 4, name: "티셔츠", parentId: 1 },
  { id: 5, name: "맨투맨/후드티", parentId: 1 },
  { id: 6, name: "블라우스/셔츠", parentId: 1 },
  { id: 7, name: "원피스", parentId: 1 },
  { id: 8, name: "바지", parentId: 1 },
  { id: 9, name: "스커트", parentId: 1 },
  { id: 10, name: "트레이닝복", parentId: 1 },
  { id: 11, name: "니트류/조끼", parentId: 1 },
  { id: 12, name: "아우터", parentId: 1 },
  { id: 13, name: "반지", parentId: 2 },
  { id: 14, name: "귀걸이", parentId: 2 },
  { id: 15, name: "목걸이", parentId: 2 },
  { id: 16, name: "팔찌", parentId: 2 },
  { id: 17, name: "가방", parentId: 3 },
  { id: 18, name: "지갑", parentId: 3 },
  { id: 19, name: "모자", parentId: 3 },
  { id: 20, name: "귀마개", parentId: 3 },
  { id: 21, name: "장갑", parentId: 3 },
  { id: 22, name: "목도리", parentId: 3 },
  { id: 23, name: "양말", parentId: 3 },
  { id: 24, name: "시계", parentId: 3 },
];
