---
date: 2024-06-27
category:
  - Java
  - XML
tag:
  - XML解析
  - HashMap
head:
  - - meta
    - name: keywords
      content: Java, XML, HashMap, 解析
------
# 如何在Java中将XML解析到HashMap

XML是互联网上流行的数据交换格式之一。在处理XML数据时，通常需要将其转换为更易于进一步处理的格式。

在本教程中，我们将探讨将XML解析到_HashMap_的不同方法，这是一种允许有效数据检索和操作的数据结构。

## 2. 设置

我们将使用不同的库将以下XML解析到_HashMap_：

```
`<employees>`
    ``<employee>``
        ``<id>``654``</id>``
        ``<firstName>``John``</firstName>``
        ``<lastName>``Doe``</lastName>``
    ``</employee>``
    ``<employee>``
        ``<id>``776``</id>``
        ``<firstName>``Steve``</firstName>``
        ``<lastName>``Smith``</lastName>``
    ``</employee>``
`</employees>`
```

让我们使用下面的POJO来存储XML数据：

```java
public class Employee {
    private String id;
    private String firstName;
    private String lastName;

    // 标准getter和setter
}
```

我们将设置我们的通用测试方法来验证所有案例的结果：

```java
void verify(Map``<String, Employee>`` employeeMap) {
    Employee employee1 = employeeMap.get("654");
    Employee employee2 = employeeMap.get("776");
    Assertions.assertEquals("John", employee1.getFirstName());
    Assertions.assertEquals("Doe", employee1.getLastName());
    Assertions.assertEquals("Steve", employee2.getFirstName());
    Assertions.assertEquals("Smith", employee2.getLastName());
}
```

## 3. 使用XStream解析XML

XStream是一个第三方库，用于将对象序列化和反序列化到XML。**通过最少的配置，XStream提供了解析XML数据的能力**。

我们将使用以下Maven依赖：

```
`````<dependency>`````
    `````<groupId>`````com.thoughtworks.xstream`````</groupId>`````
    `````<artifactId>`````xstream`````</artifactId>`````
    ```<version>```1.4.18```</version>```
`````</dependency>`````
```

我们将**创建一个新的_XStream_实例**并设置一些别名：

```java
XStream xStream = new XStream();
xStream.alias("employees", List.class);
xStream.alias("employee", Employee.class);
```

我们为XML中的_employees_元素设置别名，以便被解释为_List_。我们还为_employee_元素设置别名，以便被解释为_Employee_对象。

我们将**添加权限以允许任何类型被反序列化**，这是XStream将XML反序列化为对象列表所必需的：

```java
xStream.addPermission(AnyTypePermission.ANY);
```

让我们**使用XStream的_fromXML()_方法将XML字符串解析为_Employee_对象列表**：

```java
List````<Employee>```` employees = (List````<Employee>````) xStream.fromXML(xml);
```

然后我们**使用流将员工列表转换为_Map_**，使用_id_作为键，员工对象本身作为值：

```java
employees.stream().collect(Collectors.toMap(Employee::getId, Function.identity()))
```

## 4. 使用Underscore-java解析XML

Underscore-java是一个实用程序库，提供了一系列函数编程和数据操作功能。它需要Java 11或更高版本。

我们将使用以下Maven依赖：

```
`````<dependency>`````
    `````<groupId>`````com.github.javadev`````</groupId>`````
    `````<artifactId>`````underscore`````</artifactId>`````
    ```<version>```1.89```</version>```
`````</dependency>`````
```

让我们使用**Underscore-java的_fromXmlMap()_函数解析XML字符串并将其转换为嵌套的映射结构**：

```java
Map```<String, Object>``` employeeList = (Map```<String, Object>```) U.fromXmlMap(xml).get("employees");
List```<LinkedHashMap`<String, String>````> list = (List```<LinkedHashMap`<String, String>````>) employeeList.get("employee");
parseXmlToMap(employeeMap, list);
```

我们从结果映射中提取_employees_元素。然后我们将结果的_LinkedHashMap_转换为_HashMap_：

```java
void parseXmlToMap(Map``<String, Employee>`` employeeMap, List```<LinkedHashMap`<String, String>````> list) {
    list.forEach(empMap -> {
        Employee employee = new Employee();
        for (Map.Entry`<String, String>` key : empMap.entrySet()) {
            switch (key.getKey()) {
                case "id":
                    employee.setId(key.getValue());
                    break;
                case "firstName":
                    employee.setFirstName(key.getValue());
                    break;
                case "lastName":
                    employee.setLastName(key.getValue());
                    break;
                default:
                    break;
            }
        }
        employeeMap.put(employee.getId(), employee);
    });
}
```

