---
date: 2022-04-01
category:
  - Java
  - Byte Array
tag:
  - Java
  - Byte Array
  - Numeric Conversion
head:
  - - meta
    - name: keywords
      content: Java, Byte Array, Numeric Conversion
---
# Java中将字节数组转换为数值表示

在本教程中，我们将探讨将字节数组转换为数值（int、long、float、double）及其反向转换的不同方法。

字节是计算机存储和处理信息的基本单位。Java语言中定义的原始类型是同时操作多个字节的便捷方式。因此，字节数组与原始类型之间存在固有的转换关系。

由于short和char类型仅由两个字节组成，它们不需要太多关注。因此，我们将重点放在字节数组与int、long、float和double类型的转换上。

### 2. 使用位移运算符

将字节数组转换为数值的最直接方法是使用位移运算符。

#### 2.1. 字节数组到int和long

将字节数组转换为int值时，我们使用`<<（左移）运算符：

```java
int value = 0;
for (byte b : bytes) {
    value = (value << 8) + (b & 0xFF);
}
```

通常，上述代码片段中的bytes数组的长度应等于或小于四个字节。这是因为int值占用四个字节。否则，将导致int范围溢出。

为了验证转换的正确性，让我们定义两个常量：

```java
byte[] INT_BYTE_ARRAY = new byte[]{
    (byte) 0xCA, (byte) 0xFE, (byte) 0xBA, (byte) 0xBE
};
int INT_VALUE = 0xCAFEBABE;
```

如果我们仔细观察这两个常量，INT_BYTE_ARRAY和INT_VALUE，我们将发现它们是十六进制数0xCAFEBABE的不同表示形式。

然后，让我们检查这种转换是否正确：

```java
int value = convertByteArrayToIntUsingShiftOperator(INT_BYTE_ARRAY);

assertEquals(INT_VALUE, value);
```

类似地，将字节数组转换为long值时，我们可以重用上述代码片段，但有两个修改：value的类型是long，并且bytes的长度应等于或小于八个字节。

#### 2.2. int和long到字节数组

将int值转换为字节数组时，我们可以使用>`>（有符号右移）或>>>（无符号右移）运算符：

```java
byte[] bytes = new byte[Integer.BYTES];
int length = bytes.length;
for (int i = 0; i `< length; i++) {
    bytes[length - i - 1] = (byte) (value & 0xFF);
    value >`>= 8;
}
```

在上述代码片段中，我们可以将>>运算符替换为>>>运算符。这是因为我们只使用value参数最初包含的字节。因此，有符号扩展或零扩展的右移不会影响最终结果。

然后，我们可以检查上述转换的正确性：

```java
byte[] bytes = convertIntToByteArrayUsingShiftOperator(INT_VALUE);

assertArrayEquals(INT_BYTE_ARRAY, bytes);
```

将long值转换为字节数组时，我们只需要将Integer.BYTES更改为Long.BYTES，并确保value的类型是long。

#### 2.3. 字节数组到float和double

**将字节数组转换为float时，我们使用Float.intBitsToFloat()方法：**

```java
// 将字节转换为int
int intValue = 0;
for (byte b : bytes) {
    intValue = (intValue `<< 8) + (b & 0xFF);
}

// 将int转换为float
float value = Float.intBitsToFloat(intValue);
```

从上述代码片段中，我们可以了解到字节数组不能直接转换为float值。基本上，它需要两个独立的步骤：首先，我们将字节数组转换为int值，然后将相同的位模式解释为float值。

为了验证转换的正确性，让我们定义两个常量：

```java
byte[] FLOAT_BYTE_ARRAY = new byte[]{
    (byte) 0x40, (byte) 0x48, (byte) 0xF5, (byte) 0xC3
};
float FLOAT_VALUE = 3.14F;
```

然后，让我们检查这种转换是否正确：

```java
float value = convertByteArrayToFloatUsingShiftOperator(FLOAT_BYTE_ARRAY);

assertEquals(Float.floatToIntBits(FLOAT_VALUE), Float.floatToIntBits(value));
```

同样，**我们可以利用中间的long值和Double.longBitsToDouble()方法将字节数组转换为double值。**

#### 2.4. float和double到字节数组

**将float转换为字节数组时，我们可以利用Float.floatToIntBits()方法：**

```java
// 将float转换为int
int intValue = Float.floatToIntBits(value);

