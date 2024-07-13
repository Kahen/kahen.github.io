---
date: 2022-10-04
category:
  - Java
  - Software Development
tag:
  - Coupling
  - Design Patterns
  - Inversion of Control
head:
  - - meta
    - name: keywords
      content: Java, Coupling, Software Development, Design Patterns, Inversion of Control
---
# Java中的耦合 | Baeldung

## 1. 引言

在本教程中，我们将学习Java中的耦合，包括每种类型的类型和描述。最后，我们简要描述了依赖倒置原则和控制反转以及它们与耦合的关系。

当我们谈论耦合时，我们描述的是系统中类彼此依赖的程度。我们在开发过程中的目标是减少耦合。

考虑以下场景。我们正在设计一个元数据收集应用程序。这个应用程序为我们收集元数据。它以XML格式获取元数据，然后将获取的元数据导出到CSV文件，仅此而已。我们最初的方法可能是，正如我们所看到的那样：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/start-01.png)

我们的模块负责获取、处理和导出数据。然而，这是一个糟糕的设计。这种设计违反了单一职责原则。因此，为了改进我们的第一个设计，我们需要分离关注点。经过这次更改后，我们的设计看起来像这样：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/02.png)

现在，我们的设计被解耦成两个新模块，_XML Fetch_ 和 _Export CSV_。与此同时，_元数据收集模块_ 依赖于两者。这个设计比我们最初的方法更好，但仍然是一项正在进行中的工作。在接下来的部分中，我们将注意到我们如何根据良好的耦合实践改进我们的设计。

## 3. 紧耦合

**当一组类高度依赖彼此，或者我们有承担很多责任的类时，这被称为紧耦合**。另一种情况是当一个对象为其使用而创建另一个对象。紧耦合代码难以维护。

让我们通过我们的基础应用程序来查看这种行为。让我们深入了解一些代码定义。首先，我们的_XMLFetch_类：

```java
public class XMLFetch {
    public List````````````<Object>```````````` fetchMetadata() {
        List````````````<Object>```````````` metadata = new ArrayList<>();
        // 做一些工作
        return metadata;
    }
}
```

接下来是_CSVExport_类：

```java
public class CSVExport {
    public File export(List````````````<Object>```````````` metadata) {
        System.out.println("导出数据...");
        // 导出元数据
        File outputCSV = null;
        return outputCSV;
    }
}
```

最后，我们的_MetadataCollector_类：

```java
public class MetadataCollector {
    private XMLFetch xmlFetch = new XMLFetch();
    private CSVExport csvExport = new CSVExport();
    public void collectMetadata() {
        List````````````<Object>```````````` metadata = xmlFetch.fetchMetadata();
        csvExport.export(metadata);
    }
}
```

正如我们所注意到的，我们的_MetadataCollector_类依赖于_XMLFecth_和_CSVExport_类。此外，它还负责创建它们。

如果我们想改进我们的收集器，可能添加一个新的JSON数据获取器并以PDF格式导出数据，我们需要将这些新元素包含在我们的类中。让我们编写新的“改进”类：

```java
public class MetadataCollector {
    ...
    private CSVExport csvExport = new CSVExport();
    private PDFExport pdfExport = new PDFExport();
    public void collectMetadata(int inputType, int outputType) {
        if (outputType == 1) {
            List````````````<Object>```````````` metadata = null;
            if (inputType == 1) {
                metadata = xmlFetch.fetchMetadata();
            } else {
                metadata = jsonFetch.fetchMetadata();
            }
            csvExport.export(metadata);
        } else {
            List````````````<Object>```````````` metadata = null;
            if (inputType == 1) {
                metadata = xmlFetch.fetchMetadata();
            } else {
                metadata = jsonFetch.fetchMetadata();
            }
            pdfExport.export(metadata);
        }
    }
}
```

_Metadata Collector Module_需要一些标志来处理新功能。根据标志值，将实例化相应的子模块。然而，每一项新功能不仅使我们的代码更加复杂，而且使维护更加困难。这是紧耦合的迹象，我们必须避免。

