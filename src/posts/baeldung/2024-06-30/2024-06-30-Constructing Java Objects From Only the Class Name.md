---
date: 2023-09-01
category:
  - Java
  - Reflection
tag:
  - Java
  - Reflection API
  - Object Creation
head:
  - - meta
    - name: keywords
      content: Java, Reflection, Object Creation
------
# 使用类名构建Java对象

在本教程中，我们将探讨使用类名创建Java对象的过程。Java反射API提供了多种完成此任务的方法。然而，确定当前上下文中最合适的方法可能具有挑战性。

首先，让我们从一个简单的方法开始，并逐渐改进为更有效的解决方案。

### 创建对象使用类名

让我们想象一个汽车服务中心。该中心负责维护和修理汽车，使用工作卡来分类和管理服务请求。我们可以将其表示为类图：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Bronze.svg)

让我们看看_MaintenanceJob_和_RepairJob_类：

```java
public class MaintenanceJob {
    public String getJobType() {
        return "Maintenance Job";
    }
}

public class RepairJob {
    public String getJobType() {
        return "Repair Job";
    }
}
```

现在，让我们实现_BronzeJobCard_：

```java
public class BronzeJobCard {
    private Object jobType;
    public void setJobType(String jobType) throws ClassNotFoundException,
            NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class jobTypeClass = Class.forName(jobType);
        this.jobType = jobTypeClass.getDeclaredConstructor().newInstance();
    }

    public String startJob() {
        if(this.jobType instanceof RepairJob) {
            return "Start Bronze " + ((RepairJob) this.jobType).getJobType();
        }
        if(this.jobType instanceof MaintenanceJob) {
            return "Start Bronze " + ((MaintenanceJob) this.jobType).getJobType();
        }
        return "Bronze Job Failed";
    }
}
```

在_BronzeJobCard_中，**_Class.forName()_ 接受类的完全限定名以返回原始工作对象**。之后，_startJob()_ 使用类型转换在原始对象上获取正确的工作类型。除了这些缺点外，还有处理异常的开销。

让我们看看它的实际应用：

```java
@Test
public void givenBronzeJobCard_whenJobTypeRepairAndMaintenance_thenStartJob() throws ClassNotFoundException,
  InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {

    BronzeJobCard bronzeJobCard1 = new BronzeJobCard();
    bronzeJobCard1.setJobType("com.baeldung.reflection.createobject.basic.RepairJob");
    assertEquals("Start Bronze Repair Job", bronzeJobCard1.startJob());

    BronzeJobCard bronzeJobCard2 = new BronzeJobCard();
    bronzeJobCard2.setJobType("com.baeldung.reflection.createobject.basic.MaintenanceJob");
    assertEquals("Start Bronze Maintenance Job", bronzeJobCard2.startJob());
}
```

所以，上述方法启动了两个工作，一个修理工作和一个维护工作。

几个月后，服务中心决定开始油漆工作。因此，我们创建了一个新的类_PaintJob_，但_BronzeJobCard_能否适应这个新增加的工作？让我们看看：

```java
@Test
public void givenBronzeJobCard_whenJobTypePaint_thenFailJob() throws ClassNotFoundException,
  InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {

    BronzeJobCard bronzeJobCard = new BronzeJobCard();
    bronzeJobCard.setJobType("com.baeldung.reflection.createobject.basic.PaintJob");
    assertEquals("Bronze Job Failed", bronzeJobCard.startJob());
}
```

由于使用原始对象，_BronzeJobCard_无法处理新的_PaintJob_。

### 使用原始类对象创建对象

在这一部分，我们将升级工作卡，使用_java.lang.Class_而不是类的名称来创建工作。首先，看看类图：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Silver.svg)

让我们看看_SilverJobCard_与_BronzeJobCard_有何不同：

```java
public class SilverJobCard {
    private Object jobType;

    public void setJobType(Class jobTypeClass) throws
      NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        this.jobType = jobTypeClass.getDeclaredConstructor().newInstance();
    }

    public String startJob() {
        if (this.jobType instanceof RepairJob) {
            return "Start Silver " + ((RepairJob) this.jobType).getJobType();
        }
        if (this.jobType instanceof MaintenanceJob) {
            return "Start Silver " + ((MaintenanceJob) this.jobType).getJobType();
        }
        return "Silver Job Failed";
    }
}
```

**它不再依赖于工作类的完全限定名来创建对象**。然而，原始对象和异常的问题仍然没有改变。

如下所示，它也可以处理创建工作然后启动它们：

```java
@Test
public void givenSilverJobCard_whenJobTypeRepairAndMaintenance_thenStartJob() throws InvocationTargetException,
  NoSuchMethodException, InstantiationException, IllegalAccessException {

    SilverJobCard silverJobCard1 = new SilverJobCard();
    silverJobCard1.setJobType(RepairJob.class);
    assertEquals("Start Silver Repair Job", silverJobCard1.startJob());

    SilverJobCard silverJobCard2 = new SilverJobCard();
    silverJobCard2.setJobType(MaintenanceJob.class);
    assertEquals("Start Silver Maintenance Job", silverJobCard2.startJob());
}
```

但是，像_BronzeJobCard_一样，_SilverJobCard_也无法适应新的_PaintJob_：

