/* *
 * Created:   01.10.2020
 *
 * (c) Copyright Forsvaret / Norwegian Armed Forces
 *
 *
 * This file contains resuable functions which are used in all
 * inputs and parts of the forms
 *
 * */
export const ControlMixin = {
  methods: {
    /**
     * Changes the activeElement state in the global form object
     */
    setActive() {
      const control = this.field;
      if (control.id && control.form) {
        control.form.activeElement = control.id;
      }
    },
    /**
     * Validates the current field with the validators
     * specified in the field settings
     *
     * @returns object
     */
    validate() {
      const control = this.field;
      if (control.validations && control.validations.length > 0) {
        const validation = control.validations.reduce((prev, curr) => {
          const val = typeof curr.validator === "function" ? curr.validator(control) : null;
          if (val !== null) {
            const [key, value] = Object.entries(val)[0];
            const obj = {};
            obj[key] = {
              value,
              text: curr.text
            };
            return {
              ...prev,
              ...obj
            };
          }
          return {
            ...prev
          };
        }, {});
        control.errors = validation;
        control.valid = Object.keys(validation).length === 0;
      }
    }
  },
  watch: {
    "field.value": {
      handler(_after) {
        this.validate();
        this.$emit("change", _after);
      },
      deep: true
    }
  }
};

export default { ControlMixin };
