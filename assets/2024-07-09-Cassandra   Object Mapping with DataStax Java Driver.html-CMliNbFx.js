import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-c243dxVF.js";const e={},p=t('<h1 id="cassandra-–-使用datastax-java-driver进行对象映射" tabindex="-1"><a class="header-anchor" href="#cassandra-–-使用datastax-java-driver进行对象映射"><span>Cassandra – 使用DataStax Java Driver进行对象映射</span></a></h1><p>本文将介绍如何使用DataStax Java Driver将对象映射到Cassandra表。</p><p>我们将学习如何定义实体、创建DAO，并使用Java Driver对Cassandra表执行CRUD操作。</p><h2 id="_2-项目设置" tabindex="-1"><a class="header-anchor" href="#_2-项目设置"><span>2. 项目设置</span></a></h2><p>我们将使用Spring Boot框架创建一个简单的应用程序，该程序将与Cassandra数据库交互。我们将使用Java Driver创建表、实体和DAO。然后，我们将使用DAO对表执行CRUD操作。</p><h3 id="_2-1-依赖项" tabindex="-1"><a class="header-anchor" href="#_2-1-依赖项"><span>2.1. 依赖项</span></a></h3><p>让我们从向项目添加所需的依赖项开始。我们将使用Spring Boot的Cassandra启动器来连接数据库：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.springframework.boot````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````spring-boot-starter-data-cassandra````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们将添加<code>java-driver-mapper-runtime</code>依赖项，用于将对象映射到Cassandra表：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.datastax.oss````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````java-driver-mapper-runtime````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.17.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们配置注解处理器，以便在编译时生成DAO和映射器：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````org.apache.maven.plugins````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n    ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````maven-compiler-plugin````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.8.1```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span><span class="token punctuation">&gt;</span></span>`\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>````com.datastax.oss````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>````\n                ````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>````java-driver-mapper-processor````<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>````\n                ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```4.13.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>path</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>annotationProcessorPaths</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-cassandra-实体" tabindex="-1"><a class="header-anchor" href="#_3-cassandra-实体"><span>3. Cassandra 实体</span></a></h2><p>让我们定义一个实体，我们可以将其映射到Cassandra表。我们将创建一个_User_类，它将代表_user_profile_表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@PartitionKey</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> userAge<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@Entity注解告诉映射器将这个类映射到一个表</strong>。@PartitionKey注解告诉映射器使用_id_字段作为表的分区键。</p><p>映射器使用默认构造函数创建实体的新实例。因此，我们需要确保默认无参数构造函数是可访问的。如果我们创建了一个非默认构造函数，我们需要显式声明默认构造函数。</p><p>默认情况下，实体是可变的，所以我们必须声明getter和setter。稍后在教程中我们将看到如何改变这种行为。</p><h3 id="_3-1-命名策略" tabindex="-1"><a class="header-anchor" href="#_3-1-命名策略"><span>3.1. 命名策略</span></a></h3><p><strong>@NamingStrategy注解允许我们为表和列指定命名约定</strong>。默认的命名策略是NamingConvention.SNAKE_CASE_INSENSITIVE。它在与数据库交互时将类名和字段名转换为蛇形命名。</p><p>例如，默认情况下，_userName_字段映射到数据库中的_user_name_列。如果我们将命名策略更改为NamingConvention.LOWER_CAMEL_CASE，_userName_字段将映射到数据库中的_userName_列。</p><h3 id="_3-2-属性策略" tabindex="-1"><a class="header-anchor" href="#_3-2-属性策略"><span>3.2. 属性策略</span></a></h3><p>@PropertyStrategy注解指定映射器将如何访问实体的属性。它有三个属性——mutable、getterStyle和setterStyle。</p><p><strong>mutable属性告诉映射器实体是否可变</strong>。默认情况下是true。如果我们将其设置为false，映射器将使用“所有列”构造函数来创建实体的新实例。</p><p>“所有列”构造函数是一个构造函数，它以与实体中定义的顺序相同的顺序接受表的所有列作为参数。例如，如果我们有一个实体具有以下字段：<em>id</em>、<em>userName_和_userAge</em>，那么“所有列”构造函数看起来像这样：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> userName<span class="token punctuation">,</span> <span class="token keyword">int</span> userAge<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>userName <span class="token operator">=</span> userName<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>userAge <span class="token operator">=</span> userAge<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外，实体应该有getters但不需要有setters。可选地，并且按照惯例，字段可以是final。</p><p>getterStyle和setterStyle属性告诉映射器如何为实体找到getter和setter。它们都有两个可能的值——FLUENT和JAVA_BEANS。</p><p>如果设置为FLUENT，映射器将寻找与字段同名的方法。例如，如果字段是_userName_，映射器将寻找一个名为_userName()_的方法。</p><p>如果设置为JAVA_BEANS，映射器将寻找带有_get_或_set_前缀的方法。例如，如果字段是_userName_，映射器将寻找一个名为_getUserName()_的方法。</p><p>对于普通的Java类，getterStyle和setterStyle属性默认设置为JAVA_BEANS。然而，对于记录，它们默认设置为FLUENT。同样，对于记录，默认情况下mutable属性设置为false。</p><h3 id="_3-3-cqlname" tabindex="-1"><a class="header-anchor" href="#_3-3-cqlname"><span>3.3. @CqlName</span></a></h3><p><strong>@CqlName注解指定Cassandra数据库中表或列的名称</strong>。由于我们想要将_User_实体映射到_user_profile_表，并将_userName_字段映射到表中的_username_列，我们可以使用@CqlName注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@CqlName</span><span class="token punctuation">(</span><span class="token string">&quot;user_profile&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@PartitionKey</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n    <span class="token annotation punctuation">@CqlName</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token keyword">int</span> userAge<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于遵循默认或指定命名策略的字段，不需要注解。</p><h3 id="_3-4-partitionkey-和-clusteringcolumn" tabindex="-1"><a class="header-anchor" href="#_3-4-partitionkey-和-clusteringcolumn"><span>3.4. @PartitionKey 和 @ClusteringColumn</span></a></h3><p>分区键和聚簇列分别使用@PartitionKey和@ClusteringColumn注解定义。在我们的例子中，_id_字段是分区键。如果我们想要按_userAge_字段对行进行排序，我们可以将@ClusteringColumn注解添加到_userAge_字段。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@ClusteringColumn</span>\n<span class="token keyword">private</span> <span class="token keyword">int</span> userAge<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实体中可以定义多个分区键和聚簇列</strong>。分区顺序可以通过在注解内传递顺序来指定。例如，如果我们想要按_id_然后按_userName_对表进行分区，我们可以这样做：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@PartitionKey</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>\n<span class="token annotation punctuation">@PartitionKey</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token annotation punctuation">@CqlName</span><span class="token punctuation">(</span><span class="token string">&quot;username&quot;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于聚簇列也是类似的。</p><h3 id="_3-5-transient" tabindex="-1"><a class="header-anchor" href="#_3-5-transient"><span>3.5. @Transient</span></a></h3><p>@Transient注解告诉映射器忽略该字段。被标记为@Transient的字段将不会被映射到数据库中的列。它只会是Java对象的一部分。映射器不会尝试从数据库中读取或写入该字段的值。</p><p>除了在字段上的@Transient注解，我们还可以在实体上使用@TransientProperties注解来标记多个字段为瞬态。</p><h3 id="_3-6-computed" tabindex="-1"><a class="header-anchor" href="#_3-6-computed"><span>3.6. @Computed</span></a></h3><p>被标记为@Computed的字段被映射到数据库中的列，但它们不能由客户端设置。它们由存储在服务器上的数据库函数计算。</p><p>假设我们想要向实体中添加一个新字段，用于存储行的写入时间戳。我们可以添加如下实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Computed</span><span class="token punctuation">(</span><span class="token string">&quot;writetime(userName)&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">private</span> <span class="token keyword">long</span> writeTime<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当_User_记录被创建时，映射器将调用_writetime()_方法，并将字段_writeTime_的值设置为函数的结果。</p><h2 id="_4-层次实体" tabindex="-1"><a class="header-anchor" href="#_4-层次实体"><span>4. 层次实体</span></a></h2><p>实体可以使用继承来定义。这是对具有许多共同字段的实体进行建模的好方法。</p><p>例如，我们可以有一个_user_profile_表，它具有所有用户的共同字段。然后我们可以有一个_admin_profile_表，它为管理员提供了额外的字段。</p><p>在这种情况下，我们可以为_user_profile_表定义一个实体，然后扩展它来创建_admin_profile_表的实体：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>\n<span class="token annotation punctuation">@CqlName</span><span class="token punctuation">(</span><span class="token string">&quot;admin_profile&quot;</span><span class="token punctuation">)</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Admin</span> <span class="token keyword">extends</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> role<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> department<span class="token punctuation">;</span>\n\n    <span class="token comment">// getters and setters</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Admin_实体将拥有_User_实体的所有字段以及_role_和_department_的额外字段。我们应该注意到，@Entity注解只需要在具体类上。它不需要在抽象类或接口上。</p><h3 id="_4-1-层次实体中的不可变性" tabindex="-1"><a class="header-anchor" href="#_4-1-层次实体中的不可变性"><span>4.1. 层次实体中的不可变性</span></a></h3><p>如果子类被设置为不可变，子类的“所有列”构造函数需要调用父类的“所有列”构造函数。在这种情况下，参数的顺序应该是<strong>子类的参数首先传递，然后是父类的参数</strong>。</p><p>例如，我们可能为Admin实体创建一个“所有列”构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Admin</span><span class="token punctuation">(</span><span class="token class-name">String</span> role<span class="token punctuation">,</span> <span class="token class-name">String</span> department<span class="token punctuation">,</span> <span class="token keyword">int</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> userName<span class="token punctuation">,</span> <span class="token keyword">int</span> userAge<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> userName<span class="token punctuation">,</span> userAge<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>role <span class="token operator">=</span> role<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>department <span class="token operator">=</span> department<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-hierarchyscanstrategy" tabindex="-1"><a class="header-anchor" href="#_4-2-hierarchyscanstrategy"><span>4.2. @HierarchyScanStrategy</span></a></h3><p>@HierarchyScanStrategy注解指定映射器应如何扫描实体的层次结构以查找注解。</p><p>它有三个字段：</p><ul><li>scanAncestors – 默认设置为true，映射器将扫描实体的整个层次结构。当设置为false时，映射器只扫描实体本身。</li><li>highestAncestor – 当设置为一个类时，映射器将扫描实体的层次结构，直到达到</li></ul>',63),i=[p];function l(o,c){return s(),n("div",null,i)}const d=a(e,[["render",l],["__file","2024-07-09-Cassandra   Object Mapping with DataStax Java Driver.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Cassandra%20%20%20Object%20Mapping%20with%20DataStax%20Java%20Driver.html","title":"Cassandra – 使用DataStax Java Driver进行对象映射","lang":"zh-CN","frontmatter":{"date":"2023-04-04T00:00:00.000Z","category":["Cassandra","Java"],"tag":["DataStax Java Driver","Object Mapping"],"head":[["meta",{"name":"Cassandra Object Mapping with DataStax Java Driver","content":"Learn how to use the DataStax Java Driver to map objects to Cassandra tables with this tutorial."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Cassandra%20%20%20Object%20Mapping%20with%20DataStax%20Java%20Driver.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Cassandra – 使用DataStax Java Driver进行对象映射"}],["meta",{"property":"og:description","content":"Cassandra – 使用DataStax Java Driver进行对象映射 本文将介绍如何使用DataStax Java Driver将对象映射到Cassandra表。 我们将学习如何定义实体、创建DAO，并使用Java Driver对Cassandra表执行CRUD操作。 2. 项目设置 我们将使用Spring Boot框架创建一个简单的应用程..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T03:41:04.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"DataStax Java Driver"}],["meta",{"property":"article:tag","content":"Object Mapping"}],["meta",{"property":"article:published_time","content":"2023-04-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T03:41:04.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cassandra – 使用DataStax Java Driver进行对象映射\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T03:41:04.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Cassandra – 使用DataStax Java Driver进行对象映射 本文将介绍如何使用DataStax Java Driver将对象映射到Cassandra表。 我们将学习如何定义实体、创建DAO，并使用Java Driver对Cassandra表执行CRUD操作。 2. 项目设置 我们将使用Spring Boot框架创建一个简单的应用程..."},"headers":[{"level":2,"title":"2. 项目设置","slug":"_2-项目设置","link":"#_2-项目设置","children":[{"level":3,"title":"2.1. 依赖项","slug":"_2-1-依赖项","link":"#_2-1-依赖项","children":[]}]},{"level":2,"title":"3. Cassandra 实体","slug":"_3-cassandra-实体","link":"#_3-cassandra-实体","children":[{"level":3,"title":"3.1. 命名策略","slug":"_3-1-命名策略","link":"#_3-1-命名策略","children":[]},{"level":3,"title":"3.2. 属性策略","slug":"_3-2-属性策略","link":"#_3-2-属性策略","children":[]},{"level":3,"title":"3.3. @CqlName","slug":"_3-3-cqlname","link":"#_3-3-cqlname","children":[]},{"level":3,"title":"3.4. @PartitionKey 和 @ClusteringColumn","slug":"_3-4-partitionkey-和-clusteringcolumn","link":"#_3-4-partitionkey-和-clusteringcolumn","children":[]},{"level":3,"title":"3.5. @Transient","slug":"_3-5-transient","link":"#_3-5-transient","children":[]},{"level":3,"title":"3.6. @Computed","slug":"_3-6-computed","link":"#_3-6-computed","children":[]}]},{"level":2,"title":"4. 层次实体","slug":"_4-层次实体","link":"#_4-层次实体","children":[{"level":3,"title":"4.1. 层次实体中的不可变性","slug":"_4-1-层次实体中的不可变性","link":"#_4-1-层次实体中的不可变性","children":[]},{"level":3,"title":"4.2. @HierarchyScanStrategy","slug":"_4-2-hierarchyscanstrategy","link":"#_4-2-hierarchyscanstrategy","children":[]}]}],"git":{"createdTime":1720496464000,"updatedTime":1720496464000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.3,"words":1890},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Cassandra   Object Mapping with DataStax Java Driver.md","localizedDate":"2023年4月4日","excerpt":"\\n<p>本文将介绍如何使用DataStax Java Driver将对象映射到Cassandra表。</p>\\n<p>我们将学习如何定义实体、创建DAO，并使用Java Driver对Cassandra表执行CRUD操作。</p>\\n<h2>2. 项目设置</h2>\\n<p>我们将使用Spring Boot框架创建一个简单的应用程序，该程序将与Cassandra数据库交互。我们将使用Java Driver创建表、实体和DAO。然后，我们将使用DAO对表执行CRUD操作。</p>\\n<h3>2.1. 依赖项</h3>\\n<p>让我们从向项目添加所需的依赖项开始。我们将使用Spring Boot的Cassandra启动器来连接数据库：</p>","autoDesc":true}');export{d as comp,k as data};
