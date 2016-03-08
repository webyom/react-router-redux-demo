let columns = [
  {
    id: 'a',
    name: '店铺名称',
    sortable: true,
    filterable: true,
    filterOption: {
      type: 'set',
      options: [
        {
          name: 'A',
          value: 'a'
        },
        {
          name: 'B',
          value: 'b'
        },
        {
          name: 'C',
          value: 'c'
        }
      ]
    },
    width: 200
  },
  {
    id: 'b',
    name: '产品类型',
    sortable: true,
    filterable: true,
    filterOption: {
      type: 'number'
    },
    width: 200
  },
  {
    id: 'c',
    name: '公司名称',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'd',
    name: '所在地区',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'e',
    name: '申请时间',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'f',
    name: '审核状态',
    sortable: true,
    filterable: true,
    width: 200
  },
  {
    id: 'g',
    name: '店铺状态',
    sortable: true,
    filterable: true,
    width: 200
  }
];

export default columns;
