---
date: 2024-06-30
category:
  - Spring
  - Cache
tag:
  - Spring
  - Cacheable
  - AOP
head:
  - - meta
    - name: keywords
      content: Spring, Cache, Cacheable, AOP, Spring Boot, Java
------
# 在同一个Bean中调用@Cacheable方法

Spring提供了一种基于注解的方法来启用Spring管理Bean的缓存。基于AOP技术，通过在方法上添加@Cacheable注解，可以很容易地使方法可缓存。然而，当从同一个类内部调用时，缓存将被忽略。

在本教程中，我们将解释为什么会发生这种情况以及如何解决它。

## 2. 重现问题

首先，我们创建一个启用了缓存的Spring Boot应用程序。在本文中，我们创建了一个带有@Cacheable注解的square方法的MathService：

```java
@Service
@CacheConfig(cacheNames = "square")
public class MathService {
    private final AtomicInteger counter = new AtomicInteger();

    @CacheEvict(allEntries = true)
    public AtomicInteger resetCounter() {
        counter.set(0);
        return counter;
    }

    @Cacheable(key = "#n")
    public double square(double n) {
        counter.incrementAndGet();
        return n * n;
    }
}
```

其次，我们在MathService中创建了一个sumOfSquareOf2方法，它两次调用square方法：

```java
public double sumOfSquareOf2() {
    return this.square(2) + this.square(2);
}
```

第三，我们为sumOfSquareOf2方法创建了一个测试，以检查square方法被调用了多少次：

```java
@SpringBootTest(classes = Application.class)
class MathServiceIntegrationTest {

    @Resource
    private MathService mathService;

    @Test
    void givenCacheableMethod_whenInvokingByInternalCall_thenCacheIsNotTriggered() {
        AtomicInteger counter = mathService.resetCounter();

        assertThat(mathService.sumOfSquareOf2()).isEqualTo(8);
        assertThat(counter.get()).isEqualTo(2);
    }

}
```

由于同一个类的调用不会触发缓存，计数器的数字等于2，这表明方法square带参数2被调用了两次，缓存被忽略了。这不是我们期望的，所以我们需要确定这种行为的原因。

## 3. 分析问题

@Cacheable方法的缓存行为由Spring AOP支持。如果我们使用IDE调试这段代码，我们会找到一些线索。MathServiceIntegrationTest中的mathService变量指向MathService$$EnhancerBySpringCGLIB$$5cdf8ec8的一个实例，而MathService中的this指向MathService的一个实例。

**MathService$$EnhancerBySpringCGLIB$$5cdf8ec8是由Spring生成的代理类。它拦截对MathService的@Cacheable方法的所有请求，并用缓存的值响应。**

另一方面，**MathService本身没有缓存能力，所以同一个类内的内部调用不会得到缓存的值**。

现在我们已经理解了机制，让我们寻找解决这个问题的方法。显然，最简单的方法是将@Cacheable方法移动到另一个Bean。但是，如果我们出于某种原因必须将方法保持在同一个Bean中，我们有三种可能的解决方案：

- 自我注入
- 编译时编织
- 加载时编织

我们在介绍AspectJ的文章中详细介绍了面向切面编程（AOP）和不同的编织方法。编织是在我们将要使用切面的源代码编译成.class文件时插入代码的一种方式。它包括编译时编织、编译后编织和AspectJ中的加载时编织。由于编译后编织用于编织第三方库，这不是我们的情况，我们只关注编译时编织和加载时编织。

## 4. 解决方案1：自我注入

自我注入是绕过Spring AOP限制的常用解决方案。**它允许我们获取对Spring增强Bean的引用，并通过该Bean调用方法。**在我们的案例中，我们可以将mathService Bean自动装配到一个名为self的成员变量中，并使用self而不是使用this引用来调用square方法：

```java
@Service
@CacheConfig(cacheNames = "square")
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MathService {

    @Autowired
    private MathService self;

    // 其他代码

    public double sumOfSquareOf3() {
        return self.square(3) + self.square(3);
    }
}
```

@Scope注解有助于创建并注入self的存根代理，因为循环引用。它稍后将被填充为相同的MathService实例。测试显示square方法只执行了一次：

```java
@Test
void givenCacheableMethod_whenInvokingByExternalCall_thenCacheIsTriggered() {
    AtomicInteger counter = mathService.resetCounter();

    assertThat(mathService.sumOfSquareOf3()).isEqualTo(18);
    assertThat(counter.get()).isEqualTo(1);
}
```

## 5. 解决方案2：编译时编织

编译时编织中的编织过程，顾名思义，发生在编译时。它是**最简单的编织方法**。当我们既有切面的源代码，又有我们使用切面的代码时，AspectJ编译器将从源代码编译并产生一个编织的类文件作为输出。

