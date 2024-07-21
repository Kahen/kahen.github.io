import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as i}from"./app-CtR6X2Br.js";const n={},l=i('<h1 id="java中验证ipv4地址的方法" tabindex="-1"><a class="header-anchor" href="#java中验证ipv4地址的方法"><span>Java中验证IPv4地址的方法</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在这个简短的教程中，我们将看到如何在Java中<strong>验证IPv4地址</strong>。</p><h2 id="_2-ipv4验证规则" tabindex="-1"><a class="header-anchor" href="#_2-ipv4验证规则"><span>2. IPv4验证规则</span></a></h2><p>我们有效的IPv4地址形式为“<em>x.x.x.x</em>”，其中每个_x_是一个数字，范围在0到255之间，没有前导零，并且由点分隔。</p><p>以下是一些有效的IPv4地址示例：</p><ul><li>192.168.0.1</li><li>10.0.0.255</li><li>255.255.255.255</li></ul><p>以及一些无效的：</p><ul><li>192.168.0.256（值超过255）</li><li>192.168.0（只有3个八位字节）</li><li>.192.168.0.1（以“.”开头）</li><li>192.168.0.01（有前导零）</li></ul><h2 id="_3-使用apache-commons-validator" tabindex="-1"><a class="header-anchor" href="#_3-使用apache-commons-validator"><span>3. 使用Apache Commons Validator</span></a></h2><p>我们可以使用Apache Commons Validator库中的_InetAddressValidator_类来验证我们的IPv4或IPv6地址。</p><p>让我们在我们的_pom.xml_文件中添加一个依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`commons-validator`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`commons-validator`&lt;/artifactId&gt;`\n    `&lt;version&gt;`1.7`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们只需要使用_InetAddressValidator_对象的_isValid()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>InetAddressValidator validator = InetAddressValidator.getInstance();\nvalidator.isValid(&quot;127.0.0.1&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用guava" tabindex="-1"><a class="header-anchor" href="#_4-使用guava"><span>4. 使用Guava</span></a></h2><p>或者，我们可以使用Guava库中的_InetAddresses_类来实现相同的目标：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>InetAddresses.isInetAddress(&quot;127.0.0.1&quot;);\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-使用正则表达式" tabindex="-1"><a class="header-anchor" href="#_5-使用正则表达式"><span>5. 使用正则表达式</span></a></h2><p>最后，我们也可以正则表达式：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String regex = &quot;^((25[0-5]|(2[0-4]|1\\\\d|[1-9])\\\\d)\\\\.?\\\\b){4}$&quot;;\nPattern pattern = Pattern.compile(regex);\nMatcher matcher = pattern.matcher(ip);\nmatcher.matches();\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个正则表达式中，<code>((25[0-5]|(2[0-4]|1\\\\d|[1-9])\\\\d)\\\\.?\\\\b)</code>是一个组，重复四次以匹配IPv4地址中的四个八位字节。以下是每个八位字节的匹配情况：</p><ul><li><code>25[0-5]</code> - 这匹配250到255之间的数字。</li><li><code>(2[0-4]|1\\\\d|[1-9])</code> - 这匹配200到249、100到199和1到9之间的数字。</li><li><code>\\\\d</code> - 这匹配任何数字（0-9）。</li><li><code>\\\\.?</code> - 这匹配可选的点（.）字符。</li><li><code>\\\\b</code> - 这是一个单词边界。</li></ul><p>因此，这个正则表达式匹配IPv4地址。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>总之，我们学习了在Java中<strong>验证IPv4地址</strong>的不同方法。</p><p>本文的示例代码可以在GitHub上找到。</p>',27),d=[l];function r(s,o){return t(),a("div",null,d)}const v=e(n,[["render",r],["__file","2024-07-09-Validating IPv4 Address in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-09/2024-07-09-Validating%20IPv4%20Address%20in%20Java.html","title":"Java中验证IPv4地址的方法","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","编程"],"tag":["IPv4","验证"],"head":[["meta",{"name":"keywords","content":"Java, IPv4地址验证, 正则表达式"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-09/2024-07-09-Validating%20IPv4%20Address%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中验证IPv4地址的方法"}],["meta",{"property":"og:description","content":"Java中验证IPv4地址的方法 1. 概述 在这个简短的教程中，我们将看到如何在Java中验证IPv4地址。 2. IPv4验证规则 我们有效的IPv4地址形式为“x.x.x.x”，其中每个_x_是一个数字，范围在0到255之间，没有前导零，并且由点分隔。 以下是一些有效的IPv4地址示例： 192.168.0.1 10.0.0.255 255.25..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-09T18:43:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"IPv4"}],["meta",{"property":"article:tag","content":"验证"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-09T18:43:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中验证IPv4地址的方法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-09T18:43:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中验证IPv4地址的方法 1. 概述 在这个简短的教程中，我们将看到如何在Java中验证IPv4地址。 2. IPv4验证规则 我们有效的IPv4地址形式为“x.x.x.x”，其中每个_x_是一个数字，范围在0到255之间，没有前导零，并且由点分隔。 以下是一些有效的IPv4地址示例： 192.168.0.1 10.0.0.255 255.25..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. IPv4验证规则","slug":"_2-ipv4验证规则","link":"#_2-ipv4验证规则","children":[]},{"level":2,"title":"3. 使用Apache Commons Validator","slug":"_3-使用apache-commons-validator","link":"#_3-使用apache-commons-validator","children":[]},{"level":2,"title":"4. 使用Guava","slug":"_4-使用guava","link":"#_4-使用guava","children":[]},{"level":2,"title":"5. 使用正则表达式","slug":"_5-使用正则表达式","link":"#_5-使用正则表达式","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1720550602000,"updatedTime":1720550602000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.65,"words":494},"filePathRelative":"posts/baeldung/2024-07-09/2024-07-09-Validating IPv4 Address in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在这个简短的教程中，我们将看到如何在Java中<strong>验证IPv4地址</strong>。</p>\\n<h2>2. IPv4验证规则</h2>\\n<p>我们有效的IPv4地址形式为“<em>x.x.x.x</em>”，其中每个_x_是一个数字，范围在0到255之间，没有前导零，并且由点分隔。</p>\\n<p>以下是一些有效的IPv4地址示例：</p>\\n<ul>\\n<li>192.168.0.1</li>\\n<li>10.0.0.255</li>\\n<li>255.255.255.255</li>\\n</ul>\\n<p>以及一些无效的：</p>\\n<ul>\\n<li>192.168.0.256（值超过255）</li>\\n<li>192.168.0（只有3个八位字节）</li>\\n<li>.192.168.0.1（以“.”开头）</li>\\n<li>192.168.0.01（有前导零）</li>\\n</ul>","autoDesc":true}');export{v as comp,m as data};
