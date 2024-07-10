---
date: 2022-04-01
category:
  - Java
  - ArrayList
tag:
  - Java
  - Triple
  - ArrayList
head:
  - - meta
    - name: keywords
      content: Java, ArrayList, Triple, 存储, 数据结构
---
# 在Java中使用ArrayList存储三元组数据

在本教程中，我们将首先理解什么是三元组，然后讨论如何在Java的_ArrayList_中存储三元组元素。

## 2. 什么是三元组？

我们可能听说过_Pair_类型，它总是包含两个值，例如，键值关联。三元组与配对非常相似。唯一的区别是**三元组总是有三个值而不是两个**。例如，一个3D坐标可以被认为是一个三元组结构：_x=-100L, y=0L, z=200L_。

在3D坐标示例中，三元组中的三个值类型相同：_Long_。然而，**三元组中的三个值类型并不一定相同**。例如，_name="Lionel Messi"，birthday=1987年6月24日（日期），number=10_是足球运动员的另一个三元组结构示例。在这个示例中，三元组中的三个值类型不同：_String_，_Date_和_Integer_。

接下来，我们将看到一个更详细的三元组示例，并讨论如何正确地将三元组对象存储在_ArrayList_中。

## 3. 示例：一个算术问题生成器

假设我们想要为学生构建一个算术问题生成器。例如，“_100 + 200 = ?_”是一个问题。它由第一个数字、第二个数字和一个运算符组成。因此，我们有三个值。我们将这三个部分作为三元组存储。

我们还定义了接受的运算符为一个_Enum_：
```
enum OP {
    PLUS("+"), MINUS("-"), MULTIPLY("x");
    final String opSign;

    OP(String x) {
        this.opSign = x;
    }
}
```
如我们所见，我们只接受三种运算符。

问题生成逻辑相当简单。但首先，让我们创建一个方法，根据三部分生成问题：
```
String createQuestion(Long num1, OP operator, Long num2) {
    long result;
    switch (operator) {
        case PLUS:
            result = num1 + num2;
            break;
        case MINUS:
            result = num1 - num2;
            break;
        case MULTIPLY:
            result = num1 * num2;
            break;
        default:
            throw new IllegalArgumentException("Unknown operator");
    }
    return String.format("%d %s %d = ? ( answer: %d )", num1, operator.opSign, num2, result);
}
```
如果我们在列表中的三元组结构中有值，我们可以将这三个值传递给上述方法并创建问题。为了简单起见，我们将使用单元测试断言来验证是否可以生成预期的问题。假设我们期望通过三元组生成三个问题：
```
List```<String>``` EXPECTED_QUESTIONS = Arrays.asList(
    "100 - 42 = ? ( answer: 58 )",
    "100 + 42 = ? ( answer: 142 )",
    "100 x 42 = ? ( answer: 4200 )");
```

现在，是时候考虑中心问题了：如何在列表中存储三元组结构？

当然，如果我们只关注这个问题，我们可以创建一个包含三个参数的_QuestionInput_类。然而，**我们的目标是一般性地在列表中存储三元组结构**，这意味着我们的解决方案应该解决“问题生成”问题，并且适用于“3D坐标”和“足球运动员”示例。

通常，我们可能会想到两种存储三元组在列表中的想法：
- _List``<List<...>``>_ – 将三个值存储在列表或数组中（我们在教程中以_List_为例），并将列表嵌套在外部列表中：_List``<List<...>``>_
- _List`<Triple<...>`>_ – 创建一个通用的_Triple_类

接下来，让我们看看它们在实际操作中的表现。进一步，我们将讨论它们的优缺点。

## 4. 将三元组作为列表存储

我们知道**我们可以向原始列表中添加任何类型的元素**。接下来，让我们看看如何将三元组作为列表存储。

### 4.1. 将三元组结构作为三个元素的列表存储

对于每个三元组结构，我们可以创建一个列表。然后将三个值添加到列表中。接下来，让我们将数学问题三元组作为列表存储：
```
List myTriple1 = new ArrayList(3);
myTriple1.add(100L);
myTriple1.add(OP.MINUS);
myTriple1.add(42L);

List myTriple2 = new ArrayList(3);
myTriple2.add(100L);
myTriple2.add(OP.PLUS);
myTriple2.add(42L);

List myTriple3 = new ArrayList(3);
myTriple3.add(100L);
myTriple3.add(OP.MULTIPLY);
myTriple3.add(42L);

List`<List>` listOfTriples = new ArrayList<>(Arrays.asList(myTriple1, myTriple2, myTriple3));
```

正如上面的代码所示，我们创建了三个原始的_ArrayList_对象来携带三个三元组。最后，我们将这三个原始列表添加到外部列表_listOfTriples_。

### 4.2. 关于类型安全性的说明

原始列表的使用允许我们将不同类型的值放入列表中，例如_Long_和_OP_。因此，这种方法可以用于任何三元组结构。

然而，另一方面，**当我们使用原始列表时，我们失去了类型安全性**。一个例子可以快速解释：
```
List oopsTriple = new ArrayList(3);
oopsTriple.add("Oops");
oopsTriple.add(911L);
oopsTriple.add("The type is wrong");

listOfTriples.add(oopsTriple);
assertEquals(4, listOfTriples.size());
```

