---
date: 2022-11-01
category:
  - Kotlin
tag:
  - 克隆
  - 对象
  - 深拷贝
  - 浅拷贝
head:
  - - meta
    - name: keywords
      content: Kotlin, 克隆对象, 深拷贝, 浅拷贝
---

# Kotlin中克隆对象

## 1. 概述

通常来说，克隆是创建一个对象的相同副本的过程。而在编程环境中，克隆意味着创建一个新的对象，它具有与原始对象相同的值和属性。

**在本文中，我们将讨论在Kotlin中克隆对象可以使用的方法。**

## 2. 浅拷贝与深拷贝

在讨论如何克隆对象之前，我们首先应该正确理解浅拷贝和深拷贝的概念。这在我们处理复杂数据结构，例如嵌套对象或集合时尤其重要。

**浅拷贝意味着我们只复制现有对象的引用，而不是实际的对象或值。**

如果我们有一个具有复杂模式的对象，例如，在多个级别上都有嵌套对象，并且我们只复制顶层的字段，那也是一种浅拷贝。

同时，**深拷贝意味着创建一个副本，实际上为每个字段都创建了一个新的对象，而不仅仅是引用复制。**

因此，对于复杂模式，深拷贝的结果是数据结构中所有层的所有对象都有新的副本。

## 3. 克隆方法

我们可以使用不同的方法来克隆对象，这取决于我们想要克隆的对象的复杂性。为了演示这一点，我们将创建一个具有现实模式的模型，以提供一个清晰的例子。

首先，让我们定义一些要使用的类：

```kotlin
class Address(var street: String, var city: String)
class Person(var name: String, var address: Address)
class Company(var name: String, var industry: String, val ceo: Person, val employees: List```<Person>```)
class Organization(var name: String, val headquarters: Address, val companies: List``````<Company>``````)
```

我们有一个组织，其中包含公司，公司中有工作的人：

```kotlin
// ... 其他Company, Person和Address对象
val organization = Organization("Bekraf", Address("Jalan Medan Merdeka Selatan", "Jakarta"), listOf(companyBasen, companyKotagede))
```

### 3.1. 使用数据类_copy()

每个**数据类**在Kotlin中都有一个内置的_function copy()_，用于创建对象的副本。**默认情况下，_copy()_执行浅拷贝。**

但在此之前，我们必须将我们的_classes_更改为_data classes_，通过在_class:_之前添加_data_关键字：

```kotlin
data class Address(var street: String, var city: String)
data class Person(var name: String, var address: Address)
data class Company(var name: String, var industry: String, val ceo: Person, val employees: List```<Person>```)
data class Organization(var name: String, val headquarters: Address, val companies: List``````<Company>``````)
```

然后我们可以直接调用_copy()_函数，但这将导致浅拷贝：

```kotlin
val clonedOrganization = organization.copy()
```

**然而，如果每个嵌套对象也被复制，我们可以执行深拷贝。**

让我们彻底并小心地复制每个字段，包括在集合中找到的那些：

```kotlin
val clonedOrganization = organization.copy(
  headquarters = organization.headquarters.copy(),
  companies = organization.companies.map { company ->
    company.copy(
      ceo = company.ceo.copy(
        address = company.ceo.address.copy()
      ),
      employees = company.employees.map { employee ->
        employee.copy(
          address = employee.address.copy()
        )
      }
    )
  }
)
```

我们通过对_organization_对象执行深拷贝，创建了_headquarters_和每个_companies_的新副本，包括每个_companies_中的_ceo_和每个_employees_，以及他们的_address_。

### 3.2. 使用_clone()

我们也可以**使用_clone()_方法，它默认执行浅拷贝。**然而，这需要在类中实现_Java的Cloneable_接口。

**为了实现深拷贝，我们需要重写_clone()_方法并使其公开。在重写的方法中，我们将为所有对象的属性创建新的副本并返回新创建的对象。**

让我们看看我们拥有的类的更改：

```kotlin
data class Address(var street: String, var city: String) : Cloneable {
    public override fun clone() = Address(this.street, this.city)
}

data class Person(var name: String, var address: Address) : Cloneable {
    public override fun clone() = Person(name, this.address.clone())
}

data class Company(var name: String, var industry: String, val ceo: Person, val employees: List```<Person>```) : Cloneable {
    public override fun clone() = Company(name, industry, ceo.clone(), employees.map { it.clone() })
}

data class Organization(var name: String, val headquarters: Address, val companies: List``````<Company>``````) : Cloneable {
    public override fun clone() = Organization(name, headquarters.clone(), companies.map { it.clone() })
}
```

