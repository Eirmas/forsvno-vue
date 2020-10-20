/* *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * This file contains all data classes used in the contact-form component
 *
 * */
export function FormControl({
  id,
  form,
  isEmail = false,
  type = null,
  component = null,
  value = null,
  validations = [],
  settings = {},
  label = null,
  name = null,
  options = [],
  placeholder = null,
  cols = 12,
  errors = [],
  disabled = false,
  valid = true
}) {
  this.form = form;
  this.id = `contact-form__${id}-${name}`;
  this.isEmail = isEmail;
  this.component = component;
  this.type = type;
  this.value = value;
  this.validations = validations;
  this.settings = settings;
  this.label = label;
  this.name = `contact-form__input-${id}-${name}`;
  this.options = options;
  this.placeholder = placeholder;
  this.disabled = disabled;
  this.errors = errors;
  this.valid = valid;
  this.cols = cols || 12;
}

export function FormValidation(
  validator = null,
  text = "Feilmelding"
) {
  this.validator = validator;
  this.text = text;
}

export function FormSettings({
  maxLength = undefined,
  minLength = 0,
  required = false,
  accept = "",
  multiple = false,
  cc = false,
  maxSize = 20000
}) {
  this.maxLength = maxLength;
  this.accept = accept;
  this.multiple = multiple;
  this.minLength = minLength;
  this.required = required;
  this.cc = cc;
  this.maxSize = maxSize;
}

export function Form({
  id,
  icons,
  displayErrors = false,
  disabled = false,
  activeElement = undefined
}) {
  this.id = id;
  this.icons = icons;
  this.displayErrors = displayErrors;
  this.disabled = disabled;
  this.activeElement = activeElement;
}

export function FormOption({
  text,
  value = text,
  picked = false
}) {
  this.text = text;
  this.value = value;
  this.picked = picked;
}

export default {
  FormControl, FormValidation, FormSettings, Form, FormOption
};
