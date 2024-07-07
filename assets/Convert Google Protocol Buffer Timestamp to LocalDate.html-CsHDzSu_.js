import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-BA-MSwOu.js";const o={},i=n(`<h1 id="将-google-协议缓冲区时间戳转换为-localdate-baeldung" tabindex="-1"><a class="header-anchor" href="#将-google-协议缓冲区时间戳转换为-localdate-baeldung"><span>将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>协议缓冲区（protobuf）数据格式帮助我们在网络上传输结构化数据。它独立于任何编程语言，并且大多数编程语言都有实现，包括Java。</p><p><strong>protobuf <em>Timestamp</em> 类型表示一个时间点，独立于任何特定时区</strong>。时间在计算中是一个关键组成部分，我们可能需要将 protobuf <em>Timestamp</em> 转换为 Java 时间实例，例如 <em>LocalDate</em>，以便将其无缝集成到现有的 Java 代码库中。</p><p>在本教程中，我们将探讨将 protobuf 时间戳实例转换为 <em>LocalDate</em> 类型的过程，使我们能够在 Java 应用程序中更有效地使用 protobuf 数据。</p><h2 id="_2-maven-依赖" tabindex="-1"><a class="header-anchor" href="#_2-maven-依赖"><span>2. Maven 依赖</span></a></h2><p>要创建 <em>Timestamp</em> 实例或使用从 <em>.proto</em> 文件生成的代码，我们需要将 <em>protobuf-java</em> 依赖项添加到 <em>pom.xml</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`com.google.protobuf\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`protobuf-java\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`4.26.1\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该依赖项提供了 <em>Timestamp</em> 类和其他 protobuf 相关类。</p><h2 id="_3-timestamp-类" tabindex="-1"><a class="header-anchor" href="#_3-timestamp-类"><span>3. <em>Timestamp</em> 类</span></a></h2><p>protobuf <em>Timestamp</em> 类表示自 Unix 纪元以来的时间点。时区或本地日历不影响它。</p><p><strong>它表示为某个时间点的秒数和纳秒数</strong>。让我们通过使用 Java <em>Instant</em> 对象来计算当前 <em>Timestamp</em> 的示例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Instant currentTimestamp = Instant.now();

Timestamp timestamp = Timestamp.newBuilder()
  .setSeconds(currentTimestamp.getEpochSecond())
  .setNanos(currentTimestamp.getNano())
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们从 <em>Instant</em> 对象计算 <em>Timestamp</em>。首先，我们创建一个表示给定点的日期和时间的 <em>Instant</em> 对象。接下来，我们提取秒数和纳秒数，并将它们传递给 <em>Timestamp</em> 实例。</p><p><strong>在将 <em>Timestamp</em> 转换为 <em>LocalDate</em> 时，考虑时区及其与 UTC 的相关偏移以准确表示本地日期至关重要</strong>。让我们通过创建具有特定秒数和纳秒数的 <em>Timestamp</em> 实例来开始转换 <em>Timestamp</em> 到 <em>LocalDate</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Timestamp ts = Timestamp.newBuilder()
  .setSeconds(1000000)
  .setNanos(77886600)
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <em>Instant</em> 类是表示时间点的最适当表示，让我们创建一个方法，它接受 <em>Timestamp</em> 作为参数并将其转换为 <em>LocalDate</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalDate convertToLocalDate(Timestamp timestamp) {
    Instant instant = Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
    LocalDate time = instant.atZone(ZoneId.of(&quot;America/Montreal&quot;)).toLocalDate();
    return time;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们使用 <em>ofEpochSecond()</em> 方法从 <em>Timestamp</em> 创建 <em>Instant</em> 对象，该方法以 <em>Timestamp</em> 的秒数和纳秒数作为参数。</p><p><strong>然后，我们使用 <em>atZone()</em> 方法将 <em>Instant</em> 对象转换为 <em>LocalDate</em>，这允许我们指定时区</strong>。这很重要，因为它确保得到的 LocalDate 反映了时区偏移。</p><p>值得注意的是，我们也可以使用我们的默认系统时区：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>LocalDate time = instant.atZone(ZoneId.systemDefault()).toLocalDate();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们编写一个单元测试来断言逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenTimestamp_whenConvertedToLocalDate_thenSuccess() {
    Timestamp timestamp = Timestamp.newBuilder()
      .setSeconds(1000000000)
      .setNanos(778866000)
      .build();
    LocalDate time = TimestampToLocalDate.convertToLocalDate(timestamp);
    assertEquals(LocalDate.of(2001, 9, 9), time);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们断言转换得到的 <em>LocalDate</em> 与预期结果匹配。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了如何通过将 <em>Timestamp</em> 转换为 <em>Instant</em> 来表示一个时间点，然后将 <em>Instance</em> 对象转换为 <em>LocalDate</em> 类型，通过设置时区来处理可能的偏移。</p><p>和往常一样，示例的完整源代码可在 GitHub 上获取。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,29),m=[i];function s(l,r){return a(),t("div",null,m)}const p=e(o,[["render",s],["__file","Convert Google Protocol Buffer Timestamp to LocalDate.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/Archive/Convert%20Google%20Protocol%20Buffer%20Timestamp%20to%20LocalDate.html","title":"将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-19T00:00:00.000Z","category":["Java","Google Protocol Buffer"],"tag":["LocalDate","Timestamp","Java"],"head":[["meta",{"name":"keywords","content":"Java, Protocol Buffer, Timestamp, LocalDate, 转换"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Convert%20Google%20Protocol%20Buffer%20Timestamp%20to%20LocalDate.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung"}],["meta",{"property":"og:description","content":"将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung 1. 概述 协议缓冲区（protobuf）数据格式帮助我们在网络上传输结构化数据。它独立于任何编程语言，并且大多数编程语言都有实现，包括Java。 protobuf Timestamp 类型表示一个时间点，独立于任何特定时区。时间在计算中是一个关键组成部分，我们可能需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LocalDate"}],["meta",{"property":"article:tag","content":"Timestamp"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将 Google 协议缓冲区时间戳转换为 LocalDate | Baeldung 1. 概述 协议缓冲区（protobuf）数据格式帮助我们在网络上传输结构化数据。它独立于任何编程语言，并且大多数编程语言都有实现，包括Java。 protobuf Timestamp 类型表示一个时间点，独立于任何特定时区。时间在计算中是一个关键组成部分，我们可能需要..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Maven 依赖","slug":"_2-maven-依赖","link":"#_2-maven-依赖","children":[]},{"level":2,"title":"3. Timestamp 类","slug":"_3-timestamp-类","link":"#_3-timestamp-类","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.76,"words":827},"filePathRelative":"posts/baeldung/Archive/Convert Google Protocol Buffer Timestamp to LocalDate.md","localizedDate":"2024年6月19日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>协议缓冲区（protobuf）数据格式帮助我们在网络上传输结构化数据。它独立于任何编程语言，并且大多数编程语言都有实现，包括Java。</p>\\n<p><strong>protobuf <em>Timestamp</em> 类型表示一个时间点，独立于任何特定时区</strong>。时间在计算中是一个关键组成部分，我们可能需要将 protobuf <em>Timestamp</em> 转换为 Java 时间实例，例如 <em>LocalDate</em>，以便将其无缝集成到现有的 Java 代码库中。</p>\\n<p>在本教程中，我们将探讨将 protobuf 时间戳实例转换为 <em>LocalDate</em> 类型的过程，使我们能够在 Java 应用程序中更有效地使用 protobuf 数据。</p>","autoDesc":true}');export{p as comp,u as data};
