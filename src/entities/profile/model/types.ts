import { Nullable } from "shared/model/types";

export interface UserPhotos {
  small: string;
  large: string;
}

export interface Contacts {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface UserProfile {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: Contacts;
  photos: UserPhotos;
}

export type ProfileFormValues = Omit<UserProfile, "userId" | "photos">;

export interface ProfileInfoFormProps extends UserProfile {
  errorMessages: Nullable<string[]>;
  onSubmit: (values: ProfileFormValues) => void;
}

export interface ProfileInfoProps extends UserProfile {
  isOwner: boolean;
}
