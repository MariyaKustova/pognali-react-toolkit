export type GoogleProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  verified: boolean;
  provider: string;
  createdAt: string;
  upstringdAt: string;
};

export type GoogleProfileResponse = {
  data: { user: GoogleProfile };
  status: string;
};

export type FieldDescription = {
  label: string;
  fieldName: keyof GoogleProfile;
  isBoolean?: boolean;
};
