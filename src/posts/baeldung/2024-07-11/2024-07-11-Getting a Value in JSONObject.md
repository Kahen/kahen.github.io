---
date: 2022-04-01
category:
  - Java
  - JSON
tag:
  - JSONObject
  - Java
  - JSON
head:
  - - meta
    - name: keywords
      content: Java, JSON, JSONObject, get value
---
# 在JSONObject中获取值

在本教程中，我们将深入探讨在_JSONObject_实例中获取值的具体细节。

对于Java中JSON支持的一般介绍，请查看JSON-Java的介绍。

## JSONObject结构
**_JSONObject_是一种类似映射的结构**。它将数据保存为一组键值对。**键是_String_类型，而值可以是几种类型**。**此外，值类型可以是原始的或复合的**。原始类型是_String_、_Number_和_Boolean_类型，或_JSONObject.NULL_对象。复合类型是_JSONObject_和_JSONArray_类型。因此，JSON数据可以具有任意的复杂性和嵌套。

因此，获取嵌套结构中的值需要更多的努力。从这一点开始，让我们参考以下虚构员工的JSON数据：

```
{
  "name" : "Bob",
  "profession" : "Software engineer",
  "department" : "Research",
  "age" : 40,
  "family" : [
    {
      "wife" : {
        "name" : "Alice",
        "profession" : "Doctor",
        "age" : 38
      }
    },
    {
      "son" : {
        "name" : "Peter",
        "occupation" : "Schoolboy",
        "age" : 11
      }
    }
  ],
  "performance" : [
    {
      "2020" : 4.5
    },
    {
      "2021" : 4.8
    }
  ]
}
```

## JSONObject的Getter方法
首先，让我们看看_JSONObject_类提供了哪些getter API。**有两个组的方法——_get()_和_opt()_方法**。两组方法的区别在于，当找不到键时，_get()_方法会抛出异常，而_opt()_方法不会抛出异常，而是返回null或根据方法返回特定值。

此外，每组都有一个通用方法和几个具有类型转换的特定方法。**通用方法返回一个_Object_实例，而特定方法返回一个已经转换过的实例**。让我们使用通用_get()_方法获取JSON数据中的“family”字段。我们假设JSON数据已经被预先加载到_JSONObject_类型的_jsonObject_变量中：

```
    JSONArray family = (JSONArray) jsonObject.get("family");
```

我们可以使用特定于_JSONArray_的特定getter以更易读的方式做同样的事情：

```
    JSONArray family = jsonObject.getJSONArray("family");
```

## 直接获取值
**这种方法通过获取到所需值的路径上的每个中间值来直接获取值**。下面的代码展示了如何直接获取员工儿子的名字：

```
    JSONArray family = jsonObject.getJSONArray("family");
    JSONObject sonObject = family.getJSONObject(1);
    JSONObject sonData = sonObject.getJSONObject("son");
    String sonName = sonData.getString("name");
    Assertions.assertEquals(sonName, "Peter");
```

**正如我们所看到的，直接获取值的方法有局限性**。首先，我们需要知道JSON数据的确切结构。其次，我们需要知道沿途每个值的数据类型，以便使用正确的_JSONObject_的getter方法。

**此外，当JSON数据的结构是动态的时候，我们需要在代码中添加彻底的检查**。例如，对于所有的_get()_方法，我们需要将代码放在_try-catch_块中。此外，对于_opt()_方法，我们需要添加null或特定值的检查。

## 递归获取值
相比之下，JSON据中获取值的递归方法更加灵活且不易出错。在实现这种方法时，我们需要考虑JSON数据的嵌套结构。

首先，当键的值是_JSONObject_或_JSONArray_类型时，我们需要在该值中传播递归搜索。其次，当在当前递归调用中找到键时，我们需要将其映射的值添加到返回的结果中，无论值是原始类型还是不是。

下面的方法实现了递归搜索：

```
    public List`````<String>````` getValuesInObject(JSONObject jsonObject, String key) {
        List`````<String>````` accumulatedValues = new ArrayList<>();
        for (String currentKey : jsonObject.keySet()) {
            Object value = jsonObject.get(currentKey);
            if (currentKey.equals(key)) {
                accumulatedValues.add(value.toString());
            }

            if (value instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) value, key));
            } else if (value instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) value, key));
            }
        }

        return accumulatedValues;
    }

    public List`````<String>````` getValuesInArray(JSONArray jsonArray, String key) {
        List`````<String>````` accumulatedValues = new ArrayList<>();
        for (Object obj : jsonArray) {
            if (obj instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) obj, key));
            } else if (obj instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) obj, key));
            }
        }

        return accumulatedValues;
    }
```

为了简化，我们提供了两个单独的方法：一个用于在_JSONObject_中的递归搜索，另一个用于_JSONArray_实例中的递归搜索。_JSONObject_是一种类似映射的结构，而_JSONArray_是一种类似数组的结构。因此，它们的迭代是不同的。所以，将所有逻辑放在一个方法中会使代码复杂化，需要进行类型转换和if-else分支。

最后，让我们为_`getValuesInObject()`_方法编写测试代码：

```
    @Test
    public void getAllAssociatedValuesRecursively() {
        List`````<String>````` values = jsonObjectValueGetter.getValuesInObject(jsonObject, "son");
        Assertions.assertEquals(values.size(), 1);

        String sonString = values.get(0);
        Assertions.assertTrue(sonString.contains("Peter"));
        Assertions.assertTrue(sonString.contains("Schoolboy"));
        Assertions.assertTrue(sonString.contains("11"));

        values = jsonObjectValueGetter.getValuesInObject(jsonObject, "name");
        Assertions.assertEquals(values.size(), 3);

        Assertions.assertEquals(values.get(0), "Bob");
        Assertions.assertEquals(values.get(1), "Alice");
        Assertions.assertEquals(values.get(2), "Peter");
    }
```

## 结论
在本文中，我们讨论了在_JSONObject_中获取值。本文讨论的片段的完整代码可以在GitHub上找到。