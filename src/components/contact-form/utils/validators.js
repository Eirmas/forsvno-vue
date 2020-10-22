/**
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * This file contains the all available validators for inputs
 *
 * */

export const isEmptyInputValue = (value) => value == null || value === "" || value.length === 0;

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEXP = /^((?:(https?):\/\/)?((?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9])\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9][0-9]|[0-9]))|(?:(?:(?:\w+\.){1,2}[\w]{2,3})))(?::(\d+))?((?:\/[\w]+)*)(?:\/|(\/[\w]+\.[\w]{3,4})|(\?(?:([\w]+=[\w]+)&)*([\w]+=[\w]+))?|\?(?:(wsdl|wadl))))$/;
const TLF_REGEXP = /^((0047)?|(\+47)?|(47)?)\d{8}$/;
/* const PNUM_REGEXP = /^((0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])[0-9]{2}[0-9]{5})$/; */

export const required = () => (control) => (isEmptyInputValue(control.value) ? { required: true } : null);

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

export const email = () => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return EMAIL_REGEXP.test(control.value) ? null : { email: true };
};

export const maxSize = (val) => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  if (control.component !== "Attachment") {
    return null;
  }
  const size = control.value ? control.value.reduce((a, b) => a + b.size, 0) : 0;
  return size > val ? { maxSize: { maxSize: val, actualSize: size } } : null;
};

export const url = () => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return URL_REGEXP.test(control.value) ? null : { email: true };
};

export const phone = () => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  return TLF_REGEXP.test(control.value) ? null : { email: true };
};

export const pnum = () => (control) => {
  if (isEmptyInputValue(control.value)) {
    return null;
  }
  const i = control.value.toString().split("").map(Number);
  if (i.length !== 11) {
    return { pnum: true };
  }
  const k1 = 11 - ((3 * i[0] + 7 * i[1] + 6 * i[2] + 1 * i[3] + 8 * i[4] + 9 * i[5] + 4 * i[6] + 5 * i[7] + 2 * i[8]) % 11);
  const k2 = 11 - ((5 * i[0] + 4 * i[1] + 3 * i[2] + 2 * i[3] + 7 * i[4] + 6 * i[5] + 5 * i[6] + 4 * i[7] + 3 * i[8] + 2 * k1) % 11);
  return k1 === i[9] && k2 === i[10] ? null : { pnum: true };
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

export const isValid = () => (form) => form.controls.find((ctrl) => !ctrl.valid) === undefined;

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

export const date = () => (control) => {
  const d = new Date(control.value);
  // eslint-disable-next-line no-restricted-globals
  return isNaN(d.getTime()) ? { date: control.value } : null;
};

export default {
  required,
  min,
  max,
  email,
  minLength,
  maxLength,
  pattern,
  url,
  phone,
  pnum,
  maxSize,
  isValid
};
