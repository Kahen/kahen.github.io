import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as r}from"./app-2zDpbLgD.js";const n={},i=r('<h1 id="apache-jmeter-命令行使用指南" tabindex="-1"><a class="header-anchor" href="#apache-jmeter-命令行使用指南"><span>Apache JMeter 命令行使用指南</span></a></h1><p>Apache JMeter 是一个开源的基于 Java 的应用程序，旨在分析和测量 Web 应用程序的性能。它基本上是一种应用程序，我们可以使用它来测试和分析服务器在不同负载条件下的整体性能。</p><p>JMeter 提供了一个易于使用的 GUI，我们可以使用它来定义、执行和查看各种负载测试的报告。它还支持非 GUI 模式，我们可以在命令行界面中运行脚本。</p><p>在本教程中，我们将学习如何从命令行运行 JMeter JMX 文件的同时配置报告文件。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>在我们开始之前，让我们设置一个我们将在整个演示中使用的 JMeter 脚本。为了模拟一些 API，我们将使用 Postman Echo 提供的示例 REST 端点。</p><p>首先，我们将在 JMeter 中创建一个带有线程组的《测试计划》。其次，我们将向线程组添加一个 HTTP 请求采样器，该采样器使用 Postman Echo 服务提供的模拟端点。最后，我们将向线程组添加一个《摘要报告》监听器，该监听器为我们的测试运行生成摘要。</p><p>让我们详细看看这些步骤。</p><h3 id="_2-1-创建-jmeter-测试计划和线程组" tabindex="-1"><a class="header-anchor" href="#_2-1-创建-jmeter-测试计划和线程组"><span>2.1. 创建 JMeter 测试计划和线程组</span></a></h3><p>我们将使用 JMeter GUI 设置我们的《测试计划》。首先，让我们向《测试计划》添加一个线程组：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>进一步，让我们配置线程组使用五个线程，有一个一秒钟的启动期，循环计数为 10：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group-config-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_2-2-配置-http-请求采样器" tabindex="-1"><a class="header-anchor" href="#_2-2-配置-http-请求采样器"><span>2.2. 配置 HTTP 请求采样器</span></a></h3><p>现在，让我们在这个线程组内创建一个 HTTP 请求采样器：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-sampler.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们配置 HTTP 采样器使用 Postman Echo 服务提供的 GET 端点：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-config.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_2-3-配置摘要报告监听器" tabindex="-1"><a class="header-anchor" href="#_2-3-配置摘要报告监听器"><span>2.3. 配置摘要报告监听器</span></a></h3><p>最后，让我们向线程组添加一个摘要报告监听器，该监听器总结了我们的测试计划的结果：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>有了这个，我们的基本 JMeter 脚本就准备好了。让我们在 GUI 中运行这个脚本，看看生成的《摘要报告》：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report-result-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>显然，在运行 JMeter 脚本后，我们能够成功地为我们的测试配置生成摘要报告。我们将此保存为“Summary-Report.jmx”，并使用它从命令行运行测试。</p><p>到目前为止，我们有一个带有《测试计划》的示例 JMX 文件，该计划配置为运行具有示例模拟 API 的测试。</p><p>正如已经提到的，JMeter JMX 文件可以在非 GUI 模式下使用命令行界面运行。我们使用带有选项的 <em>jmeter</em> 命令从 CLI 运行 JMeter 脚本文件。这个命令可以通过更改目录到 JMeter 安装路径内的 <em>bin</em> 目录来运行。</p><p>让我们看看运行我们的“Summary-Report.jmx”文件并生成测试报告的 CLI 命令：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jmeter -n -t Summary-Report.jmx -l Summary-Report.jtl\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行上述命令在 CLI 上产生以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Creating summariser `&lt;summary&gt;`\nCreated the tree successfully using /Users/baeldung/Summary-Report.jmx\nStarting standalone test @ 2023 Jun 3 13:32:11 IST (1685779331706)\nWaiting for possible Shutdown/StopTestNow/HeapDump/ThreadDump message on port 4445\nsummary = 50 in 00:00:08 = 6.6/s Avg: 499 Min: 193 Max: 3601 Err: 0 (0.00%)\nTidying up ... @ 2023 Jun 3 13:32:19 IST (1685779339273)\n... end of run\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该命令基本上运行我们的测试文件“Summary-Report.jmx”并生成“Summary-Report.jtl”文件中的摘要报告。</p><p>JMeter CLI 提供了多个选项，以便配置脚本的运行方式。我们使用这些参数来覆盖在 JMX 文件中设置的参数。让我们看看我们在脚本中使用的一些选项：</p><ul><li><em>-n</em>: 指定 JMeter 在非 GUI 模式下运行</li><li><em>-t</em>: 指定包含《测试计划》的 JMX 文件的位置</li><li><em>-l</em>: 指定 JTL（JMeter 测试日志）文件的位置</li></ul><p>进一步，让我们看看“Summary-Report.jtl”文件内容的前几行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect\n1685779331808,978,HTTP Request,200,OK,Thread Group 1-1,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,974,0,780\n1685779331959,827,HTTP Request,200,OK,Thread Group 1-2,text,true,,679,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,823,0,625\n1685779332163,786,HTTP Request,200,OK,Thread Group 1-3,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,785,0,589\n1685779332787,194,HTTP Request,200,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,194,0,0\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到生成的 JTL 文件以 CSV 格式包含了每个 API 请求的详细信息。</p><h2 id="_4-配置-jmeter-摘要报告" tabindex="-1"><a class="header-anchor" href="#_4-配置-jmeter-摘要报告"><span>4. 配置 JMeter 摘要报告</span></a></h2><p>我们可以自定义摘要报告中显示的参数以及它们的格式化选项。有两种方法可以自定义摘要报告：</p><ul><li>更新 JMeter 属性</li><li>将参数作为命令行选项传递</li></ul><p>让我们详细看看这些方法。</p><h3 id="_4-1-配置-jmeter-属性" tabindex="-1"><a class="header-anchor" href="#_4-1-配置-jmeter-属性"><span>4.1. 配置 JMeter 属性</span></a></h3><p>JMeter 属性文件“jmeter.properties”位于 JMeter 安装目录的 <em>bin</em> 目录内。与摘要报告相关的属性在属性文件中以“jmeter.save.saveservice.”前缀开头：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>#jmeter.save.saveservice.output_format=csv\n#jmeter.save.saveservice.response_code=true\n#jmeter.save.saveservice.latency=true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，这些属性是注释掉的，我们可以取消注释它们来设置它们的值。让我们取消注释一些属性并更新它们的值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>jmeter.save.saveservice.response_code=false\njmeter.save.saveservice.latency=false\njmeter.save.saveservice.output_format=xml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在重新运行 JMeter 脚本，生成以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;`\n`&lt;testResults version=&quot;1.2&quot;&gt;`\n`&lt;httpSample t=&quot;801&quot; it=&quot;0&quot; ct=&quot;593&quot; ts=&quot;1685791090172&quot; s=&quot;true&quot; lb=&quot;HTTP Request&quot; rm=&quot;OK&quot; tn=&quot;Thread Group 1-3&quot; dt=&quot;text&quot; by=&quot;679&quot; sby=&quot;143&quot; ng=&quot;5&quot; na=&quot;5&quot;&gt;`\n  ``&lt;java.net.URL&gt;``https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2``&lt;/java.net.URL&gt;``\n``&lt;/httpSample&gt;``\n`&lt;httpSample t=&quot;1004&quot; it=&quot;0&quot; ct=&quot;782&quot; ts=&quot;1685791089969&quot; s=&quot;true&quot; lb=&quot;HTTP Request&quot; rm=&quot;OK&quot; tn=&quot;Thread Group 1-2&quot; dt=&quot;text&quot; by=&quot;679&quot; sby=&quot;143&quot; ng=&quot;5&quot; na=&quot;5&quot;&gt;`\n  ``&lt;java.net.URL&gt;``https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2``&lt;/java.net.URL&gt;``\n``&lt;/httpSample&gt;``\n`&lt;/testResults&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出格式现在是 XML 形式，从结果中可以看到。此外，我们观察到响应代码和延迟字段现在不在输出中产生。</p><h3 id="_4-2-作为-cli-选项的-jmeter-属性" tabindex="-1"><a class="header-anchor" href="#_4-2-作为-cli-选项的-jmeter-属性"><span>4.2. 作为 CLI 选项的 JMeter 属性</span></a></h3><p><strong>我们可以通过将它们作为选项通过命令行传递来覆盖在“jmeter.properties”文件中设置的属性</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jmeter -Jjmeter.save.saveservice.output_format=csv -n -t Summary-Reportjmx -l Summary-Report.jtl\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，<strong>我们使用 <em>-J</em> 选项来传递并覆盖在运行测试脚本时的任何现有 JMeter 属性</strong>。</p><p>该命令现在生成以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>timeStamp,elapsed,label,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,IdleTime,Connect\n1685792003144,961,HTTP Request,OK,Thread Group 1-1,text,true,,685,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,0,741\n1685792003306,799,HTTP Request,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,0,599\n1685792004106,200,HTTP Request,OK,Thread Group 1-2,text,true,,681,143,5,5,https://postman-echo.com/get?foo1=bar1&amp;foo2=bar2,0,0\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，我们已经成功地通过将参数作为 CLI 选项传递，将输出格式从 XML 覆盖为 CSV。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们学习了如何从命令行运行 JMeter JMX 文件并配置摘要报告文件。</p><p>首先，我们看了如何使用 <em>jmeter</em> 命令及其一些选项来运行 JMX 文件。然后，我们看到了如何通过在 <em>jmeter.properties</em> 文件中配置属性来配置摘要报告。最后，我们讨论了如何通过将它们作为选项通过命令行传递来覆盖这些属性。</p><p>像往常一样，我们所有示例的 JMeter 脚本都可以在 GitHub 上找到。 OK</p>',59),s=[i];function o(l,p){return a(),t("div",null,s)}const u=e(n,[["render",o],["__file","2024-07-04-Run JMeter .jmx File From the Command Line and Configure the Report File.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Run%20JMeter%20.jmx%20File%20From%20the%20Command%20Line%20and%20Configure%20the%20Report%20File.html","title":"Apache JMeter 命令行使用指南","lang":"zh-CN","frontmatter":{"date":"2023-06-03T00:00:00.000Z","category":["Apache JMeter","性能测试"],"tag":["JMeter","命令行","性能测试"],"head":[["meta",{"name":"keywords","content":"Apache JMeter, 命令行, 性能测试, JMX, JTL"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Run%20JMeter%20.jmx%20File%20From%20the%20Command%20Line%20and%20Configure%20the%20Report%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache JMeter 命令行使用指南"}],["meta",{"property":"og:description","content":"Apache JMeter 命令行使用指南 Apache JMeter 是一个开源的基于 Java 的应用程序，旨在分析和测量 Web 应用程序的性能。它基本上是一种应用程序，我们可以使用它来测试和分析服务器在不同负载条件下的整体性能。 JMeter 提供了一个易于使用的 GUI，我们可以使用它来定义、执行和查看各种负载测试的报告。它还支持非 GUI ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T13:06:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JMeter"}],["meta",{"property":"article:tag","content":"命令行"}],["meta",{"property":"article:tag","content":"性能测试"}],["meta",{"property":"article:published_time","content":"2023-06-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T13:06:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache JMeter 命令行使用指南\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-thread-group-config-1.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-sampler.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-http-request-config.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/06/jmeter-summary-report-result-1.png\\"],\\"datePublished\\":\\"2023-06-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T13:06:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache JMeter 命令行使用指南 Apache JMeter 是一个开源的基于 Java 的应用程序，旨在分析和测量 Web 应用程序的性能。它基本上是一种应用程序，我们可以使用它来测试和分析服务器在不同负载条件下的整体性能。 JMeter 提供了一个易于使用的 GUI，我们可以使用它来定义、执行和查看各种负载测试的报告。它还支持非 GUI ..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[{"level":3,"title":"2.1. 创建 JMeter 测试计划和线程组","slug":"_2-1-创建-jmeter-测试计划和线程组","link":"#_2-1-创建-jmeter-测试计划和线程组","children":[]},{"level":3,"title":"2.2. 配置 HTTP 请求采样器","slug":"_2-2-配置-http-请求采样器","link":"#_2-2-配置-http-请求采样器","children":[]},{"level":3,"title":"2.3. 配置摘要报告监听器","slug":"_2-3-配置摘要报告监听器","link":"#_2-3-配置摘要报告监听器","children":[]}]},{"level":2,"title":"4. 配置 JMeter 摘要报告","slug":"_4-配置-jmeter-摘要报告","link":"#_4-配置-jmeter-摘要报告","children":[{"level":3,"title":"4.1. 配置 JMeter 属性","slug":"_4-1-配置-jmeter-属性","link":"#_4-1-配置-jmeter-属性","children":[]},{"level":3,"title":"4.2. 作为 CLI 选项的 JMeter 属性","slug":"_4-2-作为-cli-选项的-jmeter-属性","link":"#_4-2-作为-cli-选项的-jmeter-属性","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1720098370000,"updatedTime":1720098370000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.3,"words":1890},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Run JMeter .jmx File From the Command Line and Configure the Report File.md","localizedDate":"2023年6月3日","excerpt":"\\n<p>Apache JMeter 是一个开源的基于 Java 的应用程序，旨在分析和测量 Web 应用程序的性能。它基本上是一种应用程序，我们可以使用它来测试和分析服务器在不同负载条件下的整体性能。</p>\\n<p>JMeter 提供了一个易于使用的 GUI，我们可以使用它来定义、执行和查看各种负载测试的报告。它还支持非 GUI 模式，我们可以在命令行界面中运行脚本。</p>\\n<p>在本教程中，我们将学习如何从命令行运行 JMeter JMX 文件的同时配置报告文件。</p>\\n<h2>2. 设置</h2>\\n<p>在我们开始之前，让我们设置一个我们将在整个演示中使用的 JMeter 脚本。为了模拟一些 API，我们将使用 Postman Echo 提供的示例 REST 端点。</p>","autoDesc":true}');export{u as comp,c as data};
