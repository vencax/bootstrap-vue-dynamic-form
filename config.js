export default [
  {
    component: 'dyn-input',
    label:'Název',
    name:'nazev',
    rules: 'required'
  },
  {
    component: 'dyn-select',
    label:'Stadium',
    name:'stadium',
    options: [
      { value: 'a', text: 'OPT A' },
      { value: 'b', text: 'OPT B' }
    ]
  },
  {
    component: 'dyn-input',
    type: 'number',
    label:'Cena',
    name:'cena',
    rules: 'required'
  },
  {
    component: 'dyn-textarea',
    rows: '4',
    label:'Popis',
    name:'popis'
  }
]