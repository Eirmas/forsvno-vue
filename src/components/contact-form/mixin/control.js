export const ControlMixin = {
  methods: {
    setActive() {
      const control = this.field;
      if (control.id && control.form) {
        control.form.activeElement = control.id;
      }
    },
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
