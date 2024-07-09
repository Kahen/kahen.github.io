import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as r,a as o}from"./app-COaDJFIk.js";const t={},l=o('<h1 id="使用gradle从avro模式生成java类" tabindex="-1"><a class="header-anchor" href="#使用gradle从avro模式生成java类"><span>使用Gradle从Avro模式生成Java类</span></a></h1><p>在这个教程中，我们将学习如何从Apache Avro模式生成Java类。 首先，我们将熟悉两种方法：使用现有的Gradle插件和为构建脚本实现自定义任务。然后，我们将确定每种方法的优缺点，并了解它们最适合的场景。</p><h2 id="_2-开始使用apache-avro" tabindex="-1"><a class="header-anchor" href="#_2-开始使用apache-avro"><span>2. 开始使用Apache Avro</span></a></h2><p>我们的主要焦点是从Apache Avro模式生成Java类。在深入代码生成的细节之前，让我们简要回顾一下基本概念。</p><h3 id="_2-1-apache-avro模式定义" tabindex="-1"><a class="header-anchor" href="#_2-1-apache-avro模式定义"><span>2.1. Apache Avro模式定义</span></a></h3><p>首先，我们准备所需的依赖项来处理Avro格式。<strong>我们将需要_apache.avro_模块进行数据序列化和反序列化，因此我们将在_libs.version.toml_和_build.gradle_文件中添加它：</strong></p><h3 id="_3-java类生成" tabindex="-1"><a class="header-anchor" href="#_3-java类生成"><span>3. Java类生成</span></a></h3><p>现在我们已经定义了模式，是时候编译它们了！</p><h3 id="_3-1-使用命令行中的avro-tools" tabindex="-1"><a class="header-anchor" href="#_3-1-使用命令行中的avro-tools"><span>3.1. 使用命令行中的Avro-Tools</span></a></h3><p>开箱即用，Apache Avro框架提供了诸如_avro-tools jar_之类的工具来生成代码：</p><h3 id="_3-2-使用开源的avro-gradle插件" tabindex="-1"><a class="header-anchor" href="#_3-2-使用开源的avro-gradle插件"><span>3.2. 使用开源的Avro Gradle插件</span></a></h3><p>将代码生成集成到我们的构建中的一个可能的解决方案是使用davidmc24的开源_avro-gradle-plugin_。</p><h3 id="_3-3-实现自定义gradle任务" tabindex="-1"><a class="header-anchor" href="#_3-3-实现自定义gradle任务"><span>3.3. 实现自定义Gradle任务</span></a></h3><p>自定义Gradle任务的代码生成理念是利用Apache Avro框架提供的强大的机制与_avro-tools jar_。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>总结这篇文章，我们熟悉了从Avro模式生成Java代码的两种方法。 第一种方法利用开源的_avro-gradle-plugin_，提供了灵活性和与Gradle项目的无缝集成。<strong>然而，由于它已经被归档，其对商业使用的适用性可能受到限制。</strong> 第二种方法涉及实现自定义Gradle任务，扩展_avro-tools_库。**这种方法的优点是它引入了最小化的依赖，限制在Apache Avro框架固有的依赖范围内。这种策略有助于最小化由于使用不兼容的库版本而产生的潜在冲突的风险。**此外，Gradle任务提供了对生成流程的控制，可能在需要在编译为Java类之前进行额外检查的用例中很有帮助。例如，在构建管道中添加自定义验证等。这种方法提供了可靠性和稳定性，非常适合具有关键依赖管理的生产环境。</p><p>完整的示例可在GitHub上找到。</p><p>文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。</p>',18),n=[l];function p(s,c){return r(),e("div",null,n)}const d=a(t,[["render",p],["__file","Generate Java Classes From Avro Schemas Using Gradle.html.vue"]]),i=JSON.parse('{"path":"/posts/baeldung/Archive/Generate%20Java%20Classes%20From%20Avro%20Schemas%20Using%20Gradle.html","title":"使用Gradle从Avro模式生成Java类","lang":"zh-CN","frontmatter":{"date":"2024-06-17T00:00:00.000Z","category":["Java","Gradle"],"tag":["Apache Avro","代码生成"],"description":"使用Gradle从Avro模式生成Java类 在这个教程中，我们将学习如何从Apache Avro模式生成Java类。 首先，我们将熟悉两种方法：使用现有的Gradle插件和为构建脚本实现自定义任务。然后，我们将确定每种方法的优缺点，并了解它们最适合的场景。 2. 开始使用Apache Avro 我们的主要焦点是从Apache Avro模式生成Java...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Generate%20Java%20Classes%20From%20Avro%20Schemas%20Using%20Gradle.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Gradle从Avro模式生成Java类"}],["meta",{"property":"og:description","content":"使用Gradle从Avro模式生成Java类 在这个教程中，我们将学习如何从Apache Avro模式生成Java类。 首先，我们将熟悉两种方法：使用现有的Gradle插件和为构建脚本实现自定义任务。然后，我们将确定每种方法的优缺点，并了解它们最适合的场景。 2. 开始使用Apache Avro 我们的主要焦点是从Apache Avro模式生成Java..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache Avro"}],["meta",{"property":"article:tag","content":"代码生成"}],["meta",{"property":"article:published_time","content":"2024-06-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Gradle从Avro模式生成Java类\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"2. 开始使用Apache Avro","slug":"_2-开始使用apache-avro","link":"#_2-开始使用apache-avro","children":[{"level":3,"title":"2.1. Apache Avro模式定义","slug":"_2-1-apache-avro模式定义","link":"#_2-1-apache-avro模式定义","children":[]},{"level":3,"title":"3. Java类生成","slug":"_3-java类生成","link":"#_3-java类生成","children":[]},{"level":3,"title":"3.1. 使用命令行中的Avro-Tools","slug":"_3-1-使用命令行中的avro-tools","link":"#_3-1-使用命令行中的avro-tools","children":[]},{"level":3,"title":"3.2. 使用开源的Avro Gradle插件","slug":"_3-2-使用开源的avro-gradle插件","link":"#_3-2-使用开源的avro-gradle插件","children":[]},{"level":3,"title":"3.3. 实现自定义Gradle任务","slug":"_3-3-实现自定义gradle任务","link":"#_3-3-实现自定义gradle任务","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":2.21,"words":663},"filePathRelative":"posts/baeldung/Archive/Generate Java Classes From Avro Schemas Using Gradle.md","localizedDate":"2024年6月17日","excerpt":"\\n<p>在这个教程中，我们将学习如何从Apache Avro模式生成Java类。\\n首先，我们将熟悉两种方法：使用现有的Gradle插件和为构建脚本实现自定义任务。然后，我们将确定每种方法的优缺点，并了解它们最适合的场景。</p>\\n<h2>2. 开始使用Apache Avro</h2>\\n<p>我们的主要焦点是从Apache Avro模式生成Java类。在深入代码生成的细节之前，让我们简要回顾一下基本概念。</p>\\n<h3>2.1. Apache Avro模式定义</h3>\\n<p>首先，我们准备所需的依赖项来处理Avro格式。<strong>我们将需要_apache.avro_模块进行数据序列化和反序列化，因此我们将在_libs.version.toml_和_build.gradle_文件中添加它：</strong></p>","autoDesc":true}');export{d as comp,i as data};
