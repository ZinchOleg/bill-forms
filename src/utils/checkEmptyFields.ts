import { EmptyForm, FormsData } from "../types/formsTypes";

export const areAllFieldsEmpty = (formData: FormsData) => {
  return formData.some((obj: EmptyForm) => {
    for (const key in obj) {
      if (obj[key] === '' || obj[key] === undefined) {
        return true;
      }
    }
    return false;
  });
}