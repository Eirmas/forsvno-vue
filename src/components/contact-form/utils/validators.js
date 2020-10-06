export const isEmptyInputValue = (value) => value == null || value === "" || value.length === 0;

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
const URL_REGEXP = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;

export const required = (control) => (isEmptyInputValue(control.value) ? { required: true } : null);

export const min = (val) => (control) => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(val)) {
    return null;
  }
  const value = parseFloat(control.value);
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(value) && value < val ? { min: { val, actual: +control.value } } : null;
};

export const max = (val) => (control) => {
  if (isEmptyInputValue(control.value) || isEmptyInputValue(val)) {
    return null;
  }
  const value = parseFloat(control.value);
  // eslint-disable-next-line no-restricted-globals
  return !isNaN(value) && value > val ? { max: { val, actual: control.value } } : null;
};

export const email = (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
};

export const url = (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return URL_REGEXP.test(control.value) ? null : { email: true };
};

export const minLength = (val) => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  const length = control.value ? control.value.length : 0;
  return length < val ? { minlength: { requiredLength: val, actualLength: length } } : null;
};

export const maxLength = (val) => (control) => {
  const length = control.value ? control.value.length : 0;
  return length > val ? { maxlength: { requiredLength: val, actualLength: length } } : null;
};

export const pattern = (pat) => {
  if (!pat) return null;
  let regex;
  let regexStr;
  if (typeof pat === "string") {
    regexStr = "";
    if (pat.charAt(0) !== "^") regexStr += "^";
    regexStr += pat;
    if (pat.charAt(pat.length - 1) !== "$") regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pat.toString();
    regex = pat;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    const value = control.value;
    return regex.test(value) ? null : { pattern: { requiredPattern: regexStr, actualValue: value } };
  };
};

export default {
  required,
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  url
};
