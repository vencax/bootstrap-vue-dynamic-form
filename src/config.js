export default {
  title:'Demo Form',
  form: [
    {
      type: 'text',
      label:'Název',
      name:'nazev',
      rules: 'required'
    },
    {
      type: 'select',
      label:'Stadium',
      name:'stadium',
      options:'form-control'
    },
    {
      type: 'text',
      label:'KOko',
      name:'popis',
      rules: 'required'
    }
  ]
}