import Mock from "mockjs";
var Random = Mock.Random;

export default {
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  "data|1-10": [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      "id|+3": 1,
      "name|3": "zhangwei",
      avator: Random.image("550x530", "#123456", "#fff", "这是一张图片"),
      birthday: Random.date("yyyy-MM-dd"),
      email: Random.email(),
      "height|123.1": 88,
      "isTrue|1": true,
      contact: {
        name: "zhangwei",
        sex: "男",
        regexp1: /[a-z][A-Z][0-9]/,
        regexp2: /\w\W\s\S\d\D/,
        regexp3: /\d{5,10}/
      },
      "childrens|1-5": [
        {
          "num|1-100": 1,
          "age|1-110": 1
        }
      ],
      note: Random.paragraph(),
      cnote: Random.cparagraph()
    }
  ]
};