## 4. 松耦合

在开发过程中，我们所有类之间的关系数量需要尽可能少。这被称为松耦合。**松耦合是指一个对象从外部来源获取要使用的对象**。我们的对象彼此独立。松散耦合的代码减少了维护工作量。此外，它为系统提供了更大的灵活性。

松耦合通过依赖倒置原则来表达。在下一节中，我们将描述它。

## 5. 依赖倒置原则

**依赖倒置原则（DIP）指的是高级模块不应该依赖低级模块来承担它们的责任**。**两者都应该依赖于抽象**。

在我们的设计中，这是根本问题。元数据收集器（高级）模块依赖于获取XML和导出CSV数据（低级）模块。

但我们如何改进我们的设计呢？DIP向我们展示了解决方案，但它并没有谈论如何实现它。在这种情况下，当控制反转（IoC）采取行动时。IoC指的是定义我们模块之间的抽象的方式。总之，它是实现DIP的方式。

那么，让我们将DIP和IoC应用到我们当前的例子中。首先，我们需要为获取和导出数据定义一个接口。让我们进入代码来看看如何做到这一点：

```java
public interface FetchMetadata {
    List````````````<Object>```````````` fetchMetadata();
}
```

简单，不是吗？现在我们定义我们的导出接口：

```java
public interface ExportMetadata {
    File export(List````````````<Object>```````````` metadata);
}
```

此外，我们需要在相应的类中实现这些接口。简而言之，我们需要更新我们当前的类：

```java
public class XMLFetch implements FetchMetadata {
    @Override
    public List````````````<Object>```````````` fetchMetadata() {
        List````````````<Object>```````````` metadata = new ArrayList<>();
        // 做一些工作
        return metadata;
    }
}
```

接下来，我们需要更新_CSVExport_类：

```java
public class CSVExport implements ExportMetadata {
    @Override
    public File export(List````````````<Object>```````````` metadata) {
        System.out.println("导出数据...");
        // 导出元数据
        File outputCSV = null;
        return outputCSV;
    }
}
```

此外，更新主模块的代码以支持新的设计更改。让我们看看它看起来如何：

```java
public class MetadataCollector {
    private FetchMetadata fetchMetadata;
    private ExportMetadata exportMetadata;
    public MetadataCollector(FetchMetadata fetchMetadata, ExportMetadata exportMetadata) {
        this.fetchMetadata = fetchMetadata;
        this.exportMetadata = exportMetadata;
    }
    public void collectMetadata() {
        List````````````<Object>```````````` metadata = fetchMetadata.fetchMetadata();
        exportMetadata.export(metadata);
    }
}
```

我们可以观察到我们的代码有两个主要变化。首先，类只依赖于抽象，而不是具体类型。另一方面，我们消除了对低级模块的依赖。不需要在收集器模块中保留任何与低级模块创建相关的逻辑。与这些模块的交互是通过一个标准接口进行的。这种设计的优点是我们可以添加新的模块来获取和导出数据，而我们的收集器代码不会改变。

通过应用DIP和IoC，我们改进了我们的系统设计。**通过反转（改变）控制，应用程序变得解耦、可测试、可扩展和可维护**。以下图片显示了当前设计的样子：

![img](https://www.baeldung.com/wp-content/uploads/2022/10/03.png)

最后，我们从代码库中移除了任何紧密耦合的代码，并使用DIP和IoC增强了初始设计，使用松散耦合的代码。

## 6. 结论

在本文中，我们涵盖了Java中的耦合。我们首先了解了耦合的一般定义。然后，我们观察了紧密耦合和松散耦合之间的区别。后来，我们学习了如何应用DIP与IoC来获得松散耦合的代码。这个演示是通过遵循一个示例设计完成的。我们可以看到，通过应用良好的设计模式，我们的代码在每一步都有所改进。

像往常一样，我们的代码可以在GitHub上找到。