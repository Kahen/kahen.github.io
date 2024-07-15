---
date: 2022-04-01
category:
  - OpenAPI
  - API设计
tag:
  - OpenAPI
  - API
head:
  - - meta
    - name: keywords
      content: OpenAPI, API设计, 多类型数组定义
---
# 使用OpenAPI定义不同类型数组

OpenAPI规范，以前称为Swagger规范，有助于以标准化、机器可读的方式描述API。

**在本教程中，我们将学习如何使用OpenAPI规范定义不同类型的数组。** 我们将在整篇文章中使用OpenAPI v3的特性。

首先，让我们定义我们将在文章中使用的例子。我们假设我们要定义一个数组，包含以下两个对象，分别代表一只狗和一只狮子：

```yaml
#狗
type: object
properties:
  barks:
    type: boolean
  likesSticks:
    type: boolean
#狮子
type: object
properties:
  roars:
    type: boolean
  likesMeat:
    type: boolean
```

**有三种方式来定义一个可以同时包含这些对象的数组：使用_oneOf_、_anyOf_和任意类型模式的关键字。**

### 2.1. _oneOf_关键字

**_oneOf_关键字指定数组可以包含预定义类型集中的一种类型：**

```yaml
type: array
items:
  oneOf:
    - $ref: '#/components/schemas/Dog'
    - $ref: '#/components/schemas/Lion'
```

上述定义的数组的一个有效示例将是：

```json
{
  "dogs": [
    {
      "barks": true,
      "likesSticks": true
    },
    {
      "barks": false,
      "likesSticks": true
    }
  ]
}
```

另一方面，混合狗和狮子是不允许的：

```json
{
  "dogsAndLions": [
    {
      "barks": true,
      "likesSticks": true
    },
    {
      "barks": false,
      "likesSticks": true
    },
    {
      "roars": true,
      "likesMeat": true
    }
  ]
}
```

### 2.2. _anyOf_关键字

**_anyOf_关键字指定数组可以包含预定义类型的任何组合。** 这意味着只有狗、只有狮子或狗和狮子的混合可以形成一个有效的数组：

```yaml
type: array
items:
  anyOf:
    - $ref: '#/components/schemas/Dog'
    - $ref: '#/components/schemas/Lion'
```

下面的例子展示了三个都是有效的数组：

```json
{
  "onlyDogs": [
    {
      "barks": true,
      "likesSticks": true
    },
    {
      "barks": false,
      "likesSticks": true
    }
  ],
  "onlyLions": [
    {
      "roars": true,
      "likesMeat": true
    },
    {
      "roars": true,
      "likesMeat": true
    }
  ],
  "dogsAndLions": [
    {
      "barks": true,
      "likesSticks": true
    },
    {
      "barks": false,
      "likesSticks": true
    },
    {
      "roars": true,
      "likesMeat": true
    }
  ]
}
```

### 2.3. 任意类型模式

**使用任意类型模式允许定义一个数组，其中包含OpenAPI规范支持的所有类型的混合。** 它还带有一个方便的简写语法，由花括号‘{}_‘组成：

```yaml
type: array
items: {}
```

让我们看看上述定义的显式语法：

```yaml
type: array
items:
  anyOf:
    - type: string
    - type: number
    - type: integer
    - type: boolean
    - type: array
      items: {}
    - type: object
```

现在让我们看看一个包含字符串、数字、整数、布尔值、数组和一个随机对象的示例数组：

```json
{
  "arbitraryStuff": [
    "Hello world",
    42.1,
    42,
    true,
    [{"name": "Randy Random"}],
    { "name": "Robbi Random" }
  ]
}
```

## 3. 结论

在本文中，我们学习了如何使用OpenAPI规范定义不同类型的数组。

首先，我们看到了如何使用_oneOf_关键字为数组定义一种预定义类型的集合。然后，我们讨论了如何使用_anyOf_关键字定义包含多个预定义类型的数组。

最后，我们了解到可以使用任意类型模式来定义一个可以包含任意类型的数组。