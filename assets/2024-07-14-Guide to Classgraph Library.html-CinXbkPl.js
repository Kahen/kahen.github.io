import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-BMOUrRO4.js";const p={},e=t(`<hr><h1 id="classgraph库指南" tabindex="-1"><a class="header-anchor" href="#classgraph库指南"><span>Classgraph库指南</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本简短的教程中，我们将讨论Classgraph库——它的作用以及我们如何使用它。</p><p><strong>Classgraph帮助我们在Java类路径中找到目标资源，构建有关发现的资源的元数据，并提供方便的API来处理这些元数据。</strong></p><p>这种用例在基于Spring的应用中非常流行，其中用模式注解标记的组件会自动注册到应用上下文中。然而，我们也可以利用这种方法来执行自定义任务。例如，我们可能想要找到所有带有特定注解的类，或者所有具有特定名称的资源文件。</p><p>最酷的是，<strong>Classgraph速度很快，因为它在字节码级别工作</strong>，这意味着检查的类不会被加载到JVM中，并且它不使用反射来处理。</p><h2 id="_2-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven依赖"><span>2. Maven依赖</span></a></h2><p>首先，让我们将classgraph库添加到我们的_pom.xml_中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`io.github.classgraph\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`classgraph\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`4.8.153\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在接下来的部分中，我们将查看使用库API的几个实际示例。</p><h2 id="_3-基本用法" tabindex="-1"><a class="header-anchor" href="#_3-基本用法"><span>3. 基本用法</span></a></h2><p><strong>使用库有三个基本步骤：</strong></p><ol><li>设置扫描选项——例如，目标包</li><li>执行扫描</li><li>使用扫描结果</li></ol><p>让我们为我们的示例设置创建以下领域：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token constant">METHOD</span><span class="token punctuation">,</span> <span class="token constant">FIELD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">TestAnnotation</span> <span class="token punctuation">{</span>

    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@TestAnnotation</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClassWithAnnotation</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们看看上述三个步骤的一个示例，即查找带有_@TestAnnotation_的类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ScanResult</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableClassInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableAnnotationInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whitelistPackages</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ClassInfoList</span> classInfos <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getClassesWithAnnotation</span><span class="token punctuation">(</span><span class="token class-name">TestAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>classInfos<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">ClassInfo</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">ClassWithAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们分解上述示例：</p><ul><li>我们首先<strong>设置扫描选项</strong>（我们配置了扫描器仅解析类和注解信息，并指示它仅解析目标包中的文件）</li><li>我们使用_ClassGraph.scan()_方法<strong>执行了扫描</strong></li><li>我们使用_ScanResult_通过调用_getClassWithAnnotation()_方法找到注解的类</li></ul><p>正如我们接下来的例子中也会看到的，<em>ScanResult_对象可以包含大量关于我们想要检查的API的信息，例如_ClassInfoList</em>。</p><h2 id="_4-按方法注解过滤" tabindex="-1"><a class="header-anchor" href="#_4-按方法注解过滤"><span>4. 按方法注解过滤</span></a></h2><p>让我们扩展我们的示例到方法注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodWithAnnotation</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@TestAnnotation</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">service</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以使用类似的方法——_getClassesWithMethodAnnotations()_来找到所有具有目标注解标记的方法的类：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ScanResult</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableAllInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whitelistPackages</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ClassInfoList</span> classInfos <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getClassesWithMethodAnnotation</span><span class="token punctuation">(</span><span class="token class-name">TestAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>classInfos<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">ClassInfo</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">MethodWithAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>该方法返回一个_ClassInfoList_对象，其中包含与扫描匹配的类的相关信息。</strong></p><h2 id="_5-按注解参数过滤" tabindex="-1"><a class="header-anchor" href="#_5-按注解参数过滤"><span>5. 按注解参数过滤</span></a></h2><p>让我们也看看如何找到所有用目标注解标记的方法，并且具有目标注解参数值的类。</p><p>首先，让我们定义包含具有_@TestAnnotation_的方法的类，具有2个不同的参数值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodWithAnnotationParameterDao</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@TestAnnotation</span><span class="token punctuation">(</span><span class="token string">&quot;dao&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">service</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MethodWithAnnotationParameterWeb</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@TestAnnotation</span><span class="token punctuation">(</span><span class="token string">&quot;web&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">service</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们遍历_ClassInfoList_结果，并验证每个方法的注解：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ScanResult</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableAllInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whitelistPackages</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ClassInfoList</span> classInfos <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getClassesWithMethodAnnotation</span><span class="token punctuation">(</span><span class="token class-name">TestAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ClassInfoList</span> webClassInfos <span class="token operator">=</span> classInfos<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>classInfo <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> classInfo<span class="token punctuation">.</span><span class="token function">getMethodInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">anyMatch</span><span class="token punctuation">(</span>methodInfo <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">AnnotationInfo</span> annotationInfo <span class="token operator">=</span> methodInfo<span class="token punctuation">.</span><span class="token function">getAnnotationInfo</span><span class="token punctuation">(</span><span class="token class-name">TestAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>annotationInfo <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token string">&quot;web&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>annotationInfo<span class="token punctuation">.</span><span class="token function">getParameterValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token string">&quot;value&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>webClassInfos<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">ClassInfo</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">MethodWithAnnotationParameterWeb</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用了_AnnotationInfo_和_MethodInfo_元数据类来找到我们想要检查的方法和注解的元数据。</strong></p><h2 id="_6-按字段注解过滤" tabindex="-1"><a class="header-anchor" href="#_6-按字段注解过滤"><span>6. 按字段注解过滤</span></a></h2><p>我们还可以使用_getClassesWithFieldAnnotation()_方法根据字段注解过滤_ClassInfoList_结果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FieldWithAnnotation</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@TestAnnotation</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ScanResult</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">enableAllInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whitelistPackages</span><span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPackage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ClassInfoList</span> classInfos <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getClassesWithFieldAnnotation</span><span class="token punctuation">(</span><span class="token class-name">TestAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThat</span><span class="token punctuation">(</span>classInfos<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">ClassInfo</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">FieldWithAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-查找资源" tabindex="-1"><a class="header-anchor" href="#_7-查找资源"><span>7. 查找资源</span></a></h2><p>最后，我们来看看如何找到有关类路径资源的信息。</p><p>让我们在_classgraph_类路径根目录下创建一个资源文件——例如，<em>src/test/resources/classgraph/my.config</em>——并给它一些内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>my data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在可以找到资源并获取它的内容：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ScanResult</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassGraph</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">whitelistPaths</span><span class="token punctuation">(</span><span class="token string">&quot;classgraph&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ResourceList</span> resources <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getResourcesWithExtension</span><span class="token punctuation">(</span><span class="token string">&quot;config&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>resources<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">extracting</span><span class="token punctuation">(</span><span class="token class-name">Resource</span><span class="token operator">::</span><span class="token function">getPath</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">containsOnly</span><span class="token punctuation">(</span><span class="token string">&quot;classgraph/my.config&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertThat</span><span class="token punctuation">(</span>resources<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getContentAsString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isEqualTo</span><span class="token punctuation">(</span><span class="token string">&quot;my data&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到我们使用了_ScanResult&#39;_的_getResourcesWithExtension()_方法来查找我们的特定文件。<strong>这个类还有一些其他有用的与资源相关的方法是，如_getAllResources(), getResourcesWithPath()_和</strong><em>getResourcesWithPattern()</em>。</p><p>这些方法返回一个_ResourceList_对象，可以进一步用于迭代和操作_Resource_对象。</p><h2 id="_8-实例化" tabindex="-1"><a class="header-anchor" href="#_8-实例化"><span>8. 实例化</span></a></h2><p>当我们想要实例化找到的类时，非常重要的一点是不要通过_Class.forName_来实现，而是使用库方法_ClassInfo.loadClass_。</p><p>原因是Classgraph使用它自己的类加载器从一些JAR文件中加载类。因此，如果我们使用_Class.forName_，相同的类可能会被不同的类加载器多次加载，这可能会导致非平凡的错误。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们学习了如何有效地使用Classgraph库查找类路径资源并检查它们的内容。</p><p>像往常一样，本文的完整源代码可在GitHub上获得。</p>`,54),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-14-Guide to Classgraph Library.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20Classgraph%20Library.html","title":"Classgraph库指南","lang":"zh-CN","frontmatter":{"date":"2024-07-14T00:00:00.000Z","category":["Java","编程"],"tag":["Classgraph","Java库"],"head":[["meta",{"name":"keywords","content":"Classgraph, Java类路径扫描, 元数据构建, 快速, 字节码级别, Spring应用"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Guide%20to%20Classgraph%20Library.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Classgraph库指南"}],["meta",{"property":"og:description","content":"Classgraph库指南 1. 概述 在本简短的教程中，我们将讨论Classgraph库——它的作用以及我们如何使用它。 Classgraph帮助我们在Java类路径中找到目标资源，构建有关发现的资源的元数据，并提供方便的API来处理这些元数据。 这种用例在基于Spring的应用中非常流行，其中用模式注解标记的组件会自动注册到应用上下文中。然而，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T06:51:50.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Classgraph"}],["meta",{"property":"article:tag","content":"Java库"}],["meta",{"property":"article:published_time","content":"2024-07-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T06:51:50.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Classgraph库指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T06:51:50.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Classgraph库指南 1. 概述 在本简短的教程中，我们将讨论Classgraph库——它的作用以及我们如何使用它。 Classgraph帮助我们在Java类路径中找到目标资源，构建有关发现的资源的元数据，并提供方便的API来处理这些元数据。 这种用例在基于Spring的应用中非常流行，其中用模式注解标记的组件会自动注册到应用上下文中。然而，我们..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven依赖","slug":"_2-maven依赖","link":"#_2-maven依赖","children":[]},{"level":2,"title":"3. 基本用法","slug":"_3-基本用法","link":"#_3-基本用法","children":[]},{"level":2,"title":"4. 按方法注解过滤","slug":"_4-按方法注解过滤","link":"#_4-按方法注解过滤","children":[]},{"level":2,"title":"5. 按注解参数过滤","slug":"_5-按注解参数过滤","link":"#_5-按注解参数过滤","children":[]},{"level":2,"title":"6. 按字段注解过滤","slug":"_6-按字段注解过滤","link":"#_6-按字段注解过滤","children":[]},{"level":2,"title":"7. 查找资源","slug":"_7-查找资源","link":"#_7-查找资源","children":[]},{"level":2,"title":"8. 实例化","slug":"_8-实例化","link":"#_8-实例化","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1720939910000,"updatedTime":1720939910000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.23,"words":1270},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Guide to Classgraph Library.md","localizedDate":"2024年7月14日","excerpt":"<hr>\\n<h1>Classgraph库指南</h1>\\n<h2>1. 概述</h2>\\n<p>在本简短的教程中，我们将讨论Classgraph库——它的作用以及我们如何使用它。</p>\\n<p><strong>Classgraph帮助我们在Java类路径中找到目标资源，构建有关发现的资源的元数据，并提供方便的API来处理这些元数据。</strong></p>\\n<p>这种用例在基于Spring的应用中非常流行，其中用模式注解标记的组件会自动注册到应用上下文中。然而，我们也可以利用这种方法来执行自定义任务。例如，我们可能想要找到所有带有特定注解的类，或者所有具有特定名称的资源文件。</p>\\n<p>最酷的是，<strong>Classgraph速度很快，因为它在字节码级别工作</strong>，这意味着检查的类不会被加载到JVM中，并且它不使用反射来处理。</p>","autoDesc":true}');export{r as comp,d as data};
