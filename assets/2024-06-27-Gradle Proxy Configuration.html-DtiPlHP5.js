import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as r,a}from"./app-DRFG6C5y.js";const o={},n=a(`<h1 id="gradle代理配置" tabindex="-1"><a class="header-anchor" href="#gradle代理配置"><span>Gradle代理配置</span></a></h1><p>代理服务器充当客户端和服务器之间的中介。它根据特定标准帮助评估来自客户端的请求，然后将其转发到目标服务器。这为系统提供了灵活性，以确定是否连接到某个网络。</p><p>在本教程中，我们将学习如何配置Gradle以在代理服务器后面工作。以我们的示例为例，我们的代理正在localhost上运行，代理端口为3128，用于HTTP和HTTPS连接。</p><p>我们可以配置Gradle在有或没有认证凭据的情况下在代理服务器后面工作。</p><h3 id="_2-1-基本代理配置" tabindex="-1"><a class="header-anchor" href="#_2-1-基本代理配置"><span>2.1. 基本代理配置</span></a></h3><p>首先，让我们设置一个不需要认证凭据的基本代理配置。首先，让我们在Gradle项目的根目录中创建一个名为_gradle.properties_的文件。</p><p>接下来，在_gradle.properties_文件中定义代理服务器的系统属性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>systemProp.http.proxyHost=localhost
systemProp.http.proxyPort=3128
systemProp.https.proxyHost=localhost
systemProp.https.proxyPort=3128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们定义了Gradle在构建过程中将使用的系统属性。我们为HTTP和HTTPS连接定义了系统属性。在这种情况下，它们具有相同的主机名和代理端口。</p><p>此外，我们还可以在_gradle.properties_文件中指定一个主机，以绕过代理服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>systemProp.http.nonProxyHosts=*.nonproxyrepos.com
systemProp.https.nonProxyHosts=*.nonproxyrepos.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的配置中，子域_nonproxyrepos.com_将绕过代理服务器，并直接从服务器请求资源。</p><p>或者，我们可以通过终端使用系统属性作为选项运行_./gradlew build_命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3128 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3128 build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们通过终端定义了连接到代理服务器的系统属性。</p><p><strong>值得注意的是，通过终端定义的系统属性会覆盖_gradle.properties_文件的配置。</strong></p><h3 id="_2-2-添加认证凭据" tabindex="-1"><a class="header-anchor" href="#_2-2-添加认证凭据"><span>2.2. 添加认证凭据</span></a></h3><p>在代理受到保护的情况下，我们可以在_gradle.properties_文件中添加认证凭据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>systemProp.http.proxyUser=Baeldung
systemProp.http.proxyPassword=admin
systemProp.https.proxyUser=Baeldung
systemProp.https.proxyPassword=admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们通过定义用户名和密码的系统属性来添加认证凭据。同时，我们也为HTTP和HTTPS连接实现了认证凭据。</p><p>或者，我们可以通过终端指定用户名和密码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3128 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3128 -Dhttps.proxyUser=Baeldung -Dhttps.proxyPassword=admin build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们在终端命令中包含了认证凭据。</p><h2 id="_3-可能的错误" tabindex="-1"><a class="header-anchor" href="#_3-可能的错误"><span>3. 可能的错误</span></a></h2><p><strong>如果主机名和代理端口不正确，可能会发生错误：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Could not get resource &#39;https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom&#39;.
&gt; Could not GET &#39;https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom&#39;.
&gt; localhosty: Name or service not known
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，构建失败是因为我们错误地将代理主机写成了“<em>localhosty</em>”，而不是“<em>localhost</em>”。</p><p>此外，如果我们在_gradle.properties_文件和命令行中定义了系统属性，命令行定义在构建过程中具有最高优先级：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ ./gradlew -Dhttp.proxyHost=localhost -Dhttp.proxyPort=3120 -Dhttps.proxyHost=localhost -Dhttps.proxyPort=3120 build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，命令行中的代理端口值是3120，这是错误的。_gradle.properties_文件中的代理端口值是3128，这是正确的。然而，构建失败，并出现以下错误消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&gt; Could not get resource &#39;https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom&#39;.
&gt; Could not GET &#39;https://repo.maven.apache.org/maven2/io/micrometer/micrometer-core/1.12.0/micrometer-core-1.12.0.pom&#39;.
&gt; Connect to localhost:3120 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，代理服务器拒绝了连接，因为<strong>命令行参数中的代理端口定义是错误的，尽管_gradle.properties_文件中的代理端口值是正确的</strong>。命令行参数定义优先于_gradle.properties_的值。</p><p>此外，如果认证凭据在受保护的代理服务器上是错误的，代理服务器也会拒绝连接。为了避免这些错误，需要正确检查配置。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了如何通过在_gradle.properties_文件中定义所需的系统属性来配置Gradle在代理后面工作。我们还看到了如何通过终端定义系统属性。最后，我们看到了一些容易犯的错误以及如何避免它们。</p><p>如往常一样，完整的示例代码可在GitHub上找到。</p>`,36),s=[n];function l(i,d){return r(),t("div",null,s)}const m=e(o,[["render",l],["__file","2024-06-27-Gradle Proxy Configuration.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-27/2024-06-27-Gradle%20Proxy%20Configuration.html","title":"Gradle代理配置","lang":"zh-CN","frontmatter":{"date":"2024-06-27T00:00:00.000Z","category":["Development Tools","Configuration"],"tag":["Gradle","Proxy"],"head":[["meta",{"name":"keywords","content":"Gradle, Proxy Configuration, Build Automation, Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-27/2024-06-27-Gradle%20Proxy%20Configuration.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Gradle代理配置"}],["meta",{"property":"og:description","content":"Gradle代理配置 代理服务器充当客户端和服务器之间的中介。它根据特定标准帮助评估来自客户端的请求，然后将其转发到目标服务器。这为系统提供了灵活性，以确定是否连接到某个网络。 在本教程中，我们将学习如何配置Gradle以在代理服务器后面工作。以我们的示例为例，我们的代理正在localhost上运行，代理端口为3128，用于HTTP和HTTPS连接。 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-27T01:40:47.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Gradle"}],["meta",{"property":"article:tag","content":"Proxy"}],["meta",{"property":"article:published_time","content":"2024-06-27T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-27T01:40:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Gradle代理配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-27T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-27T01:40:47.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Gradle代理配置 代理服务器充当客户端和服务器之间的中介。它根据特定标准帮助评估来自客户端的请求，然后将其转发到目标服务器。这为系统提供了灵活性，以确定是否连接到某个网络。 在本教程中，我们将学习如何配置Gradle以在代理服务器后面工作。以我们的示例为例，我们的代理正在localhost上运行，代理端口为3128，用于HTTP和HTTPS连接。 ..."},"headers":[{"level":3,"title":"2.1. 基本代理配置","slug":"_2-1-基本代理配置","link":"#_2-1-基本代理配置","children":[]},{"level":3,"title":"2.2. 添加认证凭据","slug":"_2-2-添加认证凭据","link":"#_2-2-添加认证凭据","children":[]},{"level":2,"title":"3. 可能的错误","slug":"_3-可能的错误","link":"#_3-可能的错误","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1719452447000,"updatedTime":1719452447000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.46,"words":1037},"filePathRelative":"posts/baeldung/2024-06-27/2024-06-27-Gradle Proxy Configuration.md","localizedDate":"2024年6月27日","excerpt":"\\n<p>代理服务器充当客户端和服务器之间的中介。它根据特定标准帮助评估来自客户端的请求，然后将其转发到目标服务器。这为系统提供了灵活性，以确定是否连接到某个网络。</p>\\n<p>在本教程中，我们将学习如何配置Gradle以在代理服务器后面工作。以我们的示例为例，我们的代理正在localhost上运行，代理端口为3128，用于HTTP和HTTPS连接。</p>\\n<p>我们可以配置Gradle在有或没有认证凭据的情况下在代理服务器后面工作。</p>\\n<h3>2.1. 基本代理配置</h3>\\n<p>首先，让我们设置一个不需要认证凭据的基本代理配置。首先，让我们在Gradle项目的根目录中创建一个名为_gradle.properties_的文件。</p>","autoDesc":true}');export{m as comp,h as data};
