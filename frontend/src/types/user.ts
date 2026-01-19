export interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImageUrl?: string;
  role: "USER" | "SELLER";
}

export interface AddressType {
  id: number;
  addressRaw: string;
  addressDetail: string;
  isDefault: boolean;
  label: string;
  phone: string;
  recipientName: string;
  zipCode: string;
}
