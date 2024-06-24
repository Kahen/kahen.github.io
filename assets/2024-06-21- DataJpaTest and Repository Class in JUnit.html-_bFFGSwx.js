import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CQatNWII.js";const e={},p=t(`<h1 id="datajpatest-和-junit-中的-repository-类" tabindex="-1"><a class="header-anchor" href="#datajpatest-和-junit-中的-repository-类"><span>@DataJpaTest 和 JUnit 中的 Repository 类</span></a></h1><ol><li>引言</li></ol><p>在使用 Spring Boot 应用程序和 Spring Data JPA 进行数据持久化时，测试与数据库交互的仓库至关重要。本教程将探讨如何使用 Spring Boot 提供的 @DataJpaTest 注解以及 JUnit 来有效测试 Spring Data JPA 仓库。</p><ol start="2"><li>理解 @DataJpaTest 和 Repository 类</li></ol><p>在本节中，我们将深入了解 @DataJpaTest 和 Spring Boot 应用程序中类仓库之间的交互。</p><p>2.1. @DataJpaTest</p><p>@DataJpaTest 注解用于测试 Spring Boot 应用程序中的 JPA 仓库。它是一种专门的测试注解，为测试持久层提供了最小的 Spring 上下文。这个注解可以与 @RunWith 和 @SpringBootTest 等其他测试注解一起使用。</p><p>此外，@DataJpaTest 的作用域限于应用程序的 JPA 仓库层。它不会加载整个应用程序上下文，这可以使测试更快、更专注。此注解还为测试 JPA 实体提供了预配置的 EntityManager 和 TestEntityManager。</p><p>2.2. Repository 类</p><p>在 Spring Data JPA 中，仓库作为 JPA 实体之上的抽象层。它提供了一组执行 CRUD（创建、读取、更新、删除）操作和执行自定义查询的方法。这些仓库通常扩展自 JpaRepository 等接口，负责处理特定实体类型的数据库交互。</p><ol start="3"><li>可选参数</li></ol><p>@DataJpaTest 有一些可选参数，我们可以用来自定义测试环境。</p><p>3.1. properties</p><p>此参数允许我们指定将应用于我们测试上下文的 Spring Boot 配置属性。这对于调整数据库连接详情、事务行为或与我们测试需求相关的其他应用程序属性非常有用：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span><span class="token punctuation">(</span>properties <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;spring.datasource.url=jdbc:h2:mem:testdb&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;spring.jpa.hibernate.ddl-auto=create-drop&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.2. showSql</p><p>这使我们的测试启用了 SQL 日志记录，并允许我们查看由仓库方法执行的实际 SQL 查询。此外，这可以帮助调试或理解 JPA 查询是如何转换的。默认情况下，SQL 日志记录是启用的。我们可以通过将值设置为 false 来关闭它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span><span class="token punctuation">(</span>showSql <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.3. includeFilters 和 excludeFilters</p><p>这些参数使我们能够在组件扫描期间包含或排除特定组件。我们可以使用它们来缩小扫描范围，并通过只关注相关组件来优化测试性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span><span class="token punctuation">(</span>includeFilters <span class="token operator">=</span> <span class="token annotation punctuation">@ComponentScan.Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">ASSIGNABLE_TYPE</span><span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token class-name">UserRepository</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  excludeFilters <span class="token operator">=</span> <span class="token annotation punctuation">@ComponentScan.Filter</span><span class="token punctuation">(</span>
    type <span class="token operator">=</span> <span class="token class-name">FilterType</span><span class="token punctuation">.</span><span class="token constant">ASSIGNABLE_TYPE</span><span class="token punctuation">,</span>
    classes <span class="token operator">=</span> <span class="token class-name">SomeIrrelevantRepository</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>关键特性</li></ol><p>当涉及到在 Spring Boot 应用程序中测试 JPA 仓库时，@DataJpaTest 注解可以是一个方便的工具。让我们详细了解其关键特性和优势。</p><p>4.1. 测试环境配置</p><p>为 JPA 仓库设置适当的测试环境可能既耗时又棘手。@DataJpaTest 提供了一个现成的测试环境，包括测试 JPA 仓库所需的基本组件，如 EntityManager 和 DataSource。</p><p>这个环境专门设计用于测试 JPA 仓库。它确保我们的仓库方法在测试事务的上下文中运行，与像 H2 这样的安全、内存中的数据库交互，而不是生产数据库。</p><p>4.2. 依赖注入</p><p>@DataJpaTest 简化了我们测试类中的依赖注入过程。仓库以及其他基本 bean 自动注入到测试上下文中。这种无缝集成使开发人员能够专注于编写简洁有效的测试用例，而无需明确 bean 绑定的麻烦。</p><p>4.3. 默认回滚</p><p>此外，保持测试的独立性和可靠性至关重要。默认情况下，每个用 @DataJpaTest 注解的测试方法都在事务边界内运行。这确保了对数据库所做的更改在测试结束时自动回滚，为下一个测试留下一张干净的纸。</p><ol start="5"><li>配置和设置</li></ol><p>要使用 @DataJpaTest，我们需要将 spring-boot-starter-test 依赖项添加到我们的项目中，范围为 &quot;test&quot;。这个轻量级依赖包括像 JUnit 这样的基本测试库，确保它没有包含在我们的生产构建中。</p><p>5.1. 向 pom.xml 添加依赖</p><p>让我们向 pom.xml 添加以下依赖：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.springframework.boot\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`spring-boot-starter-test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>\`test\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们添加了依赖项，我们就可以在测试中使用 @DataJpaTest 注解。这个注解为我们设置了一个内存中的 H2 数据库，并为我们配置了 Spring Data JPA，允许我们编写与我们的仓库类交互的测试。</p><p>5.2. 创建实体类</p><p>现在，让我们创建 User 实体类，它将表示用户数据：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>

    <span class="token comment">// getters and setters</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.3. 创建仓库接口</p><p>接下来，我们定义 UserRepository，一个用于管理 User 实体的 Spring Data JPA 仓库接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token punctuation">{</span>
    <span class="token comment">// 如有需要，添加自定义方法</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过扩展 JpaRepository<code>&lt;User, Long&gt;</code>，我们的 UserRepository 获得了 Spring Data JPA 立即提供的标凊 CRUD 操作。</p><p>此外，我们还可以在此接口中定义自定义查询方法，以满足特定的数据访问检索需求，例如 findByUsername()：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">UserRepository</span> <span class="token keyword">extends</span> <span class="token class-name">JpaRepository</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">User</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span>\`\`\` <span class="token punctuation">{</span>
    <span class="token comment">// 通过用户名查找用户的自定义查询方法</span>
    <span class="token class-name">User</span> <span class="token function">findByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li>实现仓库测试</li></ol><p>为了测试应用程序的仓库层，我们将使用 @DataJpaTest 注解。使用此注解，将设置一个内存中的 H2 数据库，并将 Spring Data JPA 配置好。这允许我们编写与我们的仓库类交互的测试。</p><p>6.1. 设置测试类</p><p>首先，让我们通过用 @DataJpaTest 注解来设置测试类。这个注解扫描用 @Entity 注解的实体类和 Spring Data JPA 仓库接口。这确保了只有相关组件被加载用于测试，提高了测试的专注度和性能：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@DataJpaTest</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRepositoryTest</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在这里添加测试方法</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要创建一个仓库测试用例，我们首先需要将我们想要测试的仓库注入到我们的测试类中。这可以使用 @Autowired 注解来完成：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">UserRepository</span> userRepository<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>6.2. 测试生命周期管理</p><p>在测试生命周期管理的背景下，@BeforeEach 和 @AfterEach 注解用于在每个测试方法之前和之后执行设置和清理操作。这确保了每个测试方法在干净和隔离的环境中运行，具有一致的初始条件和清理程序。</p><p>以下是我们如何将测试生命周期管理纳入我们的测试类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">User</span> testUser<span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在每个测试方法之前初始化测试数据</span>
    testUser <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    testUser<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;testuser&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    testUser<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>testUser<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@AfterEach</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在每个测试方法之后释放测试数据</span>
    userRepository<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>testUser<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用 @BeforeEach 注解的方法 setUp() 中，我们可以执行每个测试方法执行之前所需的任何设置操作。这可能包括初始化测试数据、设置模拟对象或准备测试所需的资源。</p><p>相反，在用 @AfterEach 注解的方法 tearDown() 中，我们可以在每个测试方法执行后执行清理操作。这可能涉及重置测试期间所做的任何更改、释放资源或执行任何必要的清理任务，以将测试环境恢复到原始状态。</p><p>6.3. 测试插入操作</p><p>现在，我们可以编写与 JPA 仓库交互的测试方法。例如，我们可能想要测试我们可以将新用户保存到数据库中。由于用户在每个测试之前都会自动保存，我们可以直接专注于测试与 JPA 仓库的交互：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUser_whenSaved_thenCanBeFoundById</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> savedUser <span class="token operator">=</span> userRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>testUser<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertNotNull</span><span class="token punctuation">(</span>savedUser<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>testUser<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> savedUser<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertEquals</span><span class="token punctuation">(</span>testUser<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> savedUser<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们观察测试用例的控制台日志，我们会注意到以下日志：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext" data-title="plaintext"><pre class="language-plaintext"><code>Began transaction (1) for test context
.....
Rolled back transaction for test:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些日志表明 @BeforeEach 和 @AfterEach 方法按预期工作。</p><p>6.4. 测试更新操作</p><p>此外，我们可以创建一个测试用例来测试更新操作：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenUser_whenUpdated_thenCanBeFoundByIdWithUpdatedData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    testUser<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">&quot;updatedUsername&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    userRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>testUser<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,67),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","2024-06-21- DataJpaTest and Repository Class in JUnit.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-%20DataJpaTest%20and%20Repository%20Class%20in%20JUnit.html","title":"@DataJpaTest 和 JUnit 中的 Repository 类","lang":"zh-CN","frontmatter":{"date":"2024-06-22T00:00:00.000Z","category":["Spring Boot","JUnit"],"tag":["DataJpaTest","Repository"],"head":[["meta",{"name":"keywords","content":"Spring Data JPA, JUnit, Repository Testing"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-%20DataJpaTest%20and%20Repository%20Class%20in%20JUnit.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"@DataJpaTest 和 JUnit 中的 Repository 类"}],["meta",{"property":"og:description","content":"@DataJpaTest 和 JUnit 中的 Repository 类 引言 在使用 Spring Boot 应用程序和 Spring Data JPA 进行数据持久化时，测试与数据库交互的仓库至关重要。本教程将探讨如何使用 Spring Boot 提供的 @DataJpaTest 注解以及 JUnit 来有效测试 Spring Data JPA 仓..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T21:49:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"DataJpaTest"}],["meta",{"property":"article:tag","content":"Repository"}],["meta",{"property":"article:published_time","content":"2024-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T21:49:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"@DataJpaTest 和 JUnit 中的 Repository 类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T21:49:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"@DataJpaTest 和 JUnit 中的 Repository 类 引言 在使用 Spring Boot 应用程序和 Spring Data JPA 进行数据持久化时，测试与数据库交互的仓库至关重要。本教程将探讨如何使用 Spring Boot 提供的 @DataJpaTest 注解以及 JUnit 来有效测试 Spring Data JPA 仓..."},"headers":[],"git":{"createdTime":1719006591000,"updatedTime":1719006591000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.89,"words":2067},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21- DataJpaTest and Repository Class in JUnit.md","localizedDate":"2024年6月22日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在使用 Spring Boot 应用程序和 Spring Data JPA 进行数据持久化时，测试与数据库交互的仓库至关重要。本教程将探讨如何使用 Spring Boot 提供的 @DataJpaTest 注解以及 JUnit 来有效测试 Spring Data JPA 仓库。</p>\\n<ol start=\\"2\\">\\n<li>理解 @DataJpaTest 和 Repository 类</li>\\n</ol>\\n<p>在本节中，我们将深入了解 @DataJpaTest 和 Spring Boot 应用程序中类仓库之间的交互。</p>\\n<p>2.1. @DataJpaTest</p>","autoDesc":true}');export{d as comp,k as data};
