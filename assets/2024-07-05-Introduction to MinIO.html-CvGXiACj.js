import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as n,a as t}from"./app-DkA39C0B.js";const a={},d=t(`<h1 id="minio简介" tabindex="-1"><a class="header-anchor" href="#minio简介"><span>MinIO简介</span></a></h1><p>MinIO是一个高性能的对象存储系统。它被设计为云原生存储系统的替代品。事实上，它的API与亚马逊S3完全兼容。</p><p>在本教程中，我们将快速介绍如何使用MinIO。</p><h2 id="关于minio" tabindex="-1"><a class="header-anchor" href="#关于minio"><span>关于MinIO</span></a></h2><p>MinIO从一开始就被设计为亚马逊S3存储API的完全兼容替代品。他们声称自己是最具兼容性的S3替代品，同时还提供可比的性能和可扩展性。</p><p>MinIO还提供了多种部署选项。它可以作为本地应用程序在大多数流行的架构上运行，也可以使用Docker或Kubernetes作为容器化应用程序部署。</p><p>此外，MinIO是开源软件。组织可以自由地在AGPLv3许可证的条款下使用它。只是要注意，这个选项除了在线文档和MinIO用户社区之外没有支持。对于较大的企业，也有提供专用支持的付费订阅。</p><p>由于其S3 API的兼容性，能够在多种部署中运行，以及开源的特性，MinIO是开发和测试，以及DevOps场景中的重要工具。</p><h3 id="_2-1-对象存储的工作原理" tabindex="-1"><a class="header-anchor" href="#_2-1-对象存储的工作原理"><span>2.1 对象存储的工作原理</span></a></h3><p>对象存储的概念类似于标准的Unix文件系统，但我们使用的是存储桶和对象，而不是目录和文件。</p><p>存储桶可以像目录一样嵌套到层次结构中，对象可以被看作是字节的集合。这些集合可以是任意的字节数组或正常的文件，如图像、PDF等。</p><p>一个示例对象存储系统可能看起来像这样：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>/
/images/
  image1.png
  image2.jpg
/videos/
  video1.mp4
/users/
  /john.doe/
    3rd quarter revenue report.docx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就像目录和文件一样，存储桶和对象可以有权限。这允许对数据进行细粒度的访问控制，特别是在有许多用户的大组织中。</p><h2 id="安装minio" tabindex="-1"><a class="header-anchor" href="#安装minio"><span>安装MinIO</span></a></h2><p>正如前面提到的，MinIO几乎适用于每个平台。Windows、Linux和MacOS都有独立的安装程序。然而，对于开发和测试目的，最简单的入门方式是使用容器化分发。</p><p>让我们以容器的形式运行一个独立的MinIO服务器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ docker run -p 9000:9000 -p 9001:9001 \\
  quay.io/minio/minio server /data --console-address &quot;:9001&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然容器化部署对于评估MinIO来说是完全可行的，但<strong>需要意识到一些限制</strong>。</p><p>特别是，一些高级功能，如版本控制、对象锁定和存储桶复制在单服务器部署中不可用。这些功能需要MinIO的分布式部署，这在单服务器部署中不可用。</p><h2 id="使用minio" tabindex="-1"><a class="header-anchor" href="#使用minio"><span>使用MinIO</span></a></h2><p><strong>有多种不同的方式来与MinIO服务器交互和管理存储桶和对象</strong>。下面，我们将看看它们全部。</p><h3 id="_4-1-minio客户端" tabindex="-1"><a class="header-anchor" href="#_4-1-minio客户端"><span>4.1 MinIO客户端</span></a></h3><p>MinIO客户端提供了与Unix文件管理命令相同的命令，如_cp和_ls，但它是为本地和远程存储系统设计的。它完全兼容AWS S3，其语法模仿了AWS客户端工具。</p><p>使用MinIO客户端的第一步是配置它与云存储系统通信。让我们将其指向上面的容器化部署：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mc alias set docker_minio http://127.0.0.1:9000 minioadmin minioadmin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令创建了一个别名，指向在localhost上的端口9000的MinIO容器化部署。在这个部署中，默认的访问密钥和秘密密钥都是_minioadmin_。</p><p>我们可以使用_admin_子命令来验证连接：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mc admin info docker_minio

   127.0.0.1:9000
   Uptime: 3 minutes
   Version: 2023-05-04T21:44:30Z
   Network: 1/1 OK
   Drives: 1/1 OK
   Pool: 1

Pools:
   1st, Erasure sets: 1, Drives per erasure set: 1

1 drive online, 0 drives offline
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在，我们可以开始执行创建存储桶和对象等基本操作</strong>。MinIO客户端的许多子命令都模仿了熟悉的Unix命令：</p><ul><li><em>cp</em>: 在文件系统之间复制文件或对象。</li><li><em>ls</em>: 在存储桶中列出文件或对象。</li><li><em>mb</em>: 创建存储桶（类似于Linux上的_mkdir_）。</li><li><em>mv</em>: 移动/重新定位文件或对象从一个文件系统到另一个。</li><li><em>rb</em>: 删除存储桶（类似于Linux上的_rmdir_）。</li><li><em>rm</em>: 删除文件或对象。</li></ul><p><strong>这些子命令中的大多数在本地文件系统和云存储上都有效</strong>。例如，我们可以使用以下命令序列来创建一个新的存储桶，将文件复制到该存储桶中，将对象在存储桶之间移动，然后删除存储桶：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ mc mb user1
$ mc cp ~/Resume.pdf prattm
$ mc mb user2
$ mc cp user1/Resume.pdf user2
$ mc rb user1
$ mc ls user2
[2023-05-15 21:39:10 MDT]     491K Resume.pdf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-minio控制台" tabindex="-1"><a class="header-anchor" href="#_4-2-minio控制台"><span>4.2 MinIO控制台</span></a></h3><p>另一种在MinIO部署中管理数据的方式是使用基于Web的管理控制台。对于容器化部署，我们首先在Web浏览器中打开地址http://127.0.0.1:9001。我们使用默认的凭证_minioadmin_ / _minioadmin_登录。</p><p>从那里，我们可以创建我们的第一个存储桶：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-bucket-1024x515.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>记住<strong>并非所有选项，例如版本控制，将适用于我们的容器化部署</strong>。</p><p>现在，我们可以导航到_Object Browser_并点击我们的新存储桶。在这个屏幕上，我们有几个选项。首先，我们可以使用_Create new path_按钮创建子存储桶：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-path-1024x381.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们还可以将文件作为新对象上传到存储桶中：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-upload-file-1024x277.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>总的来说，MinIO管理控制台的功能等同于命令行客户端。然而，它确实有一些小的差异。</p><p>首先，与命令行客户端不同，使用客户端无法在存储桶之间移动对象。</p><p>此外，命令行客户端还有一些子命令，在管理控制台中不存在。例如，<em>diff</em>、_du_和_pipe_子命令都模仿了标准的Unix命令，并且在管理控制台中没有等效的命令。</p><h3 id="_4-3-minio-java-sdk" tabindex="-1"><a class="header-anchor" href="#_4-3-minio-java-sdk"><span>4.3 MinIO Java SDK</span></a></h3><p>我们将看到的与MinIO工作的最后一种方式是使用Java SDK。首先，在应用程序中包含所需的依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`io.minio\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`minio\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`8.5.2\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Java SDK的第一步是创建客户端实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>MinioClient minioClient =
  MinioClient.builder()
    .endpoint(&quot;http://127.0.0.1:9000&quot;)
    .credentials(&quot;minioadmin&quot;, &quot;minioadmin&quot;)
    .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个客户端可以执行我们之前在命令行工具和控制台中看到的相同操作</strong>。例如，我们可以创建一个存储桶：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>minioClient.makeBucket(
  MakeBucketArgs
    .builder()
    .bucket(&quot;user1&quot;)
    .build());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以将文件作为对象上传到该存储桶中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>minioClient.putObject(PutObjectArgs
  .builder()
  .bucket(&quot;user1&quot;)
  .object(&quot;Resume.pdf&quot;)
  .stream(new FileInputStream(&quot;/tmp/Resume.pdf&quot;)
  .build());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们看看如何从存储桶中获取对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (InputStream stream =
  minioClient.getObject(GetObjectArgs
    .builder()
    .bucket(&quot;user2&quot;)
    .object(&quot;Resume.pdf&quot;)
    .build())) {
    // 读取流
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这只是Java SDK的一小部分示例。记住，因为MinIO完全兼容S3，<strong>相同的代码可以用于Amazon S3</strong>。</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们简要介绍了MinIO，这是一个具有完整S3兼容性的对象存储引擎。虽然它是一个生产级的对象存储系统，但它也适合其他用例。因为它是开源的，可以部署在任何地方，并且完全兼容S3，所以它是开发和测试环境的一个很好的替代品。</p>`,59),s=[d];function l(r,o){return n(),i("div",null,s)}const p=e(a,[["render",l],["__file","2024-07-05-Introduction to MinIO.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-05/2024-07-05-Introduction%20to%20MinIO.html","title":"MinIO简介","lang":"zh-CN","frontmatter":{"date":"2023-05-04T00:00:00.000Z","category":["Introduction"],"tag":["MinIO","S3"],"head":[["meta",{"name":"keywords","content":"MinIO, S3, object storage, API compatibility, open-source"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-05/2024-07-05-Introduction%20to%20MinIO.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"MinIO简介"}],["meta",{"property":"og:description","content":"MinIO简介 MinIO是一个高性能的对象存储系统。它被设计为云原生存储系统的替代品。事实上，它的API与亚马逊S3完全兼容。 在本教程中，我们将快速介绍如何使用MinIO。 关于MinIO MinIO从一开始就被设计为亚马逊S3存储API的完全兼容替代品。他们声称自己是最具兼容性的S3替代品，同时还提供可比的性能和可扩展性。 MinIO还提供了多种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-bucket-1024x515.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-05T03:36:34.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"MinIO"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:published_time","content":"2023-05-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-05T03:36:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MinIO简介\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-bucket-1024x515.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-create-path-1024x381.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2023/05/minio-admin-console-upload-file-1024x277.jpg\\"],\\"datePublished\\":\\"2023-05-04T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-05T03:36:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"MinIO简介 MinIO是一个高性能的对象存储系统。它被设计为云原生存储系统的替代品。事实上，它的API与亚马逊S3完全兼容。 在本教程中，我们将快速介绍如何使用MinIO。 关于MinIO MinIO从一开始就被设计为亚马逊S3存储API的完全兼容替代品。他们声称自己是最具兼容性的S3替代品，同时还提供可比的性能和可扩展性。 MinIO还提供了多种..."},"headers":[{"level":2,"title":"关于MinIO","slug":"关于minio","link":"#关于minio","children":[{"level":3,"title":"2.1 对象存储的工作原理","slug":"_2-1-对象存储的工作原理","link":"#_2-1-对象存储的工作原理","children":[]}]},{"level":2,"title":"安装MinIO","slug":"安装minio","link":"#安装minio","children":[]},{"level":2,"title":"使用MinIO","slug":"使用minio","link":"#使用minio","children":[{"level":3,"title":"4.1 MinIO客户端","slug":"_4-1-minio客户端","link":"#_4-1-minio客户端","children":[]},{"level":3,"title":"4.2 MinIO控制台","slug":"_4-2-minio控制台","link":"#_4-2-minio控制台","children":[]},{"level":3,"title":"4.3 MinIO Java SDK","slug":"_4-3-minio-java-sdk","link":"#_4-3-minio-java-sdk","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720150594000,"updatedTime":1720150594000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.13,"words":1840},"filePathRelative":"posts/baeldung/2024-07-05/2024-07-05-Introduction to MinIO.md","localizedDate":"2023年5月4日","excerpt":"\\n<p>MinIO是一个高性能的对象存储系统。它被设计为云原生存储系统的替代品。事实上，它的API与亚马逊S3完全兼容。</p>\\n<p>在本教程中，我们将快速介绍如何使用MinIO。</p>\\n<h2>关于MinIO</h2>\\n<p>MinIO从一开始就被设计为亚马逊S3存储API的完全兼容替代品。他们声称自己是最具兼容性的S3替代品，同时还提供可比的性能和可扩展性。</p>\\n<p>MinIO还提供了多种部署选项。它可以作为本地应用程序在大多数流行的架构上运行，也可以使用Docker或Kubernetes作为容器化应用程序部署。</p>\\n<p>此外，MinIO是开源软件。组织可以自由地在AGPLv3许可证的条款下使用它。只是要注意，这个选项除了在线文档和MinIO用户社区之外没有支持。对于较大的企业，也有提供专用支持的付费订阅。</p>","autoDesc":true}');export{p as comp,u as data};
