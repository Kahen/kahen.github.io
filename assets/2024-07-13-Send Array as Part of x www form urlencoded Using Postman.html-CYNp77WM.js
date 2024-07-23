import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-on0L14Tx.js";const i={},s=a(`<h1 id="使用postman发送x-www-form-urlencoded格式的数组" tabindex="-1"><a class="header-anchor" href="#使用postman发送x-www-form-urlencoded格式的数组"><span>使用Postman发送x-www-form-urlencoded格式的数组</span></a></h1><p>在这个教程中，我们将探讨使用Postman发送x-www-form-urlencoded格式数组的方法。</p><p>W3C委员会定义了多种我们可以用于通过网络层发送数据的格式。这些格式包括form-data、raw和x-www-form-urlencoded数据。我们默认使用后者格式发送数据。</p><p>列出的格式描述了作为HTTP消息体的一个块发送的表单数据。它发送了一个编码的表单数据集以提交给服务器。编码数据具有键值对的格式。服务器必须支持内容类型。</p><p>使用此内容类型提交的表单匹配以下编码模式：</p><ul><li>控件名称和值被转义。</li><li>&#39;，&#39;符号将多个值分隔开。</li><li>&#39;+&#39;符号将所有空格字符替换。</li><li>保留字符应遵循RFC 1738符号。</li><li>所有非字母数字字符使用百分号编码。</li><li>键与值用等号（&#39;=&#39;）分隔，键值对用和号（&#39;&amp;&#39;）分隔。</li></ul><p>此外，数据的长度未指定。但是，使用x-www-form-urlencoded数据类型有数据限制。因此，媒体服务器将拒绝超过配置中指定大小的请求。</p><p>此外，当发送二进制数据或包含非字母数字字符的值时，它变得效率低下。<strong>包含非字母数字字符的键和值将进行百分号编码（也称为URL编码），因此这种类型不适合二进制数据。</strong> 因此，我们应该考虑使用form-data内容类型。</p><p>此外，我们不能使用它来编码文件。它只能对URL参数或请求体中的数据进行编码。</p><h3 id="_3-发送数组" tabindex="-1"><a class="header-anchor" href="#_3-发送数组"><span>3. 发送数组</span></a></h3><p>要在Postman中使用x-www-form-urlencoded类型，我们需要在请求的body标签中选择具有相同名称的单选按钮。</p><p>正如已经提到的，请求由键值对组成。Postman将在发送数据到服务器之前对数据进行编码。此外，它将对键和值都进行编码。</p><p>现在，让我们看看如何在Postman中发送数组。</p><h4 id="_3-1-发送简单数组对象" tabindex="-1"><a class="header-anchor" href="#_3-1-发送简单数组对象"><span>3.1 发送简单数组对象</span></a></h4><p>我们将首先展示如何发送一个包含简单对象类型的简单数组对象，例如String元素。</p><p>首先，让我们创建一个StudentSimple类，它将具有一个数组作为实例变量：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class StudentSimple {
   private String firstName;
   private String lastName;
   private String[] courses;

   // getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次，我们将定义一个控制器类，该类将公开REST端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(
  path = &quot;/simple&quot;,
  consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
