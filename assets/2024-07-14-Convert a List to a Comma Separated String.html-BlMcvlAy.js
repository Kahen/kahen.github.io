import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-BMOUrRO4.js";const p={},e=t('<h1 id="将列表转换为逗号分隔的字符串" tabindex="-1"><a class="header-anchor" href="#将列表转换为逗号分隔的字符串"><span>将列表转换为逗号分隔的字符串</span></a></h1><p>列表转换仍然是一个热门话题，因为这是Java开发人员经常进行的操作。在本教程中，我们将学习如何使用四种不同的方法将字符串列表转换为逗号分隔的字符串。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h2 id="_2-使用java-8" tabindex="-1"><a class="header-anchor" href="#_2-使用java-8"><span>2. 使用Java 8+</span></a></h2><p>我们将使用Java 8中可用的三个不同类及其方法进行转换。</p><p>让我们以下面的列表作为即将到来的例子的输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` arraysAsList <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;ONE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;TWO&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>首先，我们将使用String类，它具有许多用于字符串处理的实用程序，并提供了join()转换方法：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedString <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> arraysAsList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其次，我们将使用StringJoiner类，它有一个构造函数，接受一个CharSequence分隔符作为参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringJoiner</span> stringJoiner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringJoiner</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\narraysAsList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>stringJoiner<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> commaSeparatedString <span class="token operator">=</span> stringJoiner<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>还有一个构造函数，它接受一个CharSequence分隔符，一个CharSequence作为前缀，另一个作为后缀：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">StringJoiner</span> stringJoinerWithDelimiterPrefixSuffix <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringJoiner</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;[&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\narraysAsList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>stringJoinerWithDelimiterPrefixSuffix<span class="token operator">::</span><span class="token function">add</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">String</span> commaSeparatedStringWithDelimiterPrefixSuffix <span class="token operator">=</span> stringJoinerWithDelimiterPrefixSuffix<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringWithDelimiterPrefixSuffix<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;[ONE,TWO,THREE]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第三，Collectors类提供了各种实用程序和joining()方法，具有不同的签名。</strong></p><p>首先，让我们看看如何将collect()方法应用到Stream上，使用Collectors.joining()方法，它以CharSequence分隔符作为输入：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedUsingCollect <span class="token operator">=</span> arraysAsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedUsingCollect<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来的例子中，我们将看到如何使用map()方法将列表中的每个对象转换为字符串，然后应用collect()和Collectors.joining()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedObjectToString <span class="token operator">=</span> arraysAsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token operator">::</span><span class="token function">toString</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedObjectToString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将使用map()方法将列表元素转换为字符串，然后应用collect()和Collectors.joining()方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedStringValueOf <span class="token operator">=</span> arraysAsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringValueOf<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们使用上述的map()，然后使用Collectors.joining()方法，该方法输入一个CharSequence分隔符，一个CharSequence作为前缀，和一个CharSequence作为后缀：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedStringValueOfWithDelimiterPrefixSuffix <span class="token operator">=</span> arraysAsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token operator">::</span><span class="token function">valueOf</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;[&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringValueOfWithDelimiterPrefixSuffix<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;[ONE,TWO,THREE]&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将看到如何使用reduce()方法而不是collect()来转换列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedUsingReduce <span class="token operator">=</span> arraysAsList<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> x <span class="token operator">+</span> <span class="token string">&quot;,&quot;</span> <span class="token operator">+</span> y<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedUsingReduce<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-使用apache-commons-lang" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-lang"><span>3. 使用Apache Commons Lang</span></a></h2><p>另外，我们也可以不使用Java的实用类，而是使用Apache Commons Lang库提供的实用类。</p><p><strong>我们必须在pom.xml文件中添加依赖以使用Apache的StringUtils类：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.apache.commons```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```commons-lang3```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```3.14.0```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>join()方法有多种实现，它接受像一系列元素、值的Iterator，以及以多种形式的分隔符，如String或char：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedString <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>arraysAsList<span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果传递给join()的信息是一个Object数组，它还接受一个int作为startIndex和一个int作为endIndex：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedStringIndex <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>arraysAsList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringIndex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用spring-core" tabindex="-1"><a class="header-anchor" href="#_4-使用spring-core"><span>4. 使用Spring Core</span></a></h2><p>Spring Core库同样提供了一个具有此类转换方法的实用类。</p><p><strong>我们首先在pom.xml文件中添加依赖以使用Spring的Core StringUtils类：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.springframework```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```spring-core```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```5.3.22```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Spring的Core StringUtils类提供了一个方法，collectionToCommaDelimitedString()，它以逗号作为默认分隔符，并接受一个Collection作为参数进行转换：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> collectionToCommaDelimitedString <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">collectionToCommaDelimitedString</span><span class="token punctuation">(</span>arraysAsList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>collectionToCommaDelimitedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>第二个方法，collectionToDelimitedString()，接受一个Collection进行转换和一个String分隔符作为参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> collectionToDelimitedString <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">collectionToDelimitedString</span><span class="token punctuation">(</span>arraysAsList<span class="token punctuation">,</span> <span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">assertThat</span><span class="token punctuation">(</span>collectionToDelimitedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用google-guava" tabindex="-1"><a class="header-anchor" href="#_5-使用google-guava"><span>5. 使用Google Guava</span></a></h2><p>最后，我们将使用Google Guava库。</p><p><strong>我们必须在pom.xml文件中添加依赖以使用Google的Guava Joiner类：</strong></p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```com.google.guava```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```guava```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n    ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```31.1-jre```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>```\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Google的Guava Joiner类提供了我们可以连续应用的多种方法。</p><p><strong>第一个方法是on()，它接受一个String作为分隔符参数，然后是join()方法，它接受一个Iterable作为要转换的值的参数：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedString <span class="token operator">=</span> <span class="token class-name">Joiner</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>arraysAsList<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedString<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们再举一个包含一些null值的列表的例子：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span>`` arraysAsListWithNull <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;ONE&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;TWO&quot;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">&quot;THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>鉴于此，我们可以在on()和join()之间使用其他方法，其中之一是skipNulls()方法。我们可以使用它来避免转换Iterable内的null值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedStringSkipNulls <span class="token operator">=</span> <span class="token class-name">Joiner</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">skipNulls</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>arraysAsListWithNull<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringSkipNulls<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE,TWO,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>另一个选项是使用useForNull()，它接受一个String值作为参数，以替换Iterable内要转换的null值：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> commaSeparatedStringUseForNull <span class="token operator">=</span> <span class="token class-name">Joiner</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">useForNull</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>arraysAsListWithNull<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">assertThat</span><span class="token punctuation">(</span>commaSeparatedStringUseForNull<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;ONE, ,TWO, ,THREE&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们已经看到了将字符串列表转换为逗号分隔字符串的各种示例。最后，选择哪个库和实用类更适合我们的目的取决于我们自己。</p><p>如常，本文的完整代码示例可以在GitHub上找到。</p>',56),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","2024-07-14-Convert a List to a Comma Separated String.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Convert%20a%20List%20to%20a%20Comma%20Separated%20String.html","title":"将列表转换为逗号分隔的字符串","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Lists"],"tag":["Java 8","String","List"],"head":[["meta",{"name":"keywords","content":"Java, List, String, comma-separated, StringUtils, Apache Commons, Spring, Google Guava"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Convert%20a%20List%20to%20a%20Comma%20Separated%20String.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将列表转换为逗号分隔的字符串"}],["meta",{"property":"og:description","content":"将列表转换为逗号分隔的字符串 列表转换仍然是一个热门话题，因为这是Java开发人员经常进行的操作。在本教程中，我们将学习如何使用四种不同的方法将字符串列表转换为逗号分隔的字符串。 1. 引言 2. 使用Java 8+ 我们将使用Java 8中可用的三个不同类及其方法进行转换。 让我们以下面的列表作为即将到来的例子的输入： 首先，我们将使用String类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T05:48:43.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 8"}],["meta",{"property":"article:tag","content":"String"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T05:48:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将列表转换为逗号分隔的字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T05:48:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将列表转换为逗号分隔的字符串 列表转换仍然是一个热门话题，因为这是Java开发人员经常进行的操作。在本教程中，我们将学习如何使用四种不同的方法将字符串列表转换为逗号分隔的字符串。 1. 引言 2. 使用Java 8+ 我们将使用Java 8中可用的三个不同类及其方法进行转换。 让我们以下面的列表作为即将到来的例子的输入： 首先，我们将使用String类..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用Java 8+","slug":"_2-使用java-8","link":"#_2-使用java-8","children":[]},{"level":2,"title":"3. 使用Apache Commons Lang","slug":"_3-使用apache-commons-lang","link":"#_3-使用apache-commons-lang","children":[]},{"level":2,"title":"4. 使用Spring Core","slug":"_4-使用spring-core","link":"#_4-使用spring-core","children":[]},{"level":2,"title":"5. 使用Google Guava","slug":"_5-使用google-guava","link":"#_5-使用google-guava","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720936123000,"updatedTime":1720936123000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.07,"words":1220},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Convert a List to a Comma Separated String.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>列表转换仍然是一个热门话题，因为这是Java开发人员经常进行的操作。在本教程中，我们将学习如何使用四种不同的方法将字符串列表转换为逗号分隔的字符串。</p>\\n<h2>1. 引言</h2>\\n<h2>2. 使用Java 8+</h2>\\n<p>我们将使用Java 8中可用的三个不同类及其方法进行转换。</p>\\n<p>让我们以下面的列表作为即将到来的例子的输入：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span>``<span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">&gt;</span></span>`` arraysAsList <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">Arrays</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">asList</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"ONE\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"TWO\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\\"THREE\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
