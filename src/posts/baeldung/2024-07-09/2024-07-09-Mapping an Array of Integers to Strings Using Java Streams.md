---
date: {2024-07-09}
category:
  - Java
  - Streams
tag:
  - Java
  - Stream
  - Integer
  - String
head:
  - - meta
    - name: keywords
      content: Java, Stream, Integer, String, Arrays, Conversion
------
# 使用Java Streams将整数数组映射为字符串

在本教程中，我们将探讨如何使用Java Streams将整数数组转换为字符串数组。我们将比较根据我们拥有的是Integer数组还是原始int值所需要采取的不同方法。对于Integer，我们将使用Stream``````<Integer>``````和Integer从Object继承的方法进行转换。对于int，我们将使用专门的IntStream。

### 2. 从数组创建Stream
让我们从将数组转换为Stream开始。这里我们可以为Integer和原始整数使用相同的方法，但返回类型会有所不同。如果我们有一个Integer数组，我们将得到一个Stream``````<Integer>``````：
```
Integer[] integerArray = { 1, 2, 3, 4, 5 };
Stream``````<Integer>`````` integerStream = Arrays.stream(integerArray);
```

如果我们从原始整数数组开始，我们将得到一个IntStream：
```
int[] intArray = { 1, 2, 3, 4, 5 };
IntStream intStream = Arrays.stream(intArray);
```
IntStream为我们提供了自己的一套方法，我们稍后将用于类型转换。

### 3. 从Integer转换
有了Stream``````<Integer>``````，我们可以继续将Integer转换为String。由于Integer提供了所有来自Object的方法，我们可以使用Object.toString()以及map()：
```
String[] convertToStringArray(Integer[] input) {
    return Arrays.stream(input)
      .map(Object::toString)
      .toArray(String[]::new);
}
```
然后我们使用convertToStringArray()将Integer数组转换，并确认返回的String数组看起来符合我们的预期：
```
@Test
void whenConvertingIntegers_thenHandleStreamOfIntegers() {
    Integer[] integerNumbers = { 1, 2, 3, 4, 5 };
    String[] expectedOutput = { "1", "2", "3", "4", "5" };

    String[] strings = convertToStringArray(integerNumbers);

    Assert.assertArrayEquals(expectedOutput, strings);
}
```

### 4. 从原始整数转换
现在让我们看看如何处理由整数数组开始得到的IntStream。

#### 4.1. 返回数组
有了IntStream，我们可以使用IntStream.mapToObj()进行转换：
```
String[] convertToStringArray(int[] input) {
    return Arrays.stream(input)
      .mapToObj(Integer::toString)
      .toArray(String[]::new);
}
```
mapToObj()方法返回一个对象值的Stream，使用我们给它的Integer.toString()方法。因此，在我们的方法的这个阶段之后，我们有一个Stream`<String>`可以处理，我们可以使用toArray()简单地收集内容。

然后我们可以再次检查使用convertToStringArray()是否给我们一个与输入整数数组匹配的String数组：
```
@Test
void whenConvertingInts_thenHandleIntStream() {
    int[] intNumbers = { 1, 2, 3, 4, 5 };
    String[] expectedOutput = { "1", "2", "3", "4", "5" };

    String[] strings = convertToStringArray(intNumbers);

    Assert.assertArrayEquals(expectedOutput, strings);
}
```

此外，如果我们想在Stream中使用任何Integer类型的好处，我们可以使用boxed()：
```
String[] convertToStringArrayWithBoxing(int[] input) {
    return Arrays.stream(input)
      .boxed()
      .map(Object::toString)
      .toArray(String[]::new);
}
```

#### 4.2. 返回单个String
另一个潜在的用例是将整数数组转换为单个String。我们可以重用上述大部分代码，并使用Stream.collect()将Stream减少为一个String。collect()方法非常灵活，让我们可以将Stream终止为多种类型。在这里，我们将传递Collectors.joining(", ")，以便数组中的每个元素都将被连接成一个单独的String，元素之间用逗号分隔：
```
String convertToString(int[] input){
    return Arrays.stream(input)
      .mapToObj(Integer::toString)
      .collect(Collectors.joining(", "));
}
```
然后我们可以测试返回的String看起来是否符合我们的预期：
```
@Test
void givenAnIntArray_whenUsingCollectorsJoining_thenReturnCommaSeparatedString(){
    int[] intNumbers = { 1, 2, 3, 4, 5 };
    String expectedOutput = "1, 2, 3, 4, 5";

    String string = convertToString(intNumbers);

    Assert.assertEquals(expectedOutput, string);
}
```

### 5. 结论
在本文中，我们学习了如何使用Java Streams将Integer数组或原始整数数组转换为String数组。我们了解到，处理Integer时，我们需要预期一个Stream``````<Integer>``````。但是，当我们处理原始整数时，我们预期一个IntStream。

然后我们看到了如何处理两种Stream类型以最终得到一个String数组。map()方法可以用于Stream``````<Integer>``````，mapToObj()用于IntStream。最后，我们看到了如何使用Collectors.joining()返回一个单独的String。

如往常一样，示例的完整代码可在GitHub上找到。