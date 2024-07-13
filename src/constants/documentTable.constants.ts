export const DOCUMENT_TABLE_HEADERS = [
  { key: 'fecha', sortable: true, title: 'Fecha' },
  { key: 'numero_oficio', title: 'No. Oficio' },
  { key: 'enviado_por', title: 'Enviado por' },
  { key: 'cargo', title: 'Cargo' },
  { key: 'asunto', title: 'Asunto' },
  { key: 'dirigido_a', title: 'Dirigido a' },
  { key: 'area', title: 'Área/Departamento' },
  { key: 'documento', title: 'Documento', sortable: false,  },
  { key: 'actions', title: 'Acciones', sortable: false},
]

export const DOCUMENT_TABLE_ITEMS_PER_PAGE_OPTIONS = [
  {value: 5, title: '5'},
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: 'Todos'}
]