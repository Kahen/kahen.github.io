---
date: 2022-11-01
category:
  - Kotlin
  - Ktor
tag:
  - Testing
  - Ktor
  - API
head:
  - - meta
    - name: keywords
      content: Ktor, Testing, API, Kotlin
---
# Ktor 控制器测试指南

在本教程中，我们将学习一种编写 Ktor 控制器测试的方法。我们将创建一个 Ktor API 进行测试，并且为了专注于测试，我们不会使用任何数据库。

## 2. 应用设置
让我们开始在我们的 Ktor 应用程序的 _build.gradle_ 文件中导入 _ktor-server-core_、_ktor-server-netty_ 和 _ktor-serialization-jackson_ 依赖项：

```kotlin
implementation("io.ktor", "ktor-server-core", "2.3.5")
implementation("io.ktor", "ktor-server-netty", "2.3.5")
implementation("io.ktor", "ktor-serialization-jackson", "2.3.5")
```

然后我们可以添加 _ktor-server-tests_ 和 _kotlin-test-junit_ 测试依赖项：

```kotlin
testImplementation("io.ktor", "ktor-server-tests", "2.3.5")
testImplementation("org.jetbrains.kotlin", "kotlin-test-junit", "1.9.10")
```

### 2.1. 内容协商
我们将使用 Jackson 来处理我们的内容序列化。让我们创建一个 _Application_ 扩展方法：

```kotlin
fun Application.configureContentNegotiation() {
    install(ContentNegotiation) {
        jackson()
    }
}
```

### 2.2. 路由配置
为了路由我们的应用程序请求，让我们创建另一个扩展方法：

```kotlin
fun Application.configureRouting() {
    routing {
        route("cars") { }
    }
}
```

### 2.3. 嵌入式服务器
现在，我们可以使用这些扩展为我们的服务器：

```kotlin
fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting()
        configureContentNegotiation()
    }.start(wait = true)
}
```

## 3. Ktor 控制器
在开始配置我们的路由之前，让我们创建一个 _Car_ 类来表示我们的领域：

```kotlin
data class Car(
    val id: String,
    var brand: String,
    var price: Double
)
```

由于我们不会使用任何数据库，我们将创建一个存储模拟类：

```kotlin
object CarStorageMock {
    val carStorage = ArrayList````<Car>````()
}
```

现在，我们可以使用这些类来 **在“cars”路由内编码路由**：

```kotlin
get {
    call.respond(CarStorageMock.carStorage)
}
get("{id?}") {
    val id = call.parameters["id"]
    val car = CarStorageMock.carStorage.find { it.id == id } ?: return@get call.respondText(
        text = "car.not.found",
        status = HttpStatusCode.NotFound
    )
    call.respond(car)
}
post {
    val car = call.receive````<Car>````()
    CarStorageMock.carStorage.add(car)
    call.respond(status = HttpStatusCode.Created, message = car)
}
put("{id?}") {
    val id = call.parameters["id"]
    val car = CarStorageMock.carStorage.find { it.id == id } ?: return@put call.respondText(
        text = "car.not.found",
        status = HttpStatusCode.NotFound
    )
    val carUpdate = call.receive````<Car>````()
    car.brand = carUpdate.brand
    car.price = carUpdate.price
    call.respond(car)
}
delete("{id?}") {
    val id = call.parameters["id"]
    if (CarStorageMock.carStorage.removeIf { it.id == id }) {
        call.respondText(text = "car.deleted", status = HttpStatusCode.OK)
    } else {
        call.respondText(text = "car.not.found", status = HttpStatusCode.NotFound)
    }
}
```

尽管我们使用模拟存储，但这是一个功能性服务器，它将帮助我们创建真实的测试。

## 4. 测试设置
我们将使用 _testApplication()_ 函数来创建测试。由于我们使用 _embeddedServer_，我们必须手动添加模块。所以，让我们从“获取所有”端点开始：

```kotlin
@Test
fun `when get cars then should return a list with cars`() = testApplication {
    application {
        configureRouting()
        configureContentNegotiation()
    }
}
```

要为这个服务器发出请求，**我们可以创建一个客户端，并使用 _Jackson_ 作为其内容协商者**：

```kotlin
val client = createClient {
    install(ContentNegotiation) {
        jackson()
    }
}
```

由于我们将在所有测试中使用这种模式，让我们创建一个方法来避免重复：

```kotlin
private fun ApplicationTestBuilder.configureServerAndGetClient(): HttpClient {
    application {
        configureRouting()
        configureContentNegotiation()
    }
    val client = createClient {
        install(ContentNegotiation) {
            jackson()
        }
    }
    return client
}
```

在每次测试之前清除我们的模拟非常重要：

```kotlin
@Before
fun before() {
    CarStorageMock.carStorage.clear()
}
```

