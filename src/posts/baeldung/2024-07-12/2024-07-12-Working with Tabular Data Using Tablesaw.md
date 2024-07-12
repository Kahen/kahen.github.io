---
date: 2022-04-01
category:
  - Java
  - Tablesaw
tag:
  - Java
  - Tablesaw
  - 数据库
  - 数据分析
head:
  - - meta
    - name: keywords
      content: Tablesaw库, 数据分析, Java
---
# 使用Tablesaw库处理表格数据

## 1. 引言

在本文中，我们将学习如何使用Tablesaw库来处理表格数据。首先，我们将导入一些数据。然后，我们将通过操作数据来获得一些见解。

我们将使用鳄梨价格数据集。简而言之，它包含了美国多个市场鳄梨价格和销售量的的历史数据。

## 2. 在Tablesaw中导入数据

首先，我们需要导入数据。Tablesaw支持包括CSV在内的多种格式，我们数据集的格式就是CSV。因此，让我们从CSV文件加载数据集开始：

```java
CsvReadOptions csvReadOptions =
    CsvReadOptions.builder(file)
        .separator(',')
        .header(true)
        .dateFormat(formatter)
        .build();
table = Table.read().usingOptions(csvReadOptions);
```

上述代码中，我们通过将文件对象传递给构建器来创建_CsvReadOptions_类。然后，我们通过正确配置选项对象来描述如何读取CSV文件。

首先，我们使用_separator()_方法设置列分隔符。其次，我们将文件的第一行作为标题读取。第三，我们提供一个_DateTimeFormatter_来正确解析日期和时间。最后，我们使用新创建的_CsvReadOptions_来读取表格数据。

### 2.1 验证导入的数据

让我们使用_structure()_方法来检查表格的设计。它返回另一个包含列名、索引和数据类型的表格：

```
         鳄梨.csv的结构
 索引  |  列名        |  列类型  
------------------------------------------
     0  |            C0  |      INTEGER  
     1  |          日期  |   LOCAL_DATE  
     2  |  平均价格    |       DOUBLE  
     3  |  总销量      |       DOUBLE  
    ... |       ...      |       ...    
```

接下来，让我们使用_shape()_方法来检查其形状：

```java
assertThat(table.shape()).isEqualTo("鳄梨.csv: 18249 行 X 14 列");
```

这个方法返回一个字符串，后跟文件名，然后是行数和列数。我们的数据集总共包含18249行数据和14列。

## 3. Tablesaw中的数据表示

**Tablesaw主要使用表格和列，这构成了所谓的数据框的基础**。简而言之，一个表格是一组具有固定类型的列。表格中的一行是一组值，每个值都分配给它匹配的列。

Tablesaw支持多种列类型。除了扩展Java中的原始类型之外，它还提供了文本和时间列。

### 3.1 文本类型

在Tablesaw中，有两种文本类型：_TextColumn_和_StringColumn_。第一种是通用类型，可以保存任何文本。另一方面，**_StringColumn_在存储之前将值编码为类似字典的数据结构**。这可以有效地保存数据，而不是在列向量中重复值。

例如，在鳄梨数据集中，地区和类型列的类型是_StringColumn_。它们在列向量中的重复值存储得更有效，并指向文本的相同实例：

```java
StringColumn type = table.stringColumn("类型");
List`<String>` conventional = type.where(type.isEqualTo("传统")).asList().stream()
    .limit(2)
    .toList();
assertThat(conventional.get(0)).isSameAs(conventional.get(1));
```

### 3.2 时间类型

Tablesaw中有四种时间类型可供选择。它们映射到它们等效的Java对象：_DateColumn_, _DateTimeColumn_, _TimeColumn_, 和 _InstantColumn_。如上所见，我们可以在导入时配置如何解析这些值。

## 4. 使用列

接下来，让我们看看如何处理导入的数据并从中提取见解。例如，在Tablesaw中，我们可以转换单个列或使用整个表格。

