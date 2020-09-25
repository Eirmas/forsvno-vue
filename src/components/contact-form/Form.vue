<template>
    <div class="contact-form__wrapper">
        <form action="">
            <label for="department-options">Hvem ønsker du å kontakte?</label>
            <select name="department-options">
                <option v-for="option in options" v-bind:key="option.value" :value="option.value">{{ option.text }}</option>
            </select>
            <label for="message">Melding</label>
            <textarea name="message" id="" cols="30" rows="10"></textarea>
            <label for="name">Navn</label>
            <input type="text" name="name">
            <label for="phone">Telefon</label>
            <input type="tel" name="phone">
            <label for="email">Epostaddresse</label>
            <input type="email" name="email">
            <p>Felt markert med * må fylles ut.</p>
            <button type="submit"></button>
        </form>
    </div>
</template>
<script>
export default {
   name: "Stepper",
  data: () => ({
    
  }),
  props: {
    
  },
  computed: {
    
  },
  methods: {
  
  }
};
</script>
<style lang="scss">

</style>