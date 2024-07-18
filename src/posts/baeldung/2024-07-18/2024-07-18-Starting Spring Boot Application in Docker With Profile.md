---
date: 2024-02-29
category:
  - Spring Boot
  - Docker
tag:
  - Spring Boot
  - Docker
  - Profile
head:
  - - meta
    - name: keywords
      content: Spring Boot, Docker, Profile, Java
---
# 在Docker中使用Profile启动Spring Boot应用程序

我们众所周知Docker的流行程度，以及Java开发者将其Spring Boot应用程序容器化的趋势。然而，一些开发者可能会对如何在Docker化的Spring Boot应用程序中设置Profile有疑问。

在本教程中，我们将解释如何在Docker容器中启动带有Profile的Spring Boot应用程序。

## 2. 基础Dockerfile

通常，要容器化Spring Boot应用程序，我们只需提供一个Dockerfile。

让我们看看我们Spring Boot应用程序的最小Dockerfile：

```
FROM openjdk:17-jdk-alpine
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

当然，我们可以通过docker build构建我们的Docker镜像：

```
docker build --tag=docker-with-spring-profile:latest .
```

因此，我们可以从镜像docker-with-spring-profile运行我们的应用程序：

```
docker run docker-with-spring-profile:latest
```

正如我们所注意到的，我们的Spring Boot应用程序以“default”Profile启动：

```
2024-02-29 22:34:25.268 INFO 1 --- [main] c.b.docker.spring.DemoApplication: Starting DemoApplication using Java 17-ea with PID 1 (/app.jar started by root in /)
2024-02-29 22:34:25.270 INFO 1 --- [main] c.b.docker.spring.DemoApplication: No active profile set, falling back to 1 default profile: "default"
//...
```

## 3. 在Dockerfile中设置Profile

为我们的docker化应用程序设置Profile的一种方法是使用Spring Boot的命令行参数“-Dspring.profiles.active”。

所以，要将Profile设置为“test”，我们在Dockerfile的ENTRYPOINT行中添加一个新参数“-Dspring.profiles.active=test”：

```
//...
ENTRYPOINT ["java", "-Dspring.profiles.active=test", "-jar", "/app.jar"]
```

让我们再次使用相同的命令运行我们的容器，看看Profile是否改变：

```
docker run docker-with-spring-profile:latest
```

相应地，我们可以看到Profile“test”成功地被我们的应用程序获取：

```
2024-02-29 22:39:33.210 INFO 1 --- [main] c.b.docker.spring.DemoApplication: Starting DemoApplication using Java 17-ea with PID 1 (/app.jar started by root in /)
2024-02-29 22:39:33.212 INFO 1 --- [main] c.b.docker.spring.DemoApplication: The following 1 profile is active: "test"
//...
```

## 4. 使用环境变量设置Profile

有时，在我们的Dockerfile中使用硬编码的Profile可能不太方便。如果我们需要多个Profile，当我们运行容器时选择其中一个可能会很麻烦。

然而，有一个更好的替代方案。**在启动时，Spring Boot会查找一个特殊的环境变量_SPRING_PROFILES_ACTIVE_。**

所以，我们实际上可以使用docker run命令在启动时设置Spring Profile：

```
docker run -e "SPRING_PROFILES_ACTIVE=test" docker-with-spring-profile:latest
```

此外，根据我们的用例，我们可以通过逗号分隔的字符串一次设置多个Profile：

```
docker run -e "SPRING_PROFILES_ACTIVE=test1,test2,test3" docker-with-spring-profile:latest
```

然而，我们应该注意到Spring Boot在属性之间有一个特定的顺序。**命令行参数优先于环境变量。** 因此，为了使_SPRING_PROFILES_ACTIVE_工作，我们需要修改我们的Dockerfile。

因此，我们从Dockerfile的ENTRYPOINT行中移除“-Dspring.profiles.active=test”参数：

```
//...
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

最后，我们可以看到我们通过SPRING_PROFILES_ACTIVE设置的Profile被考虑在内：

```
2024-02-29 22:50:28.924 INFO 1 --- [main] c.b.docker.spring.DemoApplication: Starting DemoApplication using Java 17-ea with PID 1 (/app.jar started by root in /)
2024-02-29T22:50:28.926562249Z 2022-04-22 22:50:28.926 INFO 1 --- [main] c.b.docker.spring.DemoApplication: The following 3 profiles are active: "test1", "test2", "test3"
//..
```

## 5. 在Docker Compose文件中设置Profile

作为一种替代方法，**环境变量也可以在docker-compose文件中提供。**

此外，为了更好地利用我们的docker run操作，我们可以为每个Profile创建一个docker-compose文件。

让我们为“test”Profile创建一个docker-compose-test.yml文件：

```
version: "3.5"
services:
  docker-with-spring-profile:
    image: docker-with-spring-profile:latest
    environment:
      - "SPRING_PROFILES_ACTIVE=test"
```

类似地，我们为“prod”Profile创建另一个文件docker-compose-prod.yml，第二个文件中唯一的区别是环境变量中的Profile“prod”：

```
//...
environment:
  - "SPRING_PROFILES_ACTIVE=prod"
```

因此，我们可以通过两个不同的docker-compose文件运行我们的容器：

```
# 对于'test'Profile
docker-compose -f docker-compose-test.yml up

# 对于'prod'Profile
docker-compose -f docker-compose-prod.yml up
```

## 6. 结论

在本教程中，我们描述了在Docker化的Spring Boot应用程序中设置Profile的不同方法，并展示了一些示例，包括使用Docker和Docker Compose。

像往常一样，本教程中展示的所有代码示例都可以在GitHub上找到。