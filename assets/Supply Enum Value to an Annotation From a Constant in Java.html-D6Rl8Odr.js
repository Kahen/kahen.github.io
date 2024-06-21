import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as t,a}from"./app-Tl0P_Vj7.js";const i={},s=a(`<h1 id="java中从常量向注解提供枚举值" tabindex="-1"><a class="header-anchor" href="#java中从常量向注解提供枚举值"><span>Java中从常量向注解提供枚举值</span></a></h1><p>在本教程中，我们将探索Java中从常量向注解提供枚举值的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。</p><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h2 id="_2-问题陈述" tabindex="-1"><a class="header-anchor" href="#_2-问题陈述"><span>2. 问题陈述</span></a></h2><p>让我们设想以下需求。**在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_Content-Type_。**现在，让我们看看如何共享两个端点定义中的相同枚举值。</p><p>为了更好地理解问题陈述，我们将继续探索一个演示用例。</p><h2 id="_3-定义演示用例" tabindex="-1"><a class="header-anchor" href="#_3-定义演示用例"><span>3. 定义演示用例</span></a></h2><p>为了满足要求，我们需要以下数据结构。</p><p>一个看起来像这样的_RequestContentType_枚举：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>enum RequestContentType {
    JSON, XML, HTML
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>两个自定义注解，<em>@PutRequest_和</em>@PostRequest_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@interface PostRequest {
    RequestContentType type();
}

@interface PutRequest {
    RequestContentType type();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后是以下控制器类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class DataController {
    @PostRequest(contentType = RequestContentType.JSON)
    String createData() {
       // ...
    }

    @PutRequest(contentType = RequestContentType.JSON)
    public String updateData() {
        // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所观察到的，当前控制器实现通过两次引用_JSON_类型来满足要求，分别用于每个函数。尽管这种实现满足了要求，但它仍然不够健壮。<strong>从技术上讲，<em>@PostRequest_可以很容易地使用与</em>@PutRequest_不同的_contentType_初始化。</strong></p><p>在下一节中，我们将探讨实现一个强类型实现的不同方法，以确保_@PostRequest_和_@PutRequest_始终共享相同的_contentType_。我们将定义理想场景，了解Java语言的限制，并最终探索我们拥有的替代方案。</p><h2 id="_4-共享相同的枚举值" tabindex="-1"><a class="header-anchor" href="#_4-共享相同的枚举值"><span>4. 共享相同的枚举值</span></a></h2><p>我们希望通过在一个地方更改_RequestContentType_，更改就会在所有引用_RequestContentType_的地方反映出来。</p><p>接下来，我们将看看通常的思维方式对我们有什么指示。</p><h3 id="_4-1-理想场景" tabindex="-1"><a class="header-anchor" href="#_4-1-理想场景"><span>4.1. 理想场景</span></a></h3><p>当我们第一次考虑这个需求时，我们的思维会沿着以下方向流动——让我们**定义一个类型为_RequestContentType_的常量，然后在每个注解中引用它。**看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class DataController {
    static final RequestContentType REQUEST_TYPE = RequestContentType.JSON;

    @PostRequest(contentType = REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(contentType = REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是最直接和理想的实现方法。<strong>不幸的是，它没有按预期工作。这是因为我们面临一个编译错误，指出</strong>“属性值必须是枚举常量”**。</p><p>接下来，让我们更深入地了解为什么这个解决方案没有编译，以及Java对它施加了什么限制。</p><h3 id="_4-2-理解java的限制" tabindex="-1"><a class="header-anchor" href="#_4-2-理解java的限制"><span>4.2. 理解Java的限制</span></a></h3><p>正如我们在JLS-9.7.1中看到的，对于注解，如果元素类型是枚举，唯一接受的值就是枚举常量。根据Java语言规范的普遍语言，根据JLS-8.9.1，所有的枚举，如_RequestContentType_中的_JSON_、<em>XML_和_HTML</em>，已经是常量了。有关枚举的更多信息，请查看Java枚举指南。</p><p>总之，Java通过设计限制我们只能直接将枚举分配给注解。因此，理想场景是不可行的。</p><h2 id="_5-实现替代方案以将枚举作为常量提供给注解" tabindex="-1"><a class="header-anchor" href="#_5-实现替代方案以将枚举作为常量提供给注解"><span>5. 实现替代方案以将枚举作为常量提供给注解</span></a></h2><p>现在我们已经了解了Java语言的限制，让我们看看如何实现期望的结果。我们将探索两个选项：通过定义一个带有一组整型常量的接口来模拟枚举，另一个是使用带有嵌套静态类的枚举。最后，我们将比较这两种方法。</p><p>接下来，让我们深入了解这两种方法的细节，并了解何时使用其中之一。</p><h3 id="_5-1-使用整型常量模拟枚举" tabindex="-1"><a class="header-anchor" href="#_5-1-使用整型常量模拟枚举"><span>5.1. 使用整型常量模拟枚举</span></a></h3><p>让我们从模拟枚举开始，它看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>interface SimulatedRequestContentType {
   static final int JSON = 1;
   static final int XML = 2;
   static final int HTML = 3;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们也将注解定义更改为接受整型：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@interface PostRequest {
    int intContentType();
}

@interface PutRequest {
    int intContentType();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，使用方式看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class DataController {
    static final int REQUEST_TYPE = SimulatedRequestContentType.JSON;

    @PostRequest(intContentType = REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(intContentType = REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，这种替代方案解决了需求，但不再使用枚举。</p><p>让我们看看如何仍然使用枚举。</p><h3 id="_5-2-通过嵌套静态类扩展枚举以定义常量" tabindex="-1"><a class="header-anchor" href="#_5-2-通过嵌套静态类扩展枚举以定义常量"><span>5.2. 通过嵌套静态类扩展枚举以定义常量</span></a></h3><p>现在，让我们看看我们如何通过嵌套静态类来扩展初始枚举以定义常量。枚举_ExtendedRequestContentType_的实现看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>enum ExtendedRequestContentType {
    JSON(Constants.JSON_VALUE), XML(Constants.XML_VALUE), HTML(Constants.HTML_VALUE);

    ExtendedRequestContentType(String name) {
        if (!name.equals(this.name()))
        {
            throw new IllegalArgumentException();
        }
    }

    public static class Constants {
        public static final String JSON_VALUE = &quot;JSON&quot;;
        public static final String XML_VALUE = &quot;XML&quot;;
        public static final String HTML_VALUE = &quot;HTML&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_Constants_类定义了每种类型的值。这些将用作注解的参数值。</p><p>一个重要的细节是枚举的构造函数期望一个名为_name_的字符串作为参数。基本上，有了这个构造函数，我们确保每当定义一个新的枚举常量时，也会定义一个同名的常量。否则，在初始化枚举时会抛出错误。<strong>这将确保从枚举到Constants的1:1映射。</strong></p><p>此外，如果我们想确保更严格的双向1:1映射，我们可以编写以下单元测试：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testEnumAndConstantsSync() {
    Set\`\`\`&lt;String&gt;\`\`\` enumValues = getEnumNames();
    List\`\`\`&lt;String&gt;\`\`\` constantValues = getConstantValues();
    Set\`\`\`&lt;String&gt;\`\`\` uniqueConstantValues = constantValues.stream().distinct().collect(Collectors.toSet());
    assertEquals(constantValues.size(), uniqueConstantValues.size());
    assertEquals(enumValues, uniqueConstantValues);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个单元测试中，我们首先获取所有枚举名称作为一个_Set_。然后，使用反射，我们获取所有公共_String_常量的值。最后，作为最后一步，我们确保没有同名的常量，并且枚举和常量之间有完全的1:1映射。</p><p>最后，让我们使用_ExtendedRequestContentType_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class DataController {
    static final String EXTENDED_REQUEST_TYPE = ExtendedRequestContentType.Constants.XML_VALUE;

    @PostRequest(extendedContentType = EXTENDED_REQUEST_TYPE)
    String createData() {
        // ...
    }

    @PutRequest(extendedContentType = EXTENDED_REQUEST_TYPE)
    String updateData() {
        // ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-比较替代方案" tabindex="-1"><a class="header-anchor" href="#_5-3-比较替代方案"><span>5.3. 比较替代方案</span></a></h3><p>正如我们所看到的，两种替代方案都使用除了枚举之外的数据类型来将值传递给注解。这是必要的，以便将此值分配给_DataController_类中的另一个常量，并在注解之间共享。</p><p>两者之间的主要区别在于，在模拟枚举的选项中，我们完全放弃了使用枚举，而在第二个选项中，我们仍然保持使用枚举，并确保与定义的常量1:1映射。</p><p>如果我们在应用程序的其他部分也使用枚举及其功能，那么保持枚举和内容同步的开销就完全有意义了。如果我们这样做，那么实现一个实用方法来从常量映射到枚举值可能非常有用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static ExtendedRequestContentType toEnum(String constant) {
    return Arrays.stream(ExtendedRequestContentType.values())
      .filter(contentType -&gt; contentType.name().equals(constant))
      .findFirst()
      .orElseThrow(IllegalArgumentException::new);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>作为底线，如果在应用程序的其他部分也需要使用枚举，请选择第二种替代方案；否则，将枚举交换为常量值。</strong></p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本教程中，**我们学习了Java在从常量向注解提供枚举值方面的限制，并探索了我们的替代方案。**我们首先查看了这个需求有用的用例，然后深入研究了语言的限制。最后，我们实现了两种不同的替代方案，并探讨了它们的差异。</p><p>如常，本文的完整实现可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p><p>OK</p>`,60),l=[s];function d(r,c){return t(),n("div",null,l)}const o=e(i,[["render",d],["__file","Supply Enum Value to an Annotation From a Constant in Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/Archive/Supply%20Enum%20Value%20to%20an%20Annotation%20From%20a%20Constant%20in%20Java.html","title":"Java中从常量向注解提供枚举值","lang":"zh-CN","frontmatter":{"date":"2024-06-15T00:00:00.000Z","category":["Java","Annotations"],"tag":["Java","Enum","Annotations"],"description":"Java中从常量向注解提供枚举值 在本教程中，我们将探索Java中从常量向注解提供枚举值的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。 1. 引言 2. 问题陈述 让我们设想以下需求。**在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_Content-Type_。**现在，让我们看看如何共...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Supply%20Enum%20Value%20to%20an%20Annotation%20From%20a%20Constant%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中从常量向注解提供枚举值"}],["meta",{"property":"og:description","content":"Java中从常量向注解提供枚举值 在本教程中，我们将探索Java中从常量向注解提供枚举值的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。 1. 引言 2. 问题陈述 让我们设想以下需求。**在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_Content-Type_。**现在，让我们看看如何共..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Enum"}],["meta",{"property":"article:tag","content":"Annotations"}],["meta",{"property":"article:published_time","content":"2024-06-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中从常量向注解提供枚举值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-15T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. 问题陈述","slug":"_2-问题陈述","link":"#_2-问题陈述","children":[]},{"level":2,"title":"3. 定义演示用例","slug":"_3-定义演示用例","link":"#_3-定义演示用例","children":[]},{"level":2,"title":"4. 共享相同的枚举值","slug":"_4-共享相同的枚举值","link":"#_4-共享相同的枚举值","children":[{"level":3,"title":"4.1. 理想场景","slug":"_4-1-理想场景","link":"#_4-1-理想场景","children":[]},{"level":3,"title":"4.2. 理解Java的限制","slug":"_4-2-理解java的限制","link":"#_4-2-理解java的限制","children":[]}]},{"level":2,"title":"5. 实现替代方案以将枚举作为常量提供给注解","slug":"_5-实现替代方案以将枚举作为常量提供给注解","link":"#_5-实现替代方案以将枚举作为常量提供给注解","children":[{"level":3,"title":"5.1. 使用整型常量模拟枚举","slug":"_5-1-使用整型常量模拟枚举","link":"#_5-1-使用整型常量模拟枚举","children":[]},{"level":3,"title":"5.2. 通过嵌套静态类扩展枚举以定义常量","slug":"_5-2-通过嵌套静态类扩展枚举以定义常量","link":"#_5-2-通过嵌套静态类扩展枚举以定义常量","children":[]},{"level":3,"title":"5.3. 比较替代方案","slug":"_5-3-比较替代方案","link":"#_5-3-比较替代方案","children":[]}]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":6.19,"words":1856},"filePathRelative":"posts/baeldung/Archive/Supply Enum Value to an Annotation From a Constant in Java.md","localizedDate":"2024年6月15日","excerpt":"\\n<p>在本教程中，我们将探索Java中从常量向注解提供枚举值的可能性。为了理解所提出的设计决策的主要驱动因素，我们将从问题陈述开始，然后是一个演示用例。</p>\\n<h2>1. 引言</h2>\\n<h2>2. 问题陈述</h2>\\n<p>让我们设想以下需求。**在控制器类中，两个_POST_和_PUT_端点始终需要具有相同的_Content-Type_。**现在，让我们看看如何共享两个端点定义中的相同枚举值。</p>\\n<p>为了更好地理解问题陈述，我们将继续探索一个演示用例。</p>\\n<h2>3. 定义演示用例</h2>\\n<p>为了满足要求，我们需要以下数据结构。</p>\\n<p>一个看起来像这样的_RequestContentType_枚举：</p>","autoDesc":true}');export{o as comp,p as data};
