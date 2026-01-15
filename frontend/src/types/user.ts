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
  addressRaw: string;
  city: string;
  deliveryRequest: string;
  district: string;
  id: number;
  isDefault: boolean;
  label: string;
  neighborhood: string;
  phone: string;
  recipientName: string;
  streetAddress: string;
  zipCode: string;
}
