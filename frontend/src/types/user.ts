export interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImageUrl?: string;
  role: "USER" | "SELLER";
}
