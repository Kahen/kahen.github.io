import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as e,a as t}from"./app-BtbBZiJO.js";const i={},o=t(`<h1 id="langchain-简介" tabindex="-1"><a class="header-anchor" href="#langchain-简介"><span>LangChain 简介</span></a></h1><p>在本教程中，我们将探讨 LangChain 的细节，这是一个用于开发由语言模型驱动的应用程序的框架。我们将首先收集语言模型的基本概念，这些概念将有助于本教程。</p><p>尽管 LangChain 主要在 Python 和 JavaScript/TypeScript 版本中可用，但也有在 Java 中使用 LangChain 的选项。我们将讨论 LangChain 作为框架的构建块，然后继续在 Java 中进行实验。</p><h2 id="_2-背景" tabindex="-1"><a class="header-anchor" href="#_2-背景"><span>2. 背景</span></a></h2><p>在我们深入探讨为什么需要一个框架来构建由语言模型驱动的应用程序之前，我们首先必须理解什么是语言模型。我们还将涵盖使用语言模型时遇到的一些典型复杂性。</p><h3 id="_2-1-大型语言模型" tabindex="-1"><a class="header-anchor" href="#_2-1-大型语言模型"><span>2.1. 大型语言模型</span></a></h3><p>语言模型是自然语言的<strong>概率模型</strong>，能够生成一系列单词的概率。大型语言模型（LLM）是一种因其庞大规模而闻名的语言模型。它们是具有可能数十亿参数的人工神经网络。</p><p>LLM 通常在大量未标记数据上使用自监督和半监督学习技术进行<strong>预训练</strong>。然后，使用各种技术如微调和提示工程将预训练模型适应特定任务：好的，我将继续翻译剩余部分。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/Large-Language-Model.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这些 LLM 能够执行几种自然语言处理任务，如语言翻译和内容摘要。它们也<strong>能够生成内容</strong>。因此，它们在像回答问题这样的应用程序中非常有价值。</p><p>几乎所有<strong>主要的云服务提供商</strong>都已在其服务产品中包含了大型语言模型。例如，Microsoft Azure 提供像 Llama 2 和 OpenAI GPT-4 这样的 LLM。Amazon Bedrock 提供来自 AI21 Labs、Anthropic、Cohere、Meta 和 Stability AI 的模型。</p><h3 id="_2-2-提示工程" tabindex="-1"><a class="header-anchor" href="#_2-2-提示工程"><span>2.2. 提示工程</span></a></h3><p>LLM 是在大量文本数据集上训练的基础模型。因此，它们能够捕捉人类语言固有的语法和语义。但是，它们<strong>必须适应执行我们希望它们执行的特定任务</strong>。</p><p>提示工程是适应 LLM 的最快方式之一。它是<strong>一种结构化文本的过程，可以被 LLM 解释和理解</strong>。在这里，我们使用自然语言文本来描述我们期望 LLM 执行的任务：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/Prompt-Engineering.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们创建的提示帮助 LLM 执行<strong>上下文学习</strong>，这是暂时的。我们可以使用提示工程来促进 LLM 的安全使用，并构建新的能力，比如通过领域知识和外部工具增强 LLM。</p><p>这是一个积极的研究领域，新技术不断涌现。然而，像<strong>思维链提示</strong>这样的技术已经变得相当流行。这里的理念是让 LLM 在给出最终答案之前，将解决问题的过程分解为一系列中间步骤。</p><h3 id="_2-3-词嵌入" tabindex="-1"><a class="header-anchor" href="#_2-3-词嵌入"><span>2.3. 词嵌入</span></a></h3><p>正如我们所看到的，LLM 能够处理大量的自然语言文本。如果我们将自然语言中的单词表示为词嵌入，LLM 的性能将大大提升。这是一种<strong>能够编码单词含义的实数值向量</strong>。</p><p>通常，词嵌入是使用像 Tomáš Mikolov 的 Word2vec 或斯坦福大学的 GloVe 这样的算法生成的。GloVe 是一种<strong>无监督学习算法</strong>，它根据语料库中的全局单词-单词共现统计数据进行训练：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/Word-Embedding-Illustration.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在提示工程中，我们将提示转换为其词嵌入，使模型更好地理解并响应提示。此外，它在<strong>增强我们为模型提供的上下文</strong>方面也非常有帮助，使它们能够提供更具上下文的答案。</p><p>例如，我们可以从未处理过的数据集中生成词嵌入，并将它们存储在向量数据库中。进一步，我们可以使用用户提供的输入来对这个向量数据库执行<strong>语义搜索</strong>。然后，我们可以使用搜索结果作为模型的附加上下文。</p><h1 id="_3-langchain-中的-llm-技术栈" tabindex="-1"><a class="header-anchor" href="#_3-langchain-中的-llm-技术栈"><span>3. LangChain 中的 LLM 技术栈</span></a></h1><p>正如我们已经看到的，<strong>创建有效的提示是成功利用任何应用程序中 LLM 能力的关键元素</strong>。这包括使与语言模型的交互具有上下文感知能力，并能够依赖语言模型进行推理。</p><p>为此，我们需要执行<strong>几个任务，比如创建提示模板，调用语言模型，并从多个来源向语言模型提供用户特定数据</strong>。为了简化这些任务，我们需要像 LangChain 这样的框架作为我们 LLM 技术栈的一部分：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/LLM-Tech-Stack-with-LangChain.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>该框架还有助于开发需要<strong>链接多个语言模型</strong>的应用程序，并<strong>能够回忆与语言模型的过去交互信息</strong>。然后，还有更复杂的用例，涉及使用语言模型作为推理引擎。</p><p>最后，我们可以<strong>执行日志记录、监控、流媒体和其他维护和故障排除的基本任务</strong>。LLM 技术栈正在迅速发展，以解决许多这些关注点。然而，LangChain 正在迅速成为 LLM 技术栈的宝贵部分。</p><h1 id="_4-java-中的-langchain" tabindex="-1"><a class="header-anchor" href="#_4-java-中的-langchain"><span>4. Java 中的 LangChain</span></a></h1><p>LangChain 于 <strong>2022 年作为开源项目启动</strong>，并很快通过社区支持获得了动力。它最初由 Harrison Chase 用 Python 开发，并很快成为 AI 领域增长最快的初创公司之一。</p><p>2023 年初，紧随 Python 版本之后，<strong>出现了 LangChain 的 JavaScript/TypeScript 版本</strong>。它很快变得非常流行，并开始支持多个 JavaScript 环境，如 Node.js、Web 浏览器、CloudFlare 工作者、Vercel/Next.js、Deno 和 Supabase 边缘函数。</p><p>不幸的是，<strong>没有官方的 Java 版本的 LangChain</strong> 可用于 Java/Spring 应用程序。然而，<strong>有一个社区版本的 Java LangChain 叫做 LangChain4j</strong>。它与 Java 8 或更高版本兼容，并支持 Spring Boot 2 和 3。</p><p>LangChain 的各种依赖项可在 Maven Central 获得。我们可能需要根据我们使用的功能<strong>在我们的应用程序中添加一个或多个依赖项</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`dev.langchain4j\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`langchain4j\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`0.23.0\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，我们还需要支持与 OpenAI 模型集成、提供嵌入支持以及像 all-MiniLM-L6-v2 这样的句子转换器模型的依赖项，在本教程的后续部分中。</p><p>与 LangChain 类似的设计目标，LangChain4j <strong>提供了简单且一致的抽象层</strong>以及其众多实现。它已经支持几个语言模型提供商，如 OpenAI，以及像 Pinecone 这样的嵌入存储提供商。</p><p>然而，由于 <strong>LangChain 和 LangChain4j 都在快速发展</strong>，可能 Python 或 JS/TS 版本中支持的功能在 Java 版本中尚未出现。尽管如此，基本概念、总体结构和词汇在很大程度上是相同的。</p><h1 id="_5-langchain-的构建块" tabindex="-1"><a class="header-anchor" href="#_5-langchain-的构建块"><span>5. LangChain 的构建块</span></a></h1><p>LangChain 为我们的应用程序提供了几个价值主张，这些价值主张作为模块组件提供。模块组件为使用语言模型提供了有用的抽象以及一系列实现。让我们讨论其中的一些模块，并在 Java 中举例说明。</p><h3 id="_5-1-模型-i-o" tabindex="-1"><a class="header-anchor" href="#_5-1-模型-i-o"><span>5.1. 模型 I/O</span></a></h3><p>当使用任何语言模型时，我们需要与它接口的能力。LangChain 提供了必要的构建块，比如<strong>能够模板化提示并动态选择和管理模型输入</strong>。我们还可以使用输出解析器从模型输出中提取信息：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Model-IO.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>提示模板是为语言模型生成提示的预定义配方，可能包括指令、少量示例和特定上下文：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PromptTemplate promptTemplate = PromptTemplate
  .from(&quot;Tell me a {{adjective}} joke about {{content}}..&quot;);
Map\`&lt;String, Object&gt;\` variables = new HashMap&lt;&gt;();
variables.put(&quot;adjective&quot;, &quot;funny&quot;);
variables.put(&quot;content&quot;, &quot;computers&quot;);
Prompt prompt = promptTemplate.apply(variables);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们创建了一个能够接受多个变量的提示模板。变量是我们从用户输入中接收并提供给提示模板的东西。</p><p>LangChain 支持与两种类型的模型集成，语言模型和聊天模型。聊天模型也由语言模型支持，但提供聊天功能：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ChatLanguageModel model = OpenAiChatModel.builder()
  .apiKey(\`&lt;OPENAI_API_KEY&gt;\`)
  .modelName(GPT_3_5_TURBO)
  .temperature(0.3)
  .build();
String response = model.generate(prompt.text());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用特定的 OpenAI 模型和相关 API 密钥创建了一个聊天模型。我们可以通过免费注册 OpenAI 获得 API 密钥。温度参数用于控制模型输出的随机性。</p><p>最后，来自语言模型的输出可能不足以呈现。LangChain 提供<strong>输出解析器帮助我们结构化语言模型响应</strong> - 例如，将输出中的信息提取为 Java 中的 POJO。</p><h3 id="_5-2-记忆" tabindex="-1"><a class="header-anchor" href="#_5-2-记忆"><span>5.2. 记忆</span></a></h3><p>通常，利用 LLM 的应用程序具有对话界面。对话中的一个重要方面是能够<strong>引用对话中早期引入的信息</strong>。存储有关过去交互的信息的能力称为记忆：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Memory.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>LangChain 提供了为应用程序添加记忆的关键功能。例如，我们需要从记忆中读取以增强用户输入的能力。然后，我们需要将当前运行的输入和输出写入记忆的能力：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ChatMemory chatMemory = TokenWindowChatMemory
  .withMaxTokens(300, new OpenAiTokenizer(GPT_3_5_TURBO));
chatMemory.add(userMessage(&quot;Hello, my name is Kumar&quot;));
AiMessage answer = model.generate(chatMemory.messages()).content();
System.out.println(answer.text()); // Hello Kumar! How can I assist you today?
chatMemory.add(answer);
chatMemory.add(userMessage(&quot;What is my name?&quot;));
AiMessage answerWithName = model.generate(chatMemory.messages()).content();
System.out.println(answer.text()); // Your name is Kumar.
chatMemory.add(answerWithName);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用 <em>TokenWindowChatMemory</em> 实现了一个固定窗口聊天记忆，允许我们读取和写入我们与语言模型交换的聊天消息。</p><p>LangChain 还提供了<strong>更复杂的数据结构和算法，以返回选定的消息</strong>，而不是返回所有内容。例如，它</p>`,57),r=[o];function s(l,p){return e(),n("div",null,r)}const c=a(i,[["render",s],["__file","2024-06-28-Introduction to LangChain.html.vue"]]),h=JSON.parse('{"path":"/posts/baeldung/2024-06-28/2024-06-28-Introduction%20to%20LangChain.html","title":"LangChain 简介","lang":"zh-CN","frontmatter":{"date":"2024-06-28T00:00:00.000Z","category":["Tutorial","Language Models"],"tag":["LangChain","Java"],"head":[["meta",{"name":"keywords","content":"LangChain, Java, language models, framework, applications"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-28/2024-06-28-Introduction%20to%20LangChain.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"LangChain 简介"}],["meta",{"property":"og:description","content":"LangChain 简介 在本教程中，我们将探讨 LangChain 的细节，这是一个用于开发由语言模型驱动的应用程序的框架。我们将首先收集语言模型的基本概念，这些概念将有助于本教程。 尽管 LangChain 主要在 Python 和 JavaScript/TypeScript 版本中可用，但也有在 Java 中使用 LangChain 的选项。我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/10/Large-Language-Model.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-28T09:53:11.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"LangChain"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:published_time","content":"2024-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-28T09:53:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"LangChain 简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/10/Large-Language-Model.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/Prompt-Engineering.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/Word-Embedding-Illustration.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/LLM-Tech-Stack-with-LangChain.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Model-IO.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/10/LangChain-Memory.jpg\\"],\\"datePublished\\":\\"2024-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-28T09:53:11.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"LangChain 简介 在本教程中，我们将探讨 LangChain 的细节，这是一个用于开发由语言模型驱动的应用程序的框架。我们将首先收集语言模型的基本概念，这些概念将有助于本教程。 尽管 LangChain 主要在 Python 和 JavaScript/TypeScript 版本中可用，但也有在 Java 中使用 LangChain 的选项。我们..."},"headers":[{"level":2,"title":"2. 背景","slug":"_2-背景","link":"#_2-背景","children":[{"level":3,"title":"2.1. 大型语言模型","slug":"_2-1-大型语言模型","link":"#_2-1-大型语言模型","children":[]},{"level":3,"title":"2.2. 提示工程","slug":"_2-2-提示工程","link":"#_2-2-提示工程","children":[]},{"level":3,"title":"2.3. 词嵌入","slug":"_2-3-词嵌入","link":"#_2-3-词嵌入","children":[]},{"level":3,"title":"5.1. 模型 I/O","slug":"_5-1-模型-i-o","link":"#_5-1-模型-i-o","children":[]},{"level":3,"title":"5.2. 记忆","slug":"_5-2-记忆","link":"#_5-2-记忆","children":[]}]}],"git":{"createdTime":1719568391000,"updatedTime":1719568391000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":8.24,"words":2471},"filePathRelative":"posts/baeldung/2024-06-28/2024-06-28-Introduction to LangChain.md","localizedDate":"2024年6月28日","excerpt":"\\n<p>在本教程中，我们将探讨 LangChain 的细节，这是一个用于开发由语言模型驱动的应用程序的框架。我们将首先收集语言模型的基本概念，这些概念将有助于本教程。</p>\\n<p>尽管 LangChain 主要在 Python 和 JavaScript/TypeScript 版本中可用，但也有在 Java 中使用 LangChain 的选项。我们将讨论 LangChain 作为框架的构建块，然后继续在 Java 中进行实验。</p>\\n<h2>2. 背景</h2>\\n<p>在我们深入探讨为什么需要一个框架来构建由语言模型驱动的应用程序之前，我们首先必须理解什么是语言模型。我们还将涵盖使用语言模型时遇到的一些典型复杂性。</p>","autoDesc":true}');export{c as comp,h as data};
