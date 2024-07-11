import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-bN4DcMMr.js";const i={},r=n(`<h1 id="将aar文件转换为jar文件-baeldung" tabindex="-1"><a class="header-anchor" href="#将aar文件转换为jar文件-baeldung"><span>将AAR文件转换为JAR文件 | Baeldung</span></a></h1><ol><li>引言</li></ol><p>作为Android开发者，我们有时会遇到需要将AAR文件转换为JAR文件的情况。这通常发生在我们想要在Java项目中使用仅以AAR格式提供的库或模块时。</p><p>在本教程中，我们将学习将AAR文件转换为JAR文件的步骤。</p><ol start="2"><li>AAR文件是什么？</li></ol><p><strong>AAR（Android ARchive）文件是Android操作系统中用于分发和共享库、资源和代码的打包文件格式。</strong></p><p>它类似于JAR（Java Archive）文件格式，但它包括了为Android应用程序提供的额外元数据，例如_AndroidManifest.xml_、资源文件、_res_文件夹（布局、值、可绘制的）、ProGuard规则等。</p><p>Android开发者使用AAR文件格式来分发他们的库，并在项目之间共享代码。它允许开发者轻松管理他们的依赖项，并将外部库集成到他们的Android应用程序中。</p><p>AAR文件可以使用Gradle或Maven等构建工具包含在Android项目中。这些构建工具自动处理依赖项，并将它们集成到构建过程中。</p><p>简而言之，AAR文件在Android开发生态系统中扮演着重要的角色，因为它们使开发者能够构建高质量、高效和可扩展的应用程序。</p><ol start="3"><li>JAR文件是什么？</li></ol><p><strong>JAR（Java ARchive）文件是用于存储和分发Java类文件、资源和相关元数据的打包文件格式。</strong> 它类似于ZIP文件，因为它是一个压缩的归档格式，包含多个文件和文件夹。</p><p>JAR文件通常用于分发Java库或应用程序。任何安装了Java运行环境（JRE）的平台都可以执行JAR文件。</p><p>JAR文件是使用随Java开发工具包（JDK）附带的_jar_命令行工具创建的。它们可以由数字证书签名以确保其真实性和完整性。它们还可以包括一个清单文件，提供有关JAR文件的元数据，如版本号、作者和依赖项。</p><p>JAR文件是Java开发生态系统的重要组成部分。它允许开发者将Java代码打包为单一的可执行文件。这使得分享和分发Java应用程序和库更加容易，同时也简化了最终用户的部署过程。</p><ol start="4"><li>将AAR文件转换为JAR文件</li></ol><p>有时我们可能需要将AAR文件转换为JAR文件，例如当我们想在非Android Java项目中使用Android库时。我们将看看几种实现这一目标的方法。</p><h3 id="_4-1-通过zip手动提取aar的内容" tabindex="-1"><a class="header-anchor" href="#_4-1-通过zip手动提取aar的内容"><span>4.1. 通过Zip手动提取AAR的内容</span></a></h3><p>将AAR文件转换为JAR文件的第一步是<strong>提取AAR文件的内容</strong>。我们可以通过将AAR文件的扩展名更改为_.zip_来实现这一点。然后，我们可以使用WinZip或7-Zip等工具提取其内容。一旦我们提取了AAR文件的内容，<strong>我们应该看到一个与AAR文件同名的文件夹。</strong></p><p>在提取的文件夹内，我们将看到几个文件和文件夹。我们需要找到**_classes.jar_文件，因为它包含了我们想要转换为JAR文件的Java类文件**。然后我们将找到_classes.jar_文件，并将其复制到一个新文件夹中。</p><p>要将_classes.jar_文件转换为JAR文件，<strong>我们可以使用随Java开发工具包（JDK）附带的_jar_命令行工具</strong>。我们将根据我们的操作系统打开命令提示符或终端窗口。我们将在<strong>我们复制_classes.jar_文件的文件夹中使用以下命令。</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jar -xf classes.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这应该会将_classes.jar_文件的内容提取到一个名为_classes_的新文件夹中。</p><p>接下来，以下命令，其中_mylibrary.jar_是结果JAR的名称，<strong>创建一个JAR文件：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ jar -cf mylibrary.jar -C classes/ .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个新的名为“<em>mylibrary.jar</em>”的JAR文件将在提取的类文件夹中创建。让我们理解一下，_-C_选项告诉_jar_工具在向JAR文件添加其内容之前切换到_classes_目录。</p><h3 id="_4-2-使用android-studio" tabindex="-1"><a class="header-anchor" href="#_4-2-使用android-studio"><span>4.2. 使用Android Studio</span></a></h3><p>作为Android开发者，我们可以访问Android Studio。我们也可以按照以下步骤使用它将AAR文件转换为JAR文件：</p><p>我们将导航到_File &gt; New &gt; New Module &gt; Import .JAR/.AAR Package_并选择所需的AAR文件，然后点击_Finish_。</p><p>通常，_build.gradle_文件包含以下插件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apply plugin: &#39;com.android.library&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果不存在，那么我们将添加以下行。如果存在，那么我们将用以下行替换它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>apply plugin: &#39;java-library&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，我们将导航到_Build &gt; Make module ‘Module Name’._一旦模块构建完成，我们应该在<strong>模块的_build/libs_文件夹中看到JAR文件。</strong></p><ol start="5"><li>结论</li></ol><p>在本文中，我们了解了AAR文件和JAR文件的内容和用途。我们还看到了如何使用ZIP和Android Studio手动将AAR文件转换为JAR文件。</p>`,36),d=[r];function o(A,l){return t(),a("div",null,d)}const c=e(i,[["render",o],["__file","2024-07-06-Converting an AAR File to a JAR File.html.vue"]]),R=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Converting%20an%20AAR%20File%20to%20a%20JAR%20File.html","title":"将AAR文件转换为JAR文件 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Android","Java"],"tag":["AAR","JAR"],"head":[["meta",{"name":"keywords","content":"AAR转JAR, Android开发, Java开发"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Converting%20an%20AAR%20File%20to%20a%20JAR%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"将AAR文件转换为JAR文件 | Baeldung"}],["meta",{"property":"og:description","content":"将AAR文件转换为JAR文件 | Baeldung 引言 作为Android开发者，我们有时会遇到需要将AAR文件转换为JAR文件的情况。这通常发生在我们想要在Java项目中使用仅以AAR格式提供的库或模块时。 在本教程中，我们将学习将AAR文件转换为JAR文件的步骤。 AAR文件是什么？ AAR（Android ARchive）文件是Android操..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T01:45:21.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"AAR"}],["meta",{"property":"article:tag","content":"JAR"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T01:45:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"将AAR文件转换为JAR文件 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T01:45:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"将AAR文件转换为JAR文件 | Baeldung 引言 作为Android开发者，我们有时会遇到需要将AAR文件转换为JAR文件的情况。这通常发生在我们想要在Java项目中使用仅以AAR格式提供的库或模块时。 在本教程中，我们将学习将AAR文件转换为JAR文件的步骤。 AAR文件是什么？ AAR（Android ARchive）文件是Android操..."},"headers":[{"level":3,"title":"4.1. 通过Zip手动提取AAR的内容","slug":"_4-1-通过zip手动提取aar的内容","link":"#_4-1-通过zip手动提取aar的内容","children":[]},{"level":3,"title":"4.2. 使用Android Studio","slug":"_4-2-使用android-studio","link":"#_4-2-使用android-studio","children":[]}],"git":{"createdTime":1720230321000,"updatedTime":1720230321000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.28,"words":1283},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Converting an AAR File to a JAR File.md","localizedDate":"2022年4月1日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>作为Android开发者，我们有时会遇到需要将AAR文件转换为JAR文件的情况。这通常发生在我们想要在Java项目中使用仅以AAR格式提供的库或模块时。</p>\\n<p>在本教程中，我们将学习将AAR文件转换为JAR文件的步骤。</p>\\n<ol start=\\"2\\">\\n<li>AAR文件是什么？</li>\\n</ol>\\n<p><strong>AAR（Android ARchive）文件是Android操作系统中用于分发和共享库、资源和代码的打包文件格式。</strong></p>\\n<p>它类似于JAR（Java Archive）文件格式，但它包括了为Android应用程序提供的额外元数据，例如_AndroidManifest.xml_、资源文件、_res_文件夹（布局、值、可绘制的）、ProGuard规则等。</p>","autoDesc":true}');export{c as comp,R as data};