public ResponseEntity\`&lt;StudentSimple&gt;\` createStudentSimple(StudentSimple student) {
    return ResponseEntity.ok(student);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当我们使用consume属性时，我们需要将x-www-form-urlencoded定义为控制器将从客户端接受的媒体类型。</strong> 否则，我们将得到415 Unsupported Media Type错误。此外，我们需要省略@RequestBody注释，因为该注释不支持x-www-form-urlencoded内容类型。</p><p>最后，让我们在Postman中创建一个请求。最简单的方法是使用逗号符号（&#39;，&#39;）分隔值：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然而，如果值本身包含逗号符号，这种方法可能会引起问题。我们可以通过单独设置每个值来解决问题。要将元素设置到courses数组，我们需要使用相同的键提供键值对：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>数组中元素的顺序将遵循请求中提供的顺序。</p><p><strong>此外，方括号是可选的。</strong> 另一方面，如果我们想要在数组的特定索引中添加一个元素，我们可以通过在方括号中指定索引来实现：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-index.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以使用cURL请求测试我们的应用程序：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -X POST \\
  http://localhost:8080/students/simple \\
  -H &#39;Content-Type: application/x-www-form-urlencoded&#39; \\
  -d &#39;firstName=Jane&amp;lastName=Doe&amp;
        courses[2]=Programming+in+Java&amp;
        courses[1]=Data+Structures&amp;
        courses[0]=Linux+Basics&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-发送复杂数组对象" tabindex="-1"><a class="header-anchor" href="#_3-2-发送复杂数组对象"><span>3.2 发送复杂数组对象</span></a></h4><p>现在，让我们看看如何发送包含复杂对象的数组。</p><p>首先，让我们定义Course类，它将表示一个单独的课程：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class Course {
    private String name;
    private int hours;

    // getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将创建一个代表学生的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class StudentComplex {
    private String firstName;
    private String lastName;
    private Course[] courses;

    // getters and setters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们在控制器类中添加一个新的端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(
  path = &quot;/complex&quot;,
  consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
public ResponseEntity\`&lt;StudentComplex&gt;\` createStudentComplex(StudentComplex student) {
    return ResponseEntity.ok(student);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们在Postman中创建一个请求。和上一个例子一样，要向数组添加元素，我们需要使用相同的键提供键值对：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/10/complex-array-postman.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p><strong>在这里，带有索引的方括号是必需的。</strong> 要为每个实例变量设置值，我们需要使用点（&#39;.&#39;）运算符，后跟变量的名称。</p><p>同样，我们可以使用cURL请求测试端点：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>curl -X POST \\
  http://localhost:8080/students/complex \\
  -H &#39;Content-Type: application/x-www-form-urlencoded&#39; \\
  -d &#39;firstName=Jane&amp;lastName=Doe&amp;
        courses[0].name=Programming+in+Java&amp;
        courses[0].hours=40&amp;
        courses[1].name=Data+Structures&amp;
        courses[1].hours=35&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何在服务器端适当设置_Content-Type_以避免_Unsupported Media Type_错误。我们还解释了如何在Postman中使用x-www-form-urlencoded内容类型发送简单和复杂的数组。</p><p>如常，所有的代码片段都可以在GitHub上找到。</p>`,45),r=[s];function d(l,o){return t(),n("div",null,r)}const c=e(i,[["render",d],["__file","2024-07-13-Send Array as Part of x www form urlencoded Using Postman.html.vue"]]),u=JSON.parse(`{"path":"/posts/baeldung/2024-07-13/2024-07-13-Send%20Array%20as%20Part%20of%20x%20www%20form%20urlencoded%20Using%20Postman.html","title":"使用Postman发送x-www-form-urlencoded格式的数组","lang":"zh-CN","frontmatter":{"date":"2022-10-01T00:00:00.000Z","category":["Java","Postman"],"tag":["x-www-form-urlencoded","Array"],"head":[["meta",{"name":"keywords","content":"Postman, x-www-form-urlencoded, Array, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-13/2024-07-13-Send%20Array%20as%20Part%20of%20x%20www%20form%20urlencoded%20Using%20Postman.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Postman发送x-www-form-urlencoded格式的数组"}],["meta",{"property":"og:description","content":"使用Postman发送x-www-form-urlencoded格式的数组 在这个教程中，我们将探讨使用Postman发送x-www-form-urlencoded格式数组的方法。 W3C委员会定义了多种我们可以用于通过网络层发送数据的格式。这些格式包括form-data、raw和x-www-form-urlencoded数据。我们默认使用后者格式发送..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-13T17:42:08.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"x-www-form-urlencoded"}],["meta",{"property":"article:tag","content":"Array"}],["meta",{"property":"article:published_time","content":"2022-10-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-13T17:42:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Postman发送x-www-form-urlencoded格式的数组\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/simple-array-postman-index.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/10/complex-array-postman.png\\"],\\"datePublished\\":\\"2022-10-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-13T17:42:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Postman发送x-www-form-urlencoded格式的数组 在这个教程中，我们将探讨使用Postman发送x-www-form-urlencoded格式数组的方法。 W3C委员会定义了多种我们可以用于通过网络层发送数据的格式。这些格式包括form-data、raw和x-www-form-urlencoded数据。我们默认使用后者格式发送..."},"headers":[{"level":3,"title":"3. 发送数组","slug":"_3-发送数组","link":"#_3-发送数组","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720892528000,"updatedTime":1720892528000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.47,"words":1340},"filePathRelative":"posts/baeldung/2024-07-13/2024-07-13-Send Array as Part of x www form urlencoded Using Postman.md","localizedDate":"2022年10月1日","excerpt":"\\n<p>在这个教程中，我们将探讨使用Postman发送x-www-form-urlencoded格式数组的方法。</p>\\n<p>W3C委员会定义了多种我们可以用于通过网络层发送数据的格式。这些格式包括form-data、raw和x-www-form-urlencoded数据。我们默认使用后者格式发送数据。</p>\\n<p>列出的格式描述了作为HTTP消息体的一个块发送的表单数据。它发送了一个编码的表单数据集以提交给服务器。编码数据具有键值对的格式。服务器必须支持内容类型。</p>\\n<p>使用此内容类型提交的表单匹配以下编码模式：</p>\\n<ul>\\n<li>控件名称和值被转义。</li>\\n<li>'，'符号将多个值分隔开。</li>\\n<li>'+'符号将所有空格字符替换。</li>\\n<li>保留字符应遵循RFC 1738符号。</li>\\n<li>所有非字母数字字符使用百分号编码。</li>\\n<li>键与值用等号（'='）分隔，键值对用和号（'&amp;'）分隔。</li>\\n</ul>","autoDesc":true}`);export{c as comp,u as data};
