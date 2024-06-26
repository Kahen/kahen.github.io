---
date: 2024-06-26
category:
  - Java
  - Timefold Solver
tag:
  - 员工调度
  - 优化
head:
  - - meta
    - name: keywords
      content: Timefold Solver, Java, 员工调度, 优化
---
# Timefold Solver 员工调度问题求解指南

## 1. 概览

### 1.1. Timefold Solver 是什么？

Timefold Solver 是一个纯 Java 计划求解器 AI。Timefold 优化计划问题，例如车辆路径问题（VRP）、维护调度、作业车间调度和学校时间表编制。它生成的物流计划可以大幅降低成本，提高服务质量，并减少环境足迹——通常高达 25%——适用于复杂的现实世界调度操作。

Timefold 是 OptaPlanner 的延续。它是一种数学优化的形式（在更广泛的运筹学和人工智能领域中），支持以代码形式编写的约束。

### 1.2. 我们将构建什么

在本教程中，让我们使用 Timefold Solver 来**优化简化版的员工轮班调度问题**。

我们将自动分配轮班给员工，以便：
- 没有员工在同一天有两次轮班
- 每个轮班都分配给具有适当技能的员工

具体来说，我们将分配这五个轮班：

```
  2030-04-01 06:00 - 14:00 （服务员）
  2030-04-01 09:00 - 17:00 （调酒师）
  2030-04-01 14:00 - 22:00 （调酒师）
  2030-04-02 06:00 - 14:00 （服务员）
  2030-04-02 14:00 - 22:00 （调酒师）
```

分配给这三位员工：

```
  Ann （调酒师）
  Beth （服务员，调酒师）
  Carl （服务员）
```

这看起来比实际要难。在纸上尝试一下。

## 2. 依赖项

Timefold Solver 工件在 Maven Central 上发布，采用 Apache 许可证。让我们使用它们：

### 2.1. 纯 Java

我们在 Maven 或 Gradle 中添加对 _timefold-solver-core_ 的依赖，以及对 _timefold-solver-test_ 的测试依赖：

```
`<dependencyManagement>`
    ``<dependencies>``
        ```<dependency>```
            ```<groupId>```ai.timefold.solver```</groupId>```
            ```<artifactId>```timefold-solver-bom```</artifactId>```
            `<version>`...`</version>`
            `<type>`pom`</type>`
            ``<scope>``import``</scope>``
        ```</dependency>```
    ``</dependencies>``
`</dependencyManagement>`
``<dependencies>``
    ```<dependency>```
        ```<groupId>```ai.timefold.solver```</groupId>```
        ```<artifactId>```timefold-solver-core```</artifactId>```
    ```</dependency>```
    ```<dependency>```
        ```<groupId>```ai.timefold.solver```</groupId>```
        ```<artifactId>```timefold-solver-test```</artifactId>```
        ``<scope>``test``</scope>``
    ```</dependency>```
``</dependencies>``
```

### 2.2. Spring Boot

在 Spring Boot 中，我们使用 _timefold-solver-spring-boot-starter_ 依赖项。它自动处理大部分求解器配置，正如我们稍后将看到的，并且允许在 _application.properties_ 中配置求解器时间和其他属性。

1. 访问 start.spring.io
2. 点击 _Add dependencies_ 添加 _Timefold Solver_ 依赖项
3. 生成项目并在您喜欢的 IDE 中打开

### 2.3. Quarkus

在 Quarkus 中，我们同样在 code.quarkus.io 中使用 _timefold-solver-quarkus_ 依赖项进行自动求解器配置和 _application.properties_ 支持。

## 3. 领域类

领域类代表输入数据和输出数据。我们创建 _Employee_ 和 _Shift_ 类，以及包含特定数据集员工和轮班列表的 _ShiftSchedule_。

### 3.1. _Employee_

员工是我们可以分配轮班的人。每个员工都有一个名字和一个或多个技能。

_Employee_ 类不需要任何 Timefold 注解，因为在求解过程中它不会改变：

```
public class Employee {
    private String name;
    private Set``<String>`` skills;

    public Employee(String name, Set``<String>`` skills) {
        this.name = name;
        this.skills = skills;
    }

    @Override
    public String toString() {
        return name;
    }

    // Getters and setters
}
```

### 3.2. _Shift_

