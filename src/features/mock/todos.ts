import Mock from 'mockjs';

const mockData = Mock.mock({
  'list|5-10': [
    {
      'id|+1': 1,
      text: '@sentence(3, 5)',
      completed: '@boolean',
    },
  ],
});

export default mockData.list;
