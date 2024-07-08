import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-2zDpbLgD.js";const i={},s=n(`<h1 id="使用java从s3-url下载文件" tabindex="-1"><a class="header-anchor" href="#使用java从s3-url下载文件"><span>使用Java从S3 URL下载文件</span></a></h1><p>在当今的软件领域，与云存储服务如Amazon Simple Storage Service (S3)的交互已成为许多应用程序的基本方面。一个常见的需求是使用提供的URL从S3下载文件。</p><p>在本文中，我们将探讨使用Java、Spring Boot和Java的AWS SDK来实现这一目标的简化方法。</p><h2 id="_2-设置" tabindex="-1"><a class="header-anchor" href="#_2-设置"><span>2. 设置</span></a></h2><p>首先，我们需要配置我们的AWS凭据以访问S3存储桶。这可以通过几种方式完成。对于开发目的，我们可以在_application.properties_文件中设置我们的凭据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>aws.accessKeyId=\`&lt;你的访问密钥ID&gt;\`
aws.secretKey=\`&lt;你的密钥&gt;\`
aws.region=\`&lt;你的区域&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，让我们包含AWS S3 maven依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`&lt;dependency&gt;\`
    \`&lt;groupId&gt;\`software.amazon.awssdk\`&lt;/groupId&gt;\`
    \`&lt;artifactId&gt;\`s3\`&lt;/artifactId&gt;\`
    \`&lt;version&gt;\`\${amazon.s3.version}\`&lt;/version&gt;\`
\`&lt;/dependency&gt;\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-配置s3客户端" tabindex="-1"><a class="header-anchor" href="#_3-配置s3客户端"><span>3. 配置S3客户端</span></a></h2><p>**S3客户端通常指允许用户与Amazon S3交互的软件或库。**由于我们使用AWS Java SDK，我们将使用Java AWS SDK提供的API创建S3客户端：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>S3Client s3Client = S3Client.builder()
    .region(Region.US_EAST_1)
    .credentialsProvider(DefaultCredentialsProvider.create())
    .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**S3客户端在与Amazon S3交互时处理身份验证和授权。**它使用提供的凭据对S3服务的请求进行身份验证。在这种情况下，我们使用默认的凭据提供者配置客户端。这通常在环境变量或我们在先决条件设置中创建的共享凭据文件中查找凭据。</p><h2 id="_4-定义下载服务" tabindex="-1"><a class="header-anchor" href="#_4-定义下载服务"><span>4. 定义下载服务</span></a></h2><p>让我们定义一个与S3Client交互以进行下载的服务。</p><p>首先，让我们从定义服务的方法合同开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface FileService {
    FileDownloadResponse downloadFile(String s3url) throws IOException, S3Exception;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们按顺序经历下载步骤。</p><h3 id="_4-1-从url中提取键和存储桶" tabindex="-1"><a class="header-anchor" href="#_4-1-从url中提取键和存储桶"><span>4.1. 从URL中提取键和存储桶</span></a></h3><p>在这一步，让我们专注于从有效的S3 URL中提取基本信息，特别是存储桶名称和对象键。</p><p>假设我们在名为“<em>baeldung</em>”的S3存储桶中存储了一个文件，路径为“<em>path/to/my/s3article.txt</em>”。这代表了S3存储桶中的分层结构，其中对象“<em>s3article.txt</em>”嵌套在“<em>path</em>”、“<em>to</em>”和“<em>my</em>”目录中。</p><p>为了以编程方式提取这些信息，我们将使用Java的URI类将S3 URL解码为其组成部分。然后，我们将分离主机名（存储桶名称）和路径（对象键）：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>URI uri = new URI(s3Url);
String bucketName = uri.getHost();
String objectKey = uri.getPath()
    .substring(1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑到前面的例子，我们将有URI“<em>s3://baeldung/path/to/my/s3article.txt</em>”，我们将提取存储桶名称为“<em>baeldung</em>”。对象键，表示存储桶内的路径，将是“<em>path/to/my/s3article.txt</em>”。<strong>重要的是，通过使用_substring(1)_，我们将删除前导的“/”字符，得到的结果是对象键“path/to/my/s3article.txt”，这是S3对象键所需的格式。</strong></p><p>总之，在这里我们可以确定文件在S3存储桶内的位置，使我们能够构建请求并执行所需的对象操作。</p><h3 id="_4-2-构建-getobjectrequest" tabindex="-1"><a class="header-anchor" href="#_4-2-构建-getobjectrequest"><span>4.2. 构建_GetObjectRequest_</span></a></h3><p>现在，让我们使用AWS SDK构建一个_GetObjectRequest_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>GetObjectRequest getObjectRequest = GetObjectRequest.builder()
    .bucket(bucketName)
    .key(objectKey)
    .build();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>_GetObjectRequest_具有从S3检索对象所需的信息，例如存储桶名称和要检索的对象的键。它还允许开发人员指定其他参数，如版本ID、范围、响应头等，以自定义对象检索过程的行为。</p><h3 id="_4-3-发送-getobjectrequest" tabindex="-1"><a class="header-anchor" href="#_4-3-发送-getobjectrequest"><span>4.3. 发送_GetObjectRequest_</span></a></h3><p>有了准备好的_GetObjectRequest_，我们将使用配置好的_S3Client_将其发送到Amazon S3以检索对象数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ResponseInputStream\`&lt;GetObjectResponse&gt;\` responseInputStream = s3ResponseReader.readResponse(getObjectRequest);
GetObjectResponse getObjectResponse = responseInputStream.response();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-响应数据和元数据" tabindex="-1"><a class="header-anchor" href="#_4-4-响应数据和元数据"><span>4.4. 响应数据和元数据</span></a></h3><p>收到来自Amazon S3的响应后，我们将提取与相关元数据关联的文件内容。</p><p>让我们首先将文件内容提取为字节数组：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>byte[] fileContent = IOUtils.toByteArray(responseInputStream);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，让我们使用响检查一些有用的元数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>// 获取对象元数据
String contentType = getObjectResponse.contentType();
String contentDisposition =  getObjectResponse.contentDisposition();
String key = getObjectRequest.key();
String filename = extractFilenameFromKey(key);
String originalFilename = contentDisposition == null ? filename : contentDisposition.substring(contentDisposition.indexOf(&quot;=&quot;)+1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当向客户端发送响应时，将需要一些元数据。我们将创建一个抽象的_FileDownloadResponse_，它封装了文件内容作为字节，<em>contentType_和_originalFilename</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Builder
@Data
@RequiredArgsConstructor
public class FileDownloadResponse {
private final byte[] fileContent;
private final String originalFilename;
private final String contentType;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们希望执行集成测试，我们可以考虑使用Test Containers来模拟S3。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们快速了解了如何使用提供的URL从S3下载文件。我们使用了由S3客户端组成的AWS Java SDK，使用户能够安全地访问和下载S3资源。它通过提供方便且一致的API来简化S3存储桶和对象的管理，以执行各种S3资源操作。</p><p>如常，本文的完整实现可以在GitHub上找到。</p><p>评论在文章发布后30天内开放。对于此日期之后的任何问题，请使用网站上的联系表单。</p>`,44),l=[s];function r(d,c){return a(),t("div",null,l)}const u=e(i,[["render",r],["__file","Download File from S3 Given a URL.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/Archive/Download%20File%20from%20S3%20Given%20a%20URL.html","title":"使用Java从S3 URL下载文件","lang":"zh-CN","frontmatter":{"date":"2024-06-18T00:00:00.000Z","category":["Java","AWS"],"tag":["S3","SDK","文件下载"],"head":[["meta",{"name":"keywords","content":"Java, AWS S3, SDK, 文件下载"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Download%20File%20from%20S3%20Given%20a%20URL.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"使用Java从S3 URL下载文件"}],["meta",{"property":"og:description","content":"使用Java从S3 URL下载文件 在当今的软件领域，与云存储服务如Amazon Simple Storage Service (S3)的交互已成为许多应用程序的基本方面。一个常见的需求是使用提供的URL从S3下载文件。 在本文中，我们将探讨使用Java、Spring Boot和Java的AWS SDK来实现这一目标的简化方法。 2. 设置 首先，我们..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"S3"}],["meta",{"property":"article:tag","content":"SDK"}],["meta",{"property":"article:tag","content":"文件下载"}],["meta",{"property":"article:published_time","content":"2024-06-18T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用Java从S3 URL下载文件\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-18T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"使用Java从S3 URL下载文件 在当今的软件领域，与云存储服务如Amazon Simple Storage Service (S3)的交互已成为许多应用程序的基本方面。一个常见的需求是使用提供的URL从S3下载文件。 在本文中，我们将探讨使用Java、Spring Boot和Java的AWS SDK来实现这一目标的简化方法。 2. 设置 首先，我们..."},"headers":[{"level":2,"title":"2. 设置","slug":"_2-设置","link":"#_2-设置","children":[]},{"level":2,"title":"3. 配置S3客户端","slug":"_3-配置s3客户端","link":"#_3-配置s3客户端","children":[]},{"level":2,"title":"4. 定义下载服务","slug":"_4-定义下载服务","link":"#_4-定义下载服务","children":[{"level":3,"title":"4.1. 从URL中提取键和存储桶","slug":"_4-1-从url中提取键和存储桶","link":"#_4-1-从url中提取键和存储桶","children":[]},{"level":3,"title":"4.2. 构建_GetObjectRequest_","slug":"_4-2-构建-getobjectrequest","link":"#_4-2-构建-getobjectrequest","children":[]},{"level":3,"title":"4.3. 发送_GetObjectRequest_","slug":"_4-3-发送-getobjectrequest","link":"#_4-3-发送-getobjectrequest","children":[]},{"level":3,"title":"4.4. 响应数据和元数据","slug":"_4-4-响应数据和元数据","link":"#_4-4-响应数据和元数据","children":[]}]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":4.07,"words":1222},"filePathRelative":"posts/baeldung/Archive/Download File from S3 Given a URL.md","localizedDate":"2024年6月18日","excerpt":"\\n<p>在当今的软件领域，与云存储服务如Amazon Simple Storage Service (S3)的交互已成为许多应用程序的基本方面。一个常见的需求是使用提供的URL从S3下载文件。</p>\\n<p>在本文中，我们将探讨使用Java、Spring Boot和Java的AWS SDK来实现这一目标的简化方法。</p>\\n<h2>2. 设置</h2>\\n<p>首先，我们需要配置我们的AWS凭据以访问S3存储桶。这可以通过几种方式完成。对于开发目的，我们可以在_application.properties_文件中设置我们的凭据：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>aws.accessKeyId=`&lt;你的访问密钥ID&gt;`\\naws.secretKey=`&lt;你的密钥&gt;`\\naws.region=`&lt;你的区域&gt;`\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
