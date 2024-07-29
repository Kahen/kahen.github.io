import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-BUAgDejY.js";const l={},i=n('<h1 id="junit中java-lang-noclassdeffounderror的错误及其解决方法" tabindex="-1"><a class="header-anchor" href="#junit中java-lang-noclassdeffounderror的错误及其解决方法"><span>JUnit中java.lang.NoClassDefFoundError的错误及其解决方法</span></a></h1><p>在本文中，我们将理解为什么JUnit中会出现_java.lang.NoClassDefFoundError_错误以及如何修复它。这个问题主要与IDE的配置有关。因此，我们将专注于最流行的IDE：Visual Studio Code、Eclipse和IntelliJ，来重现和解决这个错误。</p><p>当Java运行时运行Java程序时，它不会一次性加载所有类和依赖项。相反，它调用Java类加载器按需加载类到内存中。<strong>在加载类时，如果类加载器找不到类的声明，它会抛出_NoClassDefFoundError_。</strong></p><p>Java找不到类定义有几个原因，包括：</p><ul><li>缺少一些依赖jar，这是最常见的原因。</li><li>所有jar都添加为依赖，但路径错误。</li><li>依赖项中的版本不匹配。</li></ul><h3 id="_3-vs-code" tabindex="-1"><a class="header-anchor" href="#_3-vs-code"><span>3. VS Code</span></a></h3><p>对于编写JUnit4测试用例，我们需要JUnit4 jar。然而，<strong>JUnit4对_hamcrest-core_ jar有内部依赖。</strong></p><p>如果我们在类路径中错过了将_hamcrest-core_ jar作为依赖项添加，Java就会抛出_NoClassDefFoundError_。类路径如下所示： <img src="https://www.baeldung.com/wp-content/uploads/2021/07/j1.png" alt="img" loading="lazy"></p><p>另一种情况是，我们添加了这两个jar，但版本不匹配。例如，如果我们添加了JUnit jar版本4.13.2和_hamcrest-core_ jar版本2.2，就会抛出_NoClassDefFoundError_： <img src="https://www.baeldung.com/wp-content/uploads/2021/07/j2.png" alt="img" loading="lazy"></p><p>在这两种情况下，打印了相同的堆栈跟踪：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.NoClassDefFoundError: org/hamcrest/SelfDescribing\n    at java.base/java.lang.ClassLoader.defineClass1(Native Method)\n    at java.base/java.lang.ClassLoader.defineClass(ClassLoader.java:1010)\n    at java.base/java.security.SecureClassLoader.defineClass(SecureClassLoader.java:150)\n    at java.base/jdk.internal.loader.BuiltinClassLoader.defineClass(BuiltinClassLoader.java:855)\n    at java.base/jdk.internal.loader.BuiltinClassLoader.findClassOnClassPathOrNull(BuiltinClassLoader.java:753)\n    at java.base/jdk.internal.loader.BuiltinClassLoader.loadClassOrNull(BuiltinClassLoader.java:676) ...\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要解决这两种情况（缺少依赖项和版本不匹配）的错误，我们需要添加正确的依赖项。在JUnit4的情况下，正确的依赖项是_junit-4.13.2.jar_和_hamcrest-core-1.3.jar_。将这两个jar添加到依赖项（引用库）中可以解决错误。在VS Code中添加和删除外部jar的说明在这里。我们的引用库部分应该设置为： <img src="https://www.baeldung.com/wp-content/uploads/2021/07/j3.png" alt="img" loading="lazy"></p><h3 id="_4-eclipse" tabindex="-1"><a class="header-anchor" href="#_4-eclipse"><span>4. Eclipse</span></a></h3><p>在支持Java 9及以上版本的Eclipse IDE中，我们有一个类路径和一个模块路径。要解决模块依赖，我们使用模块路径。然而，<strong>在模块路径中添加外部jar不会使它们对类加载器可用</strong>。因此，类加载器将它们视为缺失的依赖项，并抛出_NoClassDefFoundError_。</p><p>因此，如果我们的依赖项看起来像下图，运行JUnit测试用例将导致_NoClassDefFoundError:_ <img src="https://www.baeldung.com/wp-content/uploads/2021/07/eclipse_modulePath.png" alt="img" loading="lazy"></p><p>运行JUnit测试时生成的堆栈跟踪是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.NoClassDefFoundError: org/junit/runner/manipulation/Filter\n    at java.base/java.lang.Class.forName0(Native Method)\n    at java.base/java.lang.Class.forName(Class.java:377)\n    at org.eclipse.jdt.internal.junit.runner.RemoteTestRunner.loadTestLoaderClass(RemoteTestRunner.java:381)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Eclipse中，我们需要将jar添加到类路径而不是模块路径下。因此，要正确添加外部jar，请按照路径操作： 右键点击项目 -&gt; 构建路径 -&gt; 配置构建路径</p><p>在打开的窗口中，从模块路径下移除jar，并将它们添加到类路径下。这将解决_NoClassDefFoundError_。运行JUnit的正确类路径应该是类似的： <img src="https://www.baeldung.com/wp-content/uploads/2021/07/eclipse_correct_setup.png" alt="img" loading="lazy"></p><h3 id="_5-intellij" tabindex="-1"><a class="header-anchor" href="#_5-intellij"><span>5. IntelliJ</span></a></h3><p>**运行JUnit 5测试用例需要Jupiter引擎和Jupiter API。**Jupiter引擎内部依赖于Jupiter API，因此，大多数时候，在pom.xml中只添加Jupiter引擎依赖就足够了。然而，如果我们在_pom.xml_中只添加了Jupiter API依赖，而错过了Jupiter引擎依赖，就会得到_NoClassDefFoundError_。</p><p>_pom.xml_中的不正确设置如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependencies&gt;``\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```org.junit.jupiter```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```junit-jupiter-api```&lt;/artifactId&gt;```\n        ```&lt;version&gt;```5.11.0-M2```&lt;/version&gt;```\n        ```&lt;scope&gt;```test```&lt;/scope&gt;```\n    ```&lt;/dependency&gt;```\n``&lt;/dependencies&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用此设置运行简单测试用例将导致以下堆栈跟踪：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.lang.NoClassDefFoundError: org/junit/platform/engine/TestDescriptor\n    at java.base/java.lang.Class.forName0(Native Method)\n    at java.base/java.lang.Class.forName(Class.java:375)\n    at com.intellij.rt.junit.JUnitStarter.getAgentClass(JUnitStarter.java:230)\n....\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在IntelliJ中，要纠正依赖项，我们需要纠正_pom.xml_。修正后的_pom.xml_看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>``&lt;dependencies&gt;``\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```org.junit.jupiter```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```junit-jupiter-api```&lt;/artifactId&gt;```\n        ```&lt;version&gt;```5.11.0-M2```&lt;/version&gt;```\n        ```&lt;scope&gt;```test```&lt;/scope&gt;```\n    ```&lt;/dependency&gt;```\n    ```&lt;dependency&gt;```\n        ```&lt;groupId&gt;```org.junit.jupiter```&lt;/groupId&gt;```\n        ```&lt;artifactId&gt;```junit-jupiter-engine```&lt;/artifactId&gt;```\n        ```&lt;version&gt;```5.11.0-M2```&lt;/version&gt;```\n        ```&lt;scope&gt;```test```&lt;/scope&gt;```\n    ```&lt;/dependency&gt;```\n``&lt;/dependencies&gt;``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，我们可以添加_junit-jupiter-engine_，因为添加它会自动将_junit-jupiter-api_ jar添加到类路径中，并解决错误。</p><h3 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. 总结</span></a></h3><p>在本文中，我们看到了JUnit中发生_java.lang.NoClassDefFoundError_的不同原因。我们还看到了如何在不同的IDE中解决这个错误。本教程的全部代码可在GitHub上找到。</p>',30),s=[i];function r(o,d){return t(),a("div",null,s)}const u=e(l,[["render",r],["__file","2024-07-28-The java.lang.NoClassDefFoundError in JUnit.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-28/2024-07-28-The%20java.lang.NoClassDefFoundError%20in%20JUnit.html","title":"JUnit中java.lang.NoClassDefFoundError的错误及其解决方法","lang":"zh-CN","frontmatter":{"date":"2021-07-28T00:00:00.000Z","category":["Java","JUnit"],"tag":["NoClassDefFoundError","JUnit"],"head":[["meta",{"name":"keywords","content":"Java, JUnit, NoClassDefFoundError"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-28/2024-07-28-The%20java.lang.NoClassDefFoundError%20in%20JUnit.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JUnit中java.lang.NoClassDefFoundError的错误及其解决方法"}],["meta",{"property":"og:description","content":"JUnit中java.lang.NoClassDefFoundError的错误及其解决方法 在本文中，我们将理解为什么JUnit中会出现_java.lang.NoClassDefFoundError_错误以及如何修复它。这个问题主要与IDE的配置有关。因此，我们将专注于最流行的IDE：Visual Studio Code、Eclipse和Intelli..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/07/j1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-28T04:05:13.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"NoClassDefFoundError"}],["meta",{"property":"article:tag","content":"JUnit"}],["meta",{"property":"article:published_time","content":"2021-07-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-28T04:05:13.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JUnit中java.lang.NoClassDefFoundError的错误及其解决方法\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/07/j1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/07/j2.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/07/j3.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/07/eclipse_modulePath.png\\",\\"https://www.baeldung.com/wp-content/uploads/2021/07/eclipse_correct_setup.png\\"],\\"datePublished\\":\\"2021-07-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-28T04:05:13.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JUnit中java.lang.NoClassDefFoundError的错误及其解决方法 在本文中，我们将理解为什么JUnit中会出现_java.lang.NoClassDefFoundError_错误以及如何修复它。这个问题主要与IDE的配置有关。因此，我们将专注于最流行的IDE：Visual Studio Code、Eclipse和Intelli..."},"headers":[{"level":3,"title":"3. VS Code","slug":"_3-vs-code","link":"#_3-vs-code","children":[]},{"level":3,"title":"4. Eclipse","slug":"_4-eclipse","link":"#_4-eclipse","children":[]},{"level":3,"title":"5. IntelliJ","slug":"_5-intellij","link":"#_5-intellij","children":[]},{"level":3,"title":"6. 总结","slug":"_6-总结","link":"#_6-总结","children":[]}],"git":{"createdTime":1722139513000,"updatedTime":1722139513000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.53,"words":1059},"filePathRelative":"posts/baeldung/2024-07-28/2024-07-28-The java.lang.NoClassDefFoundError in JUnit.md","localizedDate":"2021年7月28日","excerpt":"\\n<p>在本文中，我们将理解为什么JUnit中会出现_java.lang.NoClassDefFoundError_错误以及如何修复它。这个问题主要与IDE的配置有关。因此，我们将专注于最流行的IDE：Visual Studio Code、Eclipse和IntelliJ，来重现和解决这个错误。</p>\\n<p>当Java运行时运行Java程序时，它不会一次性加载所有类和依赖项。相反，它调用Java类加载器按需加载类到内存中。<strong>在加载类时，如果类加载器找不到类的声明，它会抛出_NoClassDefFoundError_。</strong></p>\\n<p>Java找不到类定义有几个原因，包括：</p>","autoDesc":true}');export{u as comp,v as data};