// 将int转换为字节
byte[] bytes = new byte[Float.BYTES];
int length = bytes.length;
for (int i = 0; i < length; i++) {
    bytes[length - i - 1] = (byte) (intValue & 0xFF);
    intValue >`>= 8;
}
```

然后，让我们检查这种转换是否正确：

```java
byte[] bytes = convertFloatToByteArrayUsingShiftOperator(FLOAT_VALUE);

assertArrayEquals(FLOAT_BYTE_ARRAY, bytes);
```

类似地，**我们可以利用Double.doubleToLongBits()方法将double值转换为字节数组。**

### 3. 使用ByteBuffer

**java.nio.ByteBuffer类提供了一种整洁、统一的方式来在字节数组和数值（int、long、float、double）之间进行转换。**

#### 3.1. 字节数组到数值

现在，我们使用ByteBuffer类将字节数组转换为int值：

```java
ByteBuffer buffer = ByteBuffer.allocate(Integer.BYTES);
buffer.put(bytes);
buffer.rewind();
int value = buffer.getInt();
```

然后，我们使用ByteBuffer类将int值转换为字节数组：

```java
ByteBuffer buffer = ByteBuffer.allocate(Integer.BYTES);
buffer.putInt(value);
buffer.rewind();
byte[] bytes = buffer.array();
```

我们应该注意到，上述两个代码片段遵循相同的模式：

- 首先，我们使用ByteBuffer.allocate(int)方法获得具有指定容量的ByteBuffer对象。
- 然后，我们将原始值（字节数组或int值）放入ByteBuffer对象中，例如buffer.put(bytes)和buffer.putInt(value)方法。
- 之后，我们将ByteBuffer对象的位置重置为零，以便我们可以从开始处读取。
- 最后，我们使用buffer.getInt()和buffer.array()等方法从ByteBuffer对象中获取目标值。

这种模式非常通用，并且支持long、float和double类型的转换。我们唯一需要做的修改是与类型相关的信息。

#### 3.2. 使用现有的字节数组

此外，ByteBuffer.wrap(byte[])方法允许我们重用现有的字节数组，而无需创建新的数组：

```java
ByteBuffer.wrap(bytes).getFloat();
```

然而，我们还应该注意到，上述bytes变量的长度等于或大于目标类型的大小（Float.BYTES）。否则，将抛出BufferUnderflowException。

### 4. 使用BigInteger

java.math.BigInteger类的主要目的是表示大数值，这些数值否则无法适应原始数据类型。**尽管我们可以使用它在字节数组和原始值之间进行转换，但使用BigInteger对于这种目的来说有点过于繁重。**

#### 4.1. 字节数组到int和long

现在，让我们使用BigInteger类将字节数组转换为int值：

```java
int value = new BigInteger(bytes).intValue();
```

类似地，BigInteger类有一个longValue()方法，可以将字节数组转换为long值：

```java
long value = new BigInteger(bytes).longValue();
```

此外，BigInteger类还有一个intValueExact()方法和longValueExact()方法。**这两个方法应该小心使用：如果BigInteger对象超出了int或long类型的范围，两种方法都会抛出ArithmeticException。**

当将int或long值转换为字节数组时，我们可以使用相同的代码片段：

```java
byte[] bytes = BigInteger.valueOf(value).toByteArray();
```

然而，BigInteger类的toByteArray()方法返回的字节数是最小的，不一定是四个字节或八个字节。

#### 4.2. 字节数组到float和double

尽管BigInteger类有一个floatValue()方法，但我们不能像预期的那样使用它将字节数组转换为float值。那么，我们应该怎么做呢？我们可以使用int值作为中间步骤，将字节数组转换为float值：

```java
int intValue = new BigInteger(bytes).intValue();
float value = Float.intBitsToFloat(intValue);
```

同样，我们可以将float值转换为字节数组：

```java
int intValue = Float.floatToIntBits(value);
byte[] bytes = BigInteger.valueOf(intValue).toByteArray();
```

同样，通过利用Double.longBitsToDouble()和Double.doubleToLongBits()方法，我们可以使用BigInteger类在字节数组和double值之间进行转换。

### 5. 使用Guava

Guava库为我们提供了方便的方法来进行这种转换。

#### 5.1. 字节数组到int和long

在Guava中，com.google.common.primitives包中的Ints类包含fromByteArray()方法。因此，将字节数组转换为int值对我们来说相当容易：

```java
int value = Ints.fromByteArray```java
int value = Ints.fromByteArray(bytes);
```

Ints类还有一个toByteArray()方法，可以用来将int值转换为字节数组：

```java
byte[] bytes = Ints.toByteArray(value);
```

并且，Longs类的使用方法与Ints类类似：

```java
long value = Longs.fromByteArray(bytes);
byte[] bytes = Longs.toByteArray(value);
```

此外，如果我们查看fromByteArray()和toByteArray()方法的源代码，我们可以发现**这两个方法都使用位移运算符来完成它们的任务**。

#### 5.2. 字节数组到float和double

在同一个包中也存在Floats和Doubles类。但是，这两个类都不支持fromByteArray()和toByteArray()方法。

然而，我们可以利用Float.intBitsToFloat()、Float.floatToIntBits()、Double.longBitsToDouble()和Double.doubleToLongBits()方法来完成字节数组和float或double值之间的转换。为了简洁，我们在这里省略了代码。

### 6. 使用Commons Lang

当我们使用Apache Commons Lang 3时，进行这些转换会有点复杂。因为**Commons Lang库默认使用小端字节数组**。然而，我们上面提到的字节数组都是大端字节序。因此，我们需要将大端字节数组转换为小端字节数组，反之亦然。

#### 6.1. 字节数组到int和long

org.apache.commons.lang3包中的Conversion类提供了byteArrayToInt()和intToByteArray()方法。

现在，让我们将字节数组转换为int值：

```java
byte[] copyBytes = Arrays.copyOf(bytes, bytes.length);
ArrayUtils.reverse(copyBytes);
int value = Conversion.byteArrayToInt(copyBytes, 0, 0, 0, copyBytes.length);
```

**在上述代码中，我们对原始bytes变量进行了复制。这是因为有时我们不想更改原始字节数组的内容。**

然后，让我们将int值转换为字节数组：

```java
byte[] bytes = new byte[Integer.BYTES];
Conversion.intToByteArray(value, 0, bytes, 0, bytes.length);
ArrayUtils.reverse(bytes);
```

Conversion类还定义了byteArrayToLong()和longToByteArray()方法。我们可以使用这两个方法在字节数组和long值之间进行转换。

#### 6.2. 字节数组到float和double

然而，Conversion类并没有直接提供相应的方法来转换float或double值。

再次，我们需要一个中间的int或long值来在字节数组和float或double值之间进行转换。

### 7. 结论

在本文中，我们展示了使用纯Java通过位移运算符、ByteBuffer和BigInteger将字节数组转换为数值的各种方法。然后，我们看到了使用Guava和Apache Commons Lang进行相应转换的方法。

像往常一样，本教程的源代码可以在GitHub上找到。
OK