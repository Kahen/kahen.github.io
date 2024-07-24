import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-B6f8H54y.js";const a={},l=n('<hr><h1 id="使用ktor和thymeleaf创建web应用程序-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#使用ktor和thymeleaf创建web应用程序-baeldung关于kotlin"><span>使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p><strong>Thymeleaf是一个服务器端Java模板引擎</strong>，它既可以在Web环境也可以在非Web环境中工作。<strong>Ktor是一个用Kotlin编写的用于构建异步服务器端和客户端应用程序的框架</strong>。</p><p>在本教程中，我们将使用Thymeleaf和Bootstrap创建一个带有学生名单和成绩报告卡的Web应用程序。</p><h2 id="_2-设置依赖项" tabindex="-1"><a class="header-anchor" href="#_2-设置依赖项"><span>2. 设置依赖项</span></a></h2><p>对于这个应用程序，我们需要使用Gradle添加**<em>Ktor Server Core</em>, <em>Netty</em>, <em>Thymeleaf</em>, 和 StatusPages 依赖项**：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>implementation(&quot;io.ktor&quot;, &quot;ktor-server-core&quot;, &quot;2.3.5&quot;)\nimplementation(&quot;io.ktor&quot;, &quot;ktor-server-netty&quot;, &quot;2.3.5&quot;)\nimplementation(&quot;io.ktor&quot;, &quot;ktor-server-thymeleaf-jvm&quot;, &quot;2.3.5&quot;)\nimplementation(&quot;io.ktor&quot;, &quot;ktor-server-status-pages&quot;, &quot;2.3.5&quot;)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-ktor和thymeleaf设置" tabindex="-1"><a class="header-anchor" href="#_3-ktor和thymeleaf设置"><span>3. Ktor和Thymeleaf设置</span></a></h2><p>现在我们可以创建我们的 <em>main()</em> 函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun main() {\n    embeddedServer(Netty, port = 8080, host = &quot;0.0.0.0&quot;) {\n    }.start(wait = true)\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在本地主机使用端口8080创建一个Netty服务器。</p><h3 id="_3-1-模板解析器" tabindex="-1"><a class="header-anchor" href="#_3-1-模板解析器"><span>3.1. 模板解析器</span></a></h3><p>然后，让我们为我们的 <em>Application</em> 创建一个扩展函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun Application.configureTemplating() {\n    install(Thymeleaf) {\n        setTemplateResolver(ClassLoaderTemplateResolver().apply {\n            prefix = &quot;templates/&quot;\n            suffix = &quot;.html&quot;\n            characterEncoding = &quot;utf-8&quot;\n        })\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这配置了Thymeleaf作为模板解析器</strong>，并为我们的HTML文件设置了一个名为“templates”的资源文件夹。</p><h3 id="_3-2-路由" tabindex="-1"><a class="header-anchor" href="#_3-2-路由"><span>3.2. 路由</span></a></h3><p>我们应用程序的第一个路由是 <em>index.html</em> 页面，我们可以在“/”路由中映射它。这也是 <em>Application</em> 的一个扩展函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun Application.configureRouting() {\n    routing {\n        get(&quot;/&quot;) {\n            call.respond(ThymeleafContent(&quot;index&quot;, mapOf(&quot;message&quot; to &quot;Hello World&quot;)))\n        }\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还使用了一个名为“message”的键映射了字符串“Hello World”。这是我们的Ktor/Kotlin代码与UI交互的一种方式。</p><p>让我们创建一个名为 <em>index.html</em> 的基本HTML模板，并<strong>使用_th:text_ Thymeleaf标签来显示消息</strong>。这个文件应该在我们之前配置的 <em>resources/templates</em> 文件夹中。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;!DOCTYPE html&gt;`\n`&lt;html xmlns:th=&quot;http://www.thymeleaf.org&quot;&gt;`\n    ``&lt;head&gt;``\n        `&lt;meta charset=&quot;UTF-8&quot;&gt;`\n    ``&lt;/head&gt;``\n    ````&lt;body&gt;````\n        ``&lt;p th:text=&quot;${message}&quot; /&gt;``\n    ```&lt;/body&gt;```\n`&lt;/html&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以在 <em>embbedServer</em> 配置中添加我们创建的两个函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun main() {\n    embeddedServer(Netty, port = 8080, host = &quot;0.0.0.0&quot;) {\n        configureTemplating()\n        configureRouting()\n    }.start(wait = true)\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行应用程序并在浏览器中访问 http://localhost:8080/，我们应该能够看到“Hello World”消息。</p><h2 id="_4-显示学生名单" tabindex="-1"><a class="header-anchor" href="#_4-显示学生名单"><span>4. 显示学生名单</span></a></h2><p>我们将从显示学生名单开始我们的成绩单应用程序。让我们创建一个 <em>Student</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>data class Student(\n  val id: String,\n  val firstName: String,\n  val lastName: String\n) {\n    val fullName: String\n        get() = &quot;$firstName $lastName&quot;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>fullName</em> 属性也可以通过Thymeleaf模板访问。由于我们在这个应用程序中不会使用任何数据库，我们使用一个Kotlin对象来保存我们的数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>object DataHolder {\n    fun getStudentList() = listOf(\n        Student(\n          id = &quot;1&quot;,\n          firstName = &quot;Michael&quot;,\n          lastName = &quot;Smith&quot;\n        ),\n        Student(\n          id = &quot;2&quot;,\n          firstName = &quot;Mary&quot;,\n          lastName = &quot;Johnson&quot;\n        ),\n        Student(\n          id = &quot;3&quot;,\n          firstName = &quot;John&quot;,\n          lastName = &quot;Doe&quot;\n        )\n    )\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在路由可以调用 <em>DataHolder</em> 对象，并将一个名为 <em>studentList</em> 的键映射到它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>get(&quot;/&quot;) {\n    call.respond(ThymeleafContent(&quot;index&quot;, mapOf(&quot;studentList&quot; to DataHolder.getStudentList())))\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以使用 <em>th:each</em> 标签在 <em>ul</em> 签中迭代学生列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>```&lt;h2&gt;```Students```&lt;/h2&gt;```\n`&lt;ul th:each=&quot;student : ${studentList}&quot;&gt;`\n    `&lt;a th:href=&quot;@{&#39;report-card/&#39;+${student.id}}&quot; th:text=&quot;${student.fullName}&quot; /&gt;`\n``&lt;/ul&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用 <em>th:href</em> 标签使用学生的id属性重定向到一个新页面。报告卡页面将在下一节中创建。</p><p>然后，如果我们运行应用程序，我们可以像这样看到我们的列表显示：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-student-list-300x259.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_5-学生成绩的提交表单" tabindex="-1"><a class="header-anchor" href="#_5-学生成绩的提交表单"><span>5. 学生成绩的提交表单</span></a></h2><p>我们将使用的表单是用于提交学生成绩的成绩单。所以，首先，让我们创建 <em>GradeValue</em> 枚举：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>enum class GradeValue(val displayValue: String) {\n    A(&quot;A&quot;),\n    A_PLUS(&quot;A+&quot;),\n    A_MINUS(&quot;A-&quot;),\n    B(&quot;B&quot;),\n    B_PLUS(&quot;B+&quot;),\n    B_MINUS(&quot;B-&quot;),\n    C(&quot;C&quot;),\n    C_PLUS(&quot;C+&quot;),\n    C_MINUS(&quot;C-&quot;),\n    D(&quot;D&quot;),\n    D_PLUS(&quot;D+&quot;),\n    D_MINUS(&quot;D-&quot;),\n    F(&quot;F&quot;),\n    EMPTY(&quot;&quot;)\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，让我们使用它来创建一个 Grade 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>data class Grade (\n  val id: String,\n  val subject: String,\n  var gradeValue: GradeValue? = GradeValue.EMPTY\n)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <em>var</em> 而不是 <em>val</em> 对于 <em>value</em> 属性很重要，因为我们将改变它的值。</p><p>让我们在 <em>Student</em> 类中添加一个 <em>gradeList</em> 属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val gradeList: List`&lt;Grade&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <em>DataHolder</em> 对象中，我们可以创建一个函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private fun createGradeList() = listOf(\n  Grade(id = &quot;1&quot;, subject = &quot;Reading&quot;),\n  Grade(id = &quot;2&quot;, subject = &quot;Writing&quot;),\n  Grade(id = &quot;3&quot;, subject = &quot;Science&quot;),\n  Grade(id = &quot;4&quot;, subject = &quot;Mathematics&quot;),\n)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并在我们的列表中的每个学生上使用它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Student(\n  id = &quot;1&quot;,\n  firstName = &quot;Michael&quot;,\n  lastName = &quot;Smith&quot;,\n  gradeList = createGradeList()\n)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，在 <em>DataHolder</em> 中，让我们为根据其id从列表中获取学生创建一个新函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun findStudentById(id: String?) = getStudentList().first { student -&gt; student.id == id }\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-1-成绩单路由" tabindex="-1"><a class="header-anchor" href="#_5-1-成绩单路由"><span>5.1. 成绩单路由</span></a></h3><p>让我们为新页面添加一个新路由：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>get(&quot;/report-card/{id}&quot;) {\n    call.respond(\n      ThymeleafContent(&quot;report-card&quot;,\n        mapOf(\n          &quot;student&quot; to DataHolder.findStudentById(call.parameters[&quot;id&quot;]),\n          &quot;gradeOptionList&quot; to GradeValue.entries\n        )\n      )\n    )\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个路由中，我们使用新函数 <em>findStudentById()</em> 并<strong>从路由本身在 <em>call</em> 对象中获取id参数</strong>。</p><h3 id="_5-2-成绩单页面" tabindex="-1"><a class="header-anchor" href="#_5-2-成绩单页面"><span>5.2. 成绩单页面</span></a></h3><p>让我们在模板文件夹中创建一个名为 report-card.html 的新HTML页面，并在 <em><code>&lt;body&gt;</code></em> 标签内创建一个表单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;form action=&quot;#&quot; th:action=&quot;@{&#39;~/report-card/&#39;+${student.id}}&quot; method=&quot;post&quot;&gt;``\n    ``&lt;h3&gt;``Name: ``&lt;span th:text=&quot;${student.fullName}&quot; /&gt;````&lt;/h3&gt;``\n    `&lt;table&gt;`\n        ``&lt;thead&gt;``\n            ``&lt;tr&gt;``\n                ````&lt;th&gt;````Subject````&lt;/th&gt;````\n                ````&lt;th&gt;````Grade````&lt;/th&gt;````\n            ````&lt;/tr&gt;````\n        ``&lt;/thead&gt;``\n        ``&lt;tbody&gt;``\n            ``&lt;tr th:each=&quot;grade : ${student.gradeList}&quot;&gt;``\n                ``&lt;td th:text=&quot;${grade.subject}&quot;&gt;``````&lt;/td&gt;````\n                ``&lt;td&gt;``\n                    ``&lt;select th:name=&quot;${grade.id}&quot;&gt;``\n                        ``&lt;option th:each=&quot;gradeOption : ${gradeOptionList}&quot;\n                                th:value=&quot;${gradeOption}&quot;\n                                th:text=&quot;${gradeOption.displayValue}&quot;\n                                th:selected=&quot;${grade.gradeValue == gradeOption}&quot; /&gt;``\n                    ``&lt;/select&gt;``\n                ````&lt;/td&gt;````\n            ````&lt;/tr&gt;````\n        ```\n        ``&lt;/tbody&gt;``\n    ``&lt;/table&gt;``\n    `&lt;button type=&quot;submit&quot;&gt;`Submit``&lt;/button&gt;``\n``&lt;/form&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在表单中，我们使用 <em>th:action</em> 处理提交。动作URL中的“~”信号表示我们正在使用服务器相对URL。</p><p>在表中使用 <em>th:each</em> 与我们之前使用的列表非常相似，我们可以使用 th:text 显示文本。对于输入，我们使用带有 GradeValue 枚举的选择框选项标签。</p><p>要从表中获取值，我们需要使用 <em>th:name</em> 标签。</p><p>这是我们的表单的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-report-card-300x281.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_5-3-处理表单提交" tabindex="-1"><a class="header-anchor" href="#_5-3-处理表单提交"><span>5.3. 处理表单提交</span></a></h3><p>让我们为 <em>DataHolder</em> 对象中的一个学生更新成绩创建一个函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun updateGrades(studentId: String?, parameters: Parameters) {\n    findStudentById(studentId)\n      .gradeList.forEach { grade -&gt;\n        grade.apply {\n            gradeValue = parameters[grade.id]?.let { GradeValue.valueOf(it) }\n        }\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以在一个新路由中使用它来处理表单 POST：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>post(&quot;/report-card/{id}&quot;) {\n    val parameters = call.receiveParameters()\n    DataHolder.updateGrades(call.parameters[&quot;id&quot;], parameters)\n    call.respondRedirect(&quot;/&quot;, false)\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个路由更新成绩并将页面重定向到学生名单页面。</p><h2 id="_6-错误处理" tabindex="-1"><a class="header-anchor" href="#_6-错误处理"><span>6. 错误处理</span></a></h2><p>为了处理我们应用程序中的错误，我们将使用 StatusPages，这是一个 Ktor 插件，用于正确处理异常和状态代码。让我们创建一个扩展函数来配置它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>fun Application.configureStatusPages() {\n    install(StatusPages) {\n        status(HttpStatusCode.NotFound) { call, _ -&gt;\n            call.respond(ThymeleafContent(&quot;error404&quot;, mapOf(&quot;message&quot; to &quot;Sorry! Page was not found.&quot;)))\n        }\n    }\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>状态函数将处理任何404（未找到）状态代码，并将发送到我们的错误页面。让我们创建一个 error404.html 文件，其内容如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;body&gt;````\n    ```&lt;h2&gt;```Error```&lt;/h2&gt;```\n    ``&lt;p th:text=&quot;${message}&quot; /&gt;``\n```&lt;/body&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，如果我们尝试访问任何无效路径，我们应该会看到错误页面：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-error-page-300x94.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_7-bootstrap" tabindex="-1"><a class="header-anchor" href="#_7-bootstrap"><span>7. Bootstrap</span></a></h2><p>现在我们的应用程序已经可以正常工作了，让我们使用 Bootstrap 和 Thymeleaf 类标签应用一些样式。让我们在 <em>head</em> 标签内添加链接标签：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;head&gt;``\n    `&lt;title&gt;`Students`&lt;/title&gt;`\n    `&lt;link href=&quot;https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css&quot;\n          rel=&quot;stylesheet&quot;\n          integrity=&quot;sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN&quot;\n          crossorigin=&quot;anonymous&quot;&gt;`\n``&lt;/head&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并将脚本标签添加到 <em>body</em> 标签：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>````&lt;body&gt;````\n    ...\n    `&lt;script src=&quot;https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js&quot;\n            integrity=&quot;sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL&quot;\n            crossorigin=&quot;anonymous&quot;&gt;``&lt;/script&gt;`\n```&lt;/body&gt;```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这一步对于 index 和 report-card 页面都是相同的。</p><h3 id="_7-1-类追加" tabindex="-1"><a class="header-anchor" href="#_7-1-类追加"><span>7.1. 类追加</span></a></h3><p>让我们将列表放在一个带有 <em>container</em> 类的 <em>div</em> 中，并在 <em>ul</em> 标签中添加 <em>list-group</em> 类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;div class=&quot;container&quot;&gt;``\n    ```&lt;h2&gt;```Students```&lt;/h2&gt;```\n    `&lt;ul th:each=&quot;student : ${studentList}&quot; class=&quot;list-group&quot;&gt;`\n        `&lt;a th:href=&quot;@{&#39;report-card/&#39;+${student.id}}&quot;\n           th:text=&quot;${student.fullName}&quot;\n           th:classappend=&quot;${student.hasAllGrades} ? &#39;list-group-item-success&#39; : &#39;list-group-item-warning&#39;&quot;\n           class=&quot;list-group-item list-group-item-action&quot; /&gt;`\n    ``&lt;/ul&gt;``\n``&lt;/div&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>th:classappend</em> 标签可以动态添加类。我们使用它与条件语句一起，如果学生已经获得了所有成绩，就改变颜色线条。让我们在 <em>Student</em> 类中创建这个函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val hasAllGrades: Boolean\n    get() = gradeList.firstOrNull { grade -&gt; grade.value.isBlank() } == null\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是我们的列表现在应该看起来的样子：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-student-list-bootstrap-300x103.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_7-2-表单样式" tabindex="-1"><a class="header-anchor" href="#_7-2-表单样式"><span>7.2. 表单样式</span></a></h3><p>我们可以使用一些 Bootstrap 标签来美化我们的表单和表格：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;div class=&quot;container&quot;&gt;``\n    ``&lt;form action=&quot;#&quot; th:action=&quot;@{&#39;~/report-card/&#39;+${student.id}}&quot; method=&quot;post&quot;&gt;``\n        ``&lt;h3&gt;``Name: ``&lt;span th:text=&quot;${student.fullName}&quot; /&gt;````&lt;/h3&gt;``\n        `&lt;table class=&quot;table table-striped&quot;&gt;`\n            ``&lt;thead&gt;``\n            ``&lt;tr&gt;``\n                ````&lt;th&gt;````Subject````&lt;/th&gt;````\n                ````&lt;th&gt;````Grade````&lt;/th&gt;````\n            ````&lt;/tr&gt;````\n            ``&lt;/thead&gt;``\n            ``&lt;tbody&gt;``\n            ``&lt;tr th:each=&quot;grade : ${student.gradeList}&quot;&gt;``\n                ``&lt;td th:text=&quot;${grade.subject}&quot;&gt;``````&lt;/td&gt;````\n                ``&lt;td&gt;``\n                    ``&lt;select th:name=&quot;${grade.id}&quot;&gt;``\n                        ``&lt;option th:each=&quot;gradeOption : ${gradeOptionList}&quot;\n                                th:value=&quot;${gradeOption}&quot;\n                                th:text=&quot;${gradeOption.displayValue}&quot;\n                                th:selected=&quot;${grade.gradeValue == gradeOption}&quot; /&gt;``\n                    ``&lt;/select&gt;``\n                ````&lt;/td&gt;````\n            ````&lt;/tr&gt;````\n            ``&lt;/tbody&gt;``\n        ``&lt;/table&gt;``\n        `&lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;`Submit``&lt;/button&gt;``\n    ``&lt;/form&gt;``\n``&lt;/div&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>选择一些成绩后，结果现在应该是：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-report-card-bootstrap-300x186.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>在本文中，我们使用Ktor应用程序和Thymeleaf UI创建了一个应用程序。我们的应用程序缺乏持久性，可以使用例如 Exposed 库来实现。<strong>Thymeleaf是Ktor服务器端渲染模板的良好选择</strong>，因为它是一个坚固、知名的模板引擎，并且在Ktor文档中被列为支持的模板引擎。我们还能够轻松地集成Bootstrap，使我们的Web应用程序看起来更加准备就绪。</p><p>所有的代码都可以在GitHub上找到。</p><figure><img src="https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>OK</p>',99),d=[l];function s(r,u){return i(),t("div",null,d)}const c=e(a,[["render",s],["__file","2024-07-20-Creating a Web Application With Ktor and Thymeleaf.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-20/2024-07-20-Creating%20a%20Web%20Application%20With%20Ktor%20and%20Thymeleaf.html","title":"使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2024-01-01T00:00:00.000Z","category":["Kotlin","Web Development"],"tag":["Ktor","Thymeleaf"],"head":[["meta",{"name":"keywords","content":"Ktor, Thymeleaf, Web Application, Kotlin, Baeldung"}],["meta",{"name":"description","content":"本教程介绍了如何使用Kotlin的Ktor框架和Thymeleaf模板引擎创建一个Web应用程序。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-20/2024-07-20-Creating%20a%20Web%20Application%20With%20Ktor%20and%20Thymeleaf.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin 1. 概述 Thymeleaf是一个服务器端Java模板引擎，它既可以在Web环境也可以在非Web环境中工作。Ktor是一个用Kotlin编写的用于构建异步服务器端和客户端应用程序的框架。 在本教程中，我们将使用Thymeleaf和Bootstrap创建一个带有学..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-student-list-300x259.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T00:14:16.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Ktor"}],["meta",{"property":"article:tag","content":"Thymeleaf"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T00:14:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-student-list-300x259.png\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-report-card-300x281.png\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-error-page-300x94.png\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-student-list-bootstrap-300x103.png\\",\\"https://www.baeldung.com/wp-content/uploads/sites/5/2024/01/thymeleaf-report-card-bootstrap-300x186.png\\",\\"https://www.baeldung.com/kotlin/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T00:14:16.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin 1. 概述 Thymeleaf是一个服务器端Java模板引擎，它既可以在Web环境也可以在非Web环境中工作。Ktor是一个用Kotlin编写的用于构建异步服务器端和客户端应用程序的框架。 在本教程中，我们将使用Thymeleaf和Bootstrap创建一个带有学..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 设置依赖项","slug":"_2-设置依赖项","link":"#_2-设置依赖项","children":[]},{"level":2,"title":"3. Ktor和Thymeleaf设置","slug":"_3-ktor和thymeleaf设置","link":"#_3-ktor和thymeleaf设置","children":[{"level":3,"title":"3.1. 模板解析器","slug":"_3-1-模板解析器","link":"#_3-1-模板解析器","children":[]},{"level":3,"title":"3.2. 路由","slug":"_3-2-路由","link":"#_3-2-路由","children":[]}]},{"level":2,"title":"4. 显示学生名单","slug":"_4-显示学生名单","link":"#_4-显示学生名单","children":[]},{"level":2,"title":"5. 学生成绩的提交表单","slug":"_5-学生成绩的提交表单","link":"#_5-学生成绩的提交表单","children":[{"level":3,"title":"5.1. 成绩单路由","slug":"_5-1-成绩单路由","link":"#_5-1-成绩单路由","children":[]},{"level":3,"title":"5.2. 成绩单页面","slug":"_5-2-成绩单页面","link":"#_5-2-成绩单页面","children":[]},{"level":3,"title":"5.3. 处理表单提交","slug":"_5-3-处理表单提交","link":"#_5-3-处理表单提交","children":[]}]},{"level":2,"title":"6. 错误处理","slug":"_6-错误处理","link":"#_6-错误处理","children":[]},{"level":2,"title":"7. Bootstrap","slug":"_7-bootstrap","link":"#_7-bootstrap","children":[{"level":3,"title":"7.1. 类追加","slug":"_7-1-类追加","link":"#_7-1-类追加","children":[]},{"level":3,"title":"7.2. 表单样式","slug":"_7-2-表单样式","link":"#_7-2-表单样式","children":[]}]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1721520856000,"updatedTime":1721520856000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.49,"words":2246},"filePathRelative":"posts/baeldung/2024-07-20/2024-07-20-Creating a Web Application With Ktor and Thymeleaf.md","localizedDate":"2024年1月1日","excerpt":"<hr>\\n<h1>使用Ktor和Thymeleaf创建Web应用程序 | Baeldung关于Kotlin</h1>\\n<h2>1. 概述</h2>\\n<p><strong>Thymeleaf是一个服务器端Java模板引擎</strong>，它既可以在Web环境也可以在非Web环境中工作。<strong>Ktor是一个用Kotlin编写的用于构建异步服务器端和客户端应用程序的框架</strong>。</p>\\n<p>在本教程中，我们将使用Thymeleaf和Bootstrap创建一个带有学生名单和成绩报告卡的Web应用程序。</p>\\n<h2>2. 设置依赖项</h2>\\n<p>对于这个应用程序，我们需要使用Gradle添加**<em>Ktor Server Core</em>, <em>Netty</em>, <em>Thymeleaf</em>, 和 StatusPages 依赖项**：</p>","autoDesc":true}');export{c as comp,v as data};
