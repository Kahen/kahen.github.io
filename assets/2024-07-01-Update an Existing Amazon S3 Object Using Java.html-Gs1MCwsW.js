import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-c243dxVF.js";const i={},s=n(`<h1 id="使用java更新现有的amazon-s3对象" tabindex="-1"><a class="header-anchor" href="#使用java更新现有的amazon-s3对象"><span>使用Java更新现有的Amazon S3对象</span></a></h1><p>Amazon Simple Storage Service（Amazon S3）是一种广泛使用的存储服务，提供可扩展、安全和持久的对象存储。有时我们需要更新现有的Amazon S3对象。在S3中，对象是不可变的，这意味着我们不能直接修改对象的内容。然而，我们可以通过使用新内容覆盖对象，有效地“更新”它。</p><p>在本教程中，我们将学习如何使用AWS Java SDK，用更新后的内容替换同一AWS S3路径上的现有文件内容。</p><h2 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h2><p>首先，我们需要确保AWS SDK Maven依赖包被纳入项目中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`software.amazon.awssdk\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`s3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.24.9\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在线上找到包的最新版本。</p><p>要使用AWS SDK，我们需要几样东西：</p><ol><li>**AWS账户：**我们需要一个Amazon Web Services账户。如果我们没有，我们可以继续创建一个账户。</li><li>**AWS安全凭证：**这些是我们的访问密钥，允许我们对AWS API操作进行程序化调用。我们可以通过两种方式获取这些凭证，一种是使用安全凭证页面的访问密钥部分的AWS根账户凭证，另一种是使用IAM控制台的IAM用户凭证。</li><li>**选择AWS区域：**我们还必须选择我们想要存储Amazon S3数据的AWS区域。请注意，S3存储价格因地区而异。有关更多详细信息，请访问官方文档。在本教程中，我们将使用美国东部（俄亥俄州，区域_us-east-2_）。</li></ol><p>有关凭证设置的全面指南，请参阅官方AWS文档。</p><h2 id="_3-更新s3对象的步骤" tabindex="-1"><a class="header-anchor" href="#_3-更新s3对象的步骤"><span>3. 更新S3对象的步骤</span></a></h2><h3 id="_3-1-初始化s3客户端" tabindex="-1"><a class="header-anchor" href="#_3-1-初始化s3客户端"><span>3.1. 初始化S3客户端</span></a></h3><p>首先，我们需要创建一个客户端连接以访问Amazon S3网络服务。为此目的，我们将使用_AmazonS3_接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AWSCredentials credentials = new BasicAWSCredentials(
        &quot;AWS AccessKey&quot;,
        &quot;AWS secretKey&quot;
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将配置客户端：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AmazonS3 s3client = AmazonS3ClientBuilder.standard()
        .withRegion(Regions.fromName(&quot;us-east-1&quot;))
        .withCredentials(new AWSStaticCredentialsProvider(credentials))
        .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-将新对象上传到s3" tabindex="-1"><a class="header-anchor" href="#_3-2-将新对象上传到s3"><span>3.2. 将新对象上传到S3</span></a></h3><p>现在我们可以使用AWS Java SDK中的_putObject()_方法将文件上传到S3存储桶：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>PutObjectRequest request = PutObjectRequest.builder()
    .bucket(bucketName)
    .key(key)
    .build();