一旦我们有了嵌套的映射结构，我们就迭代列表中的每个_LinkedHashMap_，表示单个员工的数据。然后我们创建一个新的_Employee_对象，并根据映射中的数据填充其字段。

## 5. 使用Jackson解析XML

Jackson是一个Java库，它使用注释或可定制的配置将XML元素和属性映射到Java对象。

我们将使用以下Maven依赖：

```
`````<dependency>`````
    `````<groupId>`````com.fasterxml.jackson.core`````</groupId>`````
    `````<artifactId>`````jackson-databind`````</artifactId>`````
`````</dependency>`````
`````<dependency>`````
    `````<groupId>`````com.fasterxml.jackson.dataformat`````</groupId>`````
    `````<artifactId>`````jackson-dataformat-xml`````</artifactId>`````
`````</dependency>`````
```

_XmlMapper_是一个专门用于XML数据的映射器，它允许我们读写XML：

```java
XmlMapper xmlMapper = new XmlMapper();
Map```<String, Object>``` map = xmlMapper.readValue(xml, Map.class);
```

我们读取XML数据并将其转换为键值对的映射。**Jackson动态解析XML并构建相应的映射结构。**我们从映射中提取员工元素列表：

```java
List```<LinkedHashMap`<String, String>````> list = (List```<LinkedHashMap`<String, String>````>) map.get("employee");
```

然后我们可以使用之前定义的相同的_parseXmlToMap()_方法提取员工的映射。

## 6. 使用JAXB解析XML

JAXB是Java XML绑定架构，它支持一个绑定框架，使用注释将XML元素和属性映射到Java。

我们将使用以下Maven依赖：

```
`````<dependency>`````
    `````<groupId>`````com.sun.xml.bind`````</groupId>`````
    `````<artifactId>`````jaxb-impl`````</artifactId>`````
    ```<version>```2.3.3```</version>```
`````</dependency>`````
```

让我们设置_Employees_类，并使用以下注释帮助将其绑定到Java对象：

```java
@XmlRootElement(name = "employees")
public class Employees {

    private List````<Employee>```` employeeList;

    @XmlElement(name = "employee")
    public List````<Employee>```` getEmployeeList() {
        return employeeList;
    }
    // 标准setter
}
```

让我们创建一个**_JAXBContext_，用于管理XML数据和Java对象之间的绑定**：

```java
JAXBContext context = JAXBContext.newInstance(Employees.class);
Unmarshaller unmarshaller = context.createUnmarshaller();
Employees employees = (Employees) unmarshaller.unmarshal(new StringReader(xmlData));
```

**_Unmarshaller_负责根据JAXB注释在类中定义的映射将XML数据转换为对象。**

我们使用Java流将员工列表转换为_Map_，使用_id_作为键，员工对象本身作为值，如前一节所示。

## 7. 使用DOM解析器和XPath解析XML

**DOM解析器是一种无需第三方库即可解析XML的方法**。DOM解析器支持XPath，用于浏览XML并提取数据。

让我们创建一个用于生产DOM解析器的工厂，这将用于解析XML文档：

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document doc = builder.parse(new InputSource(new StringReader(xmlData)));
```

我们使用负责构建XML的DOM表示的构建器将XML数据解析为_Document_对象。

然后我们将设置一个_XPath_实例来查询DOM：

```java
XPathFactory xPathfactory = XPathFactory.newInstance();
XPath xpath = xPathfactory.newXPath();
XPathExpression xPathExpr = xpath.compile("/employees/employee");
```

我们配置一个_XPath_实例，编译一个_XPath_表达式，选择XML文档中_employees_元素内的所有_employee_元素。

让我们在_doc_上评估_XPath_表达式以检索包含所有匹配员工元素的_NodeList_：

```java
NodeList nodes = (NodeList) xPathExpr.evaluate(doc, XPathConstants.NODESET);
```

我们迭代_NodeList_并将员工元素提取到_HashMap_中：

```java
for (int i = 0; i < nodes.getLength(); i++) {
    Element node = (Element) nodes.item(i);
    Employee employee = new Employee();
    employee.setId(node.getElementsByTagName("id").item(0).getTextContent());
    employee.setFirstName(node.getElementsByTagName("firstName").item(0).getTextContent());
    employee.setLastName(node.getElementsByTagName("lastName").item(0).getTextContent());
    map.put(employee.getId(), employee);
}
```

## 8. 结论

在本文中，我们探讨了将XML解析到_HashMap_的多种方法，这是一种存储键值对的基本数据结构。

XStream和Underscore以其最少的配置，是简单XML解析的理想选择。

Jackson将XML元素映射到Java对象