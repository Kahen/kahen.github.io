import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-C4eFoh0f.js";const l={},i=n(`<h1 id="java-9-非法反射访问警告" tabindex="-1"><a class="header-anchor" href="#java-9-非法反射访问警告"><span>Java 9 非法反射访问警告</span></a></h1><p>在Java 9之前，Java反射API拥有一项超能力：它能够在没有限制的情况下访问非公开的类成员。从Java 9开始，模块系统希望将反射API限制在合理的范围内。</p><p>在本教程中，我们将检查模块系统与反射之间的关系。</p><h2 id="_2-模块系统与反射" tabindex="-1"><a class="header-anchor" href="#_2-模块系统与反射"><span>2. 模块系统与反射</span></a></h2><p>尽管反射和模块系统在Java历史的不同时间出现，但它们需要协同工作以构建一个可靠的平台。</p><h3 id="_2-1-底层模型" tabindex="-1"><a class="header-anchor" href="#_2-1-底层模型"><span>2.1 底层模型</span></a></h3><p>Java模块系统的目标之一是强封装。<strong>强封装主要包括可读性和可访问性</strong>：</p><ul><li>模块的可读性是一个粗略的概念，涉及一个模块是否依赖于另一个模块。</li><li>模块的可访问性是一个更细的概念，关心一个类是否可以访问另一个类的字段或方法。它由类边界、包边界和模块边界提供。</li></ul><p>为了提高可读性，我们可以使用模块声明中的“<em>requires</em>”指令，在命令行上指定“<em>add-reads</em>”选项，或者调用_Module.addReads_方法。同样，为了打破封装边界，我们可以使用模块声明中的“<em>opens</em>”指令，在命令行上指定“<em>add-opens</em>”选项，或者调用_Module.addOpens_方法。</p><p>即使反射也不能打破可读性和可访问性的规则；否则，将导致相应的错误或警告。需要注意的一点是：<strong>在使用反射时，运行时会自动在两个模块之间设置可读性边缘</strong>。这也意味着，如果出现问题，那是因为可访问性。</p><h3 id="_2-2-不同的反射使用情况" tabindex="-1"><a class="header-anchor" href="#_2-2-不同的反射使用情况"><span>2.2 不同的反射使用情况</span></a></h3><p>在Java模块系统中，存在不同类型的模块，例如命名模块、未命名模块、平台/系统模块、应用程序模块等：</p><p>在上述模块类型中，不同模块类型之间存在相当多的组合。通常，未命名模块不能被命名模块读取，除了自动模块。让我们只检查三种典型的非法反射访问情况：</p><p>在上面的图片中，深度反射意味着使用反射API通过调用_setAccessible(flag)<em>方法访问类的非公开成员。当使用反射从另一个命名模块访问命名模块时，我们将获得_IllegalAccessException_或_InaccessibleObjectException</em>。同样，当从未命名模块使用反射访问应用程序命名模块时，我们会得到相同的错误。</p><p>然而，当从未命名模块使用反射访问平台模块时，我们将获得_IllegalAccessException_或警告。警告消息有助于我们找到问题发生的地方，并进行进一步的补救：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>WARNING: Illegal reflective access by $PERPETRATOR to $VICTIM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的警告消息形式中，<em>$PERPETRATOR_表示反射类信息，</em>$VICTIM_表示被反射类信息。此消息归因于放宽的强封装。</p><h3 id="_2-3-放宽的强封装" tabindex="-1"><a class="header-anchor" href="#_2-3-放宽的强封装"><span>2.3 放宽的强封装</span></a></h3><p>在Java 9之前，许多第三方库使用反射API来执行它们的魔法工作。然而，模块系统的强封装规则将使大多数代码无效，特别是那些使用深度反射访问JDK内部API的代码。这将是不可取的。<strong>为了从Java 8到Java 9的模块系统顺利迁移，做出了妥协：放宽的强封装</strong>。</p><p>放宽的强封装提供了一个启动选项_–illegal-access_来控制运行时行为。我们应该注意到_–illegal-access_选项仅在我们使用反射从未命名模块访问平台模块时有效。否则，此选项没有效果。</p><p>_–illegal-access_选项有四个具体值：</p><ul><li><em>permit</em>：向未命名模块开放平台模块的每个包，并仅显示一次警告消息</li><li><em>warn</em>：与“<em>permit</em>”相同，但每次非法反射访问操作都会显示警告消息</li><li><em>debug</em>：与“<em>warn</em>”相同，并打印相应的堆栈跟踪</li><li><em>deny</em>：禁用所有非法反射访问操作</li></ul><p>从Java 9开始，_–illegal-access=permit_是默认模式。要使用其他模式，我们可以在命令行上指定此选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java --illegal-access=deny com.baeldung.module.unnamed.Main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在Java 16中，<em>–illegal-access=deny_成为默认模式。从Java 17开始，完全移除了</em>–illegal-access_选项。</p><h2 id="_3-如何修复反射非法访问" tabindex="-1"><a class="header-anchor" href="#_3-如何修复反射非法访问"><span>3. 如何修复反射非法访问</span></a></h2><p><strong>在Java模块系统中，需要打开一个包以允许深度反射</strong>。</p><h3 id="_3-1-在模块声明中" tabindex="-1"><a class="header-anchor" href="#_3-1-在模块声明中"><span>3.1. 在模块声明中</span></a></h3><p>如果我们是代码作者，我们可以在_module-info.java_中打开包：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>module baeldung.reflected {
    opens com.baeldung.reflected.opened;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了更加谨慎，我们可以使用限定的_opens_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>module baeldung.reflected {
    opens com.baeldung.reflected.internal to baeldung.intermedium;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在将现有代码迁移到模块系统时，为了方便，我们可以打开整个模块：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>open module baeldung.reflected {
    // 不要使用opens指令
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到<strong>一个开放的模块不允许内部_opens_指令</strong>。</p><h3 id="_3-2-在命令行上" tabindex="-1"><a class="header-anchor" href="#_3-2-在命令行上"><span>3.2. 在命令行上</span></a></h3><p>如果我们不是代码作者，我们可以使用命令行上的_–add-opens_选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>--add-opens java.base/java.lang=baeldung.reflecting.named
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并且，要向所有未命名模块添加开放，我们可以使用_ALL-UNNAMED_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java --add-opens java.base/java.lang=ALL-UNNAMED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-3-在运行时" tabindex="-1"><a class="header-anchor" href="#_3-3-在运行时"><span>3.3. 在运行时</span></a></h3><p>要在运行时添加开放，我们可以使用_Module.addOpens_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>srcModule.addOpens(&quot;com.baeldung.reflected.internal&quot;, targetModule);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的代码片段中，_srcModule_向_targetModule_打开了“<em>com.baeldung.reflected.internal</em>”包。</p><p>需要注意的一点是：<strong>_Module.addOpens_方法是调用者敏感的</strong>。此方法只有在我们从被修改的模块、从它已授予开放访问权限的模块，或从未命名模块调用时才会成功。否则，将导致_IllegalCallerException_。</p><p>另一种向目标模块添加开放的方法是使用Java代理。在_java.instrument_模块中，自Java 9以来，_Instrumentation_类增加了一个新的_redefineModule_方法。此方法可以用来添加额外的读取、导出、开放、使用和提供：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void redefineModule(Instrumentation inst, Module src, Module target) {
    // 准备额外的读取
    Set\`&lt;Module&gt;\` extraReads = Collections.singleton(target);

    // 准备额外的导出
    Set\`&lt;String&gt;\` packages = src.getPackages();
    Map&lt;String, Set\`&lt;Module&gt;\`&gt; extraExports = new HashMap&lt;&gt;();
    for (String pkg : packages) {
        extraExports.put(pkg, extraReads);
    }

    // 准备额外的开放
    Map&lt;String, Set\`&lt;Module&gt;\`&gt; extraOpens = new HashMap&lt;&gt;();
    for (String pkg : packages) {
        extraOpens.put(pkg, extraReads);
    }

    // 准备额外的使用
    Set\`\`\`&lt;Class&lt;?&gt;\`\`\`&gt; extraUses = Collections.emptySet();

    // 准备额外的提供
    Map\`\`\`&lt;Class&lt;?&gt;\`\`\`, List\`\`\`&lt;Class&lt;?&gt;\`\`\`&gt;&gt; extraProvides = Collections.emptyMap();

    // 重新定义模块
    inst.redefineModule(src, extraReads, extraExports, extraOpens, extraUses, extraProvides);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们首先使用_target_模块构建_extraReads_、_extraExports_和_extraOpens_变量。然后，我们调用_Instrumentation.redefineModule_方法。结果，_src_模块将对_target_模块可访问。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们首先介绍了模块系统的可读性和可访问性。然后，我们查看了不同的非法反射访问使用情况以及放宽的强封装如何帮助我们从Java 8迁移到Java 9模块系统。最后，我们提供了解决非法反射访问的不同方法。</p><p>像往常一样，本教程的源代码可以在GitHub上找到。</p>`,51),s=[i];function d(r,c){return t(),a("div",null,s)}const v=e(l,[["render",d],["__file","2024-07-19-Java 9 Illegal Reflective Access Warning.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Java%209%20Illegal%20Reflective%20Access%20Warning.html","title":"Java 9 非法反射访问警告","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","反射"],"tag":["Java 9","反射访问"],"head":[["meta",{"name":"keywords","content":"Java 9, 反射, 模块系统"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Java%209%20Illegal%20Reflective%20Access%20Warning.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 9 非法反射访问警告"}],["meta",{"property":"og:description","content":"Java 9 非法反射访问警告 在Java 9之前，Java反射API拥有一项超能力：它能够在没有限制的情况下访问非公开的类成员。从Java 9开始，模块系统希望将反射API限制在合理的范围内。 在本教程中，我们将检查模块系统与反射之间的关系。 2. 模块系统与反射 尽管反射和模块系统在Java历史的不同时间出现，但它们需要协同工作以构建一个可靠的平台..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T23:11:29.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java 9"}],["meta",{"property":"article:tag","content":"反射访问"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T23:11:29.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 9 非法反射访问警告\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T23:11:29.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 9 非法反射访问警告 在Java 9之前，Java反射API拥有一项超能力：它能够在没有限制的情况下访问非公开的类成员。从Java 9开始，模块系统希望将反射API限制在合理的范围内。 在本教程中，我们将检查模块系统与反射之间的关系。 2. 模块系统与反射 尽管反射和模块系统在Java历史的不同时间出现，但它们需要协同工作以构建一个可靠的平台..."},"headers":[{"level":2,"title":"2. 模块系统与反射","slug":"_2-模块系统与反射","link":"#_2-模块系统与反射","children":[{"level":3,"title":"2.1 底层模型","slug":"_2-1-底层模型","link":"#_2-1-底层模型","children":[]},{"level":3,"title":"2.2 不同的反射使用情况","slug":"_2-2-不同的反射使用情况","link":"#_2-2-不同的反射使用情况","children":[]},{"level":3,"title":"2.3 放宽的强封装","slug":"_2-3-放宽的强封装","link":"#_2-3-放宽的强封装","children":[]}]},{"level":2,"title":"3. 如何修复反射非法访问","slug":"_3-如何修复反射非法访问","link":"#_3-如何修复反射非法访问","children":[{"level":3,"title":"3.1. 在模块声明中","slug":"_3-1-在模块声明中","link":"#_3-1-在模块声明中","children":[]},{"level":3,"title":"3.2. 在命令行上","slug":"_3-2-在命令行上","link":"#_3-2-在命令行上","children":[]},{"level":3,"title":"3.3. 在运行时","slug":"_3-3-在运行时","link":"#_3-3-在运行时","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1721430689000,"updatedTime":1721430689000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.89,"words":1766},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Java 9 Illegal Reflective Access Warning.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在Java 9之前，Java反射API拥有一项超能力：它能够在没有限制的情况下访问非公开的类成员。从Java 9开始，模块系统希望将反射API限制在合理的范围内。</p>\\n<p>在本教程中，我们将检查模块系统与反射之间的关系。</p>\\n<h2>2. 模块系统与反射</h2>\\n<p>尽管反射和模块系统在Java历史的不同时间出现，但它们需要协同工作以构建一个可靠的平台。</p>\\n<h3>2.1 底层模型</h3>\\n<p>Java模块系统的目标之一是强封装。<strong>强封装主要包括可读性和可访问性</strong>：</p>\\n<ul>\\n<li>模块的可读性是一个粗略的概念，涉及一个模块是否依赖于另一个模块。</li>\\n<li>模块的可访问性是一个更细的概念，关心一个类是否可以访问另一个类的字段或方法。它由类边界、包边界和模块边界提供。</li>\\n</ul>","autoDesc":true}');export{v as comp,u as data};
