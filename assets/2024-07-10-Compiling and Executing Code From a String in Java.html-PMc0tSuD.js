import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as i}from"./app-c243dxVF.js";const s={},l=i(`<h1 id="在java中从字符串编译和执行代码" tabindex="-1"><a class="header-anchor" href="#在java中从字符串编译和执行代码"><span>在Java中从字符串编译和执行代码</span></a></h1><p>在本教程中，我们将学习如何将包含Java源代码的_String_转换为编译后的类并执行它。在运行时编译代码有许多潜在的应用场景：</p><ul><li>生成代码 - 来自运行时不可用或经常变化的信息的动态代码</li><li>热交换 - 不用重启应用程序即可替换代码</li><li>代码存储/注入 - 将应用程序逻辑存储在数据库中，以便临时检索和执行。如果小心操作，可以在不使用时卸载自定义类。</li></ul><p>尽管有几种编译类的方法，但今天我们将重点关注JavaCompiler API。</p><p>_javax.tools_包包含了我们将需要编译_String_的大部分抽象。让我们来看一看其中的一些，以及我们将遵循的一般流程：</p><ol><li>首先，我们将代码传递给JavaCompiler API。</li><li>接下来，_FileManager_为_JavaCompiler_提取源代码。</li><li>然后，_JavaCompiler_编译它并返回字节码。</li><li>最后，自定义_ClassLoader_将类加载到内存中。</li></ol><p>我们如何在_String_格式中生成源代码并不是本教程的重点。今天，我们将使用一个简单的硬编码字面值：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>final static String sourceCode =
  &quot;package com.baeldung.inmemorycompilation;\\n&quot;
    + &quot;public class TestClass {\\n&quot;
    + &quot;@Override\\n&quot;
    + &quot;    public void runCode() {\\n&quot;
    + &quot;        System.out.println(\\&quot;code is running...\\&quot;);\\n&quot;
    + &quot;    }\\n&quot;
    + &quot;}\\n&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-表示我们的代码-源代码和编译后的代码" tabindex="-1"><a class="header-anchor" href="#_3-表示我们的代码-源代码和编译后的代码"><span>3. 表示我们的代码（源代码和编译后的代码）</span></a></h2><p>我们清单上的第一项是将我们的代码以_FileManager_熟悉的格式表示出来。</p><p>Java源文件和类文件的顶层抽象是_FileObject_。虽然没有提供完全实现以满足我们的需求，但我们可以利用部分实现_SimpleJavaFileObject_并仅覆盖我们关心的方法。</p><h3 id="_3-1-源代码" tabindex="-1"><a class="header-anchor" href="#_3-1-源代码"><span>3.1. 源代码</span></a></h3><p>对于我们的源代码，<strong>我们必须定义_FileManager_应该如何读取它</strong>。这意味着覆盖_getCharContent()<em>。此方法期望一个_CharSequence</em>。由于我们的代码已经包含在一个_String_中，我们可以简单地原样返回它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class JavaSourceFromString extends SimpleJavaFileObject {

    private String sourceCode;

    public JavaSourceFromString(String name, String sourceCode) {
        super(URI.create(&quot;string:///&quot; + name.replace(&#39;.&#39;, &#39;/&#39;) + Kind.SOURCE.extension),
            Kind.SOURCE);
        this.sourceCode = requireNonNull(sourceCode, &quot;sourceCode must not be null&quot;);
    }

    @Override
    public CharSequence getCharContent(boolean ignoreEncodingErrors) {
        return sourceCode;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-编译后的代码" tabindex="-1"><a class="header-anchor" href="#_3-2-编译后的代码"><span>3.2. 编译后的代码</span></a></h3><p>对于我们的编译后的代码，我们做完全相反的事情。<strong>我们需要定义_FileManager_应该如何写入我们的对象</strong>。这就意味着覆盖_openOutputStream()_并提供_OutputStream_的实现。</p><p>我们将使用_ByteArrayOutputStream_存储我们的代码，并在类加载期间创建一个方便的方法来提取字节：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class JavaClassAsBytes extends SimpleJavaFileObject {

    protected ByteArrayOutputStream bos =
        new ByteArrayOutputStream();

    public JavaClassAsBytes(String name, Kind kind) {
        super(URI.create(&quot;string:///&quot; + name.replace(&#39;.&#39;, &#39;/&#39;) + kind.extension), kind);
    }

    public byte[] getBytes() {
        return bos.toByteArray();
    }

    @Override
    public OutputStream openOutputStream() {
        return bos;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-顶级接口" tabindex="-1"><a class="header-anchor" href="#_3-3-顶级接口"><span>3.3. 顶级接口</span></a></h3><p>虽然这并不绝对必要，但在处理内存编译时，为我们的编译类创建一个顶级接口可能会很有帮助。这个额外步骤有两个主要好处：</p><ol><li>我们知道从_ClassLoader_期望什么类型的对象，因此我们可以更安全/容易地进行类型转换。</li><li>我们可以在类加载器之间保持对象的相等性。<strong>如果由不同的类加载器加载的类创建的相同对象可能会有相等性问题</strong>。由相同的_ClassLoader_加载的共享接口可以弥合这个差距。</li></ol><p>许多预定义的功能接口适用于这种编码模式，例如_Function_、<em>Runnable_和_Callable</em>。然而，对于本指南，我们将创建我们自己的：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface InMemoryClass {
    void runCode();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们只需要回去稍调整我们的源代码，以实现我们的新接口：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static String sourceCode =
  &quot;package com.baeldung.inmemorycompilation;\\n&quot;
    + &quot;public class TestClass implements InMemoryClass {\\n&quot;
    + &quot;@Override\\n&quot;
    + &quot;    public void runCode() {\\n&quot;
    + &quot;        System.out.println(\\&quot;code is running...\\&quot;);\\n&quot;
    + &quot;    }\\n&quot;
    + &quot;}\\n&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-管理我们的内存代码" tabindex="-1"><a class="header-anchor" href="#_4-管理我们的内存代码"><span>4. 管理我们的内存代码</span></a></h2><p>现在我们已经将代码以适合JavaCompiler API的格式准备好了，我们需要一个_FileManager_来操作它。标准_FileManager_对我们的目的来说不够用，就像JavaCompiler API中的大多数其他抽象一样，没有默认实现供我们使用。</p><p>幸运的是，<em>tools_包确实包含了_ForwardingJavaFileManager</em>，它只是简单地将所有方法调用转发到底层的_FileManager_。<strong>我们可以利用这种行为通过扩展_ForwardingJavaFileManager_并覆盖我们想要自己处理的行为</strong>，类似于我们对_SimpleJavaFileObject_所做的。</p><p>首先，我们需要覆盖_getJavaFileForOutput()<em>。这个方法将由_JavaCompiler_调用我们的_FileManager_以获取编译字节码的_JavaFileObject</em>。我们需要提供一个新的自定义类实例，<em>JavaClassAsBytes</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class InMemoryFileManager extends ForwardingJavaFileManager\`\`&lt;JavaFileManager&gt;\`\` {

    // 标准构造函数

    @Override
    public JavaFileObject getJavaFileForOutput(Location location, String className, Kind kind,
      FileObject sibling) {
        return new JavaClassAsBytes(className, kind);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们还需要一个地方来存储编译后的类，以便以后可以通过我们的自定义_ClassLoader_检索。我们将类插入到一个_Map_中，并提供一个方便的方法来访问它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class InMemoryFileManager extends ForwardingJavaFileManager\`\`&lt;JavaFileManager&gt;\`\` {

    private Map\`\`\`&lt;String, JavaClassAsBytes&gt;\`\`\` compiledClasses;

    public InMemoryFileManager(StandardJavaFileManager standardManager) {
        super(standardManager);
        this.compiledClasses = new Hashtable&lt;&gt;();
    }

    @Override
    public JavaFileObject getJavaFileForOutput(Location location,
        String className, Kind kind, FileObject sibling) {

        JavaClassAsBytes classAsBytes = new JavaClassAsBytes(className, kind);
        compiledClasses.put(className, classAsBytes);

        return classAsBytes;
    }

    public Map\`\`\`&lt;String, JavaClassAsBytes&gt;\`\`\` getBytesMap() {
        return compiledClasses;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-加载我们的内存代码" tabindex="-1"><a class="header-anchor" href="#_5-加载我们的内存代码"><span>5. 加载我们的内存代码</span></a></h2><p>最后一步是创建一些东西来加载我们的类，一旦它们被编译。我们将为我们的_InMemoryFileManager_构建一个配套的_ClassLoader_。</p><p>类加载本身是一个相当深入的话题，它超出了本文的范围。简而言之，我们将把我们的自定义_ClassLoader_挂接到现有的委托层次结构的底部，并使用它直接从我们的_FileManager_加载类：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2023/01/inmemoryclassloaderdiagram2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>首先，我们需要创建一个扩展_ClassLoader_的自定义类。我们将稍微修改构造函数，以接受我们的_InMemoryFileManager_作为一个参数。这将允许我们的_ClassLoader_稍后在管理器内进行查找：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class InMemoryClassLoader extends ClassLoader {

    private InMemoryFileManager manager;

    public InMemoryClassLoader(ClassLoader parent, InMemoryFileManager manager) {
        super(parent);
        this.manager = requireNonNull(manager, &quot;manager must not be null&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要重写_ClassLoader_的_findClass()_方法来定义在哪里查找我们的编译类。幸运的是，这仅仅是检查我们_InMemoryFileManager_中存储的映射：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
protected Class\`\`&lt;?&gt;\`\` findClass(String name) throws ClassNotFoundException {

    Map\`\`\`&lt;String, JavaClassAsBytes&gt;\`\`\` compiledClasses = manager.getBytesMap();

    if (compiledClasses.containsKey(name)) {
        byte[] bytes = compiledClasses.get(name).getBytes();
        return defineClass(name, bytes, 0, bytes.length);
    } else {
        throw new ClassNotFoundException();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，如果类无法定位，我们将抛出一个_ClassNotFoundException_。由于我们在层次结构的底部，如果到现在还没有找到，它就不会在任何地方被找到。</p><p>现在我们已经完成了_InMemoryClassLoader_，我们需要回到_InMemoryFileManager_并进行一些小的修改，以完成它们的双向关系。首先，我们将创建一个_ClassLoader_成员变量，并修改构造函数以接受我们的新_InMemoryClassLoader_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private ClassLoader loader;

public InMemoryFileManager(StandardJavaFileManager standardManager) {
    super(standardManager);
    this.compiledClasses = new Hashtable&lt;&gt;();
    this.loader = new InMemoryClassLoader(this.getClass().getClassLoader(), this);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要重写_getClassLoader()_以返回我们的新_InMemoryClassLoader_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Override
public ClassLoader getClassLoader(Location location) {
    return loader继续翻译：

\`\`\`java
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>现在，我们可以一起重用相同的_FileManager_和_ClassLoader_，如果我们愿意的话，可以进行多次内存编译。</strong></p><h2 id="_6-把一切整合起来" tabindex="-1"><a class="header-anchor" href="#_6-把一切整合起来"><span>6. 把一切整合起来</span></a></h2><p>剩下的事情就是把我们所有的不同部分整合起来。让我们看看我们如何用一个简单的单元测试来做这件事：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void whenStringIsCompiled_ThenCodeShouldExecute() throws ClassNotFoundException, InstantiationException, IllegalAccessException {
    JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
    DiagnosticCollector\`\`&lt;JavaFileObject&gt;\`\` diagnostics = new DiagnosticCollector&lt;&gt;();
    InMemoryFileManager manager = new InMemoryFileManager(compiler.getStandardFileManager(null, null, null));

    List\`\`&lt;JavaFileObject&gt;\`\` sourceFiles = Collections.singletonList(new JavaSourceFromString(qualifiedClassName, sourceCode));

    JavaCompiler.CompilationTask task = compiler.getTask(null, manager, diagnostics, null, null, sourceFiles);

    boolean result = task.call();

    if (!result) {
        diagnostics.getDiagnostics()
          .forEach(d -&gt; LOGGER.error(String.valueOf(d)));
    } else {
        ClassLoader classLoader = manager.getClassLoader(null);
        Class\`\`&lt;?&gt;\`\` clazz = classLoader.loadClass(qualifiedClassName);
        InMemoryClass instanceOfClass = (InMemoryClass) clazz.newInstance();

        Assertions.assertInstanceOf(InMemoryClass.class, instanceOfClass);

        instanceOfClass.runCode();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们执行测试时，我们观察到控制台输出：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>code is running...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以看到，来自我们的_String_源代码的方法已经被成功执行了！</strong></p><h2 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h2><p>在本文中，我们学习了如何将包含Java源代码的_String_转换为编译后的类，然后执行它。</p><p>作为一般警告，我们应该注意到，在使用类加载器时要格外小心。_类_和_类加载器_之间的双向关系使得自定义类加载容易受到内存泄漏的影响。当使用第三方库时尤其如此，这些库可能在幕后保留类引用。</p><p>如往常一样，教程的源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/d25c1bcb4e52861e821e6c58068df91f?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"></p><p>OK</p>`,58),t=[l];function d(r,c){return a(),n("div",null,t)}const u=e(s,[["render",d],["__file","2024-07-10-Compiling and Executing Code From a String in Java.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-10/2024-07-10-Compiling%20and%20Executing%20Code%20From%20a%20String%20in%20Java.html","title":"在Java中从字符串编译和执行代码","lang":"zh-CN","frontmatter":{"date":"2023-01-01T00:00:00.000Z","category":["Java","编程"],"tag":["JavaCompiler API","动态编译"],"head":[["meta",{"name":"keywords","content":"Java, 动态编译, JavaCompiler API"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-10/2024-07-10-Compiling%20and%20Executing%20Code%20From%20a%20String%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中从字符串编译和执行代码"}],["meta",{"property":"og:description","content":"在Java中从字符串编译和执行代码 在本教程中，我们将学习如何将包含Java源代码的_String_转换为编译后的类并执行它。在运行时编译代码有许多潜在的应用场景： 生成代码 - 来自运行时不可用或经常变化的信息的动态代码 热交换 - 不用重启应用程序即可替换代码 代码存储/注入 - 将应用程序逻辑存储在数据库中，以便临时检索和执行。如果小心操作，可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2023/01/inmemoryclassloaderdiagram2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-10T12:59:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JavaCompiler API"}],["meta",{"property":"article:tag","content":"动态编译"}],["meta",{"property":"article:published_time","content":"2023-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-10T12:59:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中从字符串编译和执行代码\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2023/01/inmemoryclassloaderdiagram2.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/d25c1bcb4e52861e821e6c58068df91f?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\"],\\"datePublished\\":\\"2023-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-10T12:59:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在Java中从字符串编译和执行代码 在本教程中，我们将学习如何将包含Java源代码的_String_转换为编译后的类并执行它。在运行时编译代码有许多潜在的应用场景： 生成代码 - 来自运行时不可用或经常变化的信息的动态代码 热交换 - 不用重启应用程序即可替换代码 代码存储/注入 - 将应用程序逻辑存储在数据库中，以便临时检索和执行。如果小心操作，可以..."},"headers":[{"level":2,"title":"3. 表示我们的代码（源代码和编译后的代码）","slug":"_3-表示我们的代码-源代码和编译后的代码","link":"#_3-表示我们的代码-源代码和编译后的代码","children":[{"level":3,"title":"3.1. 源代码","slug":"_3-1-源代码","link":"#_3-1-源代码","children":[]},{"level":3,"title":"3.2. 编译后的代码","slug":"_3-2-编译后的代码","link":"#_3-2-编译后的代码","children":[]},{"level":3,"title":"3.3. 顶级接口","slug":"_3-3-顶级接口","link":"#_3-3-顶级接口","children":[]}]},{"level":2,"title":"4. 管理我们的内存代码","slug":"_4-管理我们的内存代码","link":"#_4-管理我们的内存代码","children":[]},{"level":2,"title":"5. 加载我们的内存代码","slug":"_5-加载我们的内存代码","link":"#_5-加载我们的内存代码","children":[]},{"level":2,"title":"6. 把一切整合起来","slug":"_6-把一切整合起来","link":"#_6-把一切整合起来","children":[]},{"level":2,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720616370000,"updatedTime":1720616370000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.14,"words":2141},"filePathRelative":"posts/baeldung/2024-07-10/2024-07-10-Compiling and Executing Code From a String in Java.md","localizedDate":"2023年1月1日","excerpt":"\\n<p>在本教程中，我们将学习如何将包含Java源代码的_String_转换为编译后的类并执行它。在运行时编译代码有许多潜在的应用场景：</p>\\n<ul>\\n<li>生成代码 - 来自运行时不可用或经常变化的信息的动态代码</li>\\n<li>热交换 - 不用重启应用程序即可替换代码</li>\\n<li>代码存储/注入 - 将应用程序逻辑存储在数据库中，以便临时检索和执行。如果小心操作，可以在不使用时卸载自定义类。</li>\\n</ul>\\n<p>尽管有几种编译类的方法，但今天我们将重点关注JavaCompiler API。</p>\\n<p>_javax.tools_包包含了我们将需要编译_String_的大部分抽象。让我们来看一看其中的一些，以及我们将遵循的一般流程：</p>","autoDesc":true}');export{u as comp,m as data};
