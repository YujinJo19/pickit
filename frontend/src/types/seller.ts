export interface EmailVerificationForm {
  email: string;
  code: string;
}

export interface SellerFormData extends EmailVerificationForm {
  storeName: string;
  storeAddress: string;
  businessNumber: string;
  name: string;
  password: string;
  password2: string;
  phoneNumber: string;
  agreeTerms: boolean;
}
