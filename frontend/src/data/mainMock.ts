export type Banner = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaHref: string;
};

export const homeBanners: Banner[] = [
  {
    id: 1,
    title: "시즌 오프",
    subtitle: "최대 80% 할인",
    imageUrl:
      "https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81",
    ctaText: "할인 상품 보기",
    ctaHref: "/products?sort=discount",
  },
  {
    id: 2,
    title: "쿠폰 증정",
    subtitle: "최대 30% 할인쿠폰",
    imageUrl: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f",
    ctaText: "쿠폰 받기",
    ctaHref: "/events/coupon",
  },
];
