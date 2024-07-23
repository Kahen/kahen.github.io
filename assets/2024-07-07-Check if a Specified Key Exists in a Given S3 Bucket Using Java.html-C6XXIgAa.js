import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-DMjdQFiE.js";const a={},s=i(`<hr><h1 id="如何使用java检查amazon-s3存储桶中指定的键是否存在" tabindex="-1"><a class="header-anchor" href="#如何使用java检查amazon-s3存储桶中指定的键是否存在"><span>如何使用Java检查Amazon S3存储桶中指定的键是否存在</span></a></h1><ol><li>引言</li></ol><p>在本教程中，我们将探讨<strong>如何使用Java检查Amazon S3存储桶中是否存在指定的键</strong>。</p><p>S3是一个流行的云存储服务，它提供了一个可扩展、安全且高度可用的平台，用于存储和检索数据。</p><p>对于开发者来说，知道一个特定的键是否存在是非常重要的，以便按需进行操作或访问。我们将通过设置AWS SDK并使用它来执行此检查的步骤。</p><ol start="2"><li>Maven依赖项</li></ol><p>在我们开始之前，我们需要在项目的_pom.xml_中声明AWS S3 SDK依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`software.amazon.awssdk\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`s3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`2.24.9\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建_AmazonS3_客户端实例</li></ol><p>一旦我们设置好了Java的AWS SDK，我们将创建一个_AmazonS3_客户端实例来与存储桶进行交互。</p><p>让我们指定AWS凭据和存储桶位置区域，并创建客户端：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
  .withRegion(Regions.US_EAST_1)
  .withCredentials(new AWSStaticCredentialsProvider(credentials))
  .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>使用_headObject()_检查键是否存在</li></ol><p>检查S3存储桶中是否存在特定键的<strong>最简单和最明显的方式是使用_headObject()_方法</strong>。</p><p>我们需要使用其构建器方法创建一个_HeadObjectRequest_实例，并将存储桶名称和对象键传递给它。然后我们可以将请求对象传递给_headObject()_方法。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try {
    HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
        .bucket(bucket)
        .key(key)
        .build();

    s3Client.headObject(headObjectRequest);

    System.out.println(&quot;对象存在&quot;);
    return true;
} catch (S3Exception e) {
    if (e.statusCode() == 404) {
        System.out.println(&quot;对象不存在&quot;);
        return false;
    } else {
        throw e;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此方法检查指定存储桶位置是否存在对象，并返回一个包含对象元数据的_HeadObjectResponse_对象。如果指定的键不存在，则该方法会抛出_NoSuchKeyException_。</p><ol start="5"><li>使用_listObjectsV2()_检查键是否存在</li></ol><p>另一种选择是使用_listObjectsV2()<em>方法。为此，我们需要创建一个_ListObjectsV2Request_对象，并将存储桶名称传递给它。接下来，我们调用_listObjectsV2_方法以获取_ListObjectsV2Response</em>。然后我们可以迭代响应的内容，检查所需的键是否存在：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public boolean doesObjectExistByListObjects(String bucketName, String key) {
    ListObjectsV2Request listObjectsV2Request = ListObjectsV2Request.builder()
        .bucket(bucketName)
        .build();
    ListObjectsV2Response listObjectsV2Response = s3Client.listObjectsV2(listObjectsV2Request);

    return listObjectsV2Response.contents()
        .stream()
        .filter(s3ObjectSummary -&gt; s3ObjectSummary.getValueForField(&quot;key&quot;, String.class)
            .equals(key))
        .findFirst()
        .isPresent();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种方法可能不如_headObject()_高效，但当那些选项不可用时，它可能会很有帮助。</p><p>此外，_listObjectsV2()_有<strong>额外的好处，允许我们同时列出多个对象</strong>。在特定场景下可能会很有帮助。</p><p>然而，<strong>这种方法可能更慢且效率更低</strong>，因为需要多次迭代。权衡利弊并选择最佳选项对于用例至关重要。</p><ol start="6"><li>结论</li></ol><p>在本文中，我们探讨了使用AWS SDK for Java检查S3存储桶中特定键是否存在的几种方法。</p><p>我们学习了如何设置_AmazonS3_客户端并使用_headObject()_方法来检查键的存在。我们还探讨了_listObjects()_方法作为替代方案。</p><p>每种方法都有其优缺点，使用哪一个将取决于用例的具体要求。</p><p>如常，本文的完整代码可在GitHub上找到。</p><p>OK</p>`,30),l=[s];function d(r,c){return n(),t("div",null,l)}const u=e(a,[["render",d],["__file","2024-07-07-Check if a Specified Key Exists in a Given S3 Bucket Using Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-07/2024-07-07-Check%20if%20a%20Specified%20Key%20Exists%20in%20a%20Given%20S3%20Bucket%20Using%20Java.html","title":"如何使用Java检查Amazon S3存储桶中指定的键是否存在","lang":"zh-CN","frontmatter":{"date":"2024-07-07T00:00:00.000Z","category":["Java","AWS"],"tag":["S3","Java SDK"],"head":[["meta",{"name":"keywords","content":"Amazon S3, Java, 云存储, 对象存在性检查"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-07/2024-07-07-Check%20if%20a%20Specified%20Key%20Exists%20in%20a%20Given%20S3%20Bucket%20Using%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用Java检查Amazon S3存储桶中指定的键是否存在"}],["meta",{"property":"og:description","content":"如何使用Java检查Amazon S3存储桶中指定的键是否存在 引言 在本教程中，我们将探讨如何使用Java检查Amazon S3存储桶中是否存在指定的键。 S3是一个流行的云存储服务，它提供了一个可扩展、安全且高度可用的平台，用于存储和检索数据。 对于开发者来说，知道一个特定的键是否存在是非常重要的，以便按需进行操作或访问。我们将通过设置AWS SD..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-07T06:44:54.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:tag","content":"Java SDK"}],["meta",{"property":"article:published_time","content":"2024-07-07T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-07T06:44:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用Java检查Amazon S3存储桶中指定的键是否存在\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-07T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-07T06:44:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用Java检查Amazon S3存储桶中指定的键是否存在 引言 在本教程中，我们将探讨如何使用Java检查Amazon S3存储桶中是否存在指定的键。 S3是一个流行的云存储服务，它提供了一个可扩展、安全且高度可用的平台，用于存储和检索数据。 对于开发者来说，知道一个特定的键是否存在是非常重要的，以便按需进行操作或访问。我们将通过设置AWS SD..."},"headers":[],"git":{"createdTime":1720334694000,"updatedTime":1720334694000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.75,"words":825},"filePathRelative":"posts/baeldung/2024-07-07/2024-07-07-Check if a Specified Key Exists in a Given S3 Bucket Using Java.md","localizedDate":"2024年7月7日","excerpt":"<hr>\\n<h1>如何使用Java检查Amazon S3存储桶中指定的键是否存在</h1>\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在本教程中，我们将探讨<strong>如何使用Java检查Amazon S3存储桶中是否存在指定的键</strong>。</p>\\n<p>S3是一个流行的云存储服务，它提供了一个可扩展、安全且高度可用的平台，用于存储和检索数据。</p>\\n<p>对于开发者来说，知道一个特定的键是否存在是非常重要的，以便按需进行操作或访问。我们将通过设置AWS SDK并使用它来执行此检查的步骤。</p>\\n<ol start=\\"2\\">\\n<li>Maven依赖项</li>\\n</ol>","autoDesc":true}');export{u as comp,m as data};
