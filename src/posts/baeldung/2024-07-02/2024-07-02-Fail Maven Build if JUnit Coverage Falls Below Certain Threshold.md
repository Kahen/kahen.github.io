---
date: 2023-07-01
category:
  - Java
  - Maven
tag:
  - JaCoCo
  - JUnit
  - Maven插件
head:
  - - meta
    - name: keywords
      content: Maven, JaCoCo, JUnit, 代码覆盖率, 构建失败
------
# Maven构建失败时的JUnit覆盖率阈值

在本教程中，我们将看到如何使Maven构建在JaCoCo代码覆盖率低于特定阈值时失败。我们将首先查看没有阈值的JaCoCo插件的基本形式。然后，我们将向现有的JaCoCo插件添加一个新的执行，专注于检查覆盖率。

在这里，我们将触及这个新执行的一些显著元素。然后，我们将扩展一个简单的_ProductService_示例，以查看添加_BRANCH_和_INSTRUCTION_覆盖率规则的效果。我们将看到在特定规则下构建失败。最后，我们将以使用JaCoCo强制执行规则对质量控制的潜在好处作为结论。

### 2. JaCoCo Maven插件

首先让我们以简单形式使用JaCoCo插件。这意味着我们将使用它来计算代码覆盖率，并在执行_mvn clean install_时生成报告：

```xml
`<plugin>`
    `<groupId>`org.jacoco`</groupId>`
    `<artifactId>`jacoco-maven-plugin`</artifactId>`
    `<version>`${jacoco.version}`</version>`
    ``<configuration>``
        `<excludes>`
            ```<exclude>```com/baeldung/**/ExcludedPOJO.class```</exclude>```
            ```<exclude>```com/baeldung/**/*DTO.*```</exclude>```
            ```<exclude>```**/config/*```</exclude>```
        `</excludes>`
    ``</configuration>``
    `<executions>`
        ```<execution>```
            ```<id>```jacoco-initialize```</id>```
            ```<goals>```
                ```<goal>```prepare-agent```</goal>```
            ```</goals>```
        ```</execution>```
        ```<execution>```
            ```<id>```jacoco-site```</id>```
            ``<phase>``package``</phase>``
            ```<goals>```
                ```<goal>```report```</goal>```
            ```</goals>```
        ```</execution>```
    `</executions>`
`</plugin>`
```

### 3. 设置示例

接下来，**让我们以两个简单的服务为例，即_CustomerService_和_ProductService_**。让我们在_ProductService_中添加一个_getSalePrice()_方法，该方法有两个分支，一个用于标志设置为_true_时，另一个用于标志设置为_false_时：

```java
public double getSalePrice(double originalPrice, boolean flag) {
    double discount;
    if (flag) {
        discount = originalPrice - originalPrice * DISCOUNT;
    } else {
        discount = originalPrice;
    }
    return discount;
}
```

让我们编写两个单独的测试，分别覆盖_boolean_ true 和 false 的两种情况：

```java
@Test
public void givenOriginalPrice_whenGetSalePriceWithFlagTrue_thenReturnsDiscountedPrice() {
    ProductService productService = new ProductService();
    double salePrice = productService.getSalePrice(100, true);
    assertEquals(salePrice, 75);
}

@Test
public void givenOriginalPrice_whenGetSalePriceWithFlagFalse_thenReturnsDiscountedPrice() {
    ProductService productService = new ProductService();
    double salePrice = productService.getSalePrice(100, false);
    assertEquals(salePrice, 100);
}
```

类似地，_CustomerService_包含一个简单的方法_getCustomerName()_：

```java
public String getCustomerName() {
    return "some name";
}
```

接下来是相应的单元测试，以显示该方法在报告中的覆盖率：

```java
@Test
public void givenCustomer_whenGetCustomer_thenReturnNewCustomer() {
    CustomerService customerService = new CustomerService();
    assertNotNull(customerService.getCustomerName());
}
```

### 4. 使用JaCoCo设置测试覆盖率基线

有了一组基本的类和测试设置后，首先执行_mvn clean install_并观察JaCoCo报告的结果。这有助于我们为当前模块的测试覆盖率设置基线：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/successful-build-with-jacoco-300x51.png)

在这里，模块构建成功。接下来，让我们查看JaCoCo报告以了解当前的覆盖率：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/jacoco-report-300x36.png)

正如我们从报告中看到的，当前的覆盖率是72%，并且Maven构建成功。

### 5. 向JaCoCo插件添加规则

**现在让我们向插件应用规则，以便基于指令数的总体覆盖率不低于70%，分支覆盖率不应低于68%。**

让我们为此目的在插件中定义一个新的执行：

```xml
```<execution>```
    ```<id>```check-coverage```</id>```
    ``<phase>``verify``</phase>``
    ```<goals>```
        ```<goal>```check```</goal>```
    ```</goals>```
    ``<configuration>``
        `<rules>`
            ``<rule>``
                `````<element>`````BUNDLE```</element>```
                ``<limits>``
                    ```<limit>```
                        ````<counter>````INSTRUCTION``</counter>``
                        ````<value>````COVEREDRATIO``</value>``
                        ```<minimum>```0.70``</minimum>``
                    ``</limit>``
                    ```<limit>```
                        ````<counter>````BRANCH``</counter>``
                        ````<value>````COVEREDRATIO``</value>``
                        ```<minimum>```0.68``</minimum>``
                    ``</limit>``
                `</limits>`
            `</rule>`
        `</rules>`
    ``</configuration>``
```</execution>```
```

