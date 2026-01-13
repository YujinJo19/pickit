import defaultAvatar from "../assets/images/default-avatar.png";

export const toUrl = (src: string) =>
  src.startsWith("http") ? src : `https://${src}`;

export const DEFAULT_PROFILE_IMAGE = defaultAvatar;