### 4.1 创建新列

让我们通过调用每种可用列类型上定义的静态方法_.create()_来创建新列。例如，要创建一个名为_time_的_TimeColumn_，我们编写：

```java
TimeColumn time = TimeColumn.create("时间");
```

然后，我们可以使用_.addColumns()_方法将此列添加到表格中：

```java
Table table = Table.create("测试");
table.addColumns(time);
assertThat(table.columnNames()).contains("时间");
```

### 4.2 添加或修改列数据

让我们使用_.append()_方法将数据添加到列的末尾：

```java
DoubleColumn averagePrice = table.doubleColumn("平均价格");
averagePrice.append(1.123);
assertThat(averagePrice.get(averagePrice.size() - 1)).isEqualTo(1.123);
```

对于表格，我们必须为每个列提供至少一个值。否则，在创建具有不同大小列的表格时，将抛出_IllegalArgumentException_：

```java
DoubleColumn averagePrice2 = table.doubleColumn("平均价格").copy();
averagePrice2.setName("平均价格2");
averagePrice2.append(1.123);
assertThatExceptionOfType(IllegalArgumentException.class).isThrownBy(() -> table.addColumns(averagePrice2));
```

我们使用_.set()_方法来更改列向量中的特定值。要使用它，我们必须知道我们想要更改的值的索引：

```java
stringColumn.set(2, "Baeldung");
```

从列中删除数据可能会有问题，特别是在表格的情况下。因此，**Tablesaw不允许从列向量中删除值**。相反，让我们将我们希望删除的值标记为缺失，使用_.setMissing()_并传递每个值的索引给这个方法：

```java
DoubleColumn averagePrice = table.doubleColumn("平均价格").setMissing(0);
assertThat(averagePrice.get(0)).isNull();
```

结果，它不会从向量中删除值持有者，而是将其设置为_null_。因此，向量的大小保持不变。

## 5. 对数据进行排序

接下来，让我们对之前导入的数据进行排序。首先，我们将根据一组列对我们的表格行进行排序。为此，我们**使用_.sortAscending()_和_.sortDescending()_方法**，它们接受列的名称。让我们排序以获取数据集中存在的最旧和最近的日期：

```java
Table ascendingDateSortedTable = table.sortAscendingOn("日期");
assertThat(ascendingDateSortedTable.dateColumn("日期").get(0)).isEqualTo(LocalDate.parse("2015-01-04"));
Table descendingDateSortedTable = table.sortDescendingOn("日期");
assertThat(descendingDateSortedTable.dateColumn("日期").get(0)).isEqualTo(LocalDate.parse("2018-03-25"));
```

然而，**这些方法非常有限**。例如，我们不能混合升序和降序排序顺序。**为了解决这些限制，我们使用_.sortOn()_方法**。它接受一组列名称，并默认按顺序排序。要在降序排序特定列，我们在列名称前加上减号“-”。例如，让我们按年份排序，并以降序排序最高的平均价格：

```java
Table ascendingYearAndAveragePriceSortedTable = table.sortOn("年份", "-平均价格");
assertThat(ascendingYearAndAveragePriceSortedTable.intColumn("年份").get(0)).isEqualTo(2015);
assertThat(ascendingYearAndAveragePriceSortedTable.numberColumn("平均价格").get(0)).isEqualTo(2.79);
```

**这些方法并不适合所有用例。对于这种情况，Tablesaw接受_Comparator`<VRow>`_的自定义实现用于_.sortOn()_方法**。

## 6. 过滤数据

过滤器允许我们从原始表中获取数据的子集。过滤表会返回另一个表，我们使用_.where()_和_.dropWhere()_方法来应用过滤器。第一种方法将返回与我们指定的标准匹配的值或行。而第二种方法则相反，会删除它们。

要指定过滤条件，我们首先需要了解_Selections_。

### 6.1. 选择

