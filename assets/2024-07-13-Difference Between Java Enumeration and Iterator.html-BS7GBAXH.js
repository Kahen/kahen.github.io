import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CBerKIce.js";const r={},o=n('<h1 id="java中的枚举与迭代器的区别-baeldung" tabindex="-1"><a class="header-anchor" href="#java中的枚举与迭代器的区别-baeldung"><span>Java中的枚举与迭代器的区别 | Baeldung</span></a></h1><p>在本教程中，我们将学习Java中的_Enumeration_和_Iterator_。我们还将了解如何在代码中使用它们以及它们之间的差异。</p><h3 id="_2-1-enumeration" tabindex="-1"><a class="header-anchor" href="#_2-1-enumeration"><span>2.1. <em>Enumeration</em></span></a></h3><p>_Enumeration_自Java 1.0版本以来就存在。它是一个接口，任何实现都<strong>允许逐个访问元素</strong>。简单来说，它用于迭代诸如_Vector_和_Hashtable_的对象集合。</p><p>让我们看一个_Enumeration_的例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Vector````&lt;Person&gt;```` people = new Vector&lt;&gt;(getPersons());\nEnumeration````&lt;Person&gt;```` enumeration = people.elements();\nwhile (enumeration.hasMoreElements()) {\n    System.out.println(&quot;First Name = &quot; + enumeration.nextElement().getFirstName());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们使用_Enumeration_打印_Person_的_firstName_。_elements()_方法提供了对_Enumeration_的引用，通过使用它我们可以逐个访问元素。</p><h3 id="_2-2-iterator" tabindex="-1"><a class="header-anchor" href="#_2-2-iterator"><span>2.2. <em>Iterator</em></span></a></h3><p>_Iterator_自Java 1.2版本以来就存在，并且<strong>用于迭代在同一版本中引入的集合</strong>。</p><p>接下来，让我们使用_Iterator_打印_Person_的_firstName_。_iterator()_提供了对_Iterator_的引用，通过使用它我们可以逐个访问元素：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>List````&lt;Person&gt;```` persons = getPersons();\nIterator````&lt;Person&gt;```` iterator = persons.iterator();\nwhile (iterator.hasNext()) {\n    System.out.println(&quot;First Name = &quot; + iterator.next().getFirstName());\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，我们可以看到**_Enumeration_和_Iterator_分别自Java 1.0和1.2以来就存在，并且都用于一次迭代一个对象集合**。</p><p>在这个表中，我们将理解_Enumeration_和_Iterator_之间的差异：</p><table><thead><tr><th>Enumeration</th><th>Iterator</th></tr></thead><tbody><tr><td>自Java 1.0以来存在，用于枚举_Vectors_和_Hashtables_</td><td>自Java 1.2以来存在，用于迭代诸如_List_, <em>Set</em>, _Map_等集合</td></tr><tr><td>包含两个方法：_hasMoreElements()<em>和_nextElement()</em></td><td>包含三个方法：<em>hasNext()</em>, <em>next()</em> 和 <em>remove()</em></td></tr><tr><td>方法名称较长</td><td>方法名称简短且简洁</td></tr><tr><td>在迭代时没有方法可以移除元素</td><td>有_remove()_方法可以在迭代时移除元素</td></tr><tr><td>Java 9中添加的_asIterator()<em>在_Enumeration_之上提供了_Iterator</em>。然而，这个特定情况下的_remove()<em>会抛出_UnsupportedOperationException</em></td><td>Java 8中添加的_forEachRemaining()_对剩余元素执行操作</td></tr></tbody></table><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们理解了_Enumeration_和_Iterator_，如何使用代码示例使用它们，以及它们之间的各种差异。</p><p>本文中使用的所有代码示例都可以在GitHub上找到。</p>',17),i=[o];function s(m,l){return a(),t("div",null,i)}const p=e(r,[["render",s],["__file","2024-07-13-Difference Between Java Enumeration and Iterator.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Java%20Enumeration%20and%20Iterator.html","title":"Java中的枚举与迭代器的区别 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java"],"tag":["Enumeration","Iterator"],"head":[["meta",{"name":"keywords","content":"Java, Enumeration, Iterator, 迭代器, 枚举"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Difference%20Between%20Java%20Enumeration%20and%20Iterator.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的枚举与迭代器的区别 | Baeldung"}],["meta",{"property":"og:description","content":"Java中的枚举与迭代器的区别 | Baeldung 在本教程中，我们将学习Java中的_Enumeration_和_Iterator_。我们还将了解如何在代码中使用它们以及它们之间的差异。 2.1. Enumeration _Enumeration_自Java 1.0版本以来就存在。它是一个接口，任何实现都允许逐个访问元素。简单来说，它用于迭代诸如_..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T18:45:18.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Enumeration"}],["meta",{"property":"article:tag","content":"Iterator"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T18:45:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的枚举与迭代器的区别 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T18:45:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的枚举与迭代器的区别 | Baeldung 在本教程中，我们将学习Java中的_Enumeration_和_Iterator_。我们还将了解如何在代码中使用它们以及它们之间的差异。 2.1. Enumeration _Enumeration_自Java 1.0版本以来就存在。它是一个接口，任何实现都允许逐个访问元素。简单来说，它用于迭代诸如_..."},"headers":[{"level":3,"title":"2.1. Enumeration","slug":"_2-1-enumeration","link":"#_2-1-enumeration","children":[]},{"level":3,"title":"2.2. Iterator","slug":"_2-2-iterator","link":"#_2-2-iterator","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720896318000,"updatedTime":1720896318000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.81,"words":543},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Difference Between Java Enumeration and Iterator.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习Java中的_Enumeration_和_Iterator_。我们还将了解如何在代码中使用它们以及它们之间的差异。</p>\\n<h3>2.1. <em>Enumeration</em></h3>\\n<p>_Enumeration_自Java 1.0版本以来就存在。它是一个接口，任何实现都<strong>允许逐个访问元素</strong>。简单来说，它用于迭代诸如_Vector_和_Hashtable_的对象集合。</p>\\n<p>让我们看一个_Enumeration_的例子：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>Vector````&lt;Person&gt;```` people = new Vector&lt;&gt;(getPersons());\\nEnumeration````&lt;Person&gt;```` enumeration = people.elements();\\nwhile (enumeration.hasMoreElements()) {\\n    System.out.println(\\"First Name = \\" + enumeration.nextElement().getFirstName());\\n}\\n</code></pre></div>","autoDesc":true}');export{p as comp,u as data};
