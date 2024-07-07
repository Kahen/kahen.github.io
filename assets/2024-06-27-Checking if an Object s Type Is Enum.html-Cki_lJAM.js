import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as s}from"./app-C3EhKTFl.js";const i={},t=s(`<hr><h1 id="如何检查对象的类型是否为枚举" tabindex="-1"><a class="header-anchor" href="#如何检查对象的类型是否为枚举"><span>如何检查对象的类型是否为枚举</span></a></h1><p>当我们使用Java时，理解和操作对象类型是基本技能。一个常见的挑战是检查一个对象是否属于枚举类型（Enum）。在这个快速教程中，我们将探索确定对象类型是否为枚举的各种方法和最佳实践。</p><h2 id="_2-问题介绍" tabindex="-1"><a class="header-anchor" href="#_2-问题介绍"><span>2. 问题介绍</span></a></h2><p>枚举类型提供了一种强大的方式，在不同的类型中表示一组固定的值。动态确认一个对象是否是枚举类型对于编写健壮和类型安全的代码至关重要。</p><p>例如，我们有一个简单的枚举：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>enum Device {
    Keyboard, Monitor, Mouse, Printer
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在假设我们有一个对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object obj = Device.Keyboard;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正如我们所看到的，<code>obj</code>被声明为类型<code>Object</code>。我们的挑战是检查它的类型是否为枚举。在这个教程中，我们将学习解决这个问题的不同方法。同时，我们将使用单元测试断言来验证结果。</p><h2 id="_3-使用-instanceof-操作符" tabindex="-1"><a class="header-anchor" href="#_3-使用-instanceof-操作符"><span>3. 使用 instanceof 操作符</span></a></h2><p>我们知道所有枚举都有相同的超类：<code>java.lang.Enum</code>。<code>instanceof</code>操作符允许我们测试一个对象是否是特定类或接口的实例。</p><p>因此，我们可以利用这个操作符来检查一个对象是否是枚举类型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object obj = Device.Keyboard;
assertTrue(obj instanceof Enum);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用-enum-class-isinstance-方法" tabindex="-1"><a class="header-anchor" href="#_4-使用-enum-class-isinstance-方法"><span>4. 使用 Enum.class.isInstance() 方法</span></a></h2><p><code>Class.isInstance()</code>方法与<code>instanceof</code>操作符做同样的事情。由于我们想要检查枚举类型，<code>Enum.class.isInstance(obj)</code>解决了问题：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object obj = Device.Keyboard;
assertTrue(Enum.class.isInstance(obj));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-使用-enum-class-isassignablefrom-方法" tabindex="-1"><a class="header-anchor" href="#_5-使用-enum-class-isassignablefrom-方法"><span>5. 使用 Enum.class.isAssignableFrom() 方法</span></a></h2><p>类似于<code>Class.isInstance()</code>方法，<code>Class.isAssignableFrom()</code>方法检查左侧的类是否与给定的<code>Class</code>参数相同或为超类。这两种方法有轻微的区别。然而，如果我们用它们来解决我们的问题，这并没有区别：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object obj = Device.Keyboard;
assertTrue(Enum.class.isAssignableFrom(obj.getClass()));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-使用-class-isenum-方法" tabindex="-1"><a class="header-anchor" href="#_6-使用-class-isenum-方法"><span>6. 使用 Class.isEnum() 方法</span></a></h2><p>另一种确定一个类是否表示枚举的方法是使用<code>Class</code>类提供的<code>isEnum()</code>方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object obj = Device.Keyboard;
assertTrue(obj.getClass().isEnum());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方法非常简单直接。然而，它可能无法检查一些枚举实例。所以接下来，让我们更仔细地看看<code>Class.isEnum()</code>的陷阱。</p><h2 id="_7-class-isenum-的陷阱-带有体的枚举实例" tabindex="-1"><a class="header-anchor" href="#_7-class-isenum-的陷阱-带有体的枚举实例"><span>7. Class.isEnum() 的陷阱：带有体的枚举实例</span></a></h2><p>我们知道枚举可以有自定义方法。此外，枚举实例可以覆盖这些方法。接下来，让我们看另一个枚举示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>enum Weekday {
    Monday, Tuesday, Wednesday, Thursday, Friday,
    Saturday {
        @Override
        boolean isWeekend() {
            return true;
        }
    },
    Sunday {
        @Override
        boolean isWeekend() {
            return true;
        }
    };

    boolean isWeekend() {
        return false;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如上面的代码所示，<code>Weekday</code>有<code>isWeekend()</code>方法。默认情况下，该方法返回<code>false</code>。然而，<code>Saturday</code>和<code>Sunday</code>实例覆盖了这个方法以返回<code>true</code>。</p><p>接下来，让我们用我们学到的解决方案来验证一些<code>Weekday</code>实例，并看看它们是否能够报告正确的结果。首先，让我们以<code>Monday</code>为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object monday = Weekday.Monday;
assertTrue(monday instanceof Enum);
assertTrue(Enum.class.isInstance(monday));
assertTrue(Enum.class.isAssignableFrom(monday.getClass()));
assertTrue(monday.getClass().isEnum());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们运行测试，所有四种方法都按预期工作。接下来，让我们以<code>Sunday</code>实例作为输入并重复测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Object sunday = Weekday.Sunday;
assertTrue(sunday instanceof Enum);
assertTrue(Enum.class.isInstance(sunday));
assertTrue(Enum.class.isAssignableFrom(sunday.getClass()));
assertFalse(sunday.getClass().isEnum()); // &lt;-- 当枚举值带有体时isEnum()检查失败
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这次，<code>Class.isEnum()</code>没有产生正确的答案。接下来，让我们理解为什么会发生这种情况。</p><p>当一个枚举实例覆盖一个方法时，例如我们示例中的<code>Saturday</code>和<code>Sunday</code>，会创建一个作为枚举子类的匿名类。在这种情况下，<code>Sunday.getClass()</code>返回的是匿名子类而不是<code>Weekday</code>类。因此，在类上调用<code>isEnum()</code>会返回<code>false</code>。</p><p>因此，我们不应该考虑<code>Class.isEnum()</code>方法作为解决这个问题的健壮解决方案。</p><h2 id="_8-结论" tabindex="-1"><a class="header-anchor" href="#_8-结论"><span>8. 结论</span></a></h2><p>确定一个对象的类型是否为枚举对于编写灵活和健壮的Java代码至关重要。在本文中，我们探讨了执行检查的不同方法：</p><ul><li>instanceof 操作符</li><li>Enum.class.isInstance() 方法</li><li>Enum.class.isAssignableFrom() 方法</li></ul><p>此外，我们强调了<code>enumValue.getClass().isEnum()</code>检查的潜在陷阱，强调当处理枚举实例中的覆盖方法时，其可靠性会降低。因此，我们不应该依赖这种方法作为确定性解决方案。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,40),d=[t];function l(c,r){return n(),a("div",null,d)}const m=e(i,[["render",l],["__file","2024-06-27-Checking if an Object s Type Is Enum.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Checking%20if%20an%20Object%20s%20Type%20Is%20Enum.html","title":"如何检查对象的类型是否为枚举","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Java","Programming"],"tag":["Enum","Type Checking"],"head":[["meta",{"name":"keywords","content":"Java, Enum, Type Checking"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Checking%20if%20an%20Object%20s%20Type%20Is%20Enum.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何检查对象的类型是否为枚举"}],["meta",{"property":"og:description","content":"如何检查对象的类型是否为枚举 当我们使用Java时，理解和操作对象类型是基本技能。一个常见的挑战是检查一个对象是否属于枚举类型（Enum）。在这个快速教程中，我们将探索确定对象类型是否为枚举的各种方法和最佳实践。 2. 问题介绍 枚举类型提供了一种强大的方式，在不同的类型中表示一组固定的值。动态确认一个对象是否是枚举类型对于编写健壮和类型安全的代码至关..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T02:41:49.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"Type Checking"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T02:41:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何检查对象的类型是否为枚举\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T02:41:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何检查对象的类型是否为枚举 当我们使用Java时，理解和操作对象类型是基本技能。一个常见的挑战是检查一个对象是否属于枚举类型（Enum）。在这个快速教程中，我们将探索确定对象类型是否为枚举的各种方法和最佳实践。 2. 问题介绍 枚举类型提供了一种强大的方式，在不同的类型中表示一组固定的值。动态确认一个对象是否是枚举类型对于编写健壮和类型安全的代码至关..."},"headers":[{"level":2,"title":"2. 问题介绍","slug":"_2-问题介绍","link":"#_2-问题介绍","children":[]},{"level":2,"title":"3. 使用 instanceof 操作符","slug":"_3-使用-instanceof-操作符","link":"#_3-使用-instanceof-操作符","children":[]},{"level":2,"title":"4. 使用 Enum.class.isInstance() 方法","slug":"_4-使用-enum-class-isinstance-方法","link":"#_4-使用-enum-class-isinstance-方法","children":[]},{"level":2,"title":"5. 使用 Enum.class.isAssignableFrom() 方法","slug":"_5-使用-enum-class-isassignablefrom-方法","link":"#_5-使用-enum-class-isassignablefrom-方法","children":[]},{"level":2,"title":"6. 使用 Class.isEnum() 方法","slug":"_6-使用-class-isenum-方法","link":"#_6-使用-class-isenum-方法","children":[]},{"level":2,"title":"7. Class.isEnum() 的陷阱：带有体的枚举实例","slug":"_7-class-isenum-的陷阱-带有体的枚举实例","link":"#_7-class-isenum-的陷阱-带有体的枚举实例","children":[]},{"level":2,"title":"8. 结论","slug":"_8-结论","link":"#_8-结论","children":[]}],"git":{"createdTime":1719456109000,"updatedTime":1719456109000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.65,"words":1094},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Checking if an Object s Type Is Enum.md","localizedDate":"2024年6月27日","excerpt":"<hr>\\n<h1>如何检查对象的类型是否为枚举</h1>\\n<p>当我们使用Java时，理解和操作对象类型是基本技能。一个常见的挑战是检查一个对象是否属于枚举类型（Enum）。在这个快速教程中，我们将探索确定对象类型是否为枚举的各种方法和最佳实践。</p>\\n<h2>2. 问题介绍</h2>\\n<p>枚举类型提供了一种强大的方式，在不同的类型中表示一组固定的值。动态确认一个对象是否是枚举类型对于编写健壮和类型安全的代码至关重要。</p>\\n<p>例如，我们有一个简单的枚举：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>enum Device {\\n    Keyboard, Monitor, Mouse, Printer\\n}\\n</code></pre></div>","autoDesc":true}');export{m as comp,v as data};
