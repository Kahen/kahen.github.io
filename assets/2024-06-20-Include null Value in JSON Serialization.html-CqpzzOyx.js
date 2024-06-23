import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as t}from"./app-2DYvpUCK.js";const i={},s=t(`<h1 id="在java-json序列化中包含空值" tabindex="-1"><a class="header-anchor" href="#在java-json序列化中包含空值"><span>在Java JSON序列化中包含空值</span></a></h1><p>当我们使用Java对象并需要将其转换为JSON格式时，适当处理空值非常重要。从JSON输出中省略空值可能不符合我们的数据需求，特别是当数据完整性至关重要时。</p><p><strong>在本教程中，我们将深入探讨在Java中进行JSON序列化时包含空值的有效方法。</strong></p><h2 id="_2-使用案例场景-客户管理系统" tabindex="-1"><a class="header-anchor" href="#_2-使用案例场景-客户管理系统"><span>2. 使用案例场景：客户管理系统</span></a></h2><p>假设我们正在开发一个客户管理系统，其中每个客户都是一个具有名称、电子邮件和年龄等属性的Java对象。此外，一些客户可能没有电子邮件地址。</p><p><strong>在将客户数据序列化为JSON进行存储或传输时，包含缺失电子邮件地址的空值对于保持数据一致性至关重要。</strong></p><p>为了完整性，让我们定义我们示例中使用的_Customer_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Customer {
    @JsonProperty
    private final String name;
    @JsonProperty
    private final String address;
    @JsonProperty
    private final int age;

    public Customer(String name, String address, int age) {
        this.name = name;
        this.address = address;
        this.age = age;
    }

    // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们定义了_Customer_类，其中包括名称、地址和年龄字段，这些字段通过构造方法初始化。_toString()_方法还提供了对象的JSON格式字符串表示，便于调试。</p><p><strong>请注意，包括_@JsonProperty_注解确保所有相关字段都被准确序列化到JSON输出中，包括适用时的空值。</strong></p><h2 id="_3-使用jackson库" tabindex="-1"><a class="header-anchor" href="#_3-使用jackson库"><span>3. 使用Jackson库</span></a></h2><p>Jackson是一个著名的Java JSON处理库，默认情况下通常会从JSON输出中排除空值。然而，我们可以利用Jackson的注解明确地包含空值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String expectedJson = &quot;{\\\\\\&quot;name\\\\\\&quot;:\\\\\\&quot;John\\\\\\&quot;,\\\\\\&quot;address\\\\\\&quot;:null,\\\\\\&quot;age\\\\\\&quot;:25}&quot;;
Customer obj = new Customer(&quot;John&quot;, null, 25);

@Test
public void givenObjectWithNullField_whenJacksonUsed_thenIncludesNullValue() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    mapper.setSerializationInclusion(JsonInclude.Include.ALWAYS);
    String json = mapper.writeValueAsString(obj);
    assertEquals(expectedJson, json);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种方法中，我们首先建立_expectedJson_字符串。随后，我们实例化一个_Customer_对象，其值为_John_、<em>null_和_25</em>。</p><p>**接下来，我们通过调用_setSerializationInclusion()<em>方法并使用参数_JsonInclude.Include.ALWAYS_来配置_ObjectMapper_实例，在序列化过程中始终包含空值。**这种精心设置确保即使地址是_null</em>，它也能在生成的JSON输出中被准确表示。</p><p>最后，我们使用_assertEquals()_方法来验证_json_字符串是否与_expectedJson_匹配。</p><h2 id="_4-使用gson库" tabindex="-1"><a class="header-anchor" href="#_4-使用gson库"><span>4. 使用Gson库</span></a></h2><p>Gson是另一个可用于Java JSON序列化和反序列化的库。它提供了类似的选项来明确包含空值。让我们看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenObjectWithNullField_whenGsonUsed_thenIncludesNullValue() {
    Gson gson = new GsonBuilder().serializeNulls().create();
    String json = gson.toJson(obj);
    assertEquals(expectedJson, json);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在这里，我们使用_GsonBuilder_设置一个_Gson_实例，使用_serializeNulls()<em>方法。这种配置确保在序列化过程中包含空值，确保即使地址字段是_null</em>，在生成的JSON输出中也能精确表示。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>总之，在处理Java对象并将其转换为JSON格式时，适当处理空值非常重要。</p><p>在本教程中，我们学习了如何在JSON序列化过程中做到这一点。</p><p>如常，示例的源代码可以在GitHub上找到。</p>`,24),l=[s];function r(o,d){return a(),n("div",null,l)}const p=e(i,[["render",r],["__file","2024-06-20-Include null Value in JSON Serialization.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/Archive/2024-06-20-Include%20null%20Value%20in%20JSON%20Serialization.html","title":"在Java JSON序列化中包含空值","lang":"zh-CN","frontmatter":{"date":"2024-06-20T00:00:00.000Z","category":["Java","JSON"],"tag":["JSON Serialization","Null Values"],"head":[["meta",{"name":"keywords","content":"Java, JSON, Serialization, Null Values"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/2024-06-20-Include%20null%20Value%20in%20JSON%20Serialization.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java JSON序列化中包含空值"}],["meta",{"property":"og:description","content":"在Java JSON序列化中包含空值 当我们使用Java对象并需要将其转换为JSON格式时，适当处理空值非常重要。从JSON输出中省略空值可能不符合我们的数据需求，特别是当数据完整性至关重要时。 在本教程中，我们将深入探讨在Java中进行JSON序列化时包含空值的有效方法。 2. 使用案例场景：客户管理系统 假设我们正在开发一个客户管理系统，其中每个客..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSON Serialization"}],["meta",{"property":"article:tag","content":"Null Values"}],["meta",{"property":"article:published_time","content":"2024-06-20T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java JSON序列化中包含空值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-20T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java JSON序列化中包含空值 当我们使用Java对象并需要将其转换为JSON格式时，适当处理空值非常重要。从JSON输出中省略空值可能不符合我们的数据需求，特别是当数据完整性至关重要时。 在本教程中，我们将深入探讨在Java中进行JSON序列化时包含空值的有效方法。 2. 使用案例场景：客户管理系统 假设我们正在开发一个客户管理系统，其中每个客..."},"headers":[{"level":2,"title":"2. 使用案例场景：客户管理系统","slug":"_2-使用案例场景-客户管理系统","link":"#_2-使用案例场景-客户管理系统","children":[]},{"level":2,"title":"3. 使用Jackson库","slug":"_3-使用jackson库","link":"#_3-使用jackson库","children":[]},{"level":2,"title":"4. 使用Gson库","slug":"_4-使用gson库","link":"#_4-使用gson库","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.69,"words":807},"filePathRelative":"posts/baeldung/Archive/2024-06-20-Include null Value in JSON Serialization.md","localizedDate":"2024年6月20日","excerpt":"\\n<p>当我们使用Java对象并需要将其转换为JSON格式时，适当处理空值非常重要。从JSON输出中省略空值可能不符合我们的数据需求，特别是当数据完整性至关重要时。</p>\\n<p><strong>在本教程中，我们将深入探讨在Java中进行JSON序列化时包含空值的有效方法。</strong></p>\\n<h2>2. 使用案例场景：客户管理系统</h2>\\n<p>假设我们正在开发一个客户管理系统，其中每个客户都是一个具有名称、电子邮件和年龄等属性的Java对象。此外，一些客户可能没有电子邮件地址。</p>\\n<p><strong>在将客户数据序列化为JSON进行存储或传输时，包含缺失电子邮件地址的空值对于保持数据一致性至关重要。</strong></p>","autoDesc":true}');export{p as comp,v as data};