### 4.1. 获取汽车
要检索汽车列表，让我们在我们的模拟类中添加几辆汽车：

```kotlin
CarStorageMock.carStorage.addAll(
    listOf(
        Car(id = "1", brand = "BMW", price = 10000.0),
        Car(id = "2", brand = "Audi", price = 11000.0)
    )
)
```

现在，我们可以使用客户端创建一个 GET 请求：

```kotlin
val response = client.get("/cars")
```

要将响应体解析为 _List_，我们需要为变量声明一个类型：

```kotlin
val responseBody: List````<Car>```` = response.body()
```

最后，我们可以断言结果。对于 REST API，我们应该始终断言响应状态和响应体：

```kotlin
assertEquals(HttpStatusCode.OK, response.status)
assertEquals(2, responseBody.size)

val bmwCar = responseBody.find { it.id == "1" }
assertEquals("BMW", bmwCar?.brand)
assertEquals(10000.0, bmwCar?.price)

val audiCar = responseBody.find { it.id == "2" }
assertEquals("Audi", audiCar?.brand)
assertEquals(11000.0, audiCar?.price)
```

我们可以使用几乎相同的方法来测试“按 ID 获取”端点：

```kotlin
val response = client.get("/cars/1")
val responseBody: Car = response.body()

assertEquals(HttpStatusCode.OK, response.status)
assertEquals("1", responseBody.id)
assertEquals("BMW", responseBody.brand)
```

对于“按 ID 获取”，我们还必须测试一个在我们的服务器中不存在的 ID 的请求：

```kotlin
val response = client.get("/cars/3")
val responseText = response.bodyAsText()

assertEquals(HttpStatusCode.NotFound, response.status)
assertEquals("car.not.found", responseText)
```

### 4.2. 创建汽车
要测试 POST 请求，我们必须在请求中发送一个正文：

```kotlin
val response = client.post("/cars") {
    contentType(ContentType.Application.Json)
    setBody(Car(id = "2", brand = "Audi", price = 11000.0))
}
```

然后，断言响应：

```kotlin
val responseBody: Car = response.body()

assertEquals(HttpStatusCode.Created, response.status)
assertEquals("2", responseBody.id)
assertEquals("Audi", responseBody.brand)
assertEquals(1, CarStorageMock.carStorage.size)
```

### 4.3. 更新汽车
对于 PUT 方法，我们必须首先创建一辆汽车，然后我们可以更新它：

```kotlin
CarStorageMock.carStorage.add(Car(id = "1", brand = "BMW", price = 10000.0))

val response = client.put("/cars/1") {
    contentType(ContentType.Application.Json)
    setBody(Car(id = "1", brand = "Audi", price = 11000.0))
}
val responseBody: Car = response.body()

assertEquals(HttpStatusCode.OK, response.status)
assertEquals("1", responseBody.id)
assertEquals("Audi", responseBody.brand)
assertEquals("Audi", CarStorageMock.carStorage.find { it.id == "1" }?.brand)
```

对于这个功能，我们还有对无效 ID 的验证：

```kotlin
val response = client.put("/cars/2") {
    contentType(ContentType.Application.Json)
    setBody(Car(id = "1", brand = "Audi", price = 11000.0))
}

val responseText = response.bodyAsText()

assertEquals(HttpStatusCode.NotFound, response.status)
assertEquals("car.not.found", responseText)
```

### 4.4. 删除汽车
DELETE 方法也需要一个现有的汽车才能被删除：

```kotlin
CarStorageMock.carStorage.add(Car(id = "1", brand = "BMW", price = 10000.0))

val response = client.delete("/cars/1")
valresponseText = response.bodyAsText()

assertEquals(HttpStatusCode.OK, response.status)
assertEquals("car.deleted", responseText)
```

然后，我们可以断言响应体和状态码：

```kotlin
val response = client.delete("/cars/2")
val responseText = response.bodyAsText()

assertEquals(HttpStatusCode.NotFound, response.status)
assertEquals("car.not.found", responseText)
```

## 5. 结论
在本文中，我们创建了一个功能性的模拟并为其编写了测试。重要的是要注意，**如果我们实现任何数据库，我们的测试仍然有效**，当然，我们需要更改所有 _CarStorageMock_ 访问。这种方法是测试驱动开发的重要部分。

所有代码都可以在 GitHub 上找到。

[Baeldung Kotlin Logo](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg)[Kotlin Sublogo](https://www.baeldung.com/wp-content/uploads/sites/5/2022/11/kotlin_sublogo.png)[Gravatar Logo](https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g)[Michael Krimgen Avatar](https://www.baeldung.com/wp-content/uploads/custom_avatars/Michael-Krimgen-150x150.png)[Whiteleaf Icon](https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/whiteleaf.svg)

OK