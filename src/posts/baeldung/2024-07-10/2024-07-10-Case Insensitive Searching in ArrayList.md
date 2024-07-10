---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Case-Insensitive
  - Search
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, Case-Insensitive Search
---
# ArrayList中不区分大小写的搜索

## 1. 概述

在处理ArrayList时，搜索列表中的元素是一项标准操作。contains()方法让我们知道列表对象是否包含我们正在寻找的元素。

在本教程中，我们将探讨如何在ArrayList`````````````<String>`````````````对象中不区分大小写地搜索字符串。

## 2. 问题介绍

ArrayList.contains()方法在内部使用equals()方法来确定列表是否包含给定的元素。如果ArrayList中的所有元素都是字符串，即在处理ArrayList`````````````<String>`````````````时，contains()方法会以区分大小写的方式搜索给定的字符串。让我们通过一个例子快速理解。

假设我们有一个List对象，包含六个字符串：

```java
List`````````````<String>````````````` LANGUAGES = Arrays.asList("Java", "Python", "Kotlin", "Ruby", "Javascript", "Go");
```

当我们检查LANGUAGES是否包含"jAvA"时，contains()方法报告false，因为"jAvA"不等于"Java"：

```java
String searchStr = "jAvA";
boolean result = LANGUAGES.contains(searchStr);
assertFalse(result);
```

在本教程中，让我们学习几种在ArrayList`````````````<String>`````````````实例中搜索字符串的方法，而不考虑大小写。

为了简单起见，我们将使用单元测试断言来验证解决方案是否按预期工作。

接下来，让我们看看它们是如何工作的。

## 3. 使用Stream API

Java Stream API提供了许多方便的接口，允许我们轻松地将集合作为流处理。它在Java 8及更高版本中可用。

例如，我们可以使用Stream的anyMatch()方法进行不区分大小写的字符串搜索：

```java
String searchStr = "koTliN";
boolean result = LANGUAGES.stream().anyMatch(searchStr::equalsIgnoreCase);
assertTrue(result);
```

正如上面的例子所示，我们在LANGUAGES列表中搜索字符串"koTliN"。然后，如果我们运行它，测试就会通过。

值得一提的是，我们传递给anyMatch()方法的searchStr::equalsIgnoreCase是一个方法引用。searchStr.equalsIgnoreCase()方法将为流中的每个字符串元素调用。

## 4. 创建实用工具方法

我们已经看到Stream API可以直截了当地解决问题。但是，如果我们的Java版本早于8，我们就不能使用Stream API。在这种情况下，解决这个问题的经典方法是创建一个实用工具方法：

```java
public class IgnoreCaseSearchUtil {
    public static boolean ignoreCaseContains(List`````````````<String>````````````` theList, String searchStr) {
        for (String s : theList) {
            if (searchStr.equalsIgnoreCase(s)) {
                return true;
            }
        }
        return false;
    }
}
```

正如上面的代码所示，我们在给定列表中的每个字符串元素上进行for循环检查。一旦一个元素与_searchStr_不区分大小写地相等，该方法就会立即返回_true_，而不再检查列表中的其他元素。

接下来，让我们创建一个测试来验证它是否按预期工作：

```java
String searchStr = "ruBY";
boolean result = IgnoreCaseSearchUtil.ignoreCaseContains(LANGUAGES, searchStr);
assertTrue(result);
```

这次，我们在列表中搜索字符串"ruBY"。再次，如果我们运行它，测试就会通过。

## 5. 创建ArrayList`````````````<String>`````````````的子类

到目前为止，我们已经学习了两种确定ArrayList`````````````<String>`````````````对象是否包含给定字符串的方法，而不考虑大小写。这两种解决方案都很容易理解。然而，如果我们的项目中需要频繁执行此操作，我们必须多次调用实用工具方法或Stream API的anyMatch()方法。

如果是这种情况，我们可能想要创建一个特定的ArrayList`````````````<String>`````````````类型，它原生支持不区分大小写的contains()方法。

接下来，让我们创建一个ArrayList`````````````<String>`````````````的子类：

```java
public class IgnoreCaseStringList extends ArrayList`````````````<String>````````````` {

    public IgnoreCaseStringList() {

    }

    public IgnoreCaseStringList(Collection`<? extends String>` c) {
        super(c);
    }

    @Override
    public boolean contains(Object o) {
        String searchStr = (String) o;
        for (String s : this) {
            if (searchStr.equalsIgnoreCase(s)) {
                return true;
            }
        }
        return false;
    }

}
```

正如上面的代码所示，IgnoreCaseStringList类继承了ArrayList`````````````<String>`````````````。我们创建了两个构造函数，以便更容易地初始化IgnoreCaseStringList实例。此外，为了使IgnoreCaseStringList支持不区分大小写的contains()，我们重写了_contains()_方法。实现对我们来说并不新鲜。它与我们学到的实用工具方法非常相似。

接下来，让我们测试IgnoreCaseStringList是否有效：

```java
String searchStr = "pYtHoN";
List`````````````<String>````````````` ignoreCaseList = new IgnoreCaseStringList(LANGUAGES);
boolean result = ignoreCaseList.contains(searchStr);
assertTrue(result);
```

正如我们所看到的，在初始化了一个IgnoreCaseList实例之后，我们可以简单地调用contains()方法来不区分大小写地搜索给定的字符串。当我们执行上面的测试时，它通过了。所以，IgnoreCaseStringList做得很好。

值得一提的是，IgnoreCaseList方法还带来了另一个好处。它使_containsAll()_方法也变成了不区分大小写。这是因为_containsAll()_方法是在ArrayList的超类_AbstractCollection_中实现的。进一步来说，它内部调用了_contains()_方法：

```java
public boolean containsAll(Collection`<?>` c) {
    Iterator var2 = c.iterator();
    Object e;
    do {
        if (!var2.hasNext()) {
            return true;
        }
        e = var2.next();
    } while(this.contains(e));
    return false;
}
```

最后，让我们编写一个测试来验证它：

```java
boolean resultContainAll = ignoreCaseList.containsAll(Arrays.asList("pYtHon", "jAvA", "koTliN", "ruBY"));
assertTrue(resultContainAll);
```

另一方面，如果我们希望Stream API和实用工具方法方法也支持区分大小写的_containsAll()_特性，我们必须自己实现它，例如，通过添加另一个实用工具方法。

## 6. 结论

在本文中，我们探讨了如何在ArrayList`````````````<String>`````````````中执行不区分大小写的搜索。我们通过示例学习了三种解决问题的方法。

像往常一样，文章中呈现的所有代码片段都在GitHub上可用。