是的，这需要在开始时付出更多的努力。但现在，调用_clone()_将轻松执行深拷贝：

```kotlin
val clonedOrganization = organization.clone()
```

### 3.3. 使用辅助构造器

辅助构造器是类除了主构造器之外还可以拥有的额外构造器。正如我们所知，构造器通常用于创建类的实例（对象）。所以，我们可以说这是一种在不涉及_data_类或_Cloneable_接口的情况下克隆对象的方法。

让我们添加一个辅助构造器：

```kotlin
class Organization(var name: String, val headquarters: Address, val companies: List``````<Company>``````) {
    constructor(organization: Organization) : this(
      organization.name,
      Address(organization.headquarters),
      organization.companies.map { Company(it) })
}
// ... Address, Person和Company的类似构造器
```

在每个类中，**我们创建一个接受相同类型并在新创建的引用结构中使用其值的构造器。**

现在，要创建深拷贝，我们可以轻松地调用构造器：

```kotlin
val clonedOrganization = Organization(organization)
```

### 3.4. 使用自定义深拷贝

如果我们想要将副本创建逻辑与主构造器分开，并且更加灵活，那么我们可以采用这种方法。是的，我们可以创建我们自己的函数：

```kotlin
class Organization(var name: String, val headquarters: Address, val companies: List``````<Company>``````) {
    fun deepCopy(
      name: String = this.name,
      headquarters: Address = this.headquarters.deepCopy(),
      companies: List``````<Company>`````` = this.companies.map { it.deepCopy() },
    ) = Organization(name, headquarters, companies)
}
// ... Address, Person和Company的类似deepCopy
```

**这些类中的_deepCopy()_函数创建了对象的嵌套副本。**例如，在_Organization_类中，要复制_headquarters_对象，_deepCopy()_函数将基本上调用_Address_中的_deepCopy()_，它反过来也会调用其其他属性中的_deepCopy()_。

现在，要创建深拷贝，我们只需调用：

```kotlin
val clonedOrganization = organization.deepCopy()
```

## 4. 验证

要验证一个对象是否是深拷贝，我们可以检查**对原始对象的更改是否不影响复制的对象。**

由于这是一个复杂的对象，让我们深入进行：

```kotlin
organization.name = "New Org Name"
organization.headquarters.city = "New City"
organization.companies.first().name = "New Company Name"
organization.companies.first().ceo.name = "New CEO Name"
organization.companies.first().ceo.address.city = "New CEO Address City Name"
organization.companies.first().employees.first().name = "New Employee Name"
organization.companies.first().employees.first().address.city = "New Employee Address City Name"
```

让我们看看对原始对象的更改是否不影响副本对象。

```kotlin
assertThat(clonedOrganization)
  .isNotSameAs(organization)
assertThat(clonedOrganization.headquarters.city)
  .isNotEqualTo("New City")
assertThat(clonedOrganization.companies.first().name)
  .isNotEqualTo("New Company Name")
assertThat(clonedOrganization.companies.first().ceo.name)
  .isNotEqualTo("New CEO Name")
assertThat(clonedOrganization.companies.first().ceo.address.city)
  .isNotEqualTo("New CEO Address City Name")
assertThat(clonedOrganization.companies.first().employees.first().name)
  .isNotEqualTo("New Employee Name")
assertThat(clonedOrganization.companies.first().employees.first().address.city)
  .isNotEqualTo("New Employee Address City Name")
```

是的，一切正常工作。

## 5. 结论

在本教程中，我们讨论了对象克隆的方法。如果我们想要一些简单且具有典型Kotlin风格的表达方式，那么我们可以使用_data class copy()_，尽管我们必须小心处理通过引用而不是值克隆的嵌套对象。

同时，_clone()_也是可能的，但需要在开始时付出更多的努力，因为我们必须实现_Cloneable_接口。

使用辅助构造器是一种如果我们不想依赖于_data_类或_Cloneable_接口的方法。我们的自定义_deepCopy_提供了类似的灵活性，但仍然需要在开始时付出努力和精确度。

如