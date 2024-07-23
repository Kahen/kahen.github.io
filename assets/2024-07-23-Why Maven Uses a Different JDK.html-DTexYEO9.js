import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as s}from"./app-on0L14Tx.js";const t={},p=s(`<h1 id="maven为何使用不同的jdk版本-baeldung" tabindex="-1"><a class="header-anchor" href="#maven为何使用不同的jdk版本-baeldung"><span>Maven为何使用不同的JDK版本 | Baeldung</span></a></h1><p>在本教程中，我们将解释为什么Maven可能会使用与系统中默认设置不同的Java版本。此外，我们将展示Maven的配置文件位于何处，然后解释如何在Maven中配置Java版本。</p><h2 id="_2-maven配置" tabindex="-1"><a class="header-anchor" href="#_2-maven配置"><span>2. Maven配置</span></a></h2><p>首先，让我们看一下系统配置的一个可能情况，其中Maven使用的Java版本与系统中默认设置的不同。Maven配置返回：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn <span class="token parameter variable">-v</span>
Apache Maven <span class="token number">3.3</span>.9 <span class="token punctuation">(</span>bb52d8502b132ec0a5a3f4c09453c07478323dc5<span class="token punctuation">;</span> <span class="token number">2015</span>-11-10T17:41:47+01:00<span class="token punctuation">)</span>
Maven home: C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>test<span class="token punctuation">\\</span>apps<span class="token punctuation">\\</span>maven<span class="token punctuation">\\</span><span class="token number">3.3</span>.9
Java version: <span class="token number">11.0</span>.10, vendor: Oracle Corporation
Java home: C:<span class="token punctuation">\\</span>my<span class="token punctuation">\\</span>java<span class="token punctuation">\\</span>jdk-11.0.10
Default locale: pl_PL, platform encoding: Cp1250
OS name: <span class="token string">&quot;windows 10&quot;</span>, version: <span class="token string">&quot;10.0&quot;</span>, arch: <span class="token string">&quot;amd64&quot;</span>, family: <span class="token string">&quot;dos&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如我们所见，它返回了Maven版本、Java版本和操作系统信息。Maven工具使用的是JDK版本11.0.10。</p><p>现在让我们看一下系统中设置的Java版本：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">java</span> <span class="token parameter variable">-version</span>
<span class="token function">java</span> version <span class="token string">&quot;13.0.2&quot;</span> <span class="token number">2020</span>-01-14
Java<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> SE Runtime Environment <span class="token punctuation">(</span>build <span class="token number">13.0</span>.2+8<span class="token punctuation">)</span>
Java HotSpot<span class="token punctuation">(</span>TM<span class="token punctuation">)</span> <span class="token number">64</span>-Bit Server VM <span class="token punctuation">(</span>build <span class="token number">13.0</span>.2+8, mixed mode, sharing<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认的JDK设置为13.0.2。在接下来的部分中，我们将解释为什么它与Maven使用的版本不匹配。</p><h2 id="_3-全局设置-java-home" tabindex="-1"><a class="header-anchor" href="#_3-全局设置-java-home"><span>3. 全局设置_JAVA_HOME_</span></a></h2><p>让我们来看一下默认设置。首先，《JAVA_HOME变量是Maven配置的必须项》。此外，当它没有设置时，_mvn_命令会返回一个错误消息：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ mvn
Error: JAVA_HOME not found <span class="token keyword">in</span> your environment.
Please <span class="token builtin class-name">set</span> the JAVA_HOME variable <span class="token keyword">in</span> your environment to match the
location of your Java installation.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Linux上，我们使用_export_命令设置系统变量。Windows有专门的系统变量设置用于此目的。当它被全局设置时，Maven使用系统中默认的Java版本。</p><h2 id="_4-maven配置文件" tabindex="-1"><a class="header-anchor" href="#_4-maven配置文件"><span>4. Maven配置文件</span></a></h2><p>现在让我们快速看一下在哪里可以找到Maven配置文件。有几个地方可以提供配置：</p><ul><li><em>.mavenrc/mavenrc_pre.cmd</em> – 用户定义的脚本，位于用户的主目录</li><li><em>settings.xml</em> – 文件位于_~/.m2_目录，包含跨项目的配置</li><li><em>.mv</em> – 项目内的配置目录</li></ul><p>此外，我们可以使用_MAVEN_OPTS_环境变量来设置JVM启动参数。</p><h2 id="_5-仅为maven设置-java-home" tabindex="-1"><a class="header-anchor" href="#_5-仅为maven设置-java-home"><span>5. 仅为Maven设置_JAVA_HOME_</span></a></h2><p>我们看到Java版本与Maven使用的版本不同。换句话说，《Maven覆盖了_JAVA_HOME_变量提供的默认配置》。</p><p>它可以在_mvn_命令开始时执行的用户定义脚本中设置。在Windows中，我们在_%HOME%\\mavenrc_pre.bat_或_%HOME%\\mavenrc_pre.cmd_文件中设置它。Maven支持‘.bat’和‘.cmd’文件。在文件中，我们简单地设置_JAVA_HOME_变量：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token builtin class-name">set</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span><span class="token string">&quot;C:\\my\\java\\jdk-11.0.10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一方面，<strong>Linux有_$HOME/.mavenrc_文件用于相同的目的</strong>。在这里，我们几乎以相同的方式设置变量：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>C:/my/java/jdk-11.0.10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这种设置，即使系统中默认的是JDK 13，Maven也使用JDK 11。</p><p><strong>我们可以使用_MAVEN_SKIP_RC_标志跳过用户定义脚本的执行</strong>。</p><p>此外，我们可以直接在Maven的可执行文件中设置变量。然而，这种方法不推荐，因为如果我们升级到更高版本的Maven，它将不会自动应用。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在这篇短文中，我们解释了Maven如何使用与默认不同的Java版本。然后，我们展示了Maven的配置文件位于何处。最后，我们解释了如何为Maven设置Java版本。</p>`,28),o=[p];function i(l,c){return e(),n("div",null,o)}const d=a(t,[["render",i],["__file","2024-07-23-Why Maven Uses a Different JDK.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-23/2024-07-23-Why%20Maven%20Uses%20a%20Different%20JDK.html","title":"Maven为何使用不同的JDK版本 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-06-01T00:00:00.000Z","category":["Java","Maven"],"tag":["JDK","Maven配置"],"head":[["meta",{"name":"keywords","content":"Maven, JDK, Java版本, Maven配置"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-23/2024-07-23-Why%20Maven%20Uses%20a%20Different%20JDK.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Maven为何使用不同的JDK版本 | Baeldung"}],["meta",{"property":"og:description","content":"Maven为何使用不同的JDK版本 | Baeldung 在本教程中，我们将解释为什么Maven可能会使用与系统中默认设置不同的Java版本。此外，我们将展示Maven的配置文件位于何处，然后解释如何在Maven中配置Java版本。 2. Maven配置 首先，让我们看一下系统配置的一个可能情况，其中Maven使用的Java版本与系统中默认设置的不同。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-23T03:48:40.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JDK"}],["meta",{"property":"article:tag","content":"Maven配置"}],["meta",{"property":"article:published_time","content":"2022-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-23T03:48:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Maven为何使用不同的JDK版本 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-23T03:48:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Maven为何使用不同的JDK版本 | Baeldung 在本教程中，我们将解释为什么Maven可能会使用与系统中默认设置不同的Java版本。此外，我们将展示Maven的配置文件位于何处，然后解释如何在Maven中配置Java版本。 2. Maven配置 首先，让我们看一下系统配置的一个可能情况，其中Maven使用的Java版本与系统中默认设置的不同。..."},"headers":[{"level":2,"title":"2. Maven配置","slug":"_2-maven配置","link":"#_2-maven配置","children":[]},{"level":2,"title":"3. 全局设置_JAVA_HOME_","slug":"_3-全局设置-java-home","link":"#_3-全局设置-java-home","children":[]},{"level":2,"title":"4. Maven配置文件","slug":"_4-maven配置文件","link":"#_4-maven配置文件","children":[]},{"level":2,"title":"5. 仅为Maven设置_JAVA_HOME_","slug":"_5-仅为maven设置-java-home","link":"#_5-仅为maven设置-java-home","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721706520000,"updatedTime":1721706520000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.84,"words":853},"filePathRelative":"posts/baeldung/2024-07-23/2024-07-23-Why Maven Uses a Different JDK.md","localizedDate":"2022年6月1日","excerpt":"\\n<p>在本教程中，我们将解释为什么Maven可能会使用与系统中默认设置不同的Java版本。此外，我们将展示Maven的配置文件位于何处，然后解释如何在Maven中配置Java版本。</p>\\n<h2>2. Maven配置</h2>\\n<p>首先，让我们看一下系统配置的一个可能情况，其中Maven使用的Java版本与系统中默认设置的不同。Maven配置返回：</p>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code>$ mvn <span class=\\"token parameter variable\\">-v</span>\\nApache Maven <span class=\\"token number\\">3.3</span>.9 <span class=\\"token punctuation\\">(</span>bb52d8502b132ec0a5a3f4c09453c07478323dc5<span class=\\"token punctuation\\">;</span> <span class=\\"token number\\">2015</span>-11-10T17:41:47+01:00<span class=\\"token punctuation\\">)</span>\\nMaven home: C:<span class=\\"token punctuation\\">\\\\</span>Users<span class=\\"token punctuation\\">\\\\</span>test<span class=\\"token punctuation\\">\\\\</span>apps<span class=\\"token punctuation\\">\\\\</span>maven<span class=\\"token punctuation\\">\\\\</span><span class=\\"token number\\">3.3</span>.9\\nJava version: <span class=\\"token number\\">11.0</span>.10, vendor: Oracle Corporation\\nJava home: C:<span class=\\"token punctuation\\">\\\\</span>my<span class=\\"token punctuation\\">\\\\</span>java<span class=\\"token punctuation\\">\\\\</span>jdk-11.0.10\\nDefault locale: pl_PL, platform encoding: Cp1250\\nOS name: <span class=\\"token string\\">\\"windows 10\\"</span>, version: <span class=\\"token string\\">\\"10.0\\"</span>, arch: <span class=\\"token string\\">\\"amd64\\"</span>, family: <span class=\\"token string\\">\\"dos\\"</span>\\n</code></pre></div>","autoDesc":true}');export{d as comp,u as data};
