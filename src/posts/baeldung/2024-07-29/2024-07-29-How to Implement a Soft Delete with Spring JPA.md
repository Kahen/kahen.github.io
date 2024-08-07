---
date: 2022-04-01
category:
  - Spring JPA
  - Soft Delete
tag:
  - Spring
  - JPA
  - Soft Delete
head:
  - - meta
    - name: keywords
      content: Spring JPA, Soft Delete, 数据库, 实体类, 软删除
------
# 如何使用Spring JPA实现软删除

## 1. 引言

从数据库中物理删除数据是一种常见的需求。但有时，业务需求要求我们不要从数据库中永久删除数据。这些需求可能包括数据历史跟踪或审计以及与引用完整性相关的需求。

与其物理删除数据，不如只是隐藏这些数据，使其无法从应用程序前端访问。

**在本教程中，我们将学习软删除以及如何使用Spring JPA实现这种技术。**

## 2. 什么是软删除？

**软删除执行更新过程，标记某些数据为已删除，而不是从数据库表中物理删除。** 实现软删除的一种常见方式是添加一个字段，指示数据是否已被删除。

例如，假设我们有一个具有以下结构的产品表：![img](https://www.baeldung.com/wp-content/uploads/2021/05/table1.png)

现在让我们看看当我们从表中物理删除记录时将运行的SQL命令：

```
delete from table_product where id=1
```

这条SQL命令将永久从数据库表中删除具有_id=1_的产品。

现在让我们实现上述的软删除机制：![img](https://baeldung.com/wp-content/uploads/2021/05/table2.png)

注意我们添加了一个名为_deleted_的新字段。此字段将包含值_0_或_1_。

值_1_将表示数据已被删除，而_0_将表示数据尚未被删除。我们应该将_0_设置为默认值，对于每个数据删除过程，我们不运行SQL删除命令，而是运行以下SQL更新命令：

```
update from table_product set deleted=1 where id=1
```

使用这条SQL命令，我们实际上并没有删除行，而只是将其标记为已删除。因此，当我们要执行读取查询时，我们只想获取那些尚未被删除的行，我们应该在我们的SQL查询中添加一个过滤器：

```
select * from table_product where deleted=0
```

使用Spring JPA实现软删除变得更加容易。我们只需要为此目的添加一些JPA注解。

正如我们所知，我们通常只使用几种SQL命令与JPA。它将在幕后创建并执行大多数SQL查询。

现在让我们使用与上述相同的表示例在Spring JPA中实现软删除。

### 3.1. 实体类

最重要的部分是创建实体类。

让我们创建一个_Product_实体类：

```
@Entity
@Table(name = "table_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;

    // setter getter 方法
}
```

正如我们所看到的，我们添加了一个_deleted_属性，并将默认值设置为_FALSE_。

下一步将是覆盖JPA仓库中的_delete_命令。

默认情况下，JPA仓库中的删除命令将运行SQL删除查询，因此让我们首先向我们的实体类添加一些注解：

```
@Entity
@Table(name = "table_product")
@SQLDelete(sql = "UPDATE table_product SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;

    // setter getter 方法
}
```

**我们使用_@SQLDelete_注解来覆盖删除命令。** 每次我们执行删除命令时，实际上**将其变成了一个SQL更新命令，将deleted字段的值更改为true**，而不是永久删除数据。

**另一方面，_@Where_注解将在我们读取产品数据时添加一个过滤器。** 因此，根据上述代码示例，具有_value deleted = true_的产品数据将不会被包含在结果中。

### 3.2. 仓库

在仓库类中没有特别的更改，我们可以像在Spring Boot应用程序中那样编写常规的仓库类：

```
public interface ProductRepository extends CrudRepository`<Product, Long>`{
    
}
```

### 3.3. 服务

对于服务类，目前也没有什么特别的。我们可以调用我们想要的仓库函数。

在这个例子中，让我们调用三个仓库函数来创建记录，然后执行软删除：

```
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public void remove(Long id){
        productRepository.deleteById(id);
    }

    public Iterable```<Product>``` findAll(){
        return productRepository.findAll();
    }
}
```

## 4. 如何获取已删除的数据？

通过使用_@Where_注解，我们无法获取已删除的产品数据，以防我们仍然希望已删除的数据可访问。一个例子是具有管理员级别权限的用户，他们可以完全访问并查看已被“删除”的数据。

**为了实现这一点，我们不应该使用_@Where_注解** **而是使用两种不同的注解，_@FilterDef_和_@Filter_**。通过这些注解，我们可以按需动态添加条件：

```
@Entity
@Table(name = "tbl_products")
@SQLDelete(sql = "UPDATE tbl_products SET deleted = true WHERE id=?")
@FilterDef(name = "deletedProductFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedProductFilter", condition = "deleted = :isDeleted")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private boolean deleted = Boolean.FALSE;
}
```

这里_@FilterDef_注解定义了将由@ _Filter_注解使用的基本信息。此外，我们还需要在_ProductService_服务类中更改_findAll()_函数，以处理动态参数或过滤器：

```
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public void remove(Long id){
        productRepository.deleteById(id);
    }

    public Iterable```<Product>``` findAll(boolean isDeleted){
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedProductFilter");
        filter.setParameter("isDeleted", isDeleted);
        Iterable```<Product>``` products =  productRepository.findAll();
        session.disableFilter("deletedProductFilter");
        return products;
    }
}
```

这里我们添加了_isDeleted_参数，我们将将其添加到对象_Filter_中，影响读取_Product_实体的过程。

## 5. 结论

使用Spring JPA实现软删除技术很容易。我们需要做的是定义一个字段，存储一行是否已被删除。然后我们使用_@SQLDelete_注解覆盖该特定实体类的删除命令。

如果我们想要更多的控制，我们可以使用_@FilterDef_和_@Filter_注解，这样我们就可以决定查询结果是否应包括已删除的数据。

本文中的所有代码都可以在GitHub上找到。