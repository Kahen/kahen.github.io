import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,o as t,a as r}from"./app-C4eFoh0f.js";const n={},a=r(`<hr><h1 id="java中将字符串列表写入文本文件的几种方式" tabindex="-1"><a class="header-anchor" href="#java中将字符串列表写入文本文件的几种方式"><span>Java中将字符串列表写入文本文件的几种方式</span></a></h1><p>在这篇快速教程中，我们将探讨在Java中以不同的方式将字符串列表写入文本文件。首先，我们将讨论FileWriter，然后是BufferedWriter，最后是Files.writeString。java.io包中包含一个FileWriter类，我们可以使用它来将字符数据写入文件。如果我们查看层次结构，我们将看到FileWriter类扩展了OutputStreamWriter类，后者又扩展了Writer类。</p><p>让我们看看可用于初始化FileWriter的构造函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FileWriter f = new FileWriter(File file);
FileWriter f = new FileWriter(File file, boolean append);
FileWriter f = new FileWriter(FileDescriptor fd);
FileWriter f = new FileWriter(File file, Charset charset);
FileWriter f = new FileWriter(File file, Charset charset, boolean append);
FileWriter f = new FileWriter(String fileName);
FileWriter f = new FileWriter(String fileName, Boolean append);
FileWriter f = new FileWriter(String fileName, Charset charset);
FileWriter f = new FileWriter(String fileName, Charset charset, boolean append);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，FileWriter类的所有构造函数都假定默认字节缓冲区大小和默认字符编码是可以接受的。</p><p>现在，让我们学习如何使用FileWriter将字符串列表写入文本文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FileWriter fileWriter = new FileWriter(TEXT_FILENAME);
for (String str : stringList) {
    fileWriter.write(str + System.lineSeparator());
}
fileWriter.close();
return TEXT_FILENAME;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中需要注意的一个重要事项是，如果sampleTextFile.txt不存在，FileWriter将创建它。如果文件已存在，则根据构造函数的选择，我们可以覆盖它或追加它。</p><p>java.io包包含一个BufferedWriter类，它可以与其他Writer一起使用，以更好的性能写入字符数据。但是它如何更有效呢？</p><p>当我们使用BufferedWriter时，字符被写入缓冲区而不是磁盘。当缓冲区填满时，所有数据一次性写入磁盘，从而减少了磁盘的读写流量，因此，有助于提高性能。</p><p>如果我们谈论层次结构，BufferedWriter类扩展了Writer类。</p><p>让我们看看可用于初始化BufferedWriter的构造函数：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BufferedWriter b = new BufferedWriter(Writer w);
BufferedWriter b = new BufferedWriter(Writer w, int size);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们不指定缓冲区大小，则取默认值。</p><p>现在，让我们探索如何使用BufferedWriter将字符串列表写入文本文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BufferedWriter br = new BufferedWriter(new FileWriter(TEXT_FILENAME));
for (String str : stringList) {
    br.write(str + System.lineSeparator());
}
br.close();
return TEXT_FILENAME;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，我们将FileWriter与BufferedWriter包装在一起，这有助于减少读取调用，进而提高性能。</p><p>java.nio包包含Files类的writeString()方法，用于将字符写入文件。这个方法是在Java 11中引入的。</p><p>让我们看看java.nio.file.Files中可用的两个重载方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static Path writeString​(Path path, CharSequence csq, OpenOption… options) throws IOException
public static Path writeString​(Path path, CharSequence csq, Charset cs, OpenOption… options) throws IOException
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，在第一种方法中，我们不必指定Charset。默认情况下，它采用UTF-8 Charset，而在第二种方法中，我们可以指定Charset。最后，让我们学习如何使用Files.writeString将字符串列表写入文本文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Path filePath = Paths.get(TEXT_FILENAME);
Files.deleteIfExists(filePath);
Files.createFile(filePath);
for (String str : stringList) {
    Files.writeString(filePath, str + System.lineSeparator(),
    StandardOpenOption.APPEND);
}
return filePath.toString();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，如果文件已经存在，我们将删除该文件，然后使用Files.createFile方法创建一个文件。请注意，我们将OpenOption字段设置为StandardOperation.APPEND，这意味着文件将以追加模式打开。如果我们不指定OpenOption，那么我们可以期望发生两件事：</p><ul><li>如果文件已经存在，它将被覆盖</li><li>如果文件.writeString不存在，则会创建一个新文件并写入它</li></ul><p>对于JUnit测试，让我们定义一个字符串列表：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static final List\`&lt;String&gt;\` stringList = Arrays.asList(&quot;Hello&quot;, &quot;World&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里，我们将使用NIO Files.lines和count()找出输出文件的行数。计数应该等于列表中的字符串数量。</p><p>现在，让我们测试我们的FileWriter实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenUsingFileWriter_whenStringList_thenGetTextFile() throws IOException {
    String fileName = FileWriterExample.generateFileFromStringList(stringList);
    long count = Files.lines(Paths.get(fileName)).count();
    assertTrue(&quot;文件中的行数应该等于列表中的字符串数量&quot;, ((int) count) == stringList.size());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将测试BufferedWriter实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenUsingBufferedWriter_whenStringList_thenGetTextFile() throws IOException {
    String fileName = BufferedWriterExample.generateFileFromStringList(stringList);
    long count = Files.lines(Paths.get(fileName)).count();
    assertTrue(&quot;文件中的行数应该等于列表中的字符串数量&quot;, ((int) count) == stringList.size());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，让我们测试我们的Files.writeString实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void givenUsingFileWriteString_whenStringList_thenGetTextFile() throws IOException {
    String fileName = FileWriteStringExample.generateFileFromStringList(stringList);
    long count = Files.lines(Paths.get(fileName)).count();
    assertTrue(&quot;文件中的行数应该等于列表中的字符串数量&quot;, ((int) count) == stringList.size());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们探讨了将字符串列表写入文本文件的三种常见方式。此外，我们还通过编写JUnit测试来测试我们的实现。</p><p>如往常一样，教程的完整代码可在GitHub上找到。</p>`,37),l=[a];function s(d,c){return t(),i("div",null,l)}const u=e(n,[["render",s],["__file","2024-07-14-Writing a List of Strings Into a Text File.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Writing%20a%20List%20of%20Strings%20Into%20a%20Text%20File.html","title":"Java中将字符串列表写入文本文件的几种方式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","I/O"],"tag":["Java","List","File","FileWriter","BufferedWriter","Files.writeString"],"head":[["meta",{"name":"keywords","content":"Java, List, Strings, Text File, FileWriter, BufferedWriter, Files.writeString"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Writing%20a%20List%20of%20Strings%20Into%20a%20Text%20File.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中将字符串列表写入文本文件的几种方式"}],["meta",{"property":"og:description","content":"Java中将字符串列表写入文本文件的几种方式 在这篇快速教程中，我们将探讨在Java中以不同的方式将字符串列表写入文本文件。首先，我们将讨论FileWriter，然后是BufferedWriter，最后是Files.writeString。java.io包中包含一个FileWriter类，我们可以使用它来将字符数据写入文件。如果我们查看层次结构，我们将..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T03:05:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"List"}],["meta",{"property":"article:tag","content":"File"}],["meta",{"property":"article:tag","content":"FileWriter"}],["meta",{"property":"article:tag","content":"BufferedWriter"}],["meta",{"property":"article:tag","content":"Files.writeString"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T03:05:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中将字符串列表写入文本文件的几种方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T03:05:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中将字符串列表写入文本文件的几种方式 在这篇快速教程中，我们将探讨在Java中以不同的方式将字符串列表写入文本文件。首先，我们将讨论FileWriter，然后是BufferedWriter，最后是Files.writeString。java.io包中包含一个FileWriter类，我们可以使用它来将字符数据写入文件。如果我们查看层次结构，我们将..."},"headers":[{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720926322000,"updatedTime":1720926322000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.9,"words":1170},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Writing a List of Strings Into a Text File.md","localizedDate":"2022年4月1日","excerpt":"<hr>\\n<h1>Java中将字符串列表写入文本文件的几种方式</h1>\\n<p>在这篇快速教程中，我们将探讨在Java中以不同的方式将字符串列表写入文本文件。首先，我们将讨论FileWriter，然后是BufferedWriter，最后是Files.writeString。java.io包中包含一个FileWriter类，我们可以使用它来将字符数据写入文件。如果我们查看层次结构，我们将看到FileWriter类扩展了OutputStreamWriter类，后者又扩展了Writer类。</p>\\n<p>让我们看看可用于初始化FileWriter的构造函数：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>FileWriter f = new FileWriter(File file);\\nFileWriter f = new FileWriter(File file, boolean append);\\nFileWriter f = new FileWriter(FileDescriptor fd);\\nFileWriter f = new FileWriter(File file, Charset charset);\\nFileWriter f = new FileWriter(File file, Charset charset, boolean append);\\nFileWriter f = new FileWriter(String fileName);\\nFileWriter f = new FileWriter(String fileName, Boolean append);\\nFileWriter f = new FileWriter(String fileName, Charset charset);\\nFileWriter f = new FileWriter(String fileName, Charset charset, boolean append);\\n</code></pre></div>","autoDesc":true}');export{u as comp,v as data};