return s3Client.putObject(request, Path.of(file.toURI()));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是调用上述代码的代码片段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>s3Service.putObject(
    AWS_BUCKET,
    &quot;Document/hello.txt&quot;,
    new File(&quot;/Users/user/Document/hello.txt&quot;)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-上传-覆盖-对象" tabindex="-1"><a class="header-anchor" href="#_3-3-上传-覆盖-对象"><span>3.3. 上传（覆盖）对象</span></a></h3><p>由于S3中的对象是不可变的，“更新”一个对象涉及用新内容覆盖对象。因此，对于更新，我们需要使用添加文档时使用的同一组参数调用相同的putObject _()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public PutObjectResponse updateObject(String bucketName, String key, java.io.File file) {
    return this.putObject(bucketName, key, file);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码将用提供的新内容替换现有对象。如果给定键的对象不存在，S3将创建一个新对象。</p><h3 id="_3-4-可选-验证更新" tabindex="-1"><a class="header-anchor" href="#_3-4-可选-验证更新"><span>3.4. （可选）验证更新</span></a></h3><p>我们可能想要验证对象是否已成功更新。一种方法是通过检索对象的元数据并检查_lastModified_日期，或者通过计算对象的校验和并将其与预期值进行比较。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>HeadObjectRequest req = HeadObjectRequest.builder()
    .bucket(bucketName)
    .key(key)
    .build();

HeadObjectResponse response = s3Client.headObject(request);
System.out.println(&quot;Last Modified: &quot; + response.lastModified());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-重要考虑事项" tabindex="-1"><a class="header-anchor" href="#_4-重要考虑事项"><span>4. 重要考虑事项</span></a></h2><p><strong>我们还需要记住，在S3中，覆盖一个对象实际上是一个PUT操作，这可能会产生成本。在执行S3上的操作时，始终要注意成本影响。</strong></p><p>如果存储桶启用了版本控制，覆盖一个对象不会删除旧版本。相反，我们将拥有对象的多个版本。每个版本都有一个唯一的ID；如果需要，我们可以检索任何以前的版本。</p><p><strong>最后，如果对象关联了元数据，请意识到覆盖对象将用PUT操作期间提供的新的元数据替换旧的元数据。如果我们想保留旧的元数据，我们必须在请求中明确设置它。</strong></p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>虽然我们不能直接修改S3对象的内容，但使用Java的AWS SDK覆盖对象以新内容是直接的。始终记住最佳实践，例如不要硬编码凭证，并注意操作的成本影响。有了这些步骤，我们可以自信地使用Java管理和更新S3对象。</p><p>本文的完整实现可以在GitHub上找到。</p>`,35),l=[s];function d(r,c){return t(),a("div",null,l)}const u=e(i,[["render",d],["__file","2024-07-01-Update an Existing Amazon S3 Object Using Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-01/2024-07-01-Update%20an%20Existing%20Amazon%20S3%20Object%20Using%20Java.html","title":"使用Java更新现有的Amazon S3对象","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["AWS","Java"],"tag":["Amazon S3","Java SDK"],"head":[["meta",{"name":"keywords","content":"Amazon S3, Java, 更新对象, S3对象, AWS SDK"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-01/2024-07-01-Update%20an%20Existing%20Amazon%20S3%20Object%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java更新现有的Amazon S3对象"}],["meta",{"property":"og:description","content":"使用Java更新现有的Amazon S3对象 Amazon Simple Storage Service（Amazon S3）是一种广泛使用的存储服务，提供可扩展、安全和持久的对象存储。有时我们需要更新现有的Amazon S3对象。在S3中，对象是不可变的，这意味着我们不能直接修改对象的内容。然而，我们可以通过使用新内容覆盖对象，有效地“更新”它。 在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-01T14:53:53.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Amazon S3"}],["meta",{"property":"article:tag","content":"Java SDK"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-01T14:53:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java更新现有的Amazon S3对象\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-01T14:53:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java更新现有的Amazon S3对象 Amazon Simple Storage Service（Amazon S3）是一种广泛使用的存储服务，提供可扩展、安全和持久的对象存储。有时我们需要更新现有的Amazon S3对象。在S3中，对象是不可变的，这意味着我们不能直接修改对象的内容。然而，我们可以通过使用新内容覆盖对象，有效地“更新”它。 在..."},"headers":[{"level":2,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":2,"title":"3. 更新S3对象的步骤","slug":"_3-更新s3对象的步骤","link":"#_3-更新s3对象的步骤","children":[{"level":3,"title":"3.1. 初始化S3客户端","slug":"_3-1-初始化s3客户端","link":"#_3-1-初始化s3客户端","children":[]},{"level":3,"title":"3.2. 将新对象上传到S3","slug":"_3-2-将新对象上传到s3","link":"#_3-2-将新对象上传到s3","children":[]},{"level":3,"title":"3.3. 上传（覆盖）对象","slug":"_3-3-上传-覆盖-对象","link":"#_3-3-上传-覆盖-对象","children":[]},{"level":3,"title":"3.4. （可选）验证更新","slug":"_3-4-可选-验证更新","link":"#_3-4-可选-验证更新","children":[]}]},{"level":2,"title":"4. 重要考虑事项","slug":"_4-重要考虑事项","link":"#_4-重要考虑事项","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1719845633000,"updatedTime":1719845633000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.72,"words":1115},"filePathRelative":"posts/baeldung/2024-07-01/2024-07-01-Update an Existing Amazon S3 Object Using Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Amazon Simple Storage Service（Amazon S3）是一种广泛使用的存储服务，提供可扩展、安全和持久的对象存储。有时我们需要更新现有的Amazon S3对象。在S3中，对象是不可变的，这意味着我们不能直接修改对象的内容。然而，我们可以通过使用新内容覆盖对象，有效地“更新”它。</p>\\n<p>在本教程中，我们将学习如何使用AWS Java SDK，用更新后的内容替换同一AWS S3路径上的现有文件内容。</p>\\n<h2>2. 先决条件</h2>\\n<p>首先，我们需要确保AWS SDK Maven依赖包被纳入项目中：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>`&lt;dependency&gt;`\\n    `&lt;groupId&gt;`software.amazon.awssdk`&lt;/groupId&gt;`\\n    `&lt;artifactId&gt;`s3`&lt;/artifactId&gt;`\\n    `&lt;version&gt;`2.24.9`&lt;/version&gt;`\\n`&lt;/dependency&gt;`\\n</code></pre></div>","autoDesc":true}');export{u as comp,m as data};