正如我们所见，我们已经创建了_oopsTriple_列表，它携带了不同的三元组结构。此外，当我们将_oopsTriple_添加到_listOfTriples_时，_listOfTriples_没有任何抱怨就接受了它。

所以现在，_listOfTriples_包含两种不同类型的三元组：_Long_, _OP_, _Long_和_String_, _Long_, _String_。因此，当我们在_listOfTriples_列表中使用三元组时，我们必须检查三元组是否是预期的类型。

### 4.3. 在列表中使用三元组

现在我们已经理解了“三元组作为列表”方法的优缺点，让我们看看如何使用_listOfTriples_中的三元组来生成算术问题：
```
List```<String>``` questions = listOfTriples.stream()
    .filter(
        triple -> triple.size() == 3
          && triple.get(0) instanceof Long
          && triple.get(1) instanceof OP
          && triple.get(2) instanceof Long
    ).map(triple -> {
        Long left = (Long) triple.get(0);
        String op = (String) triple.get(1);
        Long right = (Long) triple.get(2);
        return createQuestion(left, op, right);
    }).collect(Collectors.toList());

assertEquals(EXPECTED_QUESTIONS, questions);
```

正如上面的代码片段所示，**我们使用了Java Stream API的_map()_将三元组列表转换为生成问题列表**。然而，由于内部原始列表的类型没有保证，我们必须检查每个原始列表中的元素是否符合_Long_, _OP_和_Long_。因此，在调用_map()_方法之前，我们调用了_filter()_来跳过未识别的三元组，例如_String_, _Long_和_String_。

此外，由于列表的原始使用，没有合同可以保证原始列表中的三个元素是类型：_Long_, _OP_和_Long_。因此，**在将列表元素传递给_createQuestion()_方法之前，我们必须显式地将列表元素转换为所需的类型**。

如果我们运行测试，它会通过。所以这种方法解决了我们的问题。它的优点是明显的。**我们可以在不创建新类的情况下将任何三元组结构存储在列表中**。但我们失去了类型安全性。因此，**在使用原始值之前，我们必须执行类型检查**。此外，我们必须将值转换为所需的类型。

想象一下，如果我们在应用程序中使用这种方法处理许多不同的三元组结构，那么我们就必须在类型检查和转换上投入大量的努力。**这使得代码的可读性降低，难以维护，容易出错。因此，这种方法不推荐使用**。

## 5. 创建通用的_Triple_类

现在我们已经理解了“三元组作为列表”方法的优缺点，让我们尝试找到一种简单且类型安全的方式来在列表中存储三元组。

### 5.1. 通用_Triple_类

Java泛型带来的一个好处是类型安全性。接下来，让我们创建一个通用的_Triple_类：
```
public class Triple`<L, M, R>` {

    private final L left;
    private final M middle;
    private final R right;

    public Triple(L left, M middle, R right) {
        this.left = left;
        this.middle = middle;
        this.right = right;
    }

    public L getLeft(){
    return left;
}

public M getMiddle() {
    return middle;
}

public R getRight() {
    return right;
}
}
```

这个类相当简单。在这个例子中，我们已经使_Triple_不可变。如果需要可变，我们可以去掉_final_关键字并添加相应的setters。

### 5.2. 初始化三元组并存储在列表中

接下来，让我们创建三个三元组对象，并将它们添加到_listOfTriples_列表中：
```
Triple```<Long, OP, Long>``` triple1 = new Triple<>(100L, OP.MINUS, 42L);
Triple```<Long, OP, Long>``` triple2 = new Triple<>(100L, OP.PLUS, 42L);
Triple```<Long, OP, Long>``` triple3 = new Triple<>(100L, OP.MULTIPLY, 42L);

List<Triple```<Long, OP, Long>```> listOfTriples = new ArrayList<>(Arrays.asList(triple1, triple2, triple3));
```

正如我们所见，由于我们的通用_Triple_类具有类型参数，**上述代码中没有原始使用。此外，类型是安全的**。

接下来，让我们测试一下，如果我们创建一个无效的Triple对象并尝试将其添加到列表中会发生什么：
```
Triple`<String, Long, String>` tripleOops = new Triple<>("Oops", 911L, "The type is wrong");
listOfTriples.add(tripleOops);
```

如果我们添加上述两行，代码无法编译：
```
java: incompatible types:
com...Triple`<...String, ...Long, ...String>` cannot be converted to com...Triple`<...Long, ...OP, ...Long>`
```

因此，**这种类型安全的方法保护我们免于陷入类型错误的陷阱**。

### 5.3. 使用_Triple_元素

由于类型是安全的，我们可以直接使用值，而无需执行任何类型检查和类型转换：
```
List```<String>``` questions = listOfTriples.stream()
  .map(triple -> createQuestion(triple.getLeft(), triple.getMiddle(), triple.getRight()))
  .collect(Collectors.toList());

assertEquals(EXPECTED_QUESTIONS, questions);
```

如果我们运行测试，它会通过。与“三元组作为列表”的方法相比，上述代码更干净，更易于阅读。

## 6. 结论

在本文中，我们通过示例探讨了如何在列表中存储三元组。我们讨论了为什么我们应该创建一个通用的_Triple_类型，而不是使用三元组作为列表。

如往常一样，文章中呈现的所有代码片段都可以在GitHub上找到。
```