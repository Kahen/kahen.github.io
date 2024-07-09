import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as i}from"./app-COaDJFIk.js";const a={},o=i('<h1 id="解决intellij-idea中-命令行太长-的问题" tabindex="-1"><a class="header-anchor" href="#解决intellij-idea中-命令行太长-的问题"><span>解决IntelliJ IDEA中“命令行太长”的问题</span></a></h1><p>在本教程中，我们将看到如何在IntelliJ IDEA中运行Spring Boot应用程序的Java主类时，解决“命令行太长”的错误。</p><h2 id="_2-根本原因" tabindex="-1"><a class="header-anchor" href="#_2-根本原因"><span>2. 根本原因</span></a></h2><p>当你启动程序时，可能会遇到“命令行太长”的错误。当类路径太长或包含许多虚拟机参数时，就会发生此错误。大多数操作系统对命令行的字符数有限制。</p><p>在下一节中，我们将看到解决此错误的可能方法。</p><h2 id="_3-在intellij中设置默认的命令行缩短" tabindex="-1"><a class="header-anchor" href="#_3-在intellij中设置默认的命令行缩短"><span>3. 在IntelliJ中设置默认的命令行缩短</span></a></h2><p>要解决这个问题，我们需要将“缩短命令行”选项更改为“类路径文件”，而不是默认设置的“无 - java [options] className [args]”。</p><p>首先，我们需要打开IntelliJ IDEA，然后点击“运行 -&gt; 编辑配置”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/1_1-4-1024x576.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其次，我们将点击“编辑配置模板”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/1_2-2-1024x662.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接下来，我们需要选择一个模板，然后点击“修改选项”：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/1_3-1-1024x662.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>一个新的菜单出现，我们可以选择“缩短命令行”选项：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/1_4-1-1024x658.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后我们可以从“缩短命令行”中选择以下选项（取决于你使用的IntelliJ版本）：</p><ul><li>JAR Manifest：IDE通过一个临时的类路径.jar传递长类路径（这可能对某些框架不起作用）。</li><li>类路径文件：IDE将长类路径写入一个文本文件（这可能对某些框架不起作用，例如：JMock）。</li></ul><p><strong>注意：</strong> 在IntelliJ的较新版本中，你可能会发现“类路径文件”被“@argfile (Java 9+)”替换。</p><p>根据错误，我们可以选择这些选项之一，因为其中一个选项可能不适用于你的错误情况。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/1_5-1-1024x661.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>最后，我们需要应用更改，然后我们可以运行我们的应用程序。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在这个快速教程中，我们解释了这个错误的根本原因，以及如何通过在IDE配置中设置默认的“缩短命令行”来解决IntelliJ IDEA中的“命令行太长”错误。</p><figure><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>',24),l=[o];function p(g,r){return n(),e("div",null,l)}const d=t(a,[["render",p],["__file","2024-07-04-Fix  Command Line is Too Long  in IntelliJ.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Fix%20%20Command%20Line%20is%20Too%20Long%20%20in%20IntelliJ.html","title":"解决IntelliJ IDEA中“命令行太长”的问题","lang":"zh-CN","frontmatter":{"date":"2023-05-01T00:00:00.000Z","category":["IntelliJ IDEA","Java"],"tag":["Spring Boot","Command Line"],"head":[["meta",{"name":"keywords","content":"IntelliJ IDEA, Command Line is Too Long, Java, Spring Boot"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Fix%20%20Command%20Line%20is%20Too%20Long%20%20in%20IntelliJ.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决IntelliJ IDEA中“命令行太长”的问题"}],["meta",{"property":"og:description","content":"解决IntelliJ IDEA中“命令行太长”的问题 在本教程中，我们将看到如何在IntelliJ IDEA中运行Spring Boot应用程序的Java主类时，解决“命令行太长”的错误。 2. 根本原因 当你启动程序时，可能会遇到“命令行太长”的错误。当类路径太长或包含许多虚拟机参数时，就会发生此错误。大多数操作系统对命令行的字符数有限制。 在下一节..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/1_1-4-1024x576.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T23:32:19.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Boot"}],["meta",{"property":"article:tag","content":"Command Line"}],["meta",{"property":"article:published_time","content":"2023-05-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T23:32:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决IntelliJ IDEA中“命令行太长”的问题\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/1_1-4-1024x576.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/1_2-2-1024x662.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/1_3-1-1024x662.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/1_4-1-1024x658.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/1_5-1-1024x661.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\"],\\"datePublished\\":\\"2023-05-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T23:32:19.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"解决IntelliJ IDEA中“命令行太长”的问题 在本教程中，我们将看到如何在IntelliJ IDEA中运行Spring Boot应用程序的Java主类时，解决“命令行太长”的错误。 2. 根本原因 当你启动程序时，可能会遇到“命令行太长”的错误。当类路径太长或包含许多虚拟机参数时，就会发生此错误。大多数操作系统对命令行的字符数有限制。 在下一节..."},"headers":[{"level":2,"title":"2. 根本原因","slug":"_2-根本原因","link":"#_2-根本原因","children":[]},{"level":2,"title":"3. 在IntelliJ中设置默认的命令行缩短","slug":"_3-在intellij中设置默认的命令行缩短","link":"#_3-在intellij中设置默认的命令行缩短","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720135939000,"updatedTime":1720135939000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":1.91,"words":573},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Fix  Command Line is Too Long  in IntelliJ.md","localizedDate":"2023年5月1日","excerpt":"\\n<p>在本教程中，我们将看到如何在IntelliJ IDEA中运行Spring Boot应用程序的Java主类时，解决“命令行太长”的错误。</p>\\n<h2>2. 根本原因</h2>\\n<p>当你启动程序时，可能会遇到“命令行太长”的错误。当类路径太长或包含许多虚拟机参数时，就会发生此错误。大多数操作系统对命令行的字符数有限制。</p>\\n<p>在下一节中，我们将看到解决此错误的可能方法。</p>\\n<h2>3. 在IntelliJ中设置默认的命令行缩短</h2>\\n<p>要解决这个问题，我们需要将“缩短命令行”选项更改为“类路径文件”，而不是默认设置的“无 - java [options] className [args]”。</p>","autoDesc":true}');export{d as comp,m as data};
