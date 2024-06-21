---
date: 2024-06-20
category:
  - Java
  - Programming
tag:
  - Java
  - Setter Methods
  - Constructors
head:
  - - meta
    - name: keywords
      content: Java, Setter Methods, Constructors, Object Initialization
------
# 在Java中何时使用Setter方法或构造器设置变量的值

## 1. 引言

开发者们经常面临的一个选择是：应该使用Setter方法还是构造器来设置变量的值。这两种技术都有其优点，但它们在不同的情况下被实现。

**在本教程中，我们将讨论在Java中何时使用Setter方法或构造器来设置变量的值。**

## 2. 使用Setter方法

Setter方法是我们可以在Java类中用来设置实例变量值的函数。**此外，它们提供了一种灵活的方式来在对象初始化后修改其状态。** 使用Setter方法设置的实例变量不能声明为final，因为这些值可以在对象初始化后更改。

让我们考虑一个Web应用程序中User类的现实世界示例：

```java
public class User {
    private String username;
    private String password;

    public void setUsername(String username) {
        // 验证用户名格式
        if (username.matches("[a-zA-Z0-9_]+")) {
            this.username = username;
        } else {
            throw new IllegalArgumentException("无效的用户名格式");
        }
    }

    // 其他方法...
}
```

在这个例子中，_User_类封装了Web应用程序中的用户数据。_setUsername()_和_setPassword()_ Setter方法分别允许设置_username_和_password_。这些方法还执行验证，以确保用户名遵循特定格式，密码满足某些强度标准。

让我们测试Setter方法并为_User_对象设置_username_：

```java
@Test
void givenNewUser_whenSettingUsername_thenUsernameIsSet() {
    User user = new User();
    user.setUsername("john_doe");
    assertEquals("john_doe", user.getUsername());
}
```

在这里，我们使用默认构造器_User()_创建一个新的_User_对象，然后我们调用用户对象上的_setUsername()_方法将_username_设置为“_john_doe_”。最后，我们使用断言来验证_username_是否正确设置。

## 3. 使用构造器

构造器是特殊的方法，允许我们初始化对象。**它们在创建类的对象时被调用。构造器也可以用来设置实例变量的初始值。** 构造器的一个显著特点是它们允许初始化final实例变量，确保这些值在对象的生命周期内保持不变。

让我们考虑一个代表电子商务系统中产品的_Product_类的现实世界示例：

```java
public class Product {
    private String name;
    private double price;
    private String category;

    public Product(String name, double price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    // 其他方法...
}
```

在这个例子中，_Product_类代表电子商务系统中可供出售的产品。构造器_Product(String name, double price, String category)_初始化产品的_name_、_price_和_category_。通过使用构造器，我们确保了关于产品的重要信息，如其_name_、_price_和_category_，在对象创建时被设置。

使用构造器创建具有特定详细信息的_Product_对象：

```java
@Test
void givenProductDetails_whenCreatingProductWithConstructor_thenProductHasCorrectAttributes() {
    Product product = new Product("Smartphone", 599.99, "Electronics");
    assertEquals("Smartphone", product.getName());
    assertEquals(599.99, product.getPrice(), 0.001);
    assertEquals("Electronics", product.getCategory());
}
```

在这里，我们使用构造器_Product(String name, double price, String category)_创建一个新的_Product_对象，将产品的_name_、_price_和_category_作为参数直接在对象创建期间传递。

## 4. 在Setter和构造器之间选择

在决定使用Setter方法和构造器之间时，考虑以下指南：

| 使用Setter方法 | 使用构造器 |
| --- | --- |
| 当变量的值可能随时间变化时 | 当初始化不可变属性时 |
| 当设置值之前需要验证或附加逻辑时 | 当确保在对象创建时设置某些值时 |
| 当在对象初始化后设置值时 | 当变量的值在初始化后不应更改时 |

## 5. 结论

总之，Setter方法和构造器都是Java中设置变量值的重要工具。通过理解本文中介绍的差异和指南，开发者可以有效地决定何时使用Setter方法或构造器。

像往常一样，配套的源代码可以在GitHub上找到。