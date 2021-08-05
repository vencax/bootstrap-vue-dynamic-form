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
    component: 'dyn-select',
    label: 'Stadium2',
    name: 'stadium2',
    options: 'http://localhost:33333',
    attrmap: { value: 'val', text: 'label' }
  },
  {
    component: 'dyn-input',
    inputtype: 'number',
    label: 'Cena',
    name: 'cena',
    rules: 'required'
  },
  {
    component: 'dyn-datetime',
    label: 'Schavelni',
    name: 'approved',
    rules: 'required'
  },
  {
    component: 'dyn-date',
    label: 'Datum',
    name: 'appdate'
  },
  {
    component: 'dyn-fileinput',
    label: 'Soubor',
    name: 'soubor',
    placeholder: 'Vyber soubor'
  },
  {
    component: 'dyn-textarea',
    rows: '4',
    label: 'Popis',
    name: 'popis'
  },
  {
    component: 'dyn-taginput',
    label: 'Tagy',
    name: 'tags',
    options: [
      { value: 'a', text: 'TAG A' },
      { value: 'b', text: 'TAG B' }
    ],
    placeholder: 'Vyber ze seznamu'
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
