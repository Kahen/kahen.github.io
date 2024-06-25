import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-CGDivSS1.js";const e={},p=t(`<h1 id="simple-java-mail-简介" tabindex="-1"><a class="header-anchor" href="#simple-java-mail-简介"><span>Simple Java Mail 简介</span></a></h1><p>Simple Java Mail 是一个流行的开源库，它简化了 Java 应用程序中的邮件发送过程。与标准的 JavaMail API 相比，它提供了更用户友好的 API，让我们可以专注于电子邮件的内容和收件人，而不是底层细节。</p><p>在本教程中，我们将探索设置 Simple Java Mail 的过程，并学习如何发送电子邮件，包括附件和 HTML 内容，处理异常等。</p><h2 id="_2-设置项目" tabindex="-1"><a class="header-anchor" href="#_2-设置项目"><span>2. 设置项目</span></a></h2><p>我们首先通过将 Simple Java Mail 依赖项添加到我们的项目配置文件 <em>pom.xml</em> 中开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`org.simplejavamail\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`simple-java-mail\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`8.7.0\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-发送电子邮件" tabindex="-1"><a class="header-anchor" href="#_3-发送电子邮件"><span>3. 发送电子邮件</span></a></h2><p>让我们首先使用 Simple Java Mail 发送一封简单电子邮件。</p><p>电子邮件的正文内容主要有两个部分：纯文本和 HTML。<strong>纯文本指的是在大多数电子邮件客户端中显示的未格式化内容，没有任何特殊格式或样式。</strong> 它们保证能够被所有电子邮件客户端阅读，无论它们是否能够显示 HTML 内容。</p><p>以下是一个基本示例，展示了如何构建一封简单电子邮件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span><span class="token string">&quot;纯文本电子邮件！&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withPlainText</span><span class="token punctuation">(</span><span class="token string">&quot;这是使用 SJM 发送的测试电子邮件。&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们使用 <em>EmailBuilder</em> 类中的 <em>startingBlank()</em> 方法来初始化一个新的 <em>Email</em> 对象，并使用默认值。<strong>它为构建电子邮件消息提供了一个起点，通过创建一个没有预定义内容或配置的空白电子邮件模板。</strong></p><p>随后，我们可以逐步使用 <em>EmailBuilder</em> 类提供的各种方法，用发件人、收件人、主题、正文和其他属性填充这个模板。<strong>例如，<em>withPlainText()</em> 方法接受一个字符串参数，包含我们希望包含在电子邮件正文中的实际文本消息。</strong></p><p>接下来，我们使用 <em>MailerBuilder</em> 来配置 SMTP 服务器的详细信息，包括服务器地址、端口、用户名和密码。最后，使用 <em>Mailer</em> 类来发送电子邮件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mailer</span> mailer <span class="token operator">=</span> <span class="token class-name">MailerBuilder</span>
  <span class="token punctuation">.</span><span class="token function">withSMTPServer</span><span class="token punctuation">(</span><span class="token string">&quot;smtp.example.com&quot;</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token string">&quot;username&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildMailer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mailer<span class="token punctuation">.</span><span class="token function">sendMail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此外，要向多个收件人发送电子邮件，我们可以简单地在 <em>to()</em> 方法中指定用逗号分隔的多个电子邮件地址：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient1@example.com, recipient2@example.com, recipient3@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-发送附件" tabindex="-1"><a class="header-anchor" href="#_4-发送附件"><span>4. 发送附件</span></a></h2><p>向电子邮件添加附件是直接的。<strong>我们可以使用 <em>EmailBuilder</em> 类的 <em>withAttachment()</em> 方法将各种类型的文件，如图像、文档或归档文件，附加到电子邮件消息中。</strong></p><p>以下是使用 <em>withAttachment()</em> 方法在电子邮件中附加文件的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span><span class="token string">&quot;带附件的纯文本电子邮件！&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withPlainText</span><span class="token punctuation">(</span><span class="token string">&quot;这是使用 SJM 发送的带附件的测试电子邮件。&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withAttachment</span><span class="token punctuation">(</span><span class="token string">&quot;important_document.pdf&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FileDataSource</span><span class="token punctuation">(</span><span class="token string">&quot;path/to/important_document.pdf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，<em>withAttachment()</em> 方法接受 <em>filename</em> 和一个表示附件数据的 <em>FileDataSource</em> 对象。此外，如果我们需要将多个文件附加到我们的电子邮件中，我们可以使用 <em>AttachmentResource</em> 对象的列表：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">List</span>\`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">AttachmentResource</span><span class="token punctuation">&gt;</span></span>\` arList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AttachmentResource</span><span class="token punctuation">(</span><span class="token string">&quot;important_document.pdf&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FileDataSource</span><span class="token punctuation">(</span><span class="token string">&quot;path/to/important_document.pdf&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AttachmentResource</span><span class="token punctuation">(</span><span class="token string">&quot;company_logo.png&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FileDataSource</span><span class="token punctuation">(</span><span class="token string">&quot;path/to/company_logo.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与使用 <em>withAttachment()</em> 方法不同，我们将使用 <em>withAttachments()</em> 方法。这个方法允许我们传入附件资源的集合：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
  <span class="token punctuation">.</span><span class="token function">withAttachments</span><span class="token punctuation">(</span>arList<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-发送-html-内容" tabindex="-1"><a class="header-anchor" href="#_5-发送-html-内容"><span>5. 发送 HTML 内容</span></a></h2><p>Simple Java Mail 允许我们发送带有 HTML 内容的电子邮件，并直接在电子邮件中嵌入图像。这对于创建视觉上吸引人且信息丰富的电子邮件非常有用。<strong>要在 HTML 电子邮件内容中包含嵌入的图像，我们需要使用 CID 方案引用图像。</strong></p><p><strong>这种机制充当一个唯一标识符，将 HTML 内容中的图像引用与实际附加到电子邮件中的图像数据连接起来。</strong> 基本上，它告诉电子邮件客户端在哪里定位图像以正确显示。</p><p>以下是如何创建一个包含使用 CID 的图像引用的 HTML 电子邮件的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">String</span> htmlContent <span class="token operator">=</span> <span class="token string">&quot;\`&lt;h1&gt;\`这是一封带有 HTML 内容的电子邮件\`&lt;/h1&gt;\`&quot;</span> <span class="token operator">+</span>
  <span class="token string">&quot;\`&lt;p&gt;\`此电子邮件正文包含其他信息和格式设置。\`&lt;/p&gt;\`&quot;</span> <span class="token operator">+</span>
  <span class="token string">&quot;\`&lt;img src=\\&quot;cid:company_logo\\&quot; alt=\\&quot;公司标志\\&quot;&gt;\`&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，<code>&lt;img&gt;</code> 标签使用标识符 <code>cid:company_logo</code> 引用图像。这在 HTML 内容中建立了链接。<strong>在构建电子邮件时，我们使用 <em>withEmbeddedImage()</em> 方法将图像附件与所选择的标识符 <em>company_logo</em> 关联。</strong> 这确保它与 HTML 内容中使用的标识符匹配。</p><p>以下是演示如何发送带有 HTML 内容和嵌入图像的电子邮件的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingblank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span><span class="token string">&quot;带 HTML 和嵌入图像的电子邮件！&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withHTMLText</span><span class="token punctuation">(</span>htmlContent<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withEmbeddedImage</span><span class="token punctuation">(</span><span class="token string">&quot;company_logo&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FileDataSource</span><span class="token punctuation">(</span><span class="token string">&quot;path/to/company_logo.png&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>图像数据本身并不是直接嵌入在 HTML 内容中。它通常作为电子邮件的单独附件包含。</p><p>还建议提供 HTML 内容的纯文本版本，使用 <em>withPlainText()</em>。<strong>这为不支持 HTML 渲染的电子邮件客户端的收件人提供了一个备选选项：</strong></p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
  <span class="token punctuation">.</span><span class="token function">withHTMLText</span><span class="token punctuation">(</span>htmlContent<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withPlainText</span><span class="token punctuation">(</span><span class="token string">&quot;此消息以纯文本显示，因为您的电子邮件客户端不支持 HTML。&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-回复和转发电子邮件" tabindex="-1"><a class="header-anchor" href="#_6-回复和转发电子邮件"><span>6. 回复和转发电子邮件</span></a></h2><p>Simple Java Mail 提供了构建用于回复和转发现有电子邮件的电子邮件对象的功能。<strong>在回复电子邮件时，原始电子邮件会在回复本身的正文中引用。</strong> 类似地，在转发电子邮件时，原始电子邮件作为转发内的单独正文包含。</p><p>要回复电子邮件，我们使用 <em>replyingTo()</em> 方法并提供接收到的电子邮件作为参数。然后，我们根据需要配置电子邮件，并使用 <em>EmailBuilder</em> 构建它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span>
  <span class="token punctuation">.</span><span class="token function">replyingTo</span><span class="token punctuation">(</span>receivedEmail<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">prependText</span><span class="token punctuation">(</span><span class="token string">&quot;这是一封回复电子邮件。原始电子邮件包含在下方：&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要转发电子邮件，我们使用 <em>forwarding()</em> 方法并提供接收到的电子邮件作为参数。然后，我们根据需要配置电子邮件，包括任何附加文本，并使用 <em>EmailBuilder</em> 构建它：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span>
  <span class="token punctuation">.</span><span class="token function">forwarding</span><span class="token punctuation">(</span>receivedEmail<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">prependText</span><span class="token punctuation">(</span><span class="token string">&quot;这是一封转发的电子邮件。请见下方的电子邮件：&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，重要的是要理解 Simple Java Mail 本身不能直接从电子邮件服务器检索电子邮件。<strong>我们需要利用像 <em>javax.mail</em> 这样的额外库来访问和检索电子邮件以进行回复或转发。</strong></p><h2 id="_7-处理异常" tabindex="-1"><a class="header-anchor" href="#_7-处理异常"><span>7. 处理异常</span></a></h2><p>在发送电子邮件时，处理在传输过程中可能发生的异常至关重要，以确保强大的功能。<strong>当发送电子邮件时发生错误，Simple Java Mail 会抛出一个名为 <em>MailException</em> 的检查异常。</strong></p><p>为了有效地处理潜在的错误，我们可以将我们的电子邮件发送逻辑包含在 <em>try</em>– <em>catch</em> 块中，捕获 <em>MailException</em> 类的实例。以下是一个演示如何使用 try-catch 块处理 <em>MailException</em> 的代码片段：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    mailer<span class="token punctuation">.</span><span class="token function">sendMail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">MailException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，在发送之前验证电子邮件地址可以减少电子邮件传输过程中发生错误的可能性。我们可以通过 mailer 对象提供的 <em>validate()</em> 方法来实现这一点：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">boolean</span> validEmailAdd <span class="token operator">=</span> mailer<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>validEmailAdd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    mailer<span class="token punctuation">.</span><span class="token function">sendMail</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 提示用户无效的电子邮件地址</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_8-高级配置选项" tabindex="-1"><a class="header-anchor" href="#_8-高级配置选项"><span>8. 高级配置选项</span></a></h2><p>此外，Simple Java Mail 提供了超出基本功能的多种配置选项。让我们探索可用的额外配置选项，例如设置自定义标头、配置投递或阅读回执以及限制电子邮件大小。</p><p>**我们可以使用 <em>MailerBuilder</em> 类of the <em>withHeader()</em> method to define custom headers for the emails. This allows us to include additional information beyond the standard headers:</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">Email<span class="token punctuation">.</span>Builder</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span><span class="token string">&quot;带自定义头部的电子邮件&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withPlainText</span><span class="token punctuation">(</span><span class="token string">&quot;这是一条重要信息。&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withHeader</span><span class="token punctuation">(</span><span class="token string">&quot;X-Priority&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-2-配置投递-阅读回执" tabindex="-1"><a class="header-anchor" href="#_8-2-配置投递-阅读回执"><span>8.2. 配置投递/阅读回执</span></a></h3><p><strong>投递回执确认电子邮件已被投递到收件人的邮箱，而阅读回执确认收件人已打开或阅读了电子邮件。</strong> Simple Java Mail 提供内置支持，使用特定的电子邮件头部配置这些回执：使用 <em>Return-Receipt-To</em> 用于投递回执，使用 <em>Disposition-Notification-To</em> 用于阅读回执。</p><p>我们可以明确定义回执应发送到的电子邮件地址。如果我们没有提供地址，它将默认使用 <em>replyTo</em> 地址（如果可用），或者使用 <em>fromAddress</em>。</p><p>以下是我们如何配置这些回执的示例：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Email</span> email <span class="token operator">=</span> <span class="token class-name">EmailBuilder</span><span class="token punctuation">.</span><span class="token function">startingBlank</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&quot;sender@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token string">&quot;recipient@example.com&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withSubject</span><span class="token punctuation">(</span><span class="token string">&quot;配置了投递/阅读回执的电子邮件！&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withPlainText</span><span class="token punctuation">(</span><span class="token string">&quot;这是一封带有投递/阅读回执的电子邮件。&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withDispositionNotificationTo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Recipient</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;address@domain.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Message<span class="token punctuation">.</span>RecipientType</span><span class="token punctuation">.</span><span class="token constant">TO</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">withReturnReceiptTo</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Recipient</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;address@domain.com&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Message<span class="token punctuation">.</span>RecipientType</span><span class="token punctuation">.</span><span class="token constant">TO</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildEmail</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_8-3-限制最大电子邮件大小" tabindex="-1"><a class="header-anchor" href="#_8-3-限制最大电子邮件大小"><span>8.3. 限制最大电子邮件大小</span></a></h3><p>许多电子邮件服务器对它们可以接受的电子邮件的最大大小有限制。<strong>Simple Java Mail 提供了一个功能，帮助我们防止发送超出这些限制的电子邮件。</strong> 这可以避免在电子邮件投递尝试期间遇到错误。</p><p>我们可以使用 <em>MailerBuilder</em> 对象上的 <em>withMaximumEmailSize()</em> 方法来配置允许的最大电子邮件大小。此方法接受一个表示字节大小限制的整数值：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Mailer</span> mailer <span class="token operator">=</span> <span class="token class-name">MailerBuilder</span>
  <span class="token punctuation">.</span><span class="token function">withMaximumEmailSize</span><span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">buildMailer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，最大电子邮件大小设置为 <em>5</em> 兆字节。如果我们尝试发送超过定义限制的电子邮件，Simple Java Mail 将抛出一个原因为 <em>EmailTooBigException</em> 的 <em>MailerException</em>。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们探讨了 Simple Java Mail 的各个方面，包括发送带有附件和嵌入图像的 HTML 内容的电子邮件。此外，我们深入研究了它的高级功能，如管理投递、阅读回执以及处理电子邮件的回复和转发。</p><p><strong>总的来说，它最适合需要直接且高效地发送电子邮件的 Java 应用程序。</strong></p><p>如常，示例的源代码可在 GitHub 上获取。</p><p>OK</p>`,68),o=[p];function l(c,i){return s(),a("div",null,o)}const r=n(e,[["render",l],["__file","Introduction to Simple Java Mail.html.vue"]]),k=JSON.parse('{"path":"/posts/baeldung/Archive/Introduction%20to%20Simple%20Java%20Mail.html","title":"Simple Java Mail 简介","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","Email"],"tag":["Simple Java Mail","JavaMail API"],"head":[["meta",{"name":"keywords","content":"Simple Java Mail, JavaMail, 邮件发送, 附件, HTML内容"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Introduction%20to%20Simple%20Java%20Mail.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Simple Java Mail 简介"}],["meta",{"property":"og:description","content":"Simple Java Mail 简介 Simple Java Mail 是一个流行的开源库，它简化了 Java 应用程序中的邮件发送过程。与标准的 JavaMail API 相比，它提供了更用户友好的 API，让我们可以专注于电子邮件的内容和收件人，而不是底层细节。 在本教程中，我们将探索设置 Simple Java Mail 的过程，并学习如何发送..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Simple Java Mail"}],["meta",{"property":"article:tag","content":"JavaMail API"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Simple Java Mail 简介\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Simple Java Mail 简介 Simple Java Mail 是一个流行的开源库，它简化了 Java 应用程序中的邮件发送过程。与标准的 JavaMail API 相比，它提供了更用户友好的 API，让我们可以专注于电子邮件的内容和收件人，而不是底层细节。 在本教程中，我们将探索设置 Simple Java Mail 的过程，并学习如何发送..."},"headers":[{"level":2,"title":"2. 设置项目","slug":"_2-设置项目","link":"#_2-设置项目","children":[]},{"level":2,"title":"3. 发送电子邮件","slug":"_3-发送电子邮件","link":"#_3-发送电子邮件","children":[]},{"level":2,"title":"4. 发送附件","slug":"_4-发送附件","link":"#_4-发送附件","children":[]},{"level":2,"title":"5. 发送 HTML 内容","slug":"_5-发送-html-内容","link":"#_5-发送-html-内容","children":[]},{"level":2,"title":"6. 回复和转发电子邮件","slug":"_6-回复和转发电子邮件","link":"#_6-回复和转发电子邮件","children":[]},{"level":2,"title":"7. 处理异常","slug":"_7-处理异常","link":"#_7-处理异常","children":[]},{"level":2,"title":"8. 高级配置选项","slug":"_8-高级配置选项","link":"#_8-高级配置选项","children":[{"level":3,"title":"8.2. 配置投递/阅读回执","slug":"_8-2-配置投递-阅读回执","link":"#_8-2-配置投递-阅读回执","children":[]},{"level":3,"title":"8.3. 限制最大电子邮件大小","slug":"_8-3-限制最大电子邮件大小","link":"#_8-3-限制最大电子邮件大小","children":[]}]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":8.74,"words":2621},"filePathRelative":"posts/baeldung/Archive/Introduction to Simple Java Mail.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>Simple Java Mail 是一个流行的开源库，它简化了 Java 应用程序中的邮件发送过程。与标准的 JavaMail API 相比，它提供了更用户友好的 API，让我们可以专注于电子邮件的内容和收件人，而不是底层细节。</p>\\n<p>在本教程中，我们将探索设置 Simple Java Mail 的过程，并学习如何发送电子邮件，包括附件和 HTML 内容，处理异常等。</p>\\n<h2>2. 设置项目</h2>\\n<p>我们首先通过将 Simple Java Mail 依赖项添加到我们的项目配置文件 <em>pom.xml</em> 中开始：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`org.simplejavamail`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`simple-java-mail`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`8.7.0`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,k as data};
