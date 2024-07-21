import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CtR6X2Br.js";const p={},e=t('<hr><h1 id="java中的nlp库概览" tabindex="-1"><a class="header-anchor" href="#java中的nlp库概览"><span>Java中的NLP库概览</span></a></h1><p>自然语言处理（NLP）是人工智能（AI）的一个分支，它使计算机能够像人类一样理解书面或口头语言。在AI革命的这个时代，它有着多样的应用。</p><p>在本教程中，我们将探索Java中的不同NLP库，并看看如何使用Apache OpenNLP和Stanford CoreNLP实现一些NLP任务。</p><h2 id="_2-nlp是什么" tabindex="-1"><a class="header-anchor" href="#_2-nlp是什么"><span>2. NLP是什么？</span></a></h2><p>NLP使计算机能够以类似人类的方式处理文本和单词。它结合了计算语言学、统计学、深度学习和机器学习。</p><p>人类每天通过各种媒介在线相互交流。在这样做的过程中，他们分享了不同类型的数据，如文本、语音、图像等。这些数据对于理解人类行为和习惯至关重要。因此，它们被用来训练计算机模仿人类智能。</p><p><strong>NLP使用数据来训练机器模仿人类语言行为</strong>。为此，它遵循了一个包含几个步骤的过程：</p><ol><li>它将文本分割成较小的单元，如句子或单词。</li><li>它对文本进行标记化，这意味着它为每个单词分配一个唯一的标识符。</li><li>它去除停用词，这些是常见的不增加文本意义的词，如“the”、“a”、“and”等。</li><li>它对文本进行词干提取或词形还原，这意味着它将每个单词还原为其词根形式或词典形式。</li><li>它标记每个单词的词性。</li><li>它标记每个单词的命名实体，如人、地点、组织等。</li></ol><h2 id="_3-nlp的用例" tabindex="-1"><a class="header-anchor" href="#_3-nlp的用例"><span>3. NLP的用例</span></a></h2><p>NLP是许多现代现实世界应用中机器智能的驱动力。</p><p><strong>机器翻译是一个示例用例</strong>。我们有系统可以将一种特定语言翻译成另一种语言。Google翻译就是这样的一个例子。驱动机器翻译的技术基于NLP算法。</p><p>此外，<strong>另一个流行的用例是垃圾邮件检测</strong>。大多数流行的电子邮件服务提供商使用垃圾邮件检测器来确定传入的消息是否为垃圾邮件。垃圾邮件检测应用NLP文本分类技术，根据其语言模式识别垃圾邮件。</p><p>此外，<strong>AI聊天机器人现在非常普遍</strong>。流行的例子包括Siri、Google助手、Alexa等。这些应用程序使用语音识别和自然语言来识别语音中的模式，并以适当的、有帮助的评论回应。</p><p><strong>NLP是这些应用程序的核心逻辑，因为它使它们能够处理自然语言输入和输出，如文本和语音，并理解它们背后的含义和意图</strong>。</p><h2 id="_4-opennlp" tabindex="-1"><a class="header-anchor" href="#_4-opennlp"><span>4. OpenNLP</span></a></h2><p>Apache OpenNLP是一个工具包，它利用机器学习来处理自然语言文本。它为常见的NLP任务如标记化、分割、语音标记等提供支持。</p><p><strong>Apache OpenNLP的主要目标是为NLP任务提供支持，并为不同的语言提供大量的预构建模型</strong>。此外，它还提供了一个命令行界面（CLI），方便进行实验和训练。</p><p>Apache OpenNLP提供了各种预构建模型供下载。让我们实现一个简单的语言检测器，使用预构建的模型。首先，让我们将OpenNLP依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``org.apache.opennlp``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``opennlp-tools``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``2.1.1``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们使用_langdetect-183.bin_预构建模型实现语言检测器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenTextInEnglish_whenDetectLanguage_thenReturnsEnglishLanguageCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;the dream my father told me&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">LanguageDetectorModel</span> model<span class="token punctuation">;</span>\n\n    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">InputStream</span> modelIn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;langdetect-183.bin&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        model <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LanguageDetectorModel</span><span class="token punctuation">(</span>modelIn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token class-name">LanguageDetectorME</span> detector <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LanguageDetectorME</span><span class="token punctuation">(</span>model<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">Language</span> language <span class="token operator">=</span> detector<span class="token punctuation">.</span><span class="token function">predictLanguage</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;eng&quot;</span><span class="token punctuation">,</span> language<span class="token punctuation">.</span><span class="token function">getLang</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们从OpenNLP获取预构建的模型来检测语言，并将其放在根目录下。然后，我们定义输入数据。接下来，我们加载语言检测器模型。最后，我们创建一个新的_LanguageDetectorME_实例并尝试检测语言。我们用返回的语言测试预期的语言。</p><h2 id="_5-stanford-nlp" tabindex="-1"><a class="header-anchor" href="#_5-stanford-nlp"><span>5. Stanford NLP</span></a></h2><p>斯坦福NLP小组提供了算法，使机器能够处理、生成和理解人类文本和语言。</p><p><strong>CoreNLP是斯坦福NLP小组用Java编写的一套程序，可以执行各种NLP任务，如标记化、词性标注、词形还原等</strong>。它可以通过命令行、Java代码或对服务器的调用来使用。</p><p>让我们看看使用Stanford CoreNLP进行标记化的一个例子。我们需要将它的依赖项添加到_pom.xml_：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>``edu.stanford.nlp``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>``stanford-corenlp``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>``4.5.3``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>``\n``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们进行标记化：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Test</span>\n<span class="token keyword">void</span> <span class="token function">givenSampleText_whenTokenize_thenExpectedTokensReturned</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">&quot;annotators&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;tokenize&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">StanfordCoreNLP</span> pipeline <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StanfordCoreNLP</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">String</span> text <span class="token operator">=</span> <span class="token string">&quot;The german shepard display an act of kindness&quot;</span><span class="token punctuation">;</span>\n    <span class="token class-name">Annotation</span> document <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Annotation</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    pipeline<span class="token punctuation">.</span><span class="token function">annotate</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token class-name">List</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CoreMap</span><span class="token punctuation">&gt;</span></span>` sentences <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">CoreAnnotations<span class="token punctuation">.</span>SentencesAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">StringBuilder</span> tokens <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CoreMap</span> sentence <span class="token operator">:</span> sentences<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CoreLabel</span> token <span class="token operator">:</span> sentence<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">CoreAnnotations<span class="token punctuation">.</span>TokensAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token class-name">String</span> word <span class="token operator">=</span> token<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">CoreAnnotations<span class="token punctuation">.</span>TextAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            tokens<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">&quot;The german shepard display an act of kindness&quot;</span><span class="token punctuation">,</span> tokens<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们使用标记化注释器设置_StanfordCoreNLP_对象。接下来，我们创建一个新的_Annotation_实例。最后，我们实现逻辑以从示例句子生成标记。</p><h2 id="_6-cogcomp-nlp" tabindex="-1"><a class="header-anchor" href="#_6-cogcomp-nlp"><span>6. CogComp NLP</span></a></h2><p><strong>CogComp NLP是由认知计算组开发的自然语言处理（NLP）库的集合</strong>。它为NLP任务提供了各种工具和模块，如标记化、词形还原、词性标注等。</p><p>CogComp NLP可以作为命令行工具或Java API使用。CogComp NLP中一个流行的模块是_cogcomp-nlp-pipeline_，它对给定的文本执行基本的NLP任务。然而，_cogcomp-nlp-pipeline_仅适用于英文纯文本。</p><p>另一个模块是_similarity_，它测量文本或其他对象之间的相似性并返回一个分数。</p><h2 id="_7-gate" tabindex="-1"><a class="header-anchor" href="#_7-gate"><span>7. GATE</span></a></h2><p>通用文本工程架构（GATE）是一个工具包，能够解决文本分析和语言处理的问题。它是开发用于处理人类语言的软件组件的极好基础设施。此外，它也是一个用于NLP的极好工具包。</p><p>这个工具包拥有一个庞大的开发者和研究人员社区，他们使用它进行信息提取、情感分析、社交媒体挖掘和生物医学文本处理。</p><p><strong>GATE通过为语言处理软件提供架构来帮助开发者和研究人员。此外，它提供了一个实现了该架构的类库</strong>。</p><h2 id="_8-apache-uima" tabindex="-1"><a class="header-anchor" href="#_8-apache-uima"><span>8. Apache UIMA</span></a></h2><p>非结构化信息管理应用程序（UIMA）是能够处理和分析大量非结构化数据（包括文本、音频和视频）的软件系统。它们有助于创建组件，可以从内容中检测情感、实体和其他类型的信息。这些组件是用Java或C++编写的。</p><p>此外，Apache UIMA是一个框架，使我们能够使用UIMA组件构建应用程序，并处理大量的非结构化数据。它帮助我们从数据中提取相关信息，并将其用于各种目的。</p><h2 id="_9-mallet" tabindex="-1"><a class="header-anchor" href="#_9-mallet"><span>9. MALLET</span></a></h2><p>MAchine Learning for LangaugE Toolkit（MALLET）是一个Java包，为NLP任务提供了各种工具和算法，如文档分类、主题建模和序列标记。MALLET中包含的一种算法是朴素贝叶斯算法，它在NLP中广泛用于文本分类和情感分析。</p><p>MALLET是一个开源的Java包，为文本分析提供了各种工具。这些工具之一是主题建模，它可以在大量未标记的文本文档集合中发现主要主题。</p><p><strong>此外，MALLET还可以将文本文档转换为数值向量，这些向量可以用于机器学习</strong>。此外，它可以作为命令行工具或直接Java API使用。</p><h2 id="_10-结论" tabindex="-1"><a class="header-anchor" href="#_10-结论"><span>10. 结论</span></a></h2><p>在本文中，我们学习了NLP的关键内容以及NLP的用例。此外，我们还看到了不同的Java NLP库和工具包。我们还分别使用CoreNLP和OpenNLP查看了标记化和句子检测的示例。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>',49),o=[e];function c(l,i){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","2024-07-06-Overview of NLP Libraries in Java.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Overview%20of%20NLP%20Libraries%20in%20Java.html","title":"Java中的NLP库概览","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["NLP","Java"],"tag":["Apache OpenNLP","Stanford CoreNLP"],"head":[["meta",{"name":"Natural Language Processing Libraries in Java","content":"An overview of various NLP libraries in Java, including Apache OpenNLP and Stanford CoreNLP, and how to implement NLP tasks using them."}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Overview%20of%20NLP%20Libraries%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的NLP库概览"}],["meta",{"property":"og:description","content":"Java中的NLP库概览 自然语言处理（NLP）是人工智能（AI）的一个分支，它使计算机能够像人类一样理解书面或口头语言。在AI革命的这个时代，它有着多样的应用。 在本教程中，我们将探索Java中的不同NLP库，并看看如何使用Apache OpenNLP和Stanford CoreNLP实现一些NLP任务。 2. NLP是什么？ NLP使计算机能够以类..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T21:58:27.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Apache OpenNLP"}],["meta",{"property":"article:tag","content":"Stanford CoreNLP"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T21:58:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的NLP库概览\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T21:58:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的NLP库概览 自然语言处理（NLP）是人工智能（AI）的一个分支，它使计算机能够像人类一样理解书面或口头语言。在AI革命的这个时代，它有着多样的应用。 在本教程中，我们将探索Java中的不同NLP库，并看看如何使用Apache OpenNLP和Stanford CoreNLP实现一些NLP任务。 2. NLP是什么？ NLP使计算机能够以类..."},"headers":[{"level":2,"title":"2. NLP是什么？","slug":"_2-nlp是什么","link":"#_2-nlp是什么","children":[]},{"level":2,"title":"3. NLP的用例","slug":"_3-nlp的用例","link":"#_3-nlp的用例","children":[]},{"level":2,"title":"4. OpenNLP","slug":"_4-opennlp","link":"#_4-opennlp","children":[]},{"level":2,"title":"5. Stanford NLP","slug":"_5-stanford-nlp","link":"#_5-stanford-nlp","children":[]},{"level":2,"title":"6. CogComp NLP","slug":"_6-cogcomp-nlp","link":"#_6-cogcomp-nlp","children":[]},{"level":2,"title":"7. GATE","slug":"_7-gate","link":"#_7-gate","children":[]},{"level":2,"title":"8. Apache UIMA","slug":"_8-apache-uima","link":"#_8-apache-uima","children":[]},{"level":2,"title":"9. MALLET","slug":"_9-mallet","link":"#_9-mallet","children":[]},{"level":2,"title":"10. 结论","slug":"_10-结论","link":"#_10-结论","children":[]}],"git":{"createdTime":1720303107000,"updatedTime":1720303107000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.86,"words":2058},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Overview of NLP Libraries in Java.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中的NLP库概览</h1>\\n<p>自然语言处理（NLP）是人工智能（AI）的一个分支，它使计算机能够像人类一样理解书面或口头语言。在AI革命的这个时代，它有着多样的应用。</p>\\n<p>在本教程中，我们将探索Java中的不同NLP库，并看看如何使用Apache OpenNLP和Stanford CoreNLP实现一些NLP任务。</p>\\n<h2>2. NLP是什么？</h2>\\n<p>NLP使计算机能够以类似人类的方式处理文本和单词。它结合了计算语言学、统计学、深度学习和机器学习。</p>\\n<p>人类每天通过各种媒介在线相互交流。在这样做的过程中，他们分享了不同类型的数据，如文本、语音、图像等。这些数据对于理解人类行为和习惯至关重要。因此，它们被用来训练计算机模仿人类智能。</p>","autoDesc":true}');export{d as comp,k as data};