```java
@Test
public void givenSilverJobCard_whenJobTypePaint_thenFailJob() throws ClassNotFoundException,
  InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {

    SilverJobCard silverJobCard = new SilverJobCard();
    silverJobCard.setJobType(PaintJob.class);
    assertEquals("Silver Job Failed", silverJobCard.startJob());
}
```

此外，_setJobType()_方法没有限制传递任何对象除了_RepairJob_和_MaintenanceJob_。这可能会导致开发阶段出现错误代码。

### 使用类对象和泛型创建对象

之前，我们看到了原始对象如何影响代码质量。在这一部分，我们将解决这个问题。但首先，看看类图：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Gold.svg)

**这次，我们摆脱了原始对象。_GoldJobCard_ 采用类型参数并利用泛型在方法** _setJobType()_ **中。** 让我们检查实现：

```java
public class GoldJobCard```<T>``` {
    private T jobType;

    public void setJobType(Class```<T>``` jobTypeClass) throws
      NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        this.jobType = jobTypeClass.getDeclaredConstructor().newInstance();
    }

    public String startJob() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        return "Start Gold " + this.jobType.getClass().getMethod("getJobType", null)
                .invoke(this.jobType).toString();
    }
}
```

有趣的是，_startJob()_ 现在正在使用反射API在对象上调用方法。最后，我们也摆脱了类型转换的需求。让我们看看它的表现：

```java
@Test
public void givenGoldJobCard_whenJobTypeRepairMaintenanceAndPaint_thenStartJob() throws InvocationTargetException,
  NoSuchMethodException, InstantiationException, IllegalAccessException {

    GoldJobCard``<RepairJob>`` goldJobCard1 = new GoldJobCard<>();
    goldJobCard1.setJobType(RepairJob.class);
    assertEquals("Start Gold Repair Job", goldJobCard1.startJob());

    GoldJobCard``<MaintenanceJob>`` goldJobCard2 = new GoldJobCard<>();
    goldJobCard2.setJobType(MaintenanceJob.class);
    assertEquals("Start Gold Maintenance Job", goldJobCard2.startJob());

    GoldJobCard``<PaintJob>`` goldJobCard3 = new GoldJobCard<>();
    goldJobCard3.setJobType(PaintJob.class);
    assertEquals("Start Gold Paint Job", goldJobCard3.startJob());
}
```

在这里，它也可以处理_PaintJob_。

但是**，我们仍然无法在开发阶段限制传入_startJob()_方法的对象**。因此，对于没有_getJobType()_方法的对象，如_MaintenanceJob_、_RepairJob_和_PaintJob_，它将会失败。

### 使用类型参数扩展创建对象

是时候解决前面提出的问题了。让我们从标准的类图开始：

![img](https://www.baeldung.com/wp-content/uploads/2023/09/Platinum-1.svg)

**我们引入了_Job_接口，所有_Job_对象都必须实现**。此外，_PlatinumJobCard_现在只接受_Job_对象，由_T extends Job_参数指示。

实际上，这种方法非常类似于工厂设计模式。我们可以引入一个_JobCardFactory_来处理Job对象的创建。

继续，我们现在可以看看实现：

```java
public class PlatinumJobCard`<T extends Job>` {
    private T jobType;

    public void setJobType(Class```<T>``` jobTypeClass) throws
      NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        this.jobType = jobTypeClass.getDeclaredConstructor().newInstance();
    }

    public String startJob() {
        return "Start Platinum " + this.jobType.getJobType();
    }
}
```**通过引入_Job_接口，我们摆脱了_startJob()_方法中的反射API和类型转换**。幸运的是，现在_PlatinumJobCard_能够处理未来的_Job_类型，而无需对其进行任何修改。让我们看看它的实际应用：

```java
@Test
public void givenPlatinumJobCard_whenJobTypeRepairMaintenanceAndPaint_thenStartJob() throws InvocationTargetException,
  NoSuchMethodException, InstantiationException, IllegalAccessException {

    PlatinumJobCard``<RepairJob>`` platinumJobCard1 = new PlatinumJobCard<>();
    platinumJobCard1.setJobType(RepairJob.class);
    assertEquals("Start Platinum Repair Job", platinumJobCard1.startJob());

    PlatinumJobCard``<MaintenanceJob>`` platinumJobCard2 = new PlatinumJobCard<>();
    platinumJobCard2.setJobType(MaintenanceJob.class);
    assertEquals("Start Platinum Maintenance Job", platinumJobCard2.startJob());

    PlatinumJobCard``<PaintJob>`` platinumJobCard3 = new PlatinumJobCard<>();
    platinumJobCard3.setJobType(PaintJob.class);
    assertEquals("Start Platinum Paint Job", platinumJobCard3.startJob());
}
```

### 结论

在本文中，我们探讨了使用类名和_Class_对象创建对象的各种方式。我们展示了相关对象如何实现一个基接口。然后，可以进一步使用它来简化对象创建过程。通过这种方法，我们不需要类型转换，同时也确保使用了_Job_接口，在开发期间强制进行类型检查。

像往常一样，本文中使用的代码可以在GitHub上找到。

[Baeldung Logo](https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg)[Baeldung Author's Gravatar](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)

OK