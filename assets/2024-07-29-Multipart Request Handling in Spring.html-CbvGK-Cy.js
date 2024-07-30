import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-CbPcg273.js";const a={},l=n(`<h1 id="spring-boot中处理多部分请求" tabindex="-1"><a class="header-anchor" href="#spring-boot中处理多部分请求"><span>Spring Boot中处理多部分请求</span></a></h1><p>在本教程中，我们将重点介绍在Spring Boot中发送多部分请求的各种机制。多部分请求包括将许多不同类型的数据作为单一HTTP方法调用的一部分，通过边界分隔发送。通常，我们可以发送复杂的JSON、XML或CSV数据，以及在此请求中传输多部分文件。多部分文件的例子包括音频或图像文件。此外，我们还可以将简单的键/值对数据与多部分文件一起作为多部分请求发送。</p><p>现在让我们看看我们可以发送这些数据的各种方式。</p><h2 id="_2-使用-modelattribute" tabindex="-1"><a class="header-anchor" href="#_2-使用-modelattribute"><span>2. 使用 @ModelAttribute</span></a></h2><p>让我们考虑一个简单的用例，使用表单发送员工的数据，包括姓名和文件。</p><p>首先，我们将创建一个Employee抽象来存储表单数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Employee {
    private String name;
    private MultipartFile document;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将使用Thymeleaf生成表单：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;form action=&quot;#&quot; th:action=&quot;@{/employee}&quot; th:object=&quot;\${employee}&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;\`
    \`\`&lt;p&gt;\`\`name: \`&lt;input type=&quot;text&quot; th:field=&quot;*{name}&quot; /&gt;\`\`\`&lt;/p&gt;\`\`
    \`\`&lt;p&gt;\`\`document:\`&lt;input type=&quot;file&quot; th:field=&quot;*{document}&quot; multiple=&quot;multiple&quot;/&gt;\`\`\`&lt;/p&gt;\`\`
    \`&lt;input type=&quot;submit&quot; value=&quot;upload&quot; /&gt;\`
    \`&lt;input type=&quot;reset&quot; value=&quot;Reset&quot; /&gt;\`
\`&lt;/form&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在视图中需要特别注意的是，我们将enctype声明为multipart/form-data。</p><p>最后，我们将创建一个方法来接受表单数据，包括多部分文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(path = &quot;/employee&quot;, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public String saveEmployee(@ModelAttribute Employee employee) {
    employeeService.save(employee);
    return &quot;employee/success&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里两个特别重要的细节是：</p><ul><li>consumes属性值设置为multipart/form-data</li><li>@ModelAttribute已将所有表单数据捕获到Employee POJO中，包括上传的文件</li></ul><h2 id="_3-使用-requestpart" tabindex="-1"><a class="header-anchor" href="#_3-使用-requestpart"><span>3. 使用 @RequestPart</span></a></h2><p>这个注解将多部分请求的一部分与方法参数关联起来，这在发送复杂多属性数据作为有效载荷时非常有用，例如JSON或XML。</p><p>让我们创建一个有两个参数的方法，第一个是Employee类型，第二个是MultipartFile。此外，我们将这两个参数都注解为@RequestPart：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@PostMapping(path = &quot;/requestpart/employee&quot;, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public ResponseEntity\`\`&lt;Object&gt;\`\` saveEmployee(@RequestPart Employee employee, @RequestPart MultipartFile document) {
    employee.setDocument(document);
    employeeService.save(employee);
    return ResponseEntity.ok().build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，为了看到这个注解在行动中，我们将使用MockMultipartFile创建测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenEmployeeJsonAndMultipartFile_whenPostWithRequestPart_thenReturnsOK() throws Exception {
    MockMultipartFile employeeJson = new MockMultipartFile(&quot;employee&quot;, null,
      &quot;application/json&quot;, &quot;{\\&quot;name\\&quot;: \\&quot;Emp Name\\&quot;}&quot;.getBytes());

    mockMvc.perform(multipart(&quot;/requestpart/employee&quot;)
      .file(A_FILE)
      .file(employeeJson))
      .andExpect(status().isOk());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述需要注意的重要事项是，我们将Employee部分的内容类型设置为application/JSON。我们还发送了这个数据作为一个JSON文件，以及多部分文件。</p><p>有关如何测试多部分请求的更多细节可以在这里找到。</p><h2 id="_4-使用-requestparam" tabindex="-1"><a class="header-anchor" href="#_4-使用-requestparam"><span>4. 使用 @RequestParam</span></a></h2><p>发送多部分数据的另一种方式是使用@RequestParam。这特别适用于作为文件一起发送的简单数据，这些数据作为键/值对发送：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@RequestMapping(path = &quot;/requestparam/employee&quot;, method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
public ResponseEntity\`\`&lt;Object&gt;\`\` saveEmployee(@RequestParam String name, @RequestPart MultipartFile document) {
    Employee employee = new Employee(name, document);
    employeeService.save(employee);
    return ResponseEntity.ok().build();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们为这个方法编写测试以演示：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenRequestPartAndRequestParam_whenPost_thenReturns200OK() throws Exception {
    mockMvc.perform(multipart(&quot;/requestparam/employee&quot;)
      .file(A_FILE)
      .param(&quot;name&quot;, &quot;testname&quot;))
      .andExpect(status().isOk());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何在Spring Boot中有效地处理多部分请求。</p><p>最初，我们使用模型属性发送了多部分表单数据。然后我们看了如何使用@RequestPart和@RequestParam注解分别接收多部分数据。</p><p>一如既往，完整的源代码可以在GitHub上找到。</p>`,31),s=[l];function r(o,u){return i(),t("div",null,s)}const m=e(a,[["render",r],["__file","2024-07-29-Multipart Request Handling in Spring.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-29/2024-07-29-Multipart%20Request%20Handling%20in%20Spring.html","title":"Spring Boot中处理多部分请求","lang":"zh-CN","frontmatter":{"date":"2024-07-30T00:00:00.000Z","category":["Spring Boot","Multipart Request"],"tag":["Spring","Multipart"],"head":[["meta",{"name":"keywords","content":"Spring Boot, Multipart Request Handling"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-29/2024-07-29-Multipart%20Request%20Handling%20in%20Spring.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Spring Boot中处理多部分请求"}],["meta",{"property":"og:description","content":"Spring Boot中处理多部分请求 在本教程中，我们将重点介绍在Spring Boot中发送多部分请求的各种机制。多部分请求包括将许多不同类型的数据作为单一HTTP方法调用的一部分，通过边界分隔发送。通常，我们可以发送复杂的JSON、XML或CSV数据，以及在此请求中传输多部分文件。多部分文件的例子包括音频或图像文件。此外，我们还可以将简单的键/值..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-29T20:28:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:tag","content":"Multipart"}],["meta",{"property":"article:published_time","content":"2024-07-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-29T20:28:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Boot中处理多部分请求\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-29T20:28:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Spring Boot中处理多部分请求 在本教程中，我们将重点介绍在Spring Boot中发送多部分请求的各种机制。多部分请求包括将许多不同类型的数据作为单一HTTP方法调用的一部分，通过边界分隔发送。通常，我们可以发送复杂的JSON、XML或CSV数据，以及在此请求中传输多部分文件。多部分文件的例子包括音频或图像文件。此外，我们还可以将简单的键/值..."},"headers":[{"level":2,"title":"2. 使用 @ModelAttribute","slug":"_2-使用-modelattribute","link":"#_2-使用-modelattribute","children":[]},{"level":2,"title":"3. 使用 @RequestPart","slug":"_3-使用-requestpart","link":"#_3-使用-requestpart","children":[]},{"level":2,"title":"4. 使用 @RequestParam","slug":"_4-使用-requestparam","link":"#_4-使用-requestparam","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1722284931000,"updatedTime":1722284931000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.91,"words":873},"filePathRelative":"posts/baeldung/2024-07-29/2024-07-29-Multipart Request Handling in Spring.md","localizedDate":"2024年7月30日","excerpt":"\\n<p>在本教程中，我们将重点介绍在Spring Boot中发送多部分请求的各种机制。多部分请求包括将许多不同类型的数据作为单一HTTP方法调用的一部分，通过边界分隔发送。通常，我们可以发送复杂的JSON、XML或CSV数据，以及在此请求中传输多部分文件。多部分文件的例子包括音频或图像文件。此外，我们还可以将简单的键/值对数据与多部分文件一起作为多部分请求发送。</p>\\n<p>现在让我们看看我们可以发送这些数据的各种方式。</p>\\n<h2>2. 使用 @ModelAttribute</h2>\\n<p>让我们考虑一个简单的用例，使用表单发送员工的数据，包括姓名和文件。</p>\\n<p>首先，我们将创建一个Employee抽象来存储表单数据：</p>","autoDesc":true}');export{m as comp,c as data};
