import { get } from "lodash";

import { Contacts, ProfileFormValues } from "../model/types";
import { BASE_INFO, CONTACTS } from "./constants";
import { capitalizeFirstLetter } from "shared/lib/utils";
import {
  FbIcon,
  GithubIcon,
  InstagramIcon,
  MainlinkIcon,
  TwitterIcon,
  VkIcon,
  WebIcon,
  YoutubeIcon,
} from "shared/assets";

export const getIcon = (key: string) => {
  switch (key) {
    case "facebook":
      return FbIcon;
    case "github":
      return GithubIcon;
    case "instagram":
      return InstagramIcon;
    case "mainLink":
      return MainlinkIcon;
    case "twitter":
      return TwitterIcon;
    case "vk":
      return VkIcon;
    case "website":
      return WebIcon;
    case "youtube":
      return YoutubeIcon;
    default:
      return "";
  }
};

export const checkRequired = (
  values: ProfileFormValues,
  errors: { [key: string]: string },
  code: string
) => {
  const parameterName = get(values, code);
  if (
    !parameterName ||
    (typeof parameterName === "string" && !parameterName.trim().length)
  ) {
    errors[code] = `${capitalizeFirstLetter(code)} is a required field`;
  }
};

export const checkCorrectEmail = (
  values: Contacts,
  errors: { contacts?: { [key: string]: string } },
  code: string
) => {
  const fieldValue = get(values, code);

  const contacts: { [key: string]: string } = {};

  if (
    fieldValue &&
    typeof fieldValue === "string" &&
    !String(fieldValue)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    contacts[code] = `${capitalizeFirstLetter(code)} must be a valid email`;
    errors.contacts = contacts;
  }
};

export const validateValues = (values: ProfileFormValues) => {
  const errors = {};
  BASE_INFO.forEach((code) => checkRequired(values, errors, code));
  CONTACTS.forEach((code) => checkCorrectEmail(values.contacts, errors, code));
  return { values, errors };
};
