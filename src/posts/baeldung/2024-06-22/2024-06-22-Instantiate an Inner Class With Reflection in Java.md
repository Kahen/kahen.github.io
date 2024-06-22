---
date: 2024-06-23
category:
  - Java
  - 编程
tag:
  - Java反射
  - 内嵌类实例化
head:
  - - meta
    - name: keywords
      content: Java, 反射, 内嵌类, 实例化
---
# 使用Java反射API实例化内部类

在本教程中，我们将讨论如何使用Java反射API来实例化内部类或嵌套类。

反射API在需要读取Java类的构造并动态实例化类的场合中尤为重要。特定场景包括扫描注解、查找并使用bean名称实例化Java bean等。Spring和Hibernate等流行库以及代码分析工具广泛使用它。

与普通类相比，实例化内部类存在挑战。让我们进一步探索。

## 2. 内部类编译

要使用Java反射API对内部类进行操作，我们必须了解编译器如何处理它。首先，我们定义一个_Person_类，我们将使用它来演示实例化内部类：

```java
public class Person {
    String name;
    Address address;

    public Person() { }

    public class Address {
        String zip;

        public Address(String zip) {
            this.zip = zip;
        }
    }

    public static class Builder { }
}
```

_Person_类有两个内部类，_Address_和_Builder_。_Address_类是非静态的，因为在现实世界中，地址大多与个人的实例绑定。然而，_Builder_是静态的，因为它需要在我们可以实例化_Person_类之前就存在。

**编译器为内部类创建单独的类文件，而不是将它们嵌入到外部类中。** 在这种情况下，我们看到编译器总共创建了三个类：

编译器生成了_Person_类，并有趣的是，它还创建了两个内部类，名称为_Person$Address_和_Person$Builder_。

下一步是了解内部类的构造函数：

```java
@Test
void givenInnerClass_whenUseReflection_thenShowConstructors() {
    final String personBuilderClassName = "com.baeldung.reflection.innerclass.Person$Builder";
    final String personAddressClassName = "com.baeldung.reflection.innerclass.Person$Address";
    assertDoesNotThrow(() -> logConstructors(Class.forName(personAddressClassName)));
    assertDoesNotThrow(() -> logConstructors(Class.forName(personBuilderClassName)));
}

static void logConstructors(Class``<?>`` clazz) {
    Arrays.stream(clazz.getDeclaredConstructors())
      .map(c -> formatConstructorSignature(c))
      .forEach(logger::info);
}

static String formatConstructorSignature(Constructor``<?>`` constructor) {
    String params = Arrays.stream(constructor.getParameters())
      .map(parameter -> parameter.getType().getSimpleName() + " " + parameter.getName())
      .collect(Collectors.joining(", "));
    return constructor.getName() + "(" + params + ")";
}
```

_Class.forName()_ 接受内部类的完全限定名称，并返回_Class_对象。进一步，使用这个_Class_对象，我们可以使用_logConstructors()_方法获取构造函数的详细信息：

```java
com.baeldung.reflection.innerclass.Person$Address(Person this$0, String zip)
com.baeldung.reflection.innerclass.Person$Builder()
```

**令人惊讶的是，在非静态_Person$Address_类的构造函数中，编译器注入了持有外部_Person_类引用的第一个参数this$0。但是静态类_Person$Builder_的构造函数中没有外部类的引用。**

我们将记住Java编译器在实例化内部类时的这种行为。

## 3. 实例化静态内部类

**实例化静态内部类几乎与实例化任何普通类相似**，使用_Class.forName(String className)_方法：

```java
@Test
void givenStaticInnerClass_whenUseReflection_thenInstantiate()
    throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException,
      InstantiationException, IllegalAccessException {
    final String personBuilderClassName = "com.baeldung.reflection.innerclass.Person$Builder";
    Class``<Person.Builder>`` personBuilderClass = (Class``<Person.Builder>``) Class.forName(personBuilderClassName);
    Person.Builder personBuilderObj = personBuilderClass.getDeclaredConstructor().newInstance();
    assertTrue(personBuilderObj instanceof Person.Builder);
}
```

我们传递了内部类的完全限定名称_“com.baeldung.reflection.innerclass.Person$Builder”_到_Class.forName_。然后我们调用了_Person.Builder_类的构造函数上的_newInstance()_方法来获取_personBuilderObj_。

## 4. 实例化非静态内部类

正如我们之前看到的，**Java编译器将对外部类的引用作为第一个参数注入到非静态内部类的构造函数中。**

有了这些知识，让我们尝试实例化_Person.Address_类：

```java
@Test
void givenNonStaticInnerClass_whenUseReflection_thenInstantiate()
    throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException,
      InstantiationException, IllegalAccessException {
    final String personClassName = "com.baeldung.reflection.innerclass.Person";
    final String personAddressClassName = "com.baeldung.reflection.innerclass.Person$Address";

    Class``<Person>`` personClass = (Class``<Person>``) Class.forName(personClassName);
    Person personObj = personClass.getConstructor().newInstance();

    Class```<Person.Address>``` personAddressClass = (Class```<Person.Address>```) Class.forName(personAddressClassName);

    assertThrows(NoSuchMethodException.class, () -> personAddressClass.getDeclaredConstructor(String.class));

    Constructor```<Person.Address>``` constructorOfPersonAddress = personAddressClass.getDeclaredConstructor(Person.class, String.class);
    Person.Address personAddressObj = constructorOfPersonAddress.newInstance(personObj, "751003");
    assertTrue(personAddressObj instanceof Person.Address);
}
```

首先，我们创建了_Person_对象。然后，我们将内部类的完全限定名称_“com.baeldung.reflection.innerclass.Person$Address”_传递给_Class.forName_。接下来，我们从_personAddressClass_获取构造函数_Address(Person this$0, String zip)_。

最后，我们调用构造函数上的_newInstance()_方法，并使用_personObj_和_zip 751003_参数来获取_personAddressObj_。

我们还看到，由于缺少第一个参数_this$0_，方法_personAddressClass.getDeclaredConstructor(String.class)_抛出了_NoSuchMethodException_。

## 5. 结论

在本文中，我们讨论了使用Java反射API来实例化静态和非静态内部类。我们发现编译器将内部类视为外部类，而不是嵌入到外部类中的类。

另外，非静态内部类的构造函数默认接受外部类对象作为第一个参数。然而，我们可以像实例化任何普通类一样实例化静态类。

如常，使用的代码可以在GitHub上找到。