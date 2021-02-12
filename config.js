export default [
  {
    component: 'dyn-input',
    label: 'Název',
    name: 'nazev',
    rules: 'required'
  },
  {
    component: 'dyn-select',
    label: 'Stadium',
    name: 'stadium',
    options: [
      { value: 'a', text: 'OPT A' },
      { value: 'b', text: 'OPT B' }
    ]
  },
  {
    component: 'dyn-input',
    type: 'number',
    label: 'Cena',
    name: 'cena',
    rules: 'required'
  },
  {
    component: 'dyn-textarea',
    rows: '4',
    label: 'Popis',
    name: 'popis'
  },
  {
    component: 'dyn-listeditor',
    name: 'obrazky',
    label: 'Obrázky',
    rowcomponent: 'obrazekInfo',
    form: [
      {
        name: 'url',
        component: 'dyn-input',
        label: 'Odkaz',
        rules: 'required'
      },
      {
        name: 'name',
        component: 'dyn-input',
        label: 'Název'
      }
    ]
  }
]
