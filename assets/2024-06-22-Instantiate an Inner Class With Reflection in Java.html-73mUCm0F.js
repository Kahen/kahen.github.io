import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-YddbDb53.js";const p={},e=t(`<h1 id="使用java反射api实例化内部类" tabindex="-1"><a class="header-anchor" href="#使用java反射api实例化内部类"><span>使用Java反射API实例化内部类</span></a></h1><p>在本教程中，我们将讨论如何使用Java反射API来实例化内部类或嵌套类。</p><p>反射API在需要读取Java类的构造并动态实例化类的场合中尤为重要。特定场景包括扫描注解、查找并使用bean名称实例化Java bean等。Spring和Hibernate等流行库以及代码分析工具广泛使用它。</p><p>与普通类相比，实例化内部类存在挑战。让我们进一步探索。</p><h2 id="_2-内部类编译" tabindex="-1"><a class="header-anchor" href="#_2-内部类编译"><span>2. 内部类编译</span></a></h2><p>要使用Java反射API对内部类进行操作，我们必须了解编译器如何处理它。首先，我们定义一个_Person_类，我们将使用它来演示实例化内部类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token class-name">Address</span> address<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Address</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> zip<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token class-name">String</span> zip<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>zip <span class="token operator">=</span> zip<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Person_类有两个内部类，<em>Address_和_Builder</em>。_Address_类是非静态的，因为在现实世界中，地址大多与个人的实例绑定。然而，_Builder_是静态的，因为它需要在我们可以实例化_Person_类之前就存在。</p><p><strong>编译器为内部类创建单独的类文件，而不是将它们嵌入到外部类中。</strong> 在这种情况下，我们看到编译器总共创建了三个类：</p><p>编译器生成了_Person_类，并有趣的是，它还创建了两个内部类，名称为_Person$Address_和_Person$Builder_。</p><p>下一步是了解内部类的构造函数：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenInnerClass_whenUseReflection_thenShowConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> personBuilderClassName <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.reflection.innerclass.Person$Builder&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> personAddressClassName <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.reflection.innerclass.Person$Address&quot;</span><span class="token punctuation">;</span>
    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">logConstructors</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>personAddressClassName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertDoesNotThrow</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">logConstructors</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>personBuilderClassName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">logConstructors</span><span class="token punctuation">(</span><span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\` clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>clazz<span class="token punctuation">.</span><span class="token function">getDeclaredConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>c <span class="token operator">-&gt;</span> <span class="token function">formatConstructorSignature</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>logger<span class="token operator">::</span><span class="token function">info</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">formatConstructorSignature</span><span class="token punctuation">(</span><span class="token class-name">Constructor</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span>\`\` constructor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> params <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span>constructor<span class="token punctuation">.</span><span class="token function">getParameters</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>parameter <span class="token operator">-&gt;</span> parameter<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> parameter<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">joining</span><span class="token punctuation">(</span><span class="token string">&quot;, &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> constructor<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;(&quot;</span> <span class="token operator">+</span> params <span class="token operator">+</span> <span class="token string">&quot;)&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Class.forName()</em> 接受内部类的完全限定名称，并返回_Class_对象。进一步，使用这个_Class_对象，我们可以使用_logConstructors()_方法获取构造函数的详细信息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>reflection<span class="token punctuation">.</span>innerclass<span class="token punctuation">.</span></span>Person</span>$<span class="token class-name">Address</span><span class="token punctuation">(</span><span class="token class-name">Person</span> <span class="token keyword">this</span>$<span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">String</span> zip<span class="token punctuation">)</span>
<span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>baeldung<span class="token punctuation">.</span>reflection<span class="token punctuation">.</span>innerclass<span class="token punctuation">.</span></span>Person</span>$<span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>令人惊讶的是，在非静态_Person$Address_类的构造函数中，编译器注入了持有外部_Person_类引用的第一个参数this$0。但是静态类_Person$Builder_的构造函数中没有外部类的引用。</strong></p><p>我们将记住Java编译器在实例化内部类时的这种行为。</p><h2 id="_3-实例化静态内部类" tabindex="-1"><a class="header-anchor" href="#_3-实例化静态内部类"><span>3. 实例化静态内部类</span></a></h2><p><strong>实例化静态内部类几乎与实例化任何普通类相似</strong>，使用_Class.forName(String className)_方法：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenStaticInnerClass_whenUseReflection_thenInstantiate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span>
      <span class="token class-name">InstantiationException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> personBuilderClassName <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.reflection.innerclass.Person$Builder&quot;</span><span class="token punctuation">;</span>
    <span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">&gt;</span></span>\`\` personBuilderClass <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">)</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>personBuilderClassName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person<span class="token punctuation">.</span>Builder</span> personBuilderObj <span class="token operator">=</span> personBuilderClass<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>personBuilderObj <span class="token keyword">instanceof</span> <span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们传递了内部类的完全限定名称_“com.baeldung.reflection.innerclass.Person$Builder”<em>到_Class.forName</em>。然后我们调用了_Person.Builder_类的构造函数上的_newInstance()<em>方法来获取_personBuilderObj</em>。</p><h2 id="_4-实例化非静态内部类" tabindex="-1"><a class="header-anchor" href="#_4-实例化非静态内部类"><span>4. 实例化非静态内部类</span></a></h2><p>正如我们之前看到的，<strong>Java编译器将对外部类的引用作为第一个参数注入到非静态内部类的构造函数中。</strong></p><p>有了这些知识，让我们尝试实例化_Person.Address_类：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">givenNonStaticInnerClass_whenUseReflection_thenInstantiate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">NoSuchMethodException</span><span class="token punctuation">,</span> <span class="token class-name">InvocationTargetException</span><span class="token punctuation">,</span>
      <span class="token class-name">InstantiationException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span> <span class="token punctuation">{</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> personClassName <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.reflection.innerclass.Person&quot;</span><span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token class-name">String</span> personAddressClassName <span class="token operator">=</span> <span class="token string">&quot;com.baeldung.reflection.innerclass.Person$Address&quot;</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\` personClass <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Class</span>\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">&gt;</span></span>\`\`<span class="token punctuation">)</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>personClassName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person</span> personObj <span class="token operator">=</span> personClass<span class="token punctuation">.</span><span class="token function">getConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person<span class="token punctuation">.</span>Address</span><span class="token punctuation">&gt;</span></span>\`\`\` personAddressClass <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Class</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person<span class="token punctuation">.</span>Address</span><span class="token punctuation">&gt;</span></span>\`\`\`<span class="token punctuation">)</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>personAddressClassName<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">NoSuchMethodException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> personAddressClass<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Constructor</span>\`\`\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person<span class="token punctuation">.</span>Address</span><span class="token punctuation">&gt;</span></span>\`\`\` constructorOfPersonAddress <span class="token operator">=</span> personAddressClass<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Person<span class="token punctuation">.</span>Address</span> personAddressObj <span class="token operator">=</span> constructorOfPersonAddress<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span>personObj<span class="token punctuation">,</span> <span class="token string">&quot;751003&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assertTrue</span><span class="token punctuation">(</span>personAddressObj <span class="token keyword">instanceof</span> <span class="token class-name">Person<span class="token punctuation">.</span>Address</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们创建了_Person_对象。然后，我们将内部类的完全限定名称_“com.baeldung.reflection.innerclass.Person$Address”<em>传递给_Class.forName</em>。接下来，我们从_personAddressClass_获取构造函数_Address(Person this$0, String zip)_。</p><p>最后，我们调用构造函数上的_newInstance()<em>方法，并使用_personObj_和_zip 751003_参数来获取_personAddressObj</em>。</p><p>我们还看到，由于缺少第一个参数_this$0_，方法_personAddressClass.getDeclaredConstructor(String.class)<em>抛出了_NoSuchMethodException</em>。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们讨论了使用Java反射API来实例化静态和非静态内部类。我们发现编译器将内部类视为外部类，而不是嵌入到外部类中的类。</p><p>另外，非静态内部类的构造函数默认接受外部类对象作为第一个参数。然而，我们可以像实例化任何普通类一样实例化静态类。</p><p>如常，使用的代码可以在GitHub上找到。</p>`,31),o=[e];function c(l,i){return a(),s("div",null,o)}const k=n(p,[["render",c],["__file","2024-06-22-Instantiate an Inner Class With Reflection in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-06-22/2024-06-22-Instantiate%20an%20Inner%20Class%20With%20Reflection%20in%20Java.html","title":"使用Java反射API实例化内部类","lang":"zh-CN","frontmatter":{"date":"2024-06-23T00:00:00.000Z","category":["Java","编程"],"tag":["Java反射","内嵌类实例化"],"head":[["meta",{"name":"keywords","content":"Java, 反射, 内嵌类, 实例化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-22/2024-06-22-Instantiate%20an%20Inner%20Class%20With%20Reflection%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java反射API实例化内部类"}],["meta",{"property":"og:description","content":"使用Java反射API实例化内部类 在本教程中，我们将讨论如何使用Java反射API来实例化内部类或嵌套类。 反射API在需要读取Java类的构造并动态实例化类的场合中尤为重要。特定场景包括扫描注解、查找并使用bean名称实例化Java bean等。Spring和Hibernate等流行库以及代码分析工具广泛使用它。 与普通类相比，实例化内部类存在挑战..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-22T23:28:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java反射"}],["meta",{"property":"article:tag","content":"内嵌类实例化"}],["meta",{"property":"article:published_time","content":"2024-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-22T23:28:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java反射API实例化内部类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-22T23:28:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java反射API实例化内部类 在本教程中，我们将讨论如何使用Java反射API来实例化内部类或嵌套类。 反射API在需要读取Java类的构造并动态实例化类的场合中尤为重要。特定场景包括扫描注解、查找并使用bean名称实例化Java bean等。Spring和Hibernate等流行库以及代码分析工具广泛使用它。 与普通类相比，实例化内部类存在挑战..."},"headers":[{"level":2,"title":"2. 内部类编译","slug":"_2-内部类编译","link":"#_2-内部类编译","children":[]},{"level":2,"title":"3. 实例化静态内部类","slug":"_3-实例化静态内部类","link":"#_3-实例化静态内部类","children":[]},{"level":2,"title":"4. 实例化非静态内部类","slug":"_4-实例化非静态内部类","link":"#_4-实例化非静态内部类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719098891000,"updatedTime":1719098891000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.61,"words":1083},"filePathRelative":"posts/baeldung/2024-06-22/2024-06-22-Instantiate an Inner Class With Reflection in Java.md","localizedDate":"2024年6月23日","excerpt":"\\n<p>在本教程中，我们将讨论如何使用Java反射API来实例化内部类或嵌套类。</p>\\n<p>反射API在需要读取Java类的构造并动态实例化类的场合中尤为重要。特定场景包括扫描注解、查找并使用bean名称实例化Java bean等。Spring和Hibernate等流行库以及代码分析工具广泛使用它。</p>\\n<p>与普通类相比，实例化内部类存在挑战。让我们进一步探索。</p>\\n<h2>2. 内部类编译</h2>\\n<p>要使用Java反射API对内部类进行操作，我们必须了解编译器如何处理它。首先，我们定义一个_Person_类，我们将使用它来演示实例化内部类：</p>\\n<div class=\\"language-java\\" data-ext=\\"java\\" data-title=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Person</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">String</span> name<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token class-name\\">Address</span> address<span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Person</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Address</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">String</span> zip<span class=\\"token punctuation\\">;</span>\\n\\n        <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">Address</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">String</span> zip<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>zip <span class=\\"token operator\\">=</span> zip<span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Builder</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,d as data};