轮班是为一个员工在特定日期从开始时间到结束时间的确切工作分配。同一时间可以有两次轮班。每个轮班都需要一个技能。

_Shift_ 对象在求解过程中会改变：每个轮班都被分配给一个员工。Timefold 需要知道这一点。只有在求解过程中 _employee_ 字段会改变。因此，我们使用 _@PlanningEntity_ 注解类，并使用 _@PlanningVariable_ 注解 _employee_ 字段，以便 Timefold 知道它应该为每个轮班填写员工：

```
@PlanningEntity
public class Shift {
    private LocalDateTime start;
    private LocalDateTime end;
    private String requiredSkill;

    @PlanningVariable
    private Employee employee;

    // A no-arg constructor is required for @PlanningEntity annotated classes
    public Shift() {
    }

    public Shift(LocalDateTime start, LocalDateTime end, String requiredSkill) {
        this(start, end, requiredSkill, null);
    }

    public Shift(LocalDateTime start, LocalDateTime end, String requiredSkill, Employee employee) {
        this.start = start;
        this.end = end;
        this.requiredSkill = requiredSkill;
        this.employee = employee;
    }

    @Override
    public String toString() {
        return start + " - " + end;
    }

    // Getters and setters
}
```

### 3.3. _ShiftSchedule_

时间表表示员工和轮班的单个数据集。它既是 Timefold 的输入也是输出：

- 我们使用 _@PlanningSolution_ 注解 _ShiftSchedule_ 类，以便 Timefold 知道它代表输入和输出。
- 我们使用 _@ValueRangeProvider_ 注解 _employees_ 字段，以告诉 Timefold 它包含可以从中选择实例分配给 _Shift.employee_ 的员工列表。
- 我们使用 _@PlanningEntityCollectionProperty_ 注解 _shifts_ 字段，以便 Timefold 查找所有要分配给员工的 _Shift_ 实例。
- 我们包括一个带有 _@PlanningScore_ 注解的 _score_ 字段。Timefold 将为我们填充这个字段。让我们使用 _HardSoftScore_ ，这样我们以后就可以区分硬约束和软约束。

现在，让我们看看我们的类：

```
@PlanningSolution
public class ShiftSchedule {
    @ValueRangeProvider
    private List``<Employee>`` employees;
    @PlanningEntityCollectionProperty
    private List``<Shift>`` shifts;

    @PlanningScore
    private HardSoftScore score;

    // A no-arg constructor is required for @PlanningSolution annotated classes
    public ShiftSchedule() {
    }

    public ShiftSchedule(List``<Employee>`` employees, List``<Shift>`` shifts) {
        this.employees = employees;
        this.shifts = shifts;
    }

    // Getters and setters
}
```

## 4. 约束

没有约束，Timefold 会将所有轮班分配给第一个员工。这不是一个可行的时间表。

为了教会它如何区分好和坏的时间表，让我们添加**两个硬约束**：

- _atMostOneShiftPerDay()_ 约束检查是否有两个在同一天分配给同一员工的轮班。如果是这样，它会通过扣除 1 个硬点来惩罚分数。
- _requiredSkill()_ 约束检查轮班是否分配给具有轮班所需技能的员工。如果不是，它会通过扣除 1 个硬点来惩罚分数。

**一个硬约束优先于所有软约束**。通常，硬约束是不可能打破的，无论是在物理上还是法律上。另一方面，软约束可以被打破，但我们希望最小化这种情况。这些通常代表财务成本、服务质量或员工幸福感。硬约束和软约束使用相同的 API 实现。

### 4.1. _ConstraintProvider_

首先，我们为我们的约束实现创建一个 _ConstraintProvider_：

```
public class ShiftScheduleConstraintProvider implements ConstraintProvider {
    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
          atMostOneShiftPerDay(constraintFactory),
          requiredSkill(constraintFactory)
        };
    }

    // Constraint implementations
}
```

### 4.2. 单元测试 _ConstraintProvider_

如果它没有被测试，它就不会工作——特别是对于约束。让我们创建一个测试类来测试我们的 _ConstraintProvider_ 的每个约束。

测试范围的 _timefold-solver-test_ 依赖项包含 _ConstraintVerifier_，这是一个帮助测试每个约束的助手。这提高了可维护性——我们可以重构一个约束而不会破坏其他约束的测试：

