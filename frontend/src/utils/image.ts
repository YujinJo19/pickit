import defaultAvatar from "../assets/images/default-avatar.png";
import defaultProduct from "../assets/images/product_placeholder.png";

export const toUrl = (src: string) =>
  src.startsWith("http") ? src : `https://${src}`;

export const DEFAULT_PROFILE_IMAGE = defaultAvatar;
export const DEFAULT_PRODUCT_IMAGE = defaultProduct;
