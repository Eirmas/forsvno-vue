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
  cols = null,
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
  this.cols = cols;
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
  multiple = false
}) {
  this.maxLength = maxLength;
  this.accept = accept;
  this.multiple = multiple;
  this.minLength = minLength;
  this.required = required;
}

export function Form({
  id,
  icons,
  displayErrors = false,
  disabled = false
}) {
  this.id = id;
  this.icons = icons;
  this.displayErrors = displayErrors;
  this.disabled = disabled;
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