```
public class ShiftScheduleConstraintProviderTest {
    private static final LocalDate MONDAY = LocalDate.of(2030, 4, 1);
    private static抱歉，由于文本内容较长，我将分两部分完成翻译。以下是第二部分的翻译：

```java
    private static final LocalDate TUESDAY = LocalDate.of(2030, 4, 2);

    ConstraintVerifier`<ShiftScheduleConstraintProvider, ShiftSchedule>` constraintVerifier
      = ConstraintVerifier.build(new ShiftScheduleConstraintProvider(), ShiftSchedule.class, Shift.class);

    // 每个约束的测试
}
```

我们已经准备了两个日期以在下面的测试中重复使用。让我们接下来添加实际的约束。

### 4.3. 硬约束：每天最多一个轮班

遵循 TDD（测试驱动开发），让我们首先在我们的测试类中为我们的新约束编写测试：

```java
@Test
void whenTwoShiftsOnOneDay_thenPenalize() {
    Employee ann = new Employee("Ann", null);
    constraintVerifier.verifyThat(ShiftScheduleConstraintProvider::atMostOneShiftPerDay)
      .given(
        new Shift(MONDAY.atTime(6, 0), MONDAY.atTime(14, 0), null, ann),
        new Shift(MONDAY.atTime(14, 0), MONDAY.atTime(22, 0), null, ann)
      )
      // 因为 {shiftA, shiftB} 和 {shiftB, shiftA} 都匹配，所以处罚 2 分。
      // 为了避免这种情况，在约束实现中使用 forEachUniquePair() 而不是 forEach().join()。
      .penalizesBy(2);
}

@Test
void whenTwoShiftsOnDifferentDays_thenDoNotPenalize() {
    Employee ann = new Employee("Ann", null);
    constraintVerifier.verifyThat(ShiftScheduleConstraintProvider::atMostOneShiftPerDay)
      .given(
        new Shift(MONDAY.atTime(6, 0), MONDAY.atTime(14, 0), null, ann),
        new Shift(TUESDAY.atTime(14, 0), TUESDAY.atTime(22, 0), null, ann)
      )
      .penalizesBy(0);
}
```

然后，我们在 _ConstraintProvider_ 中实现它：

```java
public Constraint atMostOneShiftPerDay(ConstraintFactory constraintFactory) {
    return constraintFactory.forEach(Shift.class)
      .join(Shift.class,
        equal(shift -> shift.getStart().toLocalDate()),
        equal(Shift::getEmployee))
      .filter((shift1, shift2) -> shift1 != shift2)
      .penalize(HardSoftScore.ONE_HARD)
      .asConstraint("每天最多一个轮班");
}
```

为了实现约束，我们使用 ConstraintStreams API：一个类似于 Stream/SQL 的 API，它在底层提供增量分数计算（增量）和索引哈希表查找。这种方法可以扩展到包含数十万个轮班的单个时间表的数据集。

让我们运行测试并验证它们是否通过。

### 4.4. 硬约束：所需技能

让我们在我们的测试类中编写测试：

```java
@Test
void whenEmployeeLacksRequiredSkill_thenPenalize() {
    Employee ann = new Employee("Ann", Set.of("Waiter"));
    constraintVerifier.verifyThat(ShiftScheduleConstraintProvider::requiredSkill)
      .given(
        new Shift(MONDAY.atTime(6, 0), MONDAY.atTime(14, 0), "Cook", ann)
      )
      .penalizesBy(1);
}

