import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as n}from"./app-C6rqSDgP.js";const i={},s=n(`<h1 id="kotlin中的私有构造函数" tabindex="-1"><a class="header-anchor" href="#kotlin中的私有构造函数"><span>Kotlin中的私有构造函数</span></a></h1><p>在Java中，私有构造函数有效地阻止了外部代码使用该构造函数创建类的实例。私有构造函数用途广泛，可以用于实现单例和建造者模式等设计模式，以及静态工厂方法。</p><p>在这个快速教程中，我们来探索如何在Kotlin中声明私有构造函数。</p><p>在Kotlin中，<strong>一个私有构造函数在声明它的类之外是不可见的，无论声明的类是顶级类还是内部/嵌套类。</strong> 换句话说，外部代码无法调用私有构造函数。</p><p>私有构造函数由<strong>在构造函数声明前加上private修饰符</strong>来表示。下面的例子可以清楚地说明这一点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Student private constructor(val name: String, val age: Int) {
    companion object {
        fun createInstance(pair: Pair\`\`&lt;String, Int&gt;\`\`): Student {
            return Student(pair.first.uppercase(), pair.second)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们在上面的_Student_类中看到的，我们将主构造函数标记为_private_。因此，只能在类内部实例化_Student_。此外，为了使外部代码能够获得_Student_实例，我们在_companion_对象中包含了一个_createInstance()_函数，其功能类似于静态方法。</p><p>_createInstance()<em>函数还接受一个_Pair_对象作为参数来返回一个_Student</em>。此外，我们在调用私有构造函数时将_name_字符串转换为大写。<strong>这确保了所有_Student_实例都以大写名字一致地初始化。</strong></p><p>现在，让我们尝试使用私有构造函数在类外部创建一个_Student_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val kai = Student(&quot;Kai&quot;, 18)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码将无法编译，编译器会报错说它无法访问私有构造函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Kotlin: Cannot access &#39;\`\`&lt;init&gt;\`\`&#39;: it is private in &#39;Student&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，我们可以通过向_createInstance()_传递一个_Pair_来获得预期的_Student_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val kai = Student.createInstance(&quot;Kai&quot; to 18)

assertEquals(&quot;KAI&quot;, kai.name)
assertEquals(18, kai.age)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kotlin-data-类中的私有构造函数的一些话" tabindex="-1"><a class="header-anchor" href="#kotlin-data-类中的私有构造函数的一些话"><span>Kotlin <em>data</em> 类中的私有构造函数的一些话</span></a></h3><p>到目前为止，我们已经学会了如何在常规Kotlin类中声明私有构造函数，这相当直接。然而，在库开发环境中实现Kotlin <em>data</em> 类中的私有构造函数时，必须意识到<strong>私有构造函数可能通过自动生成的_copy()_函数无意中被暴露。</strong></p><p>接下来，我们通过一个例子来理解：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>data class StudentData private constructor(val name: String, val age: Int) {
    companion object {
        fun createInstance(pair: Pair\`\`&lt;String, Int&gt;\`\`): StudentData {
            return StudentData(pair.first.uppercase(), pair.second)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如代码所示，我们创建了一个带有私有构造函数的_data_类_StudentData_。本质上，这个类在结构上类似于_Student_类，区别在于它被实现为一个_data_类。</p><p>所以，我们仍然不能通过调用构造函数来创建实例，例如：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val kaiData = StudentData(&quot;Kai&quot;, 18)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们这样做，编译器会报错：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Kotlin: Cannot access &#39;\`\`&lt;init&gt;\`\`&#39;: it is private in &#39;StudentData&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，我们可以通过_createInstance()_函数来获得一个实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val kaiData = StudentData.createInstance(&quot;Kai&quot; to 18)

assertEquals(&quot;KAI&quot;, kaiData.name)
assertEquals(18, kaiData.age)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道_data_类会自动生成_copy()_函数，以便我们可以方便地从现有实例中获取副本。此外，生成的_copy()_函数在内部调用构造函数以创建一个新实例。换句话说，<strong>_copy()_函数将私有构造函数暴露给外部代码。</strong></p><p>接下来，我们通过一个例子快速理解：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>val liam = kaiData.copy(name = &quot;Liam&quot;, age = 20)
assertEquals(&quot;Liam&quot;, liam.name)
assertEquals(20, liam.age)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，我们使用_copy()<em>从现有的_kaiData_对象生成了一个新的_StudentData_对象_liam</em>。此外，这个函数使我们能够提供新的属性值，从而覆盖_kaiData_的相应值。</p><p>因此，<strong>_liam_实际上是通过私有构造函数实例化的，结果，它的名字没有以大写出现。</strong></p><h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h3><p>在本文中，我们探讨了如何在Kotlin类中声明私有构造函数。另外，重要的是要注意，在_data_类中，私有构造函数可能被自动生成的_copy()_函数无意中暴露。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,33),r=[s];function l(d,o){return a(),e("div",null,r)}const p=t(i,[["render",l],["__file","2024-07-07-Private Constructors in Kotlin.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Private%20Constructors%20in%20Kotlin.html","title":"Kotlin中的私有构造函数","lang":"zh-CN","frontmatter":{"date":"2022-11-01T00:00:00.000Z","category":["Kotlin","Programming"],"tag":["Kotlin","Private Constructors"],"head":[["meta",{"name":"keywords","content":"Kotlin, Private Constructors, Design Patterns, Singleton, Builder, Factory Methods"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Private%20Constructors%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中的私有构造函数"}],["meta",{"property":"og:description","content":"Kotlin中的私有构造函数 在Java中，私有构造函数有效地阻止了外部代码使用该构造函数创建类的实例。私有构造函数用途广泛，可以用于实现单例和建造者模式等设计模式，以及静态工厂方法。 在这个快速教程中，我们来探索如何在Kotlin中声明私有构造函数。 在Kotlin中，一个私有构造函数在声明它的类之外是不可见的，无论声明的类是顶级类还是内部/嵌套类。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T23:58:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Private Constructors"}],["meta",{"property":"article:published_time","content":"2022-11-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T23:58:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中的私有构造函数\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T23:58:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中的私有构造函数 在Java中，私有构造函数有效地阻止了外部代码使用该构造函数创建类的实例。私有构造函数用途广泛，可以用于实现单例和建造者模式等设计模式，以及静态工厂方法。 在这个快速教程中，我们来探索如何在Kotlin中声明私有构造函数。 在Kotlin中，一个私有构造函数在声明它的类之外是不可见的，无论声明的类是顶级类还是内部/嵌套类。..."},"headers":[{"level":3,"title":"Kotlin data 类中的私有构造函数的一些话","slug":"kotlin-data-类中的私有构造函数的一些话","link":"#kotlin-data-类中的私有构造函数的一些话","children":[]},{"level":3,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720396727000,"updatedTime":1720396727000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.5,"words":1049},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Private Constructors in Kotlin.md","localizedDate":"2022年11月1日","excerpt":"\\n<p>在Java中，私有构造函数有效地阻止了外部代码使用该构造函数创建类的实例。私有构造函数用途广泛，可以用于实现单例和建造者模式等设计模式，以及静态工厂方法。</p>\\n<p>在这个快速教程中，我们来探索如何在Kotlin中声明私有构造函数。</p>\\n<p>在Kotlin中，<strong>一个私有构造函数在声明它的类之外是不可见的，无论声明的类是顶级类还是内部/嵌套类。</strong> 换句话说，外部代码无法调用私有构造函数。</p>\\n<p>私有构造函数由<strong>在构造函数声明前加上private修饰符</strong>来表示。下面的例子可以清楚地说明这一点：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>class Student private constructor(val name: String, val age: Int) {\\n    companion object {\\n        fun createInstance(pair: Pair``&lt;String, Int&gt;``): Student {\\n            return Student(pair.first.uppercase(), pair.second)\\n        }\\n    }\\n}\\n</code></pre></div>","autoDesc":true}');export{p as comp,v as data};
