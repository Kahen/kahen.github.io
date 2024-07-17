---
date: 2022-04-01
category:
  - Java
  - Programming
tag:
  - Java Wildcard Imports
  - Code Cleanliness
  - Refactoring
head:
  - - meta
    - name: keywords
      content: Java, Wildcard Imports, Code Cleanliness, Refactoring, Java Programming
---

# Java通配符导入的优势和劣势

在本教程中，我们将讨论Java中使用通配符导入的优势和劣势。

Java `import` 语句声明了代码中使用的名称（类名、静态变量和方法名）的来源。

以一个 `Book` 类为例：

```java
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Book {

    private UUID id;

    private String name;

    private Date datePublished;

    private List```<String>``` authors;
}
```

在这里，我们需要导入 `Date` 和 `UUID` 两种数据类型以及 `List` 接口，因为它们默认情况下不可用。因此，我们编写了三个导入语句以使我们的类可以使用这些数据类型。让我们将这些类型的导入称为特定导入。

### 3. Java通配符导入

通配符导入指的是导入一个包而不是声明包中使用的具体类名。

使用通配符，我们可以将前一个示例中的三个导入语句替换为仅一个语句：

```java
import java.util.*;

public class Book {

    private UUID id;

    private String name;

    private Date datePublished;

    private List```<String>``` authors;
}
```

这一个通配符 `import` 语句将整个 `java.util` 包添加到搜索路径中，可以在其中找到所需的 `UUID`、`Date` 和 `List` 的名称。

### 4. 通配符导入的优势

自然地，与Java中的特定导入相比，通配符导入也有一些优势。让我们在下面的小节中讨论通配符导入的主要优势。

#### 4.1. 清洁代码

通配符导入帮助我们避免了代码中的长导入列表。因此，这对代码的可读性产生了影响，因为读者可能需要在每个源代码文件中滚动很多内容才能到达显示逻辑的代码。毫无疑问，更易读的代码也是清洁的代码。

这个想法也得到了《Clean Code》一书的支持，作者为 Robert C. Martin。事实上，这本书建议当从同一个源导入多个类时使用通配符导入。换句话说，当我们从包中导入两个或更多类时，最好导入整个包。

#### 4.2. 重构便利性

有了通配符导入，重构变得更加容易。例如，在重命名一个类时，我们不需要删除其所有特定的导入声明。

此外，如果我们将一个类从我们的一个包移动到另一个包，如果文件中已经存在对这两个包的通配符导入，我们就不需要重构任何代码。

#### 4.3. 松耦合

通配符导入在现代软件开发中执行了松耦合方法。

根据 Robert C. Martin 的说法，使用通配符导入的想法强化了松耦合。有了特定导入，类必须存在于一个包中。然而，有了通配符导入，特定类不需要存在于包中。实际上，通配符导入将指定的包添加到搜索路径中，可以在其中搜索所需的类名。

**因此，通配符风格的导入不会给包添加真正的依赖。**

### 5. 通配符导入的劣势

通配符导入也有它们的劣势。接下来，让我们看看通配符导入可能导致的一些问题。

#### 5.1. 类名冲突

**不幸的是，当一个类名在通过通配符导入的多个包中找到时，可能会发生冲突。**

在这种情况下，编译器注意到有两个 `Date` 类，并给出一个错误，因为 `Date` 类同时在 `java.sql` 和 `java.util` 包中找到：

```java
import java.util.*;
import java.sql.*;

public class Library {

    private UUID id;

    private String name;

    private Time openingTime;

    private Time closingTime;

    private List`<Date>` datesClosed;
}
```

**为了防止这样的错误，我们可以指定冲突类的首选来源。**

为了防止上述示例中的错误，我们可以在两个现有导入中添加第三行，指定冲突的 `Date` 类的来源：

```java
import java.util.*;
import java.sql.*;
import java.sql.Date;
```

#### 5.2. 意外的类名冲突

**有趣的是，随着时间的推移，冲突也可能突然出现，例如当我们使用的另一个包的较新版本中添加了一个类。**

例如，在 Java 1.1 中，`List` 类只在 `java.awt` 包中找到。然而，在 Java 1.2 中，`java.util` 包中添加了一个名为 `List` 的接口。

让我们看一个例子：

```java
import java.awt.*;
import java.util.*;

public class BookView extends Frame {

    private UUID id;

    private String name;

    private Date datePublished;

    private List```<String>``` authors;
}
```

最终，这种情况可能会在将 `java.awt` 和 `java.util` 包都作为通配符导入时引起冲突。**因此，我们在将代码迁移到较新的Java版本时可能会面临问题。**

### 6. 结论

![img](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)![img](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)![img](https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg)![img](https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png)