import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-LwwahXlT.js";const i={},r=n('<h1 id="java中向量类的介绍" tabindex="-1"><a class="header-anchor" href="#java中向量类的介绍"><span>Java中向量类的介绍</span></a></h1><p>向量类是一个可增长的对象数组的线程安全实现。它实现了java.util.List接口，并且是Java集合框架的一部分。虽然它与ArrayList类似，但这些类在实现上有着显著的差异。</p><p>在本教程中，我们将探索向量类及其一些最常见的操作和方法。</p><p>向量类被设计为一个可以根据应用程序需求扩展或收缩的动态数组。因此，我们可以使用索引访问向量中的对象。此外，它维护插入顺序并存储重复元素。</p><p>每个向量都通过跟踪容量和capacityIncrement来增强其存储处理。容量不过是向量的大小。当我们向向量中添加元素时，向量的大小会增加。因此，容量始终保持等于或大于向量的大小。</p><p>每当向量的长度达到其容量时，就会计算新的长度：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>newLength = capacityIncrement == 0 ? currentSize * 2 : currentSize + capacityIncrement\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与ArrayList类似，向量类的迭代器也是快速失败的。如果我们在迭代向量时尝试修改它，它会抛出ConcurrentModificationException。然而，我们可以通过迭代器的add()或remove()方法来结构性地修改向量。</p><p>让我们看看如何创建向量以及在其上执行各种操作。</p><h3 id="_3-1-创建向量" tabindex="-1"><a class="header-anchor" href="#_3-1-创建向量"><span>3.1. 创建向量</span></a></h3><p>我们可以使用构造函数创建向量实例。有四种不同类型的向量构造函数。</p><p>第一种是默认构造函数，它创建一个初始容量为10且标准capacityIncrement为0的空向量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;T&gt;````````` vector = new Vector`````````&lt;T&gt;`````````();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过指定其初始大小（容量）来创建一个空的向量。在这种情况下，其capacityIncrement也设置为0：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;T&gt;````````` vector = new Vector`````````&lt;T&gt;`````````(int size);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还有另一个构造函数，我们可以使用它来指定初始容量和capacityIncrement来创建一个空的向量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;T&gt;````````` vector = new Vector`````````&lt;T&gt;`````````(int size, int capacityIncrement);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们可以通过将另一个集合传递给构造函数来构建一个向量。结果的向量包含指定集合的所有元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;T&gt;````````` vector = new Vector`````````&lt;T&gt;`````````(Collection`````````&lt;T&gt;````````` collection);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2-向向量中添加元素" tabindex="-1"><a class="header-anchor" href="#_3-2-向向量中添加元素"><span>3.2. 向向量中添加元素</span></a></h3><p>让我们创建一个返回向量的方法。我们将使用此方法进行后续操作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` getVector() {\n    Vector`````````&lt;String&gt;````````` vector = new Vector`````````&lt;String&gt;`````````();\n    vector.add(&quot;Today&quot;);\n    vector.add(&quot;is&quot;);\n    vector.add(&quot;a&quot;);\n    vector.add(&quot;great&quot;);\n    vector.add(&quot;day!&quot;);\n\n    return vector;\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用默认构造函数创建了一个空的字符串向量，并添加了一些字符串。</p><p>根据需要，我们可以在向量的末尾或特定索引处添加元素。为此，我们可以使用重载的add()方法来满足各种需求。</p><p>现在，让我们将元素添加到向量的特定索引：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>vector.add(2, &quot;not&quot;); // 在索引2处添加&quot;not&quot;\nassertEquals(&quot;not&quot;, vector.get(2)); // 向量 = [Today, is, not, a, great, day!]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用向量类的add(int index, E element)方法将字符串“not”添加到索引2。请注意，它将所有指定索引后的元素向右移动一个位置。因此，字符串“not”被添加在字符串“is”和“a”之间。</p><p>同样，我们可以使用addAll(Collection c)方法将所有元素添加到向量中。使用此方法，我们可以将集合中的所有元素以与集合相同的顺序添加到向量的末尾：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ArrayList`````````&lt;String&gt;````````` words = new ArrayList&lt;&gt;(Arrays.asList(&quot;Baeldung&quot;, &quot;is&quot;, &quot;cool!&quot;));\nvector.addAll(words);\n\nassertEquals(9, vector.size());\nassertEquals(&quot;cool!&quot;, vector.get(8));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述代码后，如果打印向量，我们将得到以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>[Today, is, not, a, great, day!, Baeldung, is, cool!]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-更新元素" tabindex="-1"><a class="header-anchor" href="#_3-3-更新元素"><span>3.3. 更新元素</span></a></h3><p>我们可以使用set()方法更新向量中的元素。set()方法用新元素替换指定索引处的元素，同时返回被替换的元素。因此，它接受两个参数——要替换的元素的索引和新元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` vector = getVector();\nassertEquals(5, vector.size());\nvector.set(3, &quot;good&quot;);\nassertEquals(&quot;good&quot;, vector.get(3));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-移除元素" tabindex="-1"><a class="header-anchor" href="#_3-4-移除元素"><span>3.4. 移除元素</span></a></h3><p>我们可以使用remove()方法从向量中移除元素。它根据各种需求被重载。因此，我们可以移除特定元素或特定索引处的元素，或移除向量中的所有元素。让我们看几个例子。</p><p>如果我们向remove()方法传递一个对象，将删除它的第一次出现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` vector = getVector();\nassertEquals(5, vector.size());\n\nvector.remove(&quot;a&quot;);\nassertEquals(4, vector.size()); // 向量 = [Today, is, great, day!]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，如果我们现在向上述remove()方法传递2，它将删除索引2处的元素great：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>vector.remove(2);\nassertEquals(&quot;day!&quot;, vector.get(2));\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意，所有被删除元素右侧的元素都会向左移动一个位置。此外，如果我们提供的索引超出了向量的范围，即index <code>&lt; 0或index &gt;</code>= size()，remove()方法将抛出ArrayIndexOutOfBoundsException。</p><p>最后，让我们移除向量中的所有元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>vector.removeAll();\nassertEquals(0, vector.size());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-获取元素" tabindex="-1"><a class="header-anchor" href="#_3-5-获取元素"><span>3.5. 获取元素</span></a></h3><p>我们可以使用get()方法获取向量中特定索引处的元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` vector = getVector();\n\nString fourthElement = vector.get(3);\nassertEquals(&quot;great&quot;, fourthElement);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>get()方法也会抛出ArrayIndexOutOfBoundsException，如果我们提供的索引超出了向量的范围。</strong></p><h3 id="_3-6-遍历向量" tabindex="-1"><a class="header-anchor" href="#_3-6-遍历向量"><span>3.6. 遍历向量</span></a></h3><p>我们可以通过多种方式遍历向量。然而，最常见的方式之一是for-each循环：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` vector = getVector();\n\nfor(String string : vector) {\n    System.out.println(string);\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还可以使用forEach()方法遍历向量，特别是当我们想要对每个元素执行某个操作时：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector`````````&lt;String&gt;````````` vector = getVector();\nvector.forEach(System.out::println);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用向量的情况" tabindex="-1"><a class="header-anchor" href="#_4-使用向量的情况"><span>4. 使用向量的情况</span></a></h2><p>向量的首要和明显用途是当我们需要一个可增长的对象集合时。如果我们不确定增长集合的大小，但我们知道我们将多频繁地添加或删除元素，那么我们可能更倾向于使用向量。在这种情况下，我们可以根据情况设置capacityIncrement。</p><p>然而，由于向量是同步的，我们更倾向于在多线程应用程序中使用它。在单线程应用程序中，与向量相比，ArrayList的运行速度要快得多。此外，我们可以使用Collections.synchronizedList()显式同步ArrayList。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们查看了Java中的向量类。我们还探讨了如何创建向量实例以及如何使用不同的方法添加、查找或删除元素。</p><p>如往常一样，本文的源代码可在GitHub上获得。</p>',58),s=[r];function d(l,c){return a(),t("div",null,s)}const u=e(i,[["render",d],["__file","2024-06-28-Intro to Vector Class in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Intro%20to%20Vector%20Class%20in%20Java.html","title":"Java中向量类的介绍","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Collections Framework"],"tag":["Vector","ArrayList"],"head":[["meta",{"name":"keywords","content":"Java Vector, Collections Framework, growable array"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Intro%20to%20Vector%20Class%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中向量类的介绍"}],["meta",{"property":"og:description","content":"Java中向量类的介绍 向量类是一个可增长的对象数组的线程安全实现。它实现了java.util.List接口，并且是Java集合框架的一部分。虽然它与ArrayList类似，但这些类在实现上有着显著的差异。 在本教程中，我们将探索向量类及其一些最常见的操作和方法。 向量类被设计为一个可以根据应用程序需求扩展或收缩的动态数组。因此，我们可以使用索引访问向..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T01:43:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Vector"}],["meta",{"property":"article:tag","content":"ArrayList"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T01:43:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中向量类的介绍\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T01:43:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中向量类的介绍 向量类是一个可增长的对象数组的线程安全实现。它实现了java.util.List接口，并且是Java集合框架的一部分。虽然它与ArrayList类似，但这些类在实现上有着显著的差异。 在本教程中，我们将探索向量类及其一些最常见的操作和方法。 向量类被设计为一个可以根据应用程序需求扩展或收缩的动态数组。因此，我们可以使用索引访问向..."},"headers":[{"level":3,"title":"3.1. 创建向量","slug":"_3-1-创建向量","link":"#_3-1-创建向量","children":[]},{"level":3,"title":"3.2. 向向量中添加元素","slug":"_3-2-向向量中添加元素","link":"#_3-2-向向量中添加元素","children":[]},{"level":3,"title":"3.3. 更新元素","slug":"_3-3-更新元素","link":"#_3-3-更新元素","children":[]},{"level":3,"title":"3.4. 移除元素","slug":"_3-4-移除元素","link":"#_3-4-移除元素","children":[]},{"level":3,"title":"3.5. 获取元素","slug":"_3-5-获取元素","link":"#_3-5-获取元素","children":[]},{"level":3,"title":"3.6. 遍历向量","slug":"_3-6-遍历向量","link":"#_3-6-遍历向量","children":[]},{"level":2,"title":"4. 使用向量的情况","slug":"_4-使用向量的情况","link":"#_4-使用向量的情况","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719539012000,"updatedTime":1719539012000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.44,"words":1632},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Intro to Vector Class in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>向量类是一个可增长的对象数组的线程安全实现。它实现了java.util.List接口，并且是Java集合框架的一部分。虽然它与ArrayList类似，但这些类在实现上有着显著的差异。</p>\\n<p>在本教程中，我们将探索向量类及其一些最常见的操作和方法。</p>\\n<p>向量类被设计为一个可以根据应用程序需求扩展或收缩的动态数组。因此，我们可以使用索引访问向量中的对象。此外，它维护插入顺序并存储重复元素。</p>\\n<p>每个向量都通过跟踪容量和capacityIncrement来增强其存储处理。容量不过是向量的大小。当我们向向量中添加元素时，向量的大小会增加。因此，容量始终保持等于或大于向量的大小。</p>","autoDesc":true}');export{u as comp,p as data};
