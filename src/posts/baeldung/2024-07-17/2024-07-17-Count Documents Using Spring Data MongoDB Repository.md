---
date: 2024-07-17
category:
  - Spring Data MongoDB
  - MongoDB
tag:
  - MongoDB
  - Spring Data
  - Count
  - Repository
head:
  - - meta
    - name: keywords
      content: Spring Data MongoDB, MongoDB, Count, Repository
------
# 使用Spring Data MongoDB Repository统计文档数量

## 1. 概述

在本教程中，我们将看到使用Spring Data MongoDB统计集合中文档数量的不同方法。我们将使用_MongoRepository_中提供的所有工具。

我们将使用注解、查询方法以及_CrudRepository_中的方法。此外，我们还将构建一个简单的服务来聚合我们不同的用例。

## 2. 使用案例设置

我们的使用案例包括一个模型类、一个仓库和一个服务类。此外，我们将创建一个测试类来帮助我们确保一切按预期工作。

### 2.1. 创建模型

我们将从创建我们的模型类开始。它将基于汽车的一些属性：

```java
@Document
public class Car {
    private String name;

    private String brand;

    public Car(String brand) {
        this.brand = brand;
    }

    // getters and setters
}
```

我们省略了ID属性，因为我们的示例中不需要它。此外，我们添加了一个构造函数，该构造函数接受_brand_属性作为参数，以便测试更简单。

### 2.2. 定义仓库

让我们定义我们的仓库，不包含任何方法：

```java
public interface CarRepository extends MongoRepository`<Car, String>` {
}
```

我们考虑使用字符串ID，尽管我们没有在模型中声明ID属性。这是因为MongoDB会创建一个默认的唯一ID，我们仍然可以通过findById()访问它，如果我们想要的话。

### 2.3. 定义服务类

我们的服务将利用Spring Data Repository接口的不同方式。

**让我们定义它，并引用我们的仓库：**

```java
@Service
public class CountCarService {

    @Autowired
    private CarRepository repo;
}
```

我们将在下一节中构建这个类，涵盖示例。

### 2.4. 准备测试

我们所有的测试都将在我们的服务类上运行。我们只需要一些设置，以避免代码重复：

```java
public class CountCarServiceIntegrationTest {
    @Autowired
    private CountCarService service;

    Car car1 = new Car("B-A");

    @Before
    public void init() {
        service.insertCar(car1);
        service.insertCar(new Car("B-B"));
    }
}
```

**我们将在每个测试之前运行此块，以简化我们的测试场景。** 此外，我们在init()之外定义_car1_，以便在后续测试中访问它。

## 3. 使用_CrudRepository_

**当使用_MongoRepository_（它扩展了_CrudRepository_）时，我们可以访问基本功能，包括一个_count()_方法。**

### 3.1. _count()_方法

因此，在我们的第一个计数示例中，没有在我们的仓库中定义任何方法，我们可以直接在我们的服务中调用它：

```java
public long getCountWithCrudRepository() {
    return repo.count();
}
```

我们可以测试它：

```java
@Test
public void givenAllDocs_whenCrudRepositoryCount_thenCountEqualsSize() {
    List``<Car>`` all = service.findCars();

    long count = service.getCountWithCrudRepository();

    assertEquals(count, all.size());
}
```

因此，我们确保_count()_输出的数字与我们集合中所有文档的列表大小相同。

**最重要的是，我们必须记住，计数操作比列出所有文档更具成本效益。** 这在性能和减少代码方面都是如此。对于小集合来说，这不会有太大区别，但对于大集合，我们可能会遇到OutOfMemoryError。**简而言之，通过列出整个集合来计数文档不是一个好主意。**

### 3.2. 使用_Example_对象进行过滤

_CrudRepository_还可以帮助我们，如果我们想要统计具有特定属性值的文档。**_count()_方法有一个重载版本，它接收一个Example对象：**

```java
public long getCountWithExample(Car item) {
    return repo.count(Example.of(item));
}
```

因此，这简化了任务。**现在我们只需要用我们想要过滤的属性填充一个对象，Spring会完成其余的工作。** 让我们在我们的测试中涵盖它：

```java
@Test
public void givenFilteredDocs_whenExampleCount_thenCountEqualsSize() {
    long all = service.findCars()
      .stream()
      .filter(car -> car.getBrand().equals(car1.getBrand()))
      .count();

    long count = service.getCountWithExample(car1);

    assertEquals(count, all);
}
```