@Test
void whenEmployeeHasRequiredSkill_thenDoNotPenalize() {
    Employee ann = new Employee("Ann", Set.of("Waiter"));
    constraintVerifier.verifyThat(ShiftScheduleConstraintProvider::requiredSkill)
      .given(
        new Shift(MONDAY.atTime(6, 0), MONDAY.atTime(14, 0), "Waiter", ann)
      )
      .penalizesBy(0);
}
```

然后，让我们在我们的 _ConstraintProvider_ 中实现新约束：

```java
public Constraint requiredSkill(ConstraintFactory constraintFactory) {
    return constraintFactory.forEach(Shift.class)
      .filter(shift -> !shift.getEmployee().getSkills()
        .contains(shift.getRequiredSkill()))
      .penalize(HardSoftScore.ONE_HARD)
      .asConstraint("所需技能");
}
```

让我们再次运行测试。它们仍然通过。

**要将此变为软约束，我们将 _penalize(HardSoftScore.ONE_HARD)_ 更改为 _penalize(HardSoftScore.ONE_SOFT)_。** 要通过输入数据集进行动态决策，我们可以使用 _penalizeConfigurable()_ 和 _@ConstraintWeight_。

## 5. 应用

我们准备将我们的应用程序整合在一起。

### 5.1. 解决它

要解决一个时间表，我们从我们的 _@PlanningSolution_、_@PlanningEntity_ 和 _ConstraintProvider_ 类中**创建一个 _SolverFactory_**。一个 _SolverFactory_ 是一个长期存在的对象。通常，每个应用程序只有一个实例。

我们还需要配置我们希望求解器运行多长时间。对于大型数据集，有数千个轮班和更多的约束，不可能在合理的时间内找到最优解（由于 NP-hard 问题的指数性质）。相反，我们希望在可用的时间内找到最佳可能的解决方案。现在让我们限制为两秒钟：

```java
SolverFactory```<ShiftSchedule>``` solverFactory = SolverFactory.create(new SolverConfig()
  .withSolutionClass(ShiftSchedule.class)
  .withEntityClasses(Shift.class)
  .withConstraintProviderClass(ShiftScheduleConstraintProvider.class)
  // 求解器在这个小数据集上只运行 2 秒钟。
  // 建议在大型数据集上至少运行 5 分钟 ("5m")。
  .withTerminationSpentLimit(Duration.ofSeconds(2)));
```

我们使用 _SolverFactory_ 来创建一个 _Solver_ 实例，每个数据集一个。然后，我们调用 _Solver.solve()_ 来解决一个数据集：

```java
Solver```<ShiftSchedule>``` solver = solverFactory.buildSolver();
ShiftSchedule problem = loadProblem();
ShiftSchedule solution = solver.solve(problem);
printSolution(solution);
```

在 Spring Boot 中，_SolverFactory_ 是自动构建的，并注入到一个 _@Autowired_ 字段中：

```java
@Autowired
SolverFactory```<ShiftSchedule>``` solverFactory;
```

我们在 _application.properties_ 中配置求解器时间：

```properties
timefold.solver.termination.spent-limit=5s
```

在 Quarkus 中，类似地，_SolverFactory_ 也是自动构建的，并注入到一个 _@Inject_ 字段中。求解器时间也在 _application.properties_ 中配置。

要异步求解，为了避免在调用 _Solver.solve()_ 时占用当前线程，我们将注入并使用一个 _SolverManager_。

### 5.2. 测试数据

让我们生成一个包含五个轮班和三名员工的小数据集作为输入问题：

```java
private ShiftSchedule loadProblem() {
    LocalDate monday = LocalDate.of(2030, 4, 1);
    LocalDate tuesday = LocalDate.of(2030, 4, 2);
    return new ShiftSchedule(List.of(
      new Employee("Ann", Set.of("Bartender")),
      new Employee("Beth", Set.of("Waiter", "Bartender")),
      new Employee("Carl", Set.of("Waiter"))
    ), List.of(
      new Shift(monday.atTime(6, 0), monday.atTime(14, 0), "Waiter"),
      new Shift(monday.atTime(9, 0), monday.atTime(17, 0), "Bartender"),
      new Shift(monday.atTime(14, 0), monday.atTime(22, 0), "Bartender"),
      new Shift(tuesday.atTime(6, 0), tuesday.atTime(14, 0), "Waiter"),
      new Shift(tuesday.atTime(14, 0), tuesday.atTime(22, 0), "Bartender")
    ));
}
```

### 5.3. 结果

在我们通过求解器运行测试数据后，我们将输出解决方案打印到 _System.out_：

```java
private void printSolution(ShiftSchedule solution) {
    logger.info("轮班分配");
    for (Shift shift : solution.getShifts()) {
        logger.info("  " + shift.getStart().toLocalDate()
          + " " + shift.getStart().toLocalTime()
          + " - " + shift.getEnd().toLocalTime()
          + ": " + shift.getEmployee().getName());
    }
}
```

这是我们数据集的结果：

```
轮班分配
  2030-04-01 06:00 - 14:00: Carl
  2030-04-01 09:00 - 17:00: Ann
  2030-04-01 14:00 - 22:00: Beth
  2030-04-02 06:00 - 14:00: Beth
  2030-04-02 14:00 - 22:00: Ann
```

Ann 没有被分配到第一个