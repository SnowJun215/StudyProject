import Mock from 'mockjs';

const Random = Mock.Random;

export const getUserInfo = (options) => {
  // console.log(options);
  const template = {
    'name|2-4': 'June_Mock',
    'name1|5': 'June_Mock',
    'age|+2': 18,
    'num|4-10': 0,
    'float|3-10.2-5': 0,
    'bool|1': true,
    'bool2|1-9': true, // min/(min+max)
    'obj1|2': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
    },
    'obj2|1-2': {
      a: 'aa',
      b: 'bb',
      c: 'cc',
    },
    'arr1|2-3': ['a', 'b', 'c'],
    'arr2|2': ['a', 'b', 'c'],
    'func': function () {
      return this.name;
    },
    'reg': /[1-9][a-z]/,
    email: Random.email(),
    range: Random.range(3, 10, 2),
    date: Random.date('yyyy年MM月dd日') + ' ' + Random.time('HH:mm:ss'),
    datetime: Random.datetime('yyyy年MM月dd日 HH:mm:ss'),
    now: Random.now('second', 'yyyy年MM月dd日 HH:mm:ss'),
    image: Random.image('120x120', Random.color()),
    image_data: Random.dataImage(),
    color: Random.color(),
    cword: Random.cword('垃圾的离开', 2, 5),
    cname: Random.cname(),
    email2: Random.email('test.com'),
    region: Random.region(),
    province: Random.province(),
    city: Random.city(true),
    county: Random.county(true),
    fruit: Random.fruit()
  };
  return Mock.mock(template);
};
