export type SignInType = {
  email: string;
  password: string;
};

export type SignUpType = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  position: string;
  code: string | null;
  passwordConfirmation: string;
};
