import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as i,a as n}from"./app-Bbk_lR15.js";const s={},a=n(`<h1 id="在java中使用aws-s3列出存储桶中的所有对象" tabindex="-1"><a class="header-anchor" href="#在java中使用aws-s3列出存储桶中的所有对象"><span>在Java中使用AWS S3列出存储桶中的所有对象</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>本文将重点介绍如何使用Java列出S3存储桶中的所有对象。我们将讨论使用AWS SDK for Java V2与S3交互的方法，并查看不同用例的示例。</p><p>我们将重点使用Java V2版本的AWS SDK，它以其比前一个版本有多项改进而著称，例如增强的性能、非阻塞I/O和用户友好的API设计。</p><h2 id="_2-先决条件" tabindex="-1"><a class="header-anchor" href="#_2-先决条件"><span>2. 先决条件</span></a></h2><p>要列出S3存储桶中的所有对象，我们可以利用AWS SDK for Java提供的_S3Client_类。</p><p>首先，让我们创建一个新的Java项目，并将以下Maven依赖项添加到我们的_pom.xml_文件中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`software.amazon.awssdk\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`s3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.24.9\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本文的示例中，我们将使用版本_2.20.52_。要查看最新版本，我们可以检查Maven仓库。</p><p>我们还需要设置AWS账户，安装AWS CLI，并使用我们的AWS凭据( <em>AWS_ACCESS_KEY_ID</em> 和 <em>AWS_SECRET_ACCESS_KEY</em> )进行配置，以便能够以编程方式访问AWS资源。我们可以在AWS文档中找到完成此操作的所有步骤。</p><p>最后，我们需要创建一个AWS S3存储桶并上传一些文件。正如我们在以下图片中看到的，对于我们的示例，我们创建了一个名为_baeldung-tutorials-s3_的存储桶，并上传了1060个文件：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/06/aws-s3-bucket-1-1024x879.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-从s3存储桶中列出对象" tabindex="-1"><a class="header-anchor" href="#_3-从s3存储桶中列出对象"><span>3. 从S3存储桶中列出对象</span></a></h2><p>让我们使用AWS SDK for Java V2并创建一个方法来从存储桶中读取对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>String AWS_BUCKET = &quot;baeldung-tutorial-s3&quot;;
Region AWS_REGION = Region.EU_CENTRAL_1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void listObjectsInBucket() {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();

    ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
      .bucket(AWS_BUCKET)
      .build();
    ListObjectsV2Response listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);

    List\`&lt;S3Object&gt;\` contents = listObjectsV2Response.contents();

    System.out.println(&quot;存储桶中的对象数量: &quot; + contents.stream().count());
    contents.stream().forEach(System.out::println);

    s3Client.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要从AWS S3存储桶中列出对象，我们首先需要创建一个_ListObjectsV2Request_实例，指定存储桶名称。然后，我们在_s3Client_对象上调用_listObjectsV2_方法，将请求作为参数传递。此方法返回一个_ListObjectsV2Response_，其中包含有关存储桶中对象的信息。</p><p>最后，我们使用_contents()_方法访问S3对象列表，并将检索到的对象数量作为输出。我们还为存储桶名称和相应的AWS区域定义了两个静态属性。</p><p>执行该方法后，我们得到以下结果：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>存储桶中的对象数量: 1000
S3Object(Key=file_0.txt, LastModified=2023-06-06T11:35:06Z, ETag=&quot;b9ece18c950afbfa6b0fdbfa4ff731d3&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_1.txt, LastModified=2023-06-06T11:35:07Z, ETag=&quot;97a6dd4c45b23db9c5d603ce161b8cab&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_10.txt, LastModified=2023-06-06T11:35:07Z, ETag=&quot;3406877694691ddd1dfb0aca54681407&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_100.txt, LastModified=2023-06-06T11:35:15Z, ETag=&quot;b99834bc19bbad24580b3adfa04fb947&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_1000.txt, LastModified=2023-04-29T18:54:31Z, ETag=&quot;47ed733b8d10be225eceba344d533586&quot;, Size=1, StorageClass=STANDARD)
[...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如我们所看到的，我们没有得到所有上传的对象作为结果返回。</p><p><strong>需要注意的是，这个解决方案设计上只返回最多1000个对象。如果存储桶包含超过1000个对象，我们必须使用_ListObjectsV2Response_对象中的_nextContinuationToken()_方法实现分页。</strong></p><p>如果AWS S3存储桶包含超过1000个对象，我们需要使用_nextContinuationToken()_方法实现分页。</p><p>让我们看一个示例，演示如何处理这种情况：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void listAllObjectsInBucket() {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();
    String nextContinuationToken = null;
    long totalObjects = 0;

    do {
        ListObjectsV2Request.Builder requestBuilder = ListObjectsV2Request.builder()
          .bucket(AWS_BUCKET)
          .continuationToken(nextContinuationToken);

        ListObjectsV2Response response = s3Client.listObjectsV2(requestBuilder.build());
        nextContinuationToken = response.nextContinuationToken();

        totalObjects += response.contents().stream()
          .peek(System.out::println)
          .reduce(0, (subtotal, element) -&gt; subtotal + 1, Integer::sum);
    } while (nextContinuationToken != null);
    System.out.println(&quot;存储桶中的对象数量: &quot; + totalObjects);

    s3Client.close();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用_do-while_循环来分页浏览存储桶中的所有对象。循环继续进行，直到没有更多的续订令牌，这表明我们检索了所有对象。</p><p>因此，我们得到了以下输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>存储桶中的对象数量: 1060
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过这种方法，我们显式地管理分页。我们检查续订令牌的存在，并在随后的请求中使用它。这为我们提供了在何时以及如何请求下一页的完全控制。它允许在处理分页过程时具有更大的灵活性。</p><p><strong>默认情况下，响应中返回的对象的最大数量是1000。它可能包含较少的键，但永远不会包含更多。我们可以通过_ListObjectsV2Reqeust_的_maxKeys()_方法来更改此设置。</strong></p><p>我们可以使用AWS SDK通过使用_ListObjectsV2Iterable_类和_listObjectsV2Paginator()_方法来为我们处理分页。这简化了代码，因为我们不需要手动管理分页过程。这导致代码更简洁、易读，更易于维护。</p><p>让我们看看如何将其付诸实践：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>void listAllObjectsInBucketPaginated(int pageSize) {
    S3Client s3Client = S3Client.builder()
      .region(AWS_REGION)
      .build();

    ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
      .bucket(AWS_BUCKET )
      .maxKeys(pageSize) // 设置maxKeys参数以控制页面大小
      .build();

    ListObjectsV2Iterable listObjectsV2Iterable = s3Client.listObjectsV2Paginator(listObjectsV2Request);
    long totalObjects = 0;

    for (ListObjectsV2Response page : listObjectsV2Iterable) {
        long retrievedPageSize = page.contents().stream()
          .peek(System.out::println)
          .reduce(0, (subtotal, element) -&gt; subtotal + 1, Integer::sum);
        totalObjects += retrievedPageSize;
        System.out.println(&quot;页面大小: &quot; + retrievedPageSize);
    }
    System.out.println(&quot;存储桶中的总对象数: &quot; + totalObjects);

    s3Client.close()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是我们在调用方法时，将_pageSize_设置为_500_时得到的输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>S3Object(Key=file_0.txt, LastModified=2023-06-06T11:35:06Z, ETag=&quot;b9ece18c950afbfa6b0fdbfa4ff731d3&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_1.txt, LastModified=2023-06-06T11:35:07Z, ETag=&quot;97a6dd4c45b23db9c5d603ce161b8cab&quot;, Size=1, StorageClass=STANDARD)
S3Object(Key=file_10.txt, LastModified=2023-06-06T11:35:07Z,</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,35),l=[a];function d(c,r){return i(),t("div",null,l)}const v=e(s,[["render",d],["__file","2024-07-04-Listing All AWS S3 Objects in a Bucket Using Java.html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Listing%20All%20AWS%20S3%20Objects%20in%20a%20Bucket%20Using%20Java.html","title":"在Java中使用AWS S3列出存储桶中的所有对象","lang":"zh-CN","frontmatter":{"date":"2023-06-01T00:00:00.000Z","category":["AWS","Java"],"tag":["S3","Java SDK"],"head":[["meta",{"name":"keywords","content":"AWS S3, Java, 列表, 对象, 桶, 分页"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Listing%20All%20AWS%20S3%20Objects%20in%20a%20Bucket%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中使用AWS S3列出存储桶中的所有对象"}],["meta",{"property":"og:description","content":"在Java中使用AWS S3列出存储桶中的所有对象 1. 概述 本文将重点介绍如何使用Java列出S3存储桶中的所有对象。我们将讨论使用AWS SDK for Java V2与S3交互的方法，并查看不同用例的示例。 我们将重点使用Java V2版本的AWS SDK，它以其比前一个版本有多项改进而著称，例如增强的性能、非阻塞I/O和用户友好的API设计。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/06/aws-s3-bucket-1-1024x879.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T04:56:36.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:tag","content":"Java SDK"}],["meta",{"property":"article:published_time","content":"2023-06-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T04:56:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中使用AWS S3列出存储桶中的所有对象\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/06/aws-s3-bucket-1-1024x879.png\\"],\\"datePublished\\":\\"2023-06-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T04:56:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中使用AWS S3列出存储桶中的所有对象 1. 概述 本文将重点介绍如何使用Java列出S3存储桶中的所有对象。我们将讨论使用AWS SDK for Java V2与S3交互的方法，并查看不同用例的示例。 我们将重点使用Java V2版本的AWS SDK，它以其比前一个版本有多项改进而著称，例如增强的性能、非阻塞I/O和用户友好的API设计。..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 先决条件","slug":"_2-先决条件","link":"#_2-先决条件","children":[]},{"level":2,"title":"3. 从S3存储桶中列出对象","slug":"_3-从s3存储桶中列出对象","link":"#_3-从s3存储桶中列出对象","children":[]}],"git":{"createdTime":1720068996000,"updatedTime":1720068996000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.43,"words":1328},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Listing All AWS S3 Objects in a Bucket Using Java.md","localizedDate":"2023年6月1日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>本文将重点介绍如何使用Java列出S3存储桶中的所有对象。我们将讨论使用AWS SDK for Java V2与S3交互的方法，并查看不同用例的示例。</p>\\n<p>我们将重点使用Java V2版本的AWS SDK，它以其比前一个版本有多项改进而著称，例如增强的性能、非阻塞I/O和用户友好的API设计。</p>\\n<h2>2. 先决条件</h2>\\n<p>要列出S3存储桶中的所有对象，我们可以利用AWS SDK for Java提供的_S3Client_类。</p>\\n<p>首先，让我们创建一个新的Java项目，并将以下Maven依赖项添加到我们的_pom.xml_文件中：</p>","autoDesc":true}');export{v as comp,b as data};
