import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as e,a as n}from"./app-BUAgDejY.js";const o={},S=n('<h1 id="amazon-sns与amazon-sqs-baeldung" tabindex="-1"><a class="header-anchor" href="#amazon-sns与amazon-sqs-baeldung"><span>Amazon SNS与Amazon SQS | Baeldung</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将讨论AWS为用户提供的两项顶级服务：SNS和SQS。首先，我们将简要描述这两项服务，并查看一些简单的用例。然后，我们将从不同角度指出它们之间的主要区别。最后，我们将看到这些服务结合在一起时表现出的强大功能和能力。</p><h2 id="_2-sns定义和用例" tabindex="-1"><a class="header-anchor" href="#_2-sns定义和用例"><span>2. SNS定义和用例</span></a></h2><p><strong>用户使用Amazon Simple Notification Service作为发送实时通知的托管服务。</strong> 为了更容易理解SNS，我们可以特别关注三个对象：主题、发布者和订阅者。一个主题可以从多个发布者接收消息，并将相同的消息传递给多个订阅者。发布者发送到主题的每条消息都会到达所有注册的订阅者：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/AWS-SNS-Diagram.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>让我们谈谈消息从发布者到订阅者的旅程。首先，发布者和订阅者都需要有权限从SNS主题读取和写入。我们可以使用IAM访问策略定义权限。然后，当消息到达主题时，它被存储在静止时加密的存储中，如果传递失败，将用于重试消息传递。</p><p>查看图像，我们可以观察到有两种类型的主题：标准和FIFO。关键区别在于后者确保消息传递的顺序与它们的发布顺序相匹配。</p><p>在分发消息之前，它们会经历一个激活数据保护策略的过程。这些策略旨在为个人可识别信息（PII）和其他形式的敏感数据提供更高级别的保护。像数据掩蔽这样的技术作为这个保护过程的组成部分被实施。</p><p>最后，<strong>订阅者可以使用各种协议接收消息</strong>。还可以为每个订阅者定义特定的过滤策略，以便一些消息被丢弃并不发送，并且一个死信队列（SQS队列）用于处理特定订阅者的传递失败和手动重试。</p><p>用户可以使用Amazon SNS传递时间关键的通知。例如，使用像Datadog这样的监控工具，我们可以使用SNS发送由我们应用程序中预定义的阈值触发的系统警报，以防我们的应用程序出现问题。另一个例子可能是使用SNS作为消息系统，通过电子邮件、短信和移动推送通知向每个订阅我们应用程序的用户发送更新。SNS与SQS结合是任何基于AWS云的应用程序实现“广播”场景的基本构建块。</p><h2 id="_3-sqs定义和用例" tabindex="-1"><a class="header-anchor" href="#_3-sqs定义和用例"><span>3. SQS定义和用例</span></a></h2><p>Amazon在2004年推出了AWS SQS Simple Queue Service，这是最早提供给用户使用的托管服务之一。它已成为许多基于云的应用程序的基本构建块。<strong>它主要用于实现不同软件组件之间的异步通信</strong>。我们知道管理队列提出了一系列挑战，例如有界缓冲问题，而且由于我们需要在组件之间启用通信以管理并发写入和读取，管理分布式队列更加困难。SQS以简单的方式帮助解决了所有这些问题。</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/SQS-Diagram.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在让我们谈谈消息从发布者到订阅者的旅程。第一部分与SNS类似：发布者和订阅者需要权限从SQS队列读取和写入。在SQS中，我们可以使用IAM访问策略定义这些权限。然后，当消息到达队列时，系统将其存储在静止时加密的存储中。如果传递失败，将从这个存储中读取以重试传递。</p><p>在这种情况下，队列可以是标准、FIFO或延迟。我们可以选择FIFO队列来保持顺序，或者选择延迟队列以预定义的时间延迟消息传递。<strong>消费者可以使用两种不同的机制从队列中读取：短轮询和长轮询</strong>。</p><p>任何需要在软件组件之间解耦通信的用例都可以很好地利用SQS服务。例如，在SNS基础设施中，SQS作为死信队列的底层实现，处理特定订阅者的传递失败和手动重试。</p><h2 id="_4-sns与sqs-差异" tabindex="-1"><a class="header-anchor" href="#_4-sns与sqs-差异"><span>4. SNS与SQS：差异</span></a></h2><p>现在让我们总结一下SQS和SNS之间的主要区别：</p><table><thead><tr><th>比较</th><th><em>SNS</em></th><th>SQS</th></tr></thead><tbody><tr><td><strong>实体类型</strong></td><td>主题（标准和FIFO）</td><td>队列（标准、FIFO和延迟）</td></tr><tr><td><strong>消息消费</strong></td><td>推送机制，SNS向订阅者推送消息</td><td>拉取机制（长轮询和短轮询）</td></tr><tr><td><strong>传递保证</strong></td><td>至少一次传递</td><td>精确一次传递</td></tr><tr><td><strong>订阅者数量</strong></td><td>最适合多订阅者用例</td><td>最适合单订阅者用例</td></tr><tr><td><strong>通信类型</strong></td><td>实时，A2A和A2P</td><td>延迟通信，仅A2A</td></tr></tbody></table><h2 id="_5-为什么将sns和sqs结合在一起" tabindex="-1"><a class="header-anchor" href="#_5-为什么将sns和sqs结合在一起"><span>5. 为什么将SNS和SQS结合在一起？</span></a></h2><p>“广播”场景是我们通常需要SNS和SQS一起工作的情况。在这种情况下，<strong>消息从SNS主题发送，然后复制到不同的SQS队列。队列订阅了该服务</strong>。这当然允许并行异步处理。</p><p>例如，假设我们需要构建一个视频流平台。当用户上传新视频时，我们向包含存储在S3存储桶中项目链接的主题发布SNS消息。该主题与几个SQS队列建立连接。队列将并发处理同一视频的不同编码和视频质量。然后，一系列独立的应用程序从这些队列中异步读取并处理工作负载：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/08/Fanout-Diagram.drawio.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>用于重试SNS消息传递的死信队列是SNS和SQS结合使用的另一个例子。通过这种方式，客户端和应用程序实现了具有更好弹性和容错性的实时通信。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>在本文中，我们描述了AWS云提供商最常用的两种软件解决方案：Simple Queue Service和Simple Notification Service。我们讨论了关键特性，查看了基本功能，并比较了最重要的特点。最后，我们分享了一个共同的使用示例，其中SNS和SQS结合解决了一些典型的软件设计问题。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/afb924c0dc252b56ad032d987b0aa461?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&amp;r=g" alt="img" loading="lazy"></p>',28),s=[S];function r(i,p){return e(),a("div",null,s)}const g=t(o,[["render",r],["__file","2024-07-01-Amazon SNS vs. Amazon SQS.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Amazon%20SNS%20vs.%20Amazon%20SQS.html","title":"Amazon SNS与Amazon SQS | Baeldung","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","category":["AWS","教程"],"tag":["Amazon SNS","Amazon SQS"],"head":[["meta",{"name":"keywords","content":"AWS, SNS, SQS, 消息服务, 队列服务, 比较"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Amazon%20SNS%20vs.%20Amazon%20SQS.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Amazon SNS与Amazon SQS | Baeldung"}],["meta",{"property":"og:description","content":"Amazon SNS与Amazon SQS | Baeldung 1. 引言 在本教程中，我们将讨论AWS为用户提供的两项顶级服务：SNS和SQS。首先，我们将简要描述这两项服务，并查看一些简单的用例。然后，我们将从不同角度指出它们之间的主要区别。最后，我们将看到这些服务结合在一起时表现出的强大功能和能力。 2. SNS定义和用例 用户使用Amazon..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/08/AWS-SNS-Diagram.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T07:29:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Amazon SNS"}],["meta",{"property":"article:tag","content":"Amazon SQS"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T07:29:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Amazon SNS与Amazon SQS | Baeldung\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/08/AWS-SNS-Diagram.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/SQS-Diagram.png\\",\\"https://www.baeldung.com/wp-content/uploads/2023/08/Fanout-Diagram.drawio.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/afb924c0dc252b56ad032d987b0aa461?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/db9b6e888453bec33b0a1b1522bae628?s=50&r=g\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T07:29:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Amazon SNS与Amazon SQS | Baeldung 1. 引言 在本教程中，我们将讨论AWS为用户提供的两项顶级服务：SNS和SQS。首先，我们将简要描述这两项服务，并查看一些简单的用例。然后，我们将从不同角度指出它们之间的主要区别。最后，我们将看到这些服务结合在一起时表现出的强大功能和能力。 2. SNS定义和用例 用户使用Amazon..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. SNS定义和用例","slug":"_2-sns定义和用例","link":"#_2-sns定义和用例","children":[]},{"level":2,"title":"3. SQS定义和用例","slug":"_3-sqs定义和用例","link":"#_3-sqs定义和用例","children":[]},{"level":2,"title":"4. SNS与SQS：差异","slug":"_4-sns与sqs-差异","link":"#_4-sns与sqs-差异","children":[]},{"level":2,"title":"5. 为什么将SNS和SQS结合在一起？","slug":"_5-为什么将sns和sqs结合在一起","link":"#_5-为什么将sns和sqs结合在一起","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1719818972000,"updatedTime":1719818972000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.48,"words":1645},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Amazon SNS vs. Amazon SQS.md","localizedDate":"2023年8月1日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将讨论AWS为用户提供的两项顶级服务：SNS和SQS。首先，我们将简要描述这两项服务，并查看一些简单的用例。然后，我们将从不同角度指出它们之间的主要区别。最后，我们将看到这些服务结合在一起时表现出的强大功能和能力。</p>\\n<h2>2. SNS定义和用例</h2>\\n<p><strong>用户使用Amazon Simple Notification Service作为发送实时通知的托管服务。</strong> 为了更容易理解SNS，我们可以特别关注三个对象：主题、发布者和订阅者。一个主题可以从多个发布者接收消息，并将相同的消息传递给多个订阅者。发布者发送到主题的每条消息都会到达所有注册的订阅者：</p>","autoDesc":true}');export{g as comp,c as data};
