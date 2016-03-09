let columns = [
  {
    id: 'a',
    name: '列表',
    sortable: true,
    filterable: true,
    filterOption: {
      type: 'set',
      options: [
        {
          name: '选项A',
          value: 'a'
        },
        {
          name: '选项B',
          value: 'b'
        },
        {
          name: '选项C',
          value: 'c'
        }
      ]
    },
    renderer(item) {
      return `<a href="#/setting/detail/1">${item}</a>`;
    },
    width: 200
  },
  {
    id: 'b',
    name: '数字',
    sortable: true,
    filterable: true,
    filterOption: {
      type: 'number'
    },
    width: 200
  },
  {
    id: 'c',
    name: '字符串1',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'd',
    name: '字符串2',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'e',
    name: '字符串3',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'f',
    name: '字符串4',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'g',
    name: '字符串5',
    sortable: true,
    filterable: true,
    width: 200
  }
];

export default columns;
