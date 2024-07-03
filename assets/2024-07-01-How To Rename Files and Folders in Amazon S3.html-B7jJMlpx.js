import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a}from"./app-DlW52zYa.js";const i={},s=a(`<h1 id="如何在amazon-s3中重命名文件和文件夹-baeldung" tabindex="-1"><a class="header-anchor" href="#如何在amazon-s3中重命名文件和文件夹-baeldung"><span>如何在Amazon S3中重命名文件和文件夹 | Baeldung</span></a></h1><p>在本教程中，我们将探索如何使用Java在Amazon S3存储桶中重命名对象（文件或文件夹）。</p><p>Amazon Simple Storage Service（Amazon S3）是一种流行的云存储服务。它允许用户以高耐久性、可用性和可扩展性在云中存储和检索数据。我们将在以下章节中使用AWS SDK for Java与之交互。</p><h3 id="_2-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_2-1-maven依赖"><span>2.1. Maven依赖</span></a></h3><p>首先，我们需要在我们的项目_pom.xml_中声明AWS S3 SDK依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`software.amazon.awssdk\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`s3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.24.9\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-aws凭证" tabindex="-1"><a class="header-anchor" href="#_2-2-aws凭证"><span>2.2. AWS凭证</span></a></h3><p>我们还需要设置AWS账户，安装AWS CLI，并使用我们的AWS凭证（<em>AWS_ACCESS_KEY_ID_和_AWS_SECRET_ACCESS_KEY</em>）配置它，以便能够以编程方式访问AWS资源。我们可以在AWS文档中找到完成此操作的所有步骤。</p><h3 id="_2-3-初始化s3客户端" tabindex="-1"><a class="header-anchor" href="#_2-3-初始化s3客户端"><span>2.3. 初始化S3客户端</span></a></h3><p>现在，我们将创建一个客户端来处理与S3服务的所有通信。要创建S3客户端，我们必须提供我们在上一步中创建的AWS配置文件，并配置AWS区域：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>S3Client s3Client = S3Client.builder()
  .region(US_EAST_1)
  .credentialsProvider(ProfileCredentialsProvider.create(&quot;default&quot;))
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用建造者设计模式创建客户端。这是一种创建设计模式，将帮助我们创建那些复杂的对象。在我们的示例中，我们将在_US_EAST_1_区域创建我们的存储桶。如果我们想更改首选区域，我们可以在官方文档中找到所有区域。</p><h3 id="_3-1-复制s3对象" tabindex="-1"><a class="header-anchor" href="#_3-1-复制s3对象"><span>3.1. 复制S3对象</span></a></h3><p>在这一步中，我们将使用在上一点创建的客户端调用AWS API。</p><p>首先，我们将定义我们的请求参数。假设我们有一个名为_baeldung-s3-bucket_的存储桶和一个名为_simpleCSVFile.csv_的CSV文件。我们想要将文件重命名为_renamedFile.csv_。让我们首先概述我们的复制请求的参数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String bucketName = &quot;baeldung-s3-bucket&quot;;
String keyName = &quot;simpleCSVFile.csv&quot;;
String destinationKeyName = &quot;renamedFile.csv&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在定义参数后，我们可以构建将发送到AWS API的_CopyObjectRequest_</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CopyObjectRequest copyObjRequest = CopyObjectRequest.builder()
  .sourceBucket(bucketName)
  .sourceKey(keyName)
  .destinationBucket(bucketName)  // 应为destinationKeyName
  .destinationKey(destinationKeyName)
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们可以使用_AmazonS3_客户端和请求复制对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>s3Client.copyObject(copyRequest);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们在这里停止并运行我们的代码，我们将看到我们现在有两个文件，一个带有新的期望名称和原始文件。</p><h3 id="_3-2-删除s3对象" tabindex="-1"><a class="header-anchor" href="#_3-2-删除s3对象"><span>3.2. 删除S3对象</span></a></h3><p>我们还需要在复制后删除原始对象以完成重命名过程。<strong>我们将使用上一点的参数定义_DeleteObjectRequest_</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
  .bucket(bucketName)
  .key(keyName)
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将再次调用S3客户端来删除原始对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>s3Client.deleteObject(deleteRequest);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-重命名文件夹" tabindex="-1"><a class="header-anchor" href="#_4-重命名文件夹"><span>4. 重命名文件夹</span></a></h3><p>上一点的方法仅适用于重命名简单对象。但是，当我们需要重命名一个文件夹时，情况会有所改变。<strong>在Amazon S3中重命名整个文件夹涉及遍历文件夹中的所有对象，并逐个重命名它们。</strong></p><h3 id="_4-1-列出源文件夹中的所有对象" tabindex="-1"><a class="header-anchor" href="#_4-1-列出源文件夹中的所有对象"><span>4.1. 列出源文件夹中的所有对象</span></a></h3><p>让我们从列出给定文件夹中的所有对象开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
  .bucket(bucketName)
  .prefix(sourceFolderKey)
  .build();

ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);
List\`&lt;S3Object&gt;\` objects = listResponse.contents();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用存储桶名称和前缀初始化_ListObjectsV2Request_。文件夹中的对象实际上是所有键前缀为各自文件夹名称的对象。</p><h3 id="_4-2-重命名文件夹中的所有对象键" tabindex="-1"><a class="header-anchor" href="#_4-2-重命名文件夹中的所有对象键"><span>4.2. 重命名文件夹中的所有对象键</span></a></h3><p>现在我们已经拥有了列出我们文件夹中所有对象的代码，我们所要做的就是将它们全部复制到新目的地并删除原始对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>for (S3Object s3Object : objects) {
    String newKey = destinationFolderKey + s3Object.key().substring(sourceFolderKey.length());

    // 复制对象到目标文件夹
    CopyObjectRequest copyRequest = CopyObjectRequest.builder()
      .sourceBucket(bucketName)
      .sourceKey(s3Object.key())
      .destinationBucket(bucketName)
      .destinationKey(newKey)
      .build();
    s3Client.copyObject(copyRequest);

    // 从源文件夹中删除对象
    DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
      .bucket(bucketName)
      .key(s3Object.key())
      .build();
    s3Client.deleteObject(deleteRequest);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们首先遍历对象列表，对于每个项目，我们将通过将旧的文件夹名称替换为所需的新名称来生成一个新的键。在获得新键之后，我们所要做的就是将对象复制到新目的地并删除原始对象。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探索了使用AWS SDK for Java在S3存储桶中重命名文件和文件夹的方法。我们探索了两种不同的情况，它们使用相同的概念来重命名对象，即用新名称复制它们并删除原始对象。</p><p>如往常一样，本文的完整代码可在GitHub上找到。抱歉，我需要更正一下之前翻译中的一处错误。在<code>CopyObjectRequest</code>的构建中，<code>destinationBucket</code>字段应该是<code>destinationKeyName</code>，而不是<code>bucketName</code>。以下是修正后的翻译：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CopyObjectRequest copyObjRequest = CopyObjectRequest.builder()
  .sourceBucket(bucketName)
  .sourceKey(keyName)
  .destinationBucket(destinationKeyName)  // 修正为：destinationKeyName
  .destinationKey(destinationKeyName)
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译完成，OK。</p>`,41),l=[s];function d(r,c){return n(),t("div",null,l)}const m=e(i,[["render",d],["__file","2024-07-01-How To Rename Files and Folders in Amazon S3.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-How%20To%20Rename%20Files%20and%20Folders%20in%20Amazon%20S3.html","title":"如何在Amazon S3中重命名文件和文件夹 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-01T00:00:00.000Z","category":["AWS SDK for Java","S3"],"tag":["Java","S3","文件重命名"],"head":[["meta",{"name":"keywords","content":"Amazon S3, 文件夹重命名, Java, AWS SDK"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-How%20To%20Rename%20Files%20and%20Folders%20in%20Amazon%20S3.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何在Amazon S3中重命名文件和文件夹 | Baeldung"}],["meta",{"property":"og:description","content":"如何在Amazon S3中重命名文件和文件夹 | Baeldung 在本教程中，我们将探索如何使用Java在Amazon S3存储桶中重命名对象（文件或文件夹）。 Amazon Simple Storage Service（Amazon S3）是一种流行的云存储服务。它允许用户以高耐久性、可用性和可扩展性在云中存储和检索数据。我们将在以下章节中使用AW..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T11:55:05.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:tag","content":"文件重命名"}],["meta",{"property":"article:published_time","content":"2024-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T11:55:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何在Amazon S3中重命名文件和文件夹 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T11:55:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何在Amazon S3中重命名文件和文件夹 | Baeldung 在本教程中，我们将探索如何使用Java在Amazon S3存储桶中重命名对象（文件或文件夹）。 Amazon Simple Storage Service（Amazon S3）是一种流行的云存储服务。它允许用户以高耐久性、可用性和可扩展性在云中存储和检索数据。我们将在以下章节中使用AW..."},"headers":[{"level":3,"title":"2.1. Maven依赖","slug":"_2-1-maven依赖","link":"#_2-1-maven依赖","children":[]},{"level":3,"title":"2.2. AWS凭证","slug":"_2-2-aws凭证","link":"#_2-2-aws凭证","children":[]},{"level":3,"title":"2.3. 初始化S3客户端","slug":"_2-3-初始化s3客户端","link":"#_2-3-初始化s3客户端","children":[]},{"level":3,"title":"3.1. 复制S3对象","slug":"_3-1-复制s3对象","link":"#_3-1-复制s3对象","children":[]},{"level":3,"title":"3.2. 删除S3对象","slug":"_3-2-删除s3对象","link":"#_3-2-删除s3对象","children":[]},{"level":3,"title":"4. 重命名文件夹","slug":"_4-重命名文件夹","link":"#_4-重命名文件夹","children":[]},{"level":3,"title":"4.1. 列出源文件夹中的所有对象","slug":"_4-1-列出源文件夹中的所有对象","link":"#_4-1-列出源文件夹中的所有对象","children":[]},{"level":3,"title":"4.2. 重命名文件夹中的所有对象键","slug":"_4-2-重命名文件夹中的所有对象键","link":"#_4-2-重命名文件夹中的所有对象键","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719834905000,"updatedTime":1719834905000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.11,"words":1233},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-How To Rename Files and Folders in Amazon S3.md","localizedDate":"2024年7月1日","excerpt":"\\n<p>在本教程中，我们将探索如何使用Java在Amazon S3存储桶中重命名对象（文件或文件夹）。</p>\\n<p>Amazon Simple Storage Service（Amazon S3）是一种流行的云存储服务。它允许用户以高耐久性、可用性和可扩展性在云中存储和检索数据。我们将在以下章节中使用AWS SDK for Java与之交互。</p>\\n<h3>2.1. Maven依赖</h3>\\n<p>首先，我们需要在我们的项目_pom.xml_中声明AWS S3 SDK依赖：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`software.amazon.awssdk`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`s3`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`2.24.9`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{m as comp,v as data};
