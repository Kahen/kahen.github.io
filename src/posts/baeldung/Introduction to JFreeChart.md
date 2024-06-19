由于我无法访问外部链接，包括您提供的链接，因此无法直接获取网页内容进行翻译。但是，如果您能提供网页上的具体文本内容，我将很乐意为您翻译成中文。您可以复制并粘贴网页上的文本，然后我将按照您的要求进行翻译和格式化输出。---
date: 2024-06-19
category:
  - 编程
  - Java
tag:
  - JFreeChart
  - 图表库
head:
  - - meta
    - name: keywords
      content: Java, JFreeChart, 图表可视化, 数据可视化
---

# JFreeChart入门指南

## 1. 概览

在本教程中，我们将了解如何使用JFreeChart，这是一个全面的Java库，用于创建各种图表。我们可以使用它将图形数据表示集成到Swing应用程序中。它还包括一个JavaFX的独立扩展。

我们将从基础开始，涵盖设置和图表创建，并尝试几种不同类型的图表。

## 2. 创建我们的第一个图表

JFreeChart允许我们创建折线图、条形图、饼图、散点图、时间序列图、直方图等。它还可以将不同的图表组合到一个视图中。

### 2.1. 设置依赖项

要开始使用，我们需要在我们的pom.xml文件中添加jfreechart构件：

```xml
`<dependency>`
    `<groupId>`org.jfree`</groupId>`
    `<artifactId>`jfreechart`</artifactId>`
    `<version>`1.5.4`</version>`
`</dependency>`
```

**我们应该始终检查最新版本及其JDK兼容性**，以确保我们的项目是最新的并且正常工作。在这种情况下，版本1.5.4需要JDK8或更高版本。

### 2.2. 创建基本折线图

让我们使用DefaultCategoryDataset为我们的图表创建一个数据集：

```java
DefaultCategoryDataset dataset = new DefaultCategoryDataset();
dataset.addValue(200, "Sales", "January");
dataset.addValue(150, "Sales", "February");
dataset.addValue(180, "Sales", "March");
dataset.addValue(260, "Sales", "April");
dataset.addValue(300, "Sales", "May");
```

现在，我们可以创建一个使用先前数据集绘制折线图的JFreeChart对象。

ChartFactory.createLineChart方法接受图表标题、x轴和y轴标签以及数据集作为参数：

```java
JFreeChart chart = ChartFactory.createLineChart(
    "Monthly Sales",
    "Month",
    "Sales",
    dataset);
```

接下来，ChartPanel对象对于在Swing组件中显示我们的图表至关重要。然后使用此对象作为JFrame内容窗格来创建应用程序窗口：

```java
ChartPanel chartPanel = new ChartPanel(chart);
JFrame frame = new JFrame();
frame.setSize(800, 600);
frame.setContentPane(chartPanel);
frame.setLocationRelativeTo(null);
frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
frame.setVisible(true);
```

当我们运行此代码时，我们将看到我们的月度销售图表：

## 3. 探索不同类型的图表

在其余示例中，我们将尝试一些不同类型的图表。我们不需要更改太多代码。

### 3.1. 条形图

我们可以修改JFreeChart创建代码，将我们的折线图转换为条形图：

```java
JFreeChart chart = ChartFactory.createBarChart(
    "Monthly Sales",
    "Month",
    "Sales",
    dataset);
```

这绘制了前一个示例的数据集：

### 3.2. 饼图

**饼图显示整体中各部分的比例**。要创建饼图，我们需要使用DefaultPieDataset类来创建我们的数据集。我们还使用createPieChart()方法来构建我们的JFreeChart对象：

```java
DefaultPieDataset`<String>` dataset = new DefaultPieDataset<>();
dataset.setValue("January", 200);
dataset.setValue("February", 150);
dataset.setValue("March", 180);

JFreeChart chart = ChartFactory.createPieChart(
    "Monthly Sales",
    dataset,
    true,    // 包含图例
    true,    // 生成工具提示
    false);  // 无URLs
```

当我们将鼠标悬停在饼图的某一块上时，会显示显示一个月的绝对销售额和相对于总数的百分比的工具提示：

### 3.3. 时间序列图

**时间序列图显示数据随时间的趋势**。要构建数据集，我们需要一个TimeSeriesCollection对象，它是一个TimeSeries对象的集合，每个对象都是一系列数据项，每个数据项包含与特定时间段相关的值：

```java
TimeSeries series = new TimeSeries("Monthly Sales");
series.add(new Month(1, 2024), 200);
series.add(new Month(2, 2024), 150);
series.add(new Month(3, 2024), 180);

TimeSeriesCollection dataset = new TimeSeriesCollection();
dataset.addSeries(series);

JFreeChart chart = ChartFactory.createTimeSeriesChart(
    "Monthly Sales",
    "Date",
    "Sales",
    dataset,
    true,    // 图例
    false,   // 工具提示
    false);  // 无URLs
```

让我们看看结果：

### 3.4. 组合图表

**组合图表允许我们将不同类型的图表组合到一个图表中**。与前面的示例相比，代码稍微复杂一些。

我们需要使用DefaultCategoryDataset来存储数据，但在这里，我们创建了两个实例，每个图表类型一个：

```java
DefaultCategoryDataset lineDataset = new DefaultCategoryDataset();
lineDataset.addValue(200, "Sales", "January");
lineDataset.addValue(150, "Sales", "February");
lineDataset.addValue(180, "Sales", "March");

DefaultCategoryDataset barDataset = new DefaultCategoryDataset();
barDataset.addValue(400, "Profit", "January");
barDataset.addValue(300, "Profit", "February");
barDataset.addValue(250, "Profit", "March");
```

CategoryPlot创建包含两种类型图表的绘图区域。它允许我们将数据集分配给渲染器 - LineAndShapeRenderer用于线条，BarRenderer用于条形：

```java
CategoryPlot plot = new CategoryPlot();
plot.setDataset(0, lineDataset);
plot.setRenderer(0, new LineAndShapeRenderer());

plot.setDataset(1, barDataset);
plot.setRenderer(1, new BarRenderer());

plot.setDomainAxis(new CategoryAxis("Month"));
plot.setRangeAxis(new NumberAxis("Value"));

plot.setOrientation(PlotOrientation.VERTICAL);
plot.setRangeGridlinesVisible(true);
plot.setDomainGridlinesVisible(true);
```

最后，让我们使用JFreeChart创建最终的图表：

```java
JFreeChart chart = new JFreeChart(
    "Monthly Sales and Profit",
    null,  // null表示使用默认字体
    plot,  // 组合图表作为CategoryPlot
    true); // 图例
```

这种设置允许数据的组合呈现，直观地展示了销售和利润之间的协同作用：

## 4. 结论

**在本文中，我们探索了使用JFreeChart创建不同类型的图表**，包括折线图、条形图、饼图、时间序列图和组合图表。

本文的介绍只是触及了JFreeChart功能的表面。

如常，本文的代码可在GitHub上找到。

评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表格。

OK