## 4. 使用@Query注解

我们的下一个示例将基于_@Query_注解：

```java
@Query(value = "{}", count = true)
Long countWithAnnotation();
```

我们必须指定_value_属性，否则Spring会尝试从我们的方法名创建查询。**但是，因为我们想要统计所有文档，我们简单地指定一个空查询。**

**然后，我们通过将_count_属性设置为_true_来指定此查询的结果应为计数投影。**

让我们测试它：

```java
@Test
public void givenAllDocs_whenQueryAnnotationCount_thenCountEqualsSize() {
    List``<Car>`` all = service.findCars();

    long count = service.getCountWithQueryAnnotation();

    assertEquals(count, all.size());
}
```

### 4.1. 按属性过滤

**我们可以扩展我们的示例，按_brand_过滤。** 让我们在我们的仓库中添加一个新的方法：

```java
@Query(value = "{brand: ?0}", count = true)
public long countBrand(String brand);
```

在我们的查询_value_中，我们指定了完整的MongoDB风格的查询。“_?0_”占位符代表我们方法的第一个参数，它将是我们查询参数的值。

MongoDB查询具有JSON结构，我们指定我们想要过滤的字段名称和值。因此，当我们调用_countBrand(“A”)_时，查询转换为_{brand: “A”}_。这意味着我们将按_brand_属性值为“A”的项目过滤我们的集合。

## 5. 编写派生查询方法

派生查询方法是我们仓库中的任何方法，不包括带有_value_的_@Query_注解。这些方法通过名称由Spring解析，因此我们不必编写查询。

**由于我们已经在_CrudRepository_中有了_count()_方法，让我们创建一个示例，按特定品牌进行计数：**

```java
Long countByBrand(String brand);
```

**此方法将统计所有_brand_属性与参数值匹配的文档。**

现在，让我们将其添加到我们的服务中：

```java
public long getCountBrandWithQueryMethod(String brand) {
    return repo.countByBrand(brand);
}
```

然后我们通过将其与过滤流计数操作进行比较，确保我们的方法行为正确：

```java
@Test
public void givenFilteredDocs_whenQueryMethodCountByBrand_thenCountEqualsSize() {
    String filter = "B-A";
    long all = service.findCars()
      .stream()
      .filter(car -> car.getBrand().equals(filter))
      .count();

    long count = service.getCountBrandWithQueryMethod(filter);

    assertEquals(count, all);
}
```

**这种方法在我们只需要编写少数不同的查询时效果很好。** 但是，如果我们需要太多的不同计数查询，它可能会变得难以维护。

## 6. 使用Criteria使用动态计数查询

**当我们需要更健壮的东西时，我们可以使用带有_Query_对象的_Criteria_。**

但是，要运行_Query_，我们需要_MongoTemplate_。它在启动时实例化，并在_SimpleMongoRepository_中的_mongoOperations_字段中提供。

一种方法是扩展_SimpleMongoRepository_并创建自定义实现，而不是简单地扩展_MongoRepository_。但是，有更简单的方法。我们可以将其注入到我们的服务中：

```java
@Autowired
private MongoTemplate mongo;
```

然后我们可以创建我们的新计数方法，将_Query_传递给_MongoTemplate_中的_count()_方法：

```java
public long getCountBrandWithCriteria(String brand) {
    Query query = new Query();
    query.addCriteria(Criteria.where("brand")
      .is(brand));
    return mongo.count(query, Car.class);
}
```

**这种方法在我们需要创建动态查询时很有用。** 我们完全控制如何创建投影。

### 6.1. 使用_Example_对象进行过滤

**_Criteria_对象还允许我们传递一个_Example_对象：**

```java
public long getCountWithExampleCriteria(Car item) {
    Query query = new Query();
    query.addCriteria(Criteria.byExample(item));
    return mongo.count(query, Car.class);
}
```

这使得按属性过滤更容易，同时仍然允许动态部分。

## 7. 结论

在本文中，我们看到了使用Spring Data MongoDB仓库方法进行计数投影的不同方式。

我们使用了可用的方法，并使用不同的方法创建了新的方法。此外，我们通过将我们的计数方法与列出集合中的所有对象进行比较来创建测试。同样，我们了解到为什么那样计数不是一个好主意。

此外，我们更深入地使用了_MongoTemplate_来创建更动态的计数查询。

并且，一如既往，源代码可在GitHub上获取。