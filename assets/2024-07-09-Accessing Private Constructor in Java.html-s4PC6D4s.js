import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CJGTm_7y.js";const r={},s=n(`<h1 id="java中访问私有构造函数" tabindex="-1"><a class="header-anchor" href="#java中访问私有构造函数"><span>Java中访问私有构造函数</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在本教程中，我们将探讨为什么在Java中我们会使用类的私有构造函数以及如何使用它。</p><h2 id="_2-为什么要使用私有构造函数" tabindex="-1"><a class="header-anchor" href="#_2-为什么要使用私有构造函数"><span>2. 为什么要使用私有构造函数？</span></a></h2><p>在Java中，我们可以使用<code>private</code>访问修饰符声明一个构造函数。<strong>如果一个构造函数被声明为私有，我们不能在类之外创建该类的实例。</strong></p><p>私有构造函数的使用场景是当我们想要限制一个类的对象实例化方式时。例如，我们可能只想通过一个工厂类来创建对象。或者另一种情况是我们只想拥有该类的一个对象实例。</p><p>私有构造函数最常用的情况是单例、建造者和工厂模式，这些是创建型设计模式。</p><p>现在，我们可以想象这些模式的任何组合，因为它们可以很好地融合在一起，实现一个健壮的代码库。</p><p>通常，为了调用私有构造函数，上述使用情况中有其他公共方法会在类内部调用私有构造函数。</p><p>另外，<strong>我们可以使用Java反射API直接访问私有构造函数。</strong></p><p>Java反射API是一个高级特性，它允许程序检查和修改在JVM中运行的应用程序的运行时行为。因此，<strong>使用这种方法并不推荐，因为它可能导致难以发现和修复bug。</strong></p><p>使用反射，我们可以看到任何类的方法和属性，并绕过访问修饰符进行修改或访问。</p><p>**使用反射最常见的情况是对具有私有方法的类进行单元测试。**要使用反射对私有构造函数或方法进行单元测试，我们需要执行以下步骤：</p><ul><li>获取我们想要实例化的类的类对象</li><li>使用类对象，调用<code>getDeclaredConstructor()</code>方法获取<code>Constructor</code>对象</li><li>在<code>Constructor</code>对象上，调用<code>setAccessible()</code>方法使构造函数可访问</li><li><code>Constructor</code>对象可访问后，我们可以调用<code>newInstance()</code>方法，它将创建该类的一个新对象</li></ul><p>让我们创建一个带有私有构造函数的类。然后我们将使用Java反射API实例化它，并确保私有构造函数被调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private PrivateConstructorClass() {
    System.out.println(&quot;Used the private constructor!&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们添加一个单元测试，使用私有构造函数实例化这个类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenConstructorIsPrivate_thenInstanceSuccess() throws Exception {
    Constructor\`&lt;PrivateConstructorClass&gt;\` pcc = PrivateConstructorClass.class.getDeclaredConstructor();
    pcc.setAccessible(true);
    PrivateConstructorClass privateConstructorInstance = pcc.newInstance();
    Assertions.assertTrue(privateConstructorInstance instanceof PrivateConstructorClass);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在控制台输出中，我们应该看到私有构造函数被调用，并且构造函数内的打印显示了消息。<strong>尽管有私有访问修饰符，我们现在可以调用私有构造函数并实例化新对象。</strong></p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们看到了为什么我们会使用私有构造函数以及几种不同的使用方式。我们还了解到我们可以创建公共方法来访问私有构造函数，或者使用高级的Java反射API进行更高级的方法。</p><p>如常，这些示例的完整实现可以在GitHub上找到。</p><p>OK</p>`,23),o=[s];function i(c,l){return a(),t("div",null,o)}const v=e(r,[["render",i],["__file","2024-07-09-Accessing Private Constructor in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Accessing%20Private%20Constructor%20in%20Java.html","title":"Java中访问私有构造函数","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","设计模式"],"tag":["私有构造函数","反射API"],"head":[["meta",{"name":"keywords","content":"Java, 私有构造函数, 设计模式, 反射API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Accessing%20Private%20Constructor%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中访问私有构造函数"}],["meta",{"property":"og:description","content":"Java中访问私有构造函数 1. 概述 在本教程中，我们将探讨为什么在Java中我们会使用类的私有构造函数以及如何使用它。 2. 为什么要使用私有构造函数？ 在Java中，我们可以使用private访问修饰符声明一个构造函数。如果一个构造函数被声明为私有，我们不能在类之外创建该类的实例。 私有构造函数的使用场景是当我们想要限制一个类的对象实例化方式时。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T07:34:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"私有构造函数"}],["meta",{"property":"article:tag","content":"反射API"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T07:34:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中访问私有构造函数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T07:34:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中访问私有构造函数 1. 概述 在本教程中，我们将探讨为什么在Java中我们会使用类的私有构造函数以及如何使用它。 2. 为什么要使用私有构造函数？ 在Java中，我们可以使用private访问修饰符声明一个构造函数。如果一个构造函数被声明为私有，我们不能在类之外创建该类的实例。 私有构造函数的使用场景是当我们想要限制一个类的对象实例化方式时。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 为什么要使用私有构造函数？","slug":"_2-为什么要使用私有构造函数","link":"#_2-为什么要使用私有构造函数","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720510494000,"updatedTime":1720510494000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.85,"words":856},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Accessing Private Constructor in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在本教程中，我们将探讨为什么在Java中我们会使用类的私有构造函数以及如何使用它。</p>\\n<h2>2. 为什么要使用私有构造函数？</h2>\\n<p>在Java中，我们可以使用<code>private</code>访问修饰符声明一个构造函数。<strong>如果一个构造函数被声明为私有，我们不能在类之外创建该类的实例。</strong></p>\\n<p>私有构造函数的使用场景是当我们想要限制一个类的对象实例化方式时。例如，我们可能只想通过一个工厂类来创建对象。或者另一种情况是我们只想拥有该类的一个对象实例。</p>\\n<p>私有构造函数最常用的情况是单例、建造者和工厂模式，这些是创建型设计模式。</p>","autoDesc":true}');export{v as comp,u as data};