**_选择_是一个逻辑位图**。换句话说，它是一个包含布尔值的数组，这些布尔值掩盖了列向量上的值。例如，将选择应用于列将产生另一个包含过滤值的列 - 例如，在给定索引的掩码为0时删除值。此外，选择向量将与其原始列具有相同的大小。

让我们通过获取2017年平均价格高于2美元的数据表来实践这一点：

```java
DateColumn dateTable = table.dateColumn("日期");
DoubleColumn averagePrice = table.doubleColumn("平均价格");
Selection selection = dateTable.isInYear(2017).and(averagePrice.isGreaterThan(2D));
Table table2017 = table.where(selection);
assertThat(table2017.intColumn("年份")).containsOnly(2017);
assertThat(table2017.doubleColumn("平均价格")).allMatch(avrgPrice -> avrgPrice > 2D);
```

在上面，我们使用了在_DateColumn_上定义的_.isInYear()_方法和在_DoubleColumn_上定义的_.isGreaterThan()_方法。我们结合了它们在查询式语言中的使用，使用_.and()_方法。Tablesaw提供了许多这样的内置辅助方法。因此，我们很少需要为简单任务自己构建自定义选择。对于复杂任务，我们使用_.and(), .andNot(), or()_和其他列过滤器来组合它们。

或者，我们可以通过创建_Predicate_并将其传递给每个列上可用的_.eval()_方法来编写自定义过滤器。此方法返回我们用于过滤表格或列的_Selection_对象。

## 7. 汇总数据

在处理数据之后，我们想从中提取一些见解。我们使用_.summarize()_方法来聚合数据以了解它。例如，从鳄梨数据集中，让我们提取平均价格的最小值、最大值、平均值和标准偏差：

```java
Table summary = table.summarize("平均价格", max, min, mean, stdDev).by("年份");
System.out.println(summary.print());
```

首先，我们将我们想要聚合的列名和_AggregateFunction_列表传递给_.summarize()_方法。接下来，我们使用_.by()_方法按每年分组结果。最后，我们将结果打印在标准输出上：

```
                                             鳄梨.csv摘要
 年份  |  平均价格平均值  |  平均价格最大值  |  平均价格最小值  |  平均价格标准偏差  
-----------------------------------------------------------------------------------------------------------------
 2015  |    1.375590382902939  |                2.79  |                0.49  |            0.37559477067238917  
 2016  |   1.3386396011396013  |                3.25  |                0.51  |            0.39370799476072077  
 2017  |   1.5151275777700104  |                3.17  |                0.44  |             0.4329056466203253  
 2018  |   1.3475308641975308  |                 2.3  |                0.56  |             0.3058577391135024  
```

Tablesaw为大多数常见操作提供了_AggregateFunction_。或者，我们可以实现自定义_AggregateFunction_对象，但由于这超出了本文的范围，我们将保持简单。

## 8. 保存数据

到目前为止，我们一直在将数据打印到标准输出。在验证我们的即时结果时，打印到控制台是很好的，但我们需要将数据保存到文件中，以便其他人可以重用结果。因此，让我们直接在表格上使用_.write()_方法：

```java
summary.write().csv("summary.csv");
```

上述，我们使用_.csv()_方法将数据保存为CSV格式。目前，**Tablesaw仅支持CSV格式和固定宽度格式**，这类似于_.print()_方法在控制台上显示的内容。此外，我们使用_CsvWriterOptions_来自定义我们数据的CSV输出。

## 9. 结论

在本文中，我们探索了使用Tablesaw库处理表格数据。

首先，我们解释了如何导入数据。然后，我们描述了数据的内部表示以及如何使用它。接下来，我们探索了修改导入表的结构并创建过滤器以提取必要的数据，然后进行聚合。最后，我们将其保存到CSV文件中。

如往常一样，完整的源代码可在GitHub上获得。

[给Kimi加油](kimi://action?name=cheer-on-kimi)

OK