import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-BUAgDejY.js";const i={},o=a(`<h1 id="在intellij-idea中调试运行在docker中的应用程序" tabindex="-1"><a class="header-anchor" href="#在intellij-idea中调试运行在docker中的应用程序"><span>在IntelliJ IDEA中调试运行在Docker中的应用程序</span></a></h1><p>在本教程中，我们将看到如何在IntelliJ IDEA中调试Docker容器。我们假设已经准备好了用于测试的Docker镜像。构建Docker镜像有多种方法。</p><p>IntelliJ可以从未官方网站下载。</p><p>对于本文，我们将参考这个基于单个类的Java应用程序。它可以很容易地被docker化、构建和测试。</p><p>在开始测试之前，我们需要确保Docker引擎已在我们的计算机上启动并运行。</p><h3 id="_2-使用-dockerfile-配置" tabindex="-1"><a class="header-anchor" href="#_2-使用-dockerfile-配置"><span>2. 使用_Dockerfile_配置</span></a></h3><p>当使用Docker文件配置时，我们只需要选择我们的_Dockerfile_并为镜像名称、镜像标签、容器名称和配置名称提供适当的名称。如果有任何端口映射，我们也可能会添加：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-file.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>一旦这个配置被保存，我们就可以从未选项中选择这个配置并点击调试。它首先构建镜像，在Docker引擎中注册镜像，然后运行docker化的应用程序。</p><h3 id="_3-使用docker镜像配置" tabindex="-1"><a class="header-anchor" href="#_3-使用docker镜像配置"><span>3. 使用Docker镜像配置</span></a></h3><p>当使用Docker镜像配置时，我们需要提供我们预先构建的应用程序的镜像名称、镜像标签和容器名称。我们可以使用标准的Docker命令来构建镜像并在Docker引擎中注册容器。如果有任何端口映射，我们也可能会添加：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-image.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>一旦这个配置被保存，我们就可以从未选项中选择这个配置并点击调试。它简单地选择预先构建的Docker镜像和容器并运行它。</p><h3 id="_4-使用远程jvm调试配置" tabindex="-1"><a class="header-anchor" href="#_4-使用远程jvm调试配置"><span>4. 使用远程JVM调试配置</span></a></h3><p>远程JVM配置将自己附加到任何预先运行的Java进程。所以我们需要首先单独运行Docker容器。</p><p>这是运行Java 8的Docker镜像的命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 8080:8080  -p 5005:5005 -e JAVA_TOOL_OPTIONS=&quot;-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n&quot; docker-java-jar:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们使用Java 11，我们将使用这个命令代替：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>docker run -d -p 8080:8080  -p 5005:5005 -e JAVA_TOOL_OPTIONS=&quot;-agentlib:jdwp=transport=dt_socket,address=*:5005,server=y,suspend=n&quot; docker-java-jar:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里_docker-java-jar_是我们的镜像名称，<em>latest_是它的标签。除了正常的HTTP端口8080，我们还映射了额外的端口5005，用于使用</em>-p_扩展进行远程调试。我们使用_-d_扩展以分离模式运行docker，并使用_-e_将_JAVA_TOOL_OPTIONS_作为环境变量传递给Java进程。</p><p>在_JAVA_TOOL_OPTIONS_中，我们传递值_-agentlib:jdwp=transport=dt_shmem,address=,server=y,suspend=n_以允许Java进程启动_JDB_调试会话，并传递值_address=*:5005_以指定5005将是我们远程调试的端口。</p><p>所以上述命令启动了我们的Docker容器，我们现在可以配置远程调试配置以连接到它：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-remote-jvm-debug.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们可以看到，在配置中我们指定了使用5005端口连接到远程JVM。</p><p>现在，如果我们从未选项中选择这个配置并点击调试，它将通过附加到已经运行的Docker容器来启动调试会话。</p><h3 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h3><p>在本文中，我们学习了可以在IntelliJ中使用的不同配置选项来调试docker化的应用程序。</p>`,27),r=[o];function c(l,p){return n(),t("div",null,r)}const g=e(i,[["render",c],["__file","2024-07-15-Debugging an Application Running in Docker With IntelliJ IDEA.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-15/2024-07-15-Debugging%20an%20Application%20Running%20in%20Docker%20With%20IntelliJ%20IDEA.html","title":"在IntelliJ IDEA中调试运行在Docker中的应用程序","lang":"zh-CN","frontmatter":{"date":"2022-08-01T00:00:00.000Z","category":["Docker","IntelliJ IDEA"],"tag":["Debugging","Docker","Java"],"head":[["meta",{"name":"keywords","content":"Docker, IntelliJ IDEA, Debugging, Java, Remote JVM Debug"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-15/2024-07-15-Debugging%20an%20Application%20Running%20in%20Docker%20With%20IntelliJ%20IDEA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在IntelliJ IDEA中调试运行在Docker中的应用程序"}],["meta",{"property":"og:description","content":"在IntelliJ IDEA中调试运行在Docker中的应用程序 在本教程中，我们将看到如何在IntelliJ IDEA中调试Docker容器。我们假设已经准备好了用于测试的Docker镜像。构建Docker镜像有多种方法。 IntelliJ可以从未官方网站下载。 对于本文，我们将参考这个基于单个类的Java应用程序。它可以很容易地被docker化、构..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-file.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-15T23:06:01.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Debugging"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2022-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-15T23:06:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在IntelliJ IDEA中调试运行在Docker中的应用程序\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-file.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-docker-image.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/08/configuration-using-remote-jvm-debug.png\\"],\\"datePublished\\":\\"2022-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-15T23:06:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在IntelliJ IDEA中调试运行在Docker中的应用程序 在本教程中，我们将看到如何在IntelliJ IDEA中调试Docker容器。我们假设已经准备好了用于测试的Docker镜像。构建Docker镜像有多种方法。 IntelliJ可以从未官方网站下载。 对于本文，我们将参考这个基于单个类的Java应用程序。它可以很容易地被docker化、构..."},"headers":[{"level":3,"title":"2. 使用_Dockerfile_配置","slug":"_2-使用-dockerfile-配置","link":"#_2-使用-dockerfile-配置","children":[]},{"level":3,"title":"3. 使用Docker镜像配置","slug":"_3-使用docker镜像配置","link":"#_3-使用docker镜像配置","children":[]},{"level":3,"title":"4. 使用远程JVM调试配置","slug":"_4-使用远程jvm调试配置","link":"#_4-使用远程jvm调试配置","children":[]},{"level":3,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721084761000,"updatedTime":1721084761000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.89,"words":868},"filePathRelative":"posts/baeldung/2024-07-15/2024-07-15-Debugging an Application Running in Docker With IntelliJ IDEA.md","localizedDate":"2022年8月1日","excerpt":"\\n<p>在本教程中，我们将看到如何在IntelliJ IDEA中调试Docker容器。我们假设已经准备好了用于测试的Docker镜像。构建Docker镜像有多种方法。</p>\\n<p>IntelliJ可以从未官方网站下载。</p>\\n<p>对于本文，我们将参考这个基于单个类的Java应用程序。它可以很容易地被docker化、构建和测试。</p>\\n<p>在开始测试之前，我们需要确保Docker引擎已在我们的计算机上启动并运行。</p>\\n<h3>2. 使用_Dockerfile_配置</h3>\\n<p>当使用Docker文件配置时，我们只需要选择我们的_Dockerfile_并为镜像名称、镜像标签、容器名称和配置名称提供适当的名称。如果有任何端口映射，我们也可能会添加：</p>","autoDesc":true}');export{g as comp,u as data};
