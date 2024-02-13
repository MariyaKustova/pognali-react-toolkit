import { FieldDescription } from "../model/types";

export const descriptionProfileFields: Array<FieldDescription> = [
  { label: "Name", fieldName: "name" },
  { label: "Email", fieldName: "email" },
  { label: "Role", fieldName: "role" },
  { label: "Verified", fieldName: "verified", isBoolean: true },
];
