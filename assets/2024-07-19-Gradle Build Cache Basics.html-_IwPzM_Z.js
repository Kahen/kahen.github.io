import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as d,a as l}from"./app-B6f8H54y.js";const r={},t=l(`<hr><h1 id="gradle构建缓存基础" tabindex="-1"><a class="header-anchor" href="#gradle构建缓存基础"><span>Gradle构建缓存基础</span></a></h1><p>构建缓存可以使代码构建过程更快，并因此提高开发人员的生产力。在本文中，我们将学习Gradle构建缓存的基础知识。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-gradle构建缓存是什么" tabindex="-1"><a class="header-anchor" href="#_2-gradle构建缓存是什么"><span>2. Gradle构建缓存是什么？</span></a></h2><p>Gradle构建缓存是一种半永久性存储，它保存构建任务的输出。它允许从先前的构建中重用已经生成的工件。Gradle构建缓存的指导原则是，只要输入没有改变，就应避免重新构建已经构建的任务。通过这种方式，可以减少完成后续构建所需的时间。</p><p>在Gradle中，构建缓存键通过哈希每个任务的输入来唯一标识一个工件或任务输出。在执行任务之前，Gradle计算缓存键，然后查看远程或本地缓存，检查是否已经存在与计算出的缓存键对应的任务输出。如果不存在，则执行任务。否则，Gradle重用现有的任务输出。</p><p>现在，让我们看看两种不同的Gradle构建缓存。</p><h3 id="_2-1-本地构建缓存" tabindex="-1"><a class="header-anchor" href="#_2-1-本地构建缓存"><span>2.1. 本地构建缓存</span></a></h3><p>本地构建缓存使用系统目录来存储任务输出。默认位置是指向<code>$USER_HOME/.gradle/caches</code>的Gradle用户主目录。每次我们在系统中运行构建时，工件都会存储在这里。它默认启用，其位置是可配置的。</p><h3 id="_2-2-远程构建缓存" tabindex="-1"><a class="header-anchor" href="#_2-2-远程构建缓存"><span>2.2. 远程构建缓存</span></a></h3><p>远程缓存是一个共享的构建缓存。通过HTTP读取和写入远程缓存。远程缓存最常见的用例是持续集成构建。在每次干净的构建中，CI服务器都会填充远程缓存。因此，不会重新构建更改的组件，从而加快CI构建的速度。此外，任务输出也可以在CI代理之间共享。<strong>远程缓存默认情况下不启用。</strong></p><p>当同时启用远程和本地缓存时，首先在本地缓存中检查构建输出。如果本地缓存中没有输出，它将从远程缓存下载并存储在本地缓存中。然后，在下一次构建中，相同的任务输出将从本地缓存中获取，以加速构建过程。</p><h2 id="_3-配置gradle构建缓存" tabindex="-1"><a class="header-anchor" href="#_3-配置gradle构建缓存"><span>3. 配置Gradle构建缓存</span></a></h2><p>我们可以通过在<code>settings.gradle</code>文件中提供<code>Settings.build-cache</code>块来配置缓存。在这里，我们使用Groovy闭包编写配置。让我们看看如何配置不同类型的缓存。</p><h3 id="_3-1-配置本地构建缓存" tabindex="-1"><a class="header-anchor" href="#_3-1-配置本地构建缓存"><span>3.1. 配置本地构建缓存</span></a></h3><p>让我们在<code>settings.gradle</code>文件中添加本地构建缓存配置：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>buildCache {
    local {
        directory = new File(rootDir, &#39;build-cache&#39;)
        removeUnusedEntriesAfterDays = 30
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码块中，<code>directory</code>对象表示存储构建输出的位置。这里，<code>rootDir</code>变量表示项目的根目录。我们也可以更改<code>directory</code>对象以指向另一个位置。</p><p><strong>为了节省空间，本地构建缓存还会定期删除一段时间内未使用的条目。</strong> <code>removeUnusedEntriesAfterDays</code>属性用于配置未使用的工件将从本地缓存中删除的天数。默认值为七天。</p><p><strong>我们也可以手动清理它，通过从<code>$USER_HOME/.gradle/caches</code>文件夹中删除条目。</strong> 在Linux系统上，我们可以使用<code>rm</code>命令来清理目录：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>rm -r $HOME/.gradle/caches
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以配置一些其他属性。例如，<code>enabled</code>是一个布尔属性，表示本地缓存是否启用。如果将<code>_push_</code>属性设置为<code>true</code>，则会在缓存中存储构建输出。本地构建缓存的默认值为<code>true</code>。</p><h3 id="_3-2-配置远程缓存" tabindex="-1"><a class="header-anchor" href="#_3-2-配置远程缓存"><span>3.2. 配置远程缓存</span></a></h3><p>让我们在<code>settings.gradle</code>文件中添加<code>buildCache</code>块以配置远程缓存。</p><p>对于远程缓存，我们需要以URL的形式提供位置以及访问它的<code>username</code>和<code>password</code>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>buildCache {
    remote(HttpBuildCache) {
        url = &#39;https://example.com:8123/cache/&#39;
        credentials {
            username = &#39;build-cache-user-name&#39;
            password = &#39;build-cache-password&#39;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-使用gradle构建缓存的优势" tabindex="-1"><a class="header-anchor" href="#_4-使用gradle构建缓存的优势"><span>4. 使用Gradle构建缓存的优势</span></a></h2><p>现在让我们来看看使用Gradle构建缓存的一些好处：</p><ul><li>它可以通过减少构建时间来提高开发人员的生产力。</li><li>因为如果输入没有变化，任务输出会被重用，所以它也可以在切换版本控制分支时减少构建时间。</li><li>使用远程缓存可以显著减少CI代理需要完成构建的工作量。这也减少了CI构建所需的基础设施。</li><li>减少了CI机器上的网络使用，因为来自远程缓存的结果将存储在本地缓存中。</li><li>远程缓存可以帮助在开发人员之间共享结果。这消除了重新构建其他在同一项目上工作的开发者本地所做的更改的需要。</li><li>远程缓存还可以实现在CI代理之间共享构建。</li><li>由于构建时间的减少，这将导致更快的反馈周期。因此，构建会更频繁地生成。因此，这可能会提高软件的质量。</li></ul><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了Gradle构建缓存及其如何加速构建过程。我们还探讨了它的不同类型及其配置。最后，我们讨论了Gradle构建缓存的好处。</p>`,32),n=[t];function i(s,c){return d(),a("div",null,n)}const h=e(r,[["render",i],["__file","2024-07-19-Gradle Build Cache Basics.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-19/2024-07-19-Gradle%20Build%20Cache%20Basics.html","title":"Gradle构建缓存基础","lang":"zh-CN","frontmatter":{"date":"2024-07-19T00:00:00.000Z","category":["Gradle","Build Cache"],"tag":["Gradle","Build Cache","构建优化"],"head":[["meta",{"name":"keywords","content":"Gradle构建缓存,构建性能,持续集成"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-19/2024-07-19-Gradle%20Build%20Cache%20Basics.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle构建缓存基础"}],["meta",{"property":"og:description","content":"Gradle构建缓存基础 构建缓存可以使代码构建过程更快，并因此提高开发人员的生产力。在本文中，我们将学习Gradle构建缓存的基础知识。 1. 概述 2. Gradle构建缓存是什么？ Gradle构建缓存是一种半永久性存储，它保存构建任务的输出。它允许从先前的构建中重用已经生成的工件。Gradle构建缓存的指导原则是，只要输入没有改变，就应避免重新..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-19T11:32:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:tag","content":"Build Cache"}],["meta",{"property":"article:tag","content":"构建优化"}],["meta",{"property":"article:published_time","content":"2024-07-19T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-19T11:32:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle构建缓存基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-19T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-19T11:32:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle构建缓存基础 构建缓存可以使代码构建过程更快，并因此提高开发人员的生产力。在本文中，我们将学习Gradle构建缓存的基础知识。 1. 概述 2. Gradle构建缓存是什么？ Gradle构建缓存是一种半永久性存储，它保存构建任务的输出。它允许从先前的构建中重用已经生成的工件。Gradle构建缓存的指导原则是，只要输入没有改变，就应避免重新..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Gradle构建缓存是什么？","slug":"_2-gradle构建缓存是什么","link":"#_2-gradle构建缓存是什么","children":[{"level":3,"title":"2.1. 本地构建缓存","slug":"_2-1-本地构建缓存","link":"#_2-1-本地构建缓存","children":[]},{"level":3,"title":"2.2. 远程构建缓存","slug":"_2-2-远程构建缓存","link":"#_2-2-远程构建缓存","children":[]}]},{"level":2,"title":"3. 配置Gradle构建缓存","slug":"_3-配置gradle构建缓存","link":"#_3-配置gradle构建缓存","children":[{"level":3,"title":"3.1. 配置本地构建缓存","slug":"_3-1-配置本地构建缓存","link":"#_3-1-配置本地构建缓存","children":[]},{"level":3,"title":"3.2. 配置远程缓存","slug":"_3-2-配置远程缓存","link":"#_3-2-配置远程缓存","children":[]}]},{"level":2,"title":"4. 使用Gradle构建缓存的优势","slug":"_4-使用gradle构建缓存的优势","link":"#_4-使用gradle构建缓存的优势","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721388762000,"updatedTime":1721388762000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1332},"filePathRelative":"posts/baeldung/2024-07-19/2024-07-19-Gradle Build Cache Basics.md","localizedDate":"2024年7月19日","excerpt":"<hr>\\n<h1>Gradle构建缓存基础</h1>\\n<p>构建缓存可以使代码构建过程更快，并因此提高开发人员的生产力。在本文中，我们将学习Gradle构建缓存的基础知识。</p>\\n<h2>1. 概述</h2>\\n<h2>2. Gradle构建缓存是什么？</h2>\\n<p>Gradle构建缓存是一种半永久性存储，它保存构建任务的输出。它允许从先前的构建中重用已经生成的工件。Gradle构建缓存的指导原则是，只要输入没有改变，就应避免重新构建已经构建的任务。通过这种方式，可以减少完成后续构建所需的时间。</p>\\n<p>在Gradle中，构建缓存键通过哈希每个任务的输入来唯一标识一个工件或任务输出。在执行任务之前，Gradle计算缓存键，然后查看远程或本地缓存，检查是否已经存在与计算出的缓存键对应的任务输出。如果不存在，则执行任务。否则，Gradle重用现有的任务输出。</p>","autoDesc":true}');export{h as comp,u as data};