在Maven项目中，我们可以使用Mojo的AspectJ Maven插件使用AspectJ编译器将AspectJ切面编织到我们的类中。对于@Cacheable注解，切面的源代码由spring-aspects库提供，因此我们需要将其作为Maven依赖项和AspectJ Maven插件的切面库添加。

启用编译时编织有三个步骤。首先，让我们通过在任何配置类上添加@EnableCaching注解以AspectJ模式启用缓存：

```java
@EnableCaching(mode = AdviceMode.ASPECTJ)
```

其次，我们需要添加spring-aspects依赖项：

```xml
``<dependency>``
    `````<groupId>`````org.springframework`````</groupId>`````
    `````<artifactId>`````spring-aspects`````</artifactId>`````
``</dependency>``
```

第三，让我们为编译目标定义aspectj-maven-plugin：

```xml
``<plugin>``
    `````<groupId>`````org.codehaus.mojo`````</groupId>`````
    `````<artifactId>`````aspectj-maven-plugin`````</artifactId>`````
    ``<version>``${aspectj-plugin.version}``</version>``
    ``<configuration>``
        `<source>`${java.version}`</source>`
        `<target>`${java.version}`</target>`
        `<complianceLevel>`${java.version}`</complianceLevel>`
        `<Xlint>`ignore`</Xlint>`
        `<encoding>`UTF-8`</encoding>`
        `<aspectLibraries>`
            `<aspectLibrary>`
                `````<groupId>`````org.springframework`````</groupId>`````
                `````<artifactId>`````spring-aspects`````</artifactId>`````
            `</aspectLibrary>`
        `</aspectLibraries>`
    ``</configuration>``
    `<executions>`
        `<execution>`
            `<goals>`
                `<goal>`compile`</goal>`
            `</goals>`
        `</execution>`
    `</executions>`
``</plugin>``
```

上面显示的AspectJ Maven插件将在我们执行mvn clean compile时编织切面。使用编译时编织，我们不需要更改代码，square方法将只执行一次：

```java
@Test
void givenCacheableMethod_whenInvokingByInternalCall_thenCacheIsTriggered() {
    AtomicInteger counter = mathService.resetCounter();

    assertThat(mathService.sumOfSquareOf2()).isEqualTo(8);
    assertThat(counter.get()).isEqualTo(1);
}
```

## 6. 解决方案3：加载时编织

加载时编织是在类加载器加载类文件并将类定义到JVM时延迟进行的二进制编织。可以使用AspectJ代理介入类加载过程，并在它们在VM中定义之前编织任何类型。

启用加载时编织也有三个步骤。首先，通过在任何配置类上添加两个注解来启用AspectJ模式和加载时编织器：

```java
@EnableCaching(mode = AdviceMode.ASPECTJ)
@EnableLoadTimeWeaving
```

其次，让我们添加spring-aspects依赖项：

```xml
``<dependency>``
    `````<groupId>`````org.springframework`````</groupId>`````
    `````<artifactId>`````spring-aspects`````</artifactId>`````
``</dependency>``
```

最后，我们指定JVM的javaagent选项_-javaagent:path/to/aspectjweaver.jar_或使用Maven插件配置javaagent：

```xml
`<build>`
    `<plugins>`
        ``<plugin>``
            `````<groupId>`````org.apache.maven.plugins`````</groupId>`````
            `````<artifactId>`````maven-surefire-plugin`````</artifactId>`````
            ``<version>``${maven-surefire-plugin.version}``</version>``
            ``<configuration>``
                `<argLine>`
                    --add-opens java.base/java.lang=ALL-UNNAMED
                    --add-opens java.base/java.util=ALL-UNNAMED
                    -javaagent:"${
```settings.localRepository}/org/aspectj/aspectjweaver/${aspectjweaver.version}/aspectjweaver-${aspectjweaver.version}.jar
                    -javaagent:"${
settings.localRepository}/org/springframework/spring-instrument/${spring.version}/spring-instrument-${spring.version}.jar
                `</argLine>`
                `<useSystemClassLoader>`true`</useSystemClassLoader>`
                `<forkMode>`always`</forkMode>`
                `<includes>`
                    `<include>`com.baeldung.selfinvocation.LoadTimeWeavingIntegrationTest`</include>`
                `</includes>`
            ``</configuration>``
        ``</plugin>``
    `</plugins>`
`</build>`
```

加载时编织的测试_givenCacheableMethod_whenInvokingByInternalCall_thenCacheIsTriggered_也将通过。

## 7. 结论

在本文中，我们解释了为什么当从同一个Bean调用@Cacheable方法时缓存不生效。然后，我们分享了自我注入和两种编织解决方案来解决这个问题。像往常一样，本文的源代码可在GitHub上找到。

OK