在这里，我们在JaCoCo插件中定义了一个新的执行，其ID为_check-coverage_。我们将它与Maven构建的_verify_阶段关联。**与此执行关联的目标设置为_check_，这意味着此时将执行_jacoco:check_。**接下来，我们定义了在_jacoco:check_期间需要检查的规则。

接下来，让我们仔细看看在_``<rule>``_标签内定义的组件：

### 5.1. JaCoCo中的_`````<element>`````_

规则的第一部分是_`````<element>`````_标签，它定义了规则应用的覆盖元素。覆盖元素代表我们代码中不同粒度级别，例如类、包、方法或行。我们可以通过指定适当的覆盖元素来为该特定级别设置特定的覆盖标准。

**在这里，我们将覆盖阈值设置在_BUNDLE_级别，它代表整个被分析代码库的总体覆盖率。它将不同单元的覆盖信息，如类、包或模块，组合成一个单一的综合结果。**它通常用于在最高级别定义覆盖规则或阈值，为整个项目的代码覆盖率提供概览。

此外，如果我们想在类级别设置覆盖阈值，我们会使用_`````<element>````` CLASS ```</element>```_。

同样，如果我们想在行级别设置阈值，我们可以使用_`````<element>````` LINE ```</element>```_。

### 5.2. JaCoCo中的_``<limits>``_

一旦我们在这里定义了粒度（_BUNDLE_），我们就定义一个或多个限制。本质上，_limit_封装了我们如何使用一个或多个计数器强制执行代码覆盖的信息。

每个_```<limit>```_包含相应的_````<counter>````_, _````<value>````_和_```<minimum>```_或_`<maximum>`_标签。_````<value>````_标签的可能选项是_COVEREDRATIO_, _COVEREDCOUNT_, _MISSEDCOUNT_和_TOTALCOUNT_。**在我们的示例中，我们使用_COVEREDRATIO_，它代表覆盖率。**

我们将在下一部分更详细地讨论计数器。

### 5.3. JaCoCo中的_````<counter>````_

基本上，这里我们想基于两个计数器；_BRANCH_计数器和_INSTRUCTION_计数器在_BUNDLE_上强制执行阈值；对于这两个计数器，我们都使用_COVEREDRATIO_作为阈值的度量。对于这个示例，我们希望_INSTRUCTION_覆盖率至少为72%，_BRANCH_覆盖率至少为68%。

**_INSTRUCTION_计数器对于理解代码执行水平和识别可能被测试遗漏的区域非常有价值。_BRANCH_计数器使决策点覆盖率的识别成为可能，确保它同时执行_true_和_false_分支。**

_LINE_计数器提供了代码覆盖率的粒度洞察，允许我们确定哪些单独的代码行被覆盖。

其他可能的计数器选项是_LINE_, _COMPLEXITY_, _METHOD_和_CLASS_。这些计数器提供了不同的代码覆盖率视角，并可用于分析代码库的不同方面。

选择哪些计数器更有用取决于项目的具体目标和要求。然而，_INSTRUCTION_, _BRANCH_和_LINE_计数器通常是最常用的，并提供了对代码覆盖率的良好总体理解。

### 6. 覆盖率下降时构建失败

要看到我们的构建由于新强制的规则而失败，让我们禁用以下测试：

```java
@Test
@Disabled
public void givenOriginalPrice_whenGetSalePriceWithFlagFalse_thenReturnsDiscountedPrice() {//...}
```

现在，让我们再次运行命令_mvn clean install_：

![img](https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules300x45.png)

我们发现构建在这一点上失败了，参考失败的覆盖率检查：

```plaintext
[ERROR] Failed to execute goal org.jacoco:jacoco-maven-plugin:0.8.6:check (check-coverage) on project testing-libraries-2: Coverage checks have not been met.
```

重要的是，我们观察到_jacoco: check_目标被执行。它使用_JaCoCo.exec_作为分析的来源。接下来，它按照我们在规则的元素标签中指定的，在_BUNDLE_级别上执行分析，并发现Maven构建对于_INSTRUCTION_和_BRANCH_计数器都失败了。

如结果所示，_INSTRUCTION_计数器的_COVEREDRATIO_值下降到0.68或68%，而最低要求是0.70或70%。此外，_BRANCH_计数器的值是0.50或50%，而预期的最低要求是68%。

要修复构建，我们需要按照_BUNDLE_元素的要求，使_INSTRUCTION_覆盖率恢复到>=70%，_BRANCH_覆盖率恢复到>=68%。

### 7. 结论

在本文中，我们看到了如何使我们的代码覆盖率低于特定阈值时Maven构建失败。我们查看了JaCoCo Maven插件提供的各种选项，以在不同粒度级别上强制执行阈值。示例侧重于_BRANCH_和_INSTRUCTION_计数器，其值为_COVEREDRATIO_。

强制执行覆盖率规则确保我们的代码库始终满足最低级别的测试覆盖率。总的来说，这有助于通过识别缺乏足够测试的区域来提高软件的整体质量。通过在未满足覆盖率规则时使构建失败，我们防止了覆盖率不足的代码在开发生命周期中进一步发展，从而降低了发布未测试或低质量代码的可能性。

如常，源代码可在GitHub上获得。

![img](https://www.baeldung.com/wp-content/uploads/2023/07/failed-maven-jacoco-rules-300x45.png)

OK