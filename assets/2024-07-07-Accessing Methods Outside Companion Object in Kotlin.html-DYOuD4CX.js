import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a as i}from"./app-CplaXXTa.js";const s={},a=i(`<h1 id="kotlin中在伴生对象之外访问方法-baeldung关于kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin中在伴生对象之外访问方法-baeldung关于kotlin"><span>Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在Kotlin中，伴生对象是我们在类内部创建的特殊对象，我们用它来定义静态方法和属性。尽管如此，有时我们可能希望从伴生对象内部访问在伴生对象之外声明的方法或属性。</p><p>在本教程中，我们将探索在伴生对象内部访问外部方法的各种方法。</p><h2 id="_2-使用外部类的引用" tabindex="-1"><a class="header-anchor" href="#_2-使用外部类的引用"><span>2. 使用外部类的引用</span></a></h2><p>要从伴生对象访问外部的方法，我们可以在伴生对象内定义一个对外部类的引用，并使用它来调用所需的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class OuterClass {
    companion object {
        val outerClass: OuterClass = OuterClass()
        fun companionMethod(): String {
            return outerClass.outerClassMethod()
        }
    }

    fun outerClassMethod(): String {
        return &quot;这是伴生对象之外的一个方法&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在此代码中，我们通过类实例化在伴生对象内定义了对_OuterClass_的引用</strong>。然后我们使用它在_companionMethod()<em>内部调用_outerClassMethod()</em>。</p><p>让我们验证我们的方法是否正确：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`使用外部类引用调用外部方法\`() {
    val result = OuterClass.companionMethod()

    assertEquals(&quot;这是伴生对象之外的一个方法&quot;, result)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们简单地在_OuterClass_上静态调用_companionMethod()_。最后，我们断言_companionMethod()_方法返回了正确的字符串。</p><h2 id="_3-将外部类引用作为参数传递" tabindex="-1"><a class="header-anchor" href="#_3-将外部类引用作为参数传递"><span>3. 将外部类引用作为参数传递</span></a></h2><p>我们还可以选择将外部类的实例作为参数传递给我们伴生对象的方法，以访问伴生对象之外的方法。为了更好的设计目的，让我们使用外部类实现的接口。这个接口声明了我们在伴生对象中寻求调用的方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface OuterClassInterface {
    fun outerClassMethod(): String
}

class OuterClassWithInterface : OuterClassInterface {
    companion object {
        fun companionMethod(outerClassInterface: OuterClassInterface): String {
            return outerClassInterface.outerClassMethod()
        }
    }

    override fun outerClassMethod(): String {
        return &quot;这是伴生对象之外的一个方法&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**在此代码中，我们定义了接口_OuterClassInterface_，它声明了_outerClassMethod()_。**接下来，我们在_OuterClassWithInterface_类中实现这个接口，并使用它从_inside_companionMethod()_内部访问该方法。</p><p>现在，我们也来测试一下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`使用接口调用外部方法\`() {
    val myClass = OuterClassWithInterface()
    val result = OuterClassWithInterface.companionMethod(myClass)

    assertEquals(&quot;这是伴生对象之外的一个方法&quot;, result)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们创建了_OuterClassWithInterface_类的实例，并将其实例作为参数传递给_companionMethod()_方法。随后，这个方法使用接口调用_outerClassMethod()_方法。</p><p>请注意，这种方法与前一种方法不同。<strong>在这种方法中，我们不在伴生对象内部创建外部类的实例</strong>。相反，我们将外部类的引用作为参数传递给伴生对象的方法。</p><h2 id="_4-使用对象声明或单例类" tabindex="-1"><a class="header-anchor" href="#_4-使用对象声明或单例类"><span>4. 使用对象声明或单例类</span></a></h2><p>我们还可以通过使用对象来访问在其他对象上声明的方法。<strong>对象是单例，可以在代码的任何地方访问，无需首先实例化</strong>。因此，通过使用对象，我们可以从我们的伴生对象静态调用该对象中的任何方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class ClassWithObject {
    companion object {
        fun companionMethod(): String {
            return ObjectClass.outerClassMethod()
        }
    }

    object ObjectClass {
        fun outerClassMethod(): String {
            return &quot;这是伴生对象之外的一个方法&quot;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**在此代码中，我们的_ClassWithObject_类有一个伴生对象和一个对象_ObjectClass_。**我们的_ObjectClass_定义了一个_outerClassMethod()_方法，我们在伴生对象内部静态访问并调用这个方法。</p><p>当然，我们也需要测试这段代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`使用对象声明调用外部方法\`() {
    val result = ClassWithObject.companionMethod()

    assertEquals(&quot;这是伴生对象之外的一个方法&quot;, result)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到我们只需在_ClassWithObject_类上调用_companionMethod()_。这反过来又从我们的_ObjectClass_对象调用_outerClassMethod()_方法，并返回所需的字符串。</p><h2 id="_5-使用函数引用" tabindex="-1"><a class="header-anchor" href="#_5-使用函数引用"><span>5. 使用函数引用</span></a></h2><p>最后，我们可以使用函数引用在伴生对象内访问外部方法。<strong>简而言之，我们将所需方法的引用作为参数传递到伴生对象的方法中</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class ClassWithFunctionReference {
    companion object {
        fun companionMethod(outerClassMethod: () -&gt; String): String {
            return outerClassMethod()
        }
    }

    fun outerClassMethod(): String {
        return &quot;这是伴生对象之外的一个方法&quot;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们的_companionMethod()_方法以_outerClassMethod()_方法的函数引用作为参数。接下来，我们在_companionMethod()_方法内部调用这个函数引用。</p><p><strong>这种方法灵活在于我们可以将任何具有相同签名的函数引用传递给我们伴生对象的方法</strong>。</p><p>现在让我们测试这段代码的正确性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
fun \`使用函数引用调用外部方法\`() {
    val myClass = ClassWithFunctionReference()
    val result = ClassWithFunctionReference.companionMethod(myClass::outerClassMethod)

    assertEquals(&quot;这是伴生对象之外的一个方法&quot;, result)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个测试中，我们创建了一个_ClassWithFunctionReference_类的实例。接下来，<strong>我们使用这个实例使用双冒号(::)操作符获取对_outerClassMethod()_的引用</strong>。然后我们将这个引用传递给_companionMethod()_方法。最后，我们断言这个伴生方法返回了正确的字符串。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们探讨了我们可以从伴生对象内部访问在伴生对象之外声明的方法的多种方式。有些方法在某些场景下可能比其他方法更方便。</p><p>例如，通过将函数引用作为参数传递，我们可以重用相同的方法实现与不同的函数。这可以通过消除编写和维护多个类似方法的需要来节省时间和精力。如常，我们应该选择最能满足我们项目需求的方法。</p><p>本文中使用的代码可以在GitHub上找到。</p>`,38),l=[a];function d(r,o){return t(),n("div",null,l)}const v=e(s,[["render",d],["__file","2024-07-07-Accessing Methods Outside Companion Object in Kotlin.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Accessing%20Methods%20Outside%20Companion%20Object%20in%20Kotlin.html","title":"Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin","lang":"zh-CN","frontmatter":{"date":"2023-03-01T00:00:00.000Z","category":["Kotlin","Companion Object"],"tag":["Kotlin","Companion Object","Static Methods"],"head":[["meta",{"name":"keywords","content":"Kotlin, Companion Object, Static Methods"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Accessing%20Methods%20Outside%20Companion%20Object%20in%20Kotlin.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin"}],["meta",{"property":"og:description","content":"Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin 1. 引言 在Kotlin中，伴生对象是我们在类内部创建的特殊对象，我们用它来定义静态方法和属性。尽管如此，有时我们可能希望从伴生对象内部访问在伴生对象之外声明的方法或属性。 在本教程中，我们将探索在伴生对象内部访问外部方法的各种方法。 2. 使用外部类的引用 要从伴生对象访问..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T17:58:58.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kotlin"}],["meta",{"property":"article:tag","content":"Companion Object"}],["meta",{"property":"article:tag","content":"Static Methods"}],["meta",{"property":"article:published_time","content":"2023-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T17:58:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T17:58:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Kotlin中在伴生对象之外访问方法 | Baeldung关于Kotlin 1. 引言 在Kotlin中，伴生对象是我们在类内部创建的特殊对象，我们用它来定义静态方法和属性。尽管如此，有时我们可能希望从伴生对象内部访问在伴生对象之外声明的方法或属性。 在本教程中，我们将探索在伴生对象内部访问外部方法的各种方法。 2. 使用外部类的引用 要从伴生对象访问..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 使用外部类的引用","slug":"_2-使用外部类的引用","link":"#_2-使用外部类的引用","children":[]},{"level":2,"title":"3. 将外部类引用作为参数传递","slug":"_3-将外部类引用作为参数传递","link":"#_3-将外部类引用作为参数传递","children":[]},{"level":2,"title":"4. 使用对象声明或单例类","slug":"_4-使用对象声明或单例类","link":"#_4-使用对象声明或单例类","children":[]},{"level":2,"title":"5. 使用函数引用","slug":"_5-使用函数引用","link":"#_5-使用函数引用","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720375138000,"updatedTime":1720375138000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.76,"words":1427},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Accessing Methods Outside Companion Object in Kotlin.md","localizedDate":"2023年3月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在Kotlin中，伴生对象是我们在类内部创建的特殊对象，我们用它来定义静态方法和属性。尽管如此，有时我们可能希望从伴生对象内部访问在伴生对象之外声明的方法或属性。</p>\\n<p>在本教程中，我们将探索在伴生对象内部访问外部方法的各种方法。</p>\\n<h2>2. 使用外部类的引用</h2>\\n<p>要从伴生对象访问外部的方法，我们可以在伴生对象内定义一个对外部类的引用，并使用它来调用所需的方法：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>class OuterClass {\\n    companion object {\\n        val outerClass: OuterClass = OuterClass()\\n        fun companionMethod(): String {\\n            return outerClass.outerClassMethod()\\n        }\\n    }\\n\\n    fun outerClassMethod(): String {\\n        return \\"这是伴生对象之外的一个方法\\"\\n    }\\n}\\n</code></pre></div>","autoDesc":true}');export{v as comp,m as data};
