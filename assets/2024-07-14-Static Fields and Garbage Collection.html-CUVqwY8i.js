import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,a as i}from"./app-BgN5o-no.js";const l={},s=i(`<hr><h1 id="java中的静态字段和垃圾回收" tabindex="-1"><a class="header-anchor" href="#java中的静态字段和垃圾回收"><span>Java中的静态字段和垃圾回收</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>在本教程中，我们将学习垃圾回收器如何处理静态字段。同时，我们还将涉及类加载和类对象等主题。阅读本文后，我们将更好地理解类、类加载器和静态字段之间的联系，以及垃圾回收器如何处理它们。</p><h2 id="_2-java中垃圾回收概述" tabindex="-1"><a class="header-anchor" href="#_2-java中垃圾回收概述"><span>2. Java中垃圾回收概述</span></a></h2><p>Java提供了一个相当不错的自动内存管理特性。在大多数情况下，这种方法不如手动管理高效。然而，它有助于避免难以调试的问题，并减少了样板代码。随着垃圾回收的改进，这个过程变得越来越好。因此，我们应该回顾一下垃圾回收器的工作原理以及我们应用程序中的垃圾是什么。</p><h3 id="_2-1-垃圾对象" tabindex="-1"><a class="header-anchor" href="#_2-1-垃圾对象"><span>2.1. 垃圾对象</span></a></h3><p>引用计数是识别垃圾对象最直接和直观的方法。这种方法允许我们检查当前对象是否有任何引用。然而，这种方法有一些缺点，其中最显著的是循环引用问题。</p><p>解决循环引用的一种方法是跟踪。当对象没有任何链接到应用程序垃圾回收根时，它们就变成了垃圾。</p><h3 id="_2-2-静态字段和类对象" tabindex="-1"><a class="header-anchor" href="#_2-2-静态字段和类对象"><span>2.2. 静态字段和类对象</span></a></h3><p>在Java中，一切都是对象，包括类的定义。它们包含有关类的所有元信息、方法和静态字段的值。因此，所有的静态字段都由相应的类对象引用。因此，只要类对象存在并由应用程序引用，静态字段就不会被垃圾回收。</p><p>同时，所有加载的类都有对用于加载该特定类的类加载器的引用。这样，我们可以跟踪加载的类。</p><p>在这种情况下，我们有一个引用层次结构。类加载器保留了对所有已加载类的引用。同时，类存储对相应类加载器的引用。在这种情况下，我们有双向引用。每当我们实例化一个新对象时，它将持有对其类定义的引用。因此，我们有以下层次结构：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/09/classloader_diagram-300x263.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>我们不能在应用程序有对它的引用之前卸载一个类。让我们检查一下我们需要做什么才能使类定义符合垃圾回收的条件。首先，应用程序中不应该有对类的实例的引用。这很重要，因为所有实例都持有对其类的引用。其次，这个类的类加载器应该在应用程序中不可用。最后，类本身在应用程序中也不应该有引用。</p><h2 id="_3-垃圾回收静态字段的示例" tabindex="-1"><a class="header-anchor" href="#_3-垃圾回收静态字段的示例"><span>3. 垃圾回收静态字段的示例</span></a></h2><p>让我们创建一个示例，其中我们让垃圾回收器移除我们的静态字段。JVM支持由扩展和系统类加载器加载的类的类卸载。然而，这很难复制，我们将使用自定义类加载器，因为我们将拥有更多的控制权。</p><h3 id="_3-1-自定义类加载器" tabindex="-1"><a class="header-anchor" href="#_3-1-自定义类加载器"><span>3.1. 自定义类加载器</span></a></h3><p>首先，让我们创建我们自己的CustomClassloader，它将从我们应用程序的资源文件夹加载一个类。为了使我们的类加载器工作，我们应该重写_loadClass(String name)_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class CustomClassloader extends ClassLoader {
    public static final String PREFIX = &quot;com.baeldung.classloader&quot;;

    public CustomClassloader(ClassLoader parent) {
        super(parent);
    }

    @Override
    public Class\`\`\`\`\`&lt;?&gt;\`\`\`\`\` loadClass(String name) throws ClassNotFoundException {
        if (name.startsWith(PREFIX)) {
            return getClass(name);
        } else {
            return super.loadClass(name);
        }
    }

    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个实现中，我们使用了_getClass_方法，它隐藏了从资源加载类的复杂性：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private Class\`\`\`\`\`&lt;?&gt;\`\`\`\`\` getClass(String name) {
    String fileName = name.replace(&#39;.&#39;, File.separatorChar) + &quot;.class&quot;;
    try {
        byte[] byteArr = IOUtils.toByteArray(getClass().getClassLoader().getResourceAsStream(fileName));
        Class\`\`\`\`\`&lt;?&gt;\`\`\`\`\` c = defineClass(name, byteArr, 0, byteArr.length);
        resolveClass(c);
        return c;
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-文件夹结构" tabindex="-1"><a class="header-anchor" href="#_3-2-文件夹结构"><span>3.2. 文件夹结构</span></a></h3><p>为了正确工作，我们的自定义类应该在我们的类路径范围之外。这样，它就不会被系统类加载器上传。唯一与这个特定类一起工作的类加载器将是我们_CustomClassloader_。</p><p>我们的文件夹结构将是这样的：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/09/Screen-Shot-2022-09-05-at-10.46.21-300x250.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="_3-3-静态字段持有者" tabindex="-1"><a class="header-anchor" href="#_3-3-静态字段持有者"><span>3.3. 静态字段持有者</span></a></h3><p>我们将使用一个自定义类，它将扮演我们的静态字段的持有者的角色。在定义了类加载器的实现之后，我们可以使用它来上传我们准备好的类。这是一个简单的类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class GarbageCollectedStaticFieldHolder {
    private static GarbageCollectedInnerObject garbageCollectedInnerObject =
      new GarbageCollectedInnerObject(&quot;Hello from a garbage collected static field&quot;);

    public void printValue() {
        System.out.println(garbageCollectedInnerObject.getMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-静态字段类" tabindex="-1"><a class="header-anchor" href="#_3-4-静态字段类"><span>3.4. 静态字段类</span></a></h3><p>_GarbageCollectedInnerObject_将代表我们想要变成垃圾的对象。出于简单和方便的考虑，这个类在与_GarbageCollectedStaticFieldHolder_相同的文件中定义。这个类包含一个消息，并且还覆盖了_finalize()_方法。尽管_finalize()_方法已被弃用并且有很多缺点，但它将使我们能够可视化垃圾回收器何时移除对象。我们仅出于演示目的使用此方法。这是我们的静态字段类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>class GarbageCollectedInnerObject {
    private final String message;

    public GarbageCollectedInnerObject(final String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    protected void finalize() {
        System.out.println(&quot;The object is garbage now&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-上传类" tabindex="-1"><a class="header-anchor" href="#_3-5-上传类"><span>3.5. 上传类</span></a></h3><p>现在我们可以上传并实例化我们的类。创建实例后，我们可以确保类已上传，对象已创建，静态字段包含所需的信息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private static void loadClass() {
    try {
        final String className = &quot;com.baeldung.classloader.GarbageCollectedStaticFieldHolder&quot;;
        CustomClassloader loader = new CustomClassloader(Main.class.getClassLoader());
        Class\`\`\`\`\`&lt;?&gt;\`\`\`\`\` clazz = loader.loadClass(className);
        Object instance = clazz.getConstructor().newInstance();
        clazz.getMethod(METHOD_NAME).invoke(instance);
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法应该创建我们特殊类的实例并输出消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Hello from a garbage collected static field
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-6-垃圾回收在行动" tabindex="-1"><a class="header-anchor" href="#_3-6-垃圾回收在行动"><span>3.6. 垃圾回收在行动</span></a></h3><p>现在让我们启动应用程序并尝试移除垃圾：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void main(String[] args) throws InterruptedException {
    loadClass();
    System.gc();
    Thread.sleep(1000);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用_loadClass()<em>方法后，此方法内的所有变量，即类加载器、我们的类和实例，将超出作用域并与垃圾回收根断开连接。也可以将引用赋值为_null</em>，但使用作用域的选项更干净：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void main(String[] args) throws InterruptedException {
    CustomClassloader loader;
    Class\`\`\`\`\`&lt;?&gt;\`\`\`\`\` clazz;
    Object instance;
    try {
        final String className = &quot;com.baeldung.classloader.GarbageCollectedStaticFieldHolder&quot;;
        loader = new CustomClassloader(GarbageCollectionNullExample.class.getClassLoader());
        clazz = loader.loadClass(className);
        instance = clazz.getConstructor().newInstance();
        clazz.getMethod(METHOD_NAME).invoke(instance);
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
    loader = null;
    clazz = null;
    instance = null;
    System.gc();
    Thread.sleep(1000);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管这段代码有一些问题，但在大多数情况下它都会工作。主要问题是我们不能在Java中强制垃圾回收，调用_System.gc()_并不能保证垃圾回收会发生。然而，在大多数JVM实现中，这将触发主要垃圾回收。因此，我们应该在输出中看到以下行：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Hello from a garbage collected static field
The object is garbage now
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个输出向我们展示了垃圾回收器移除了静态字段。垃圾回收器还移除了类加载器、持有者的类、静态字段和连接的对象。</p><h3 id="_3-7-没有-system-gc-的示例" tabindex="-1"><a class="header-anchor" href="#_3-7-没有-system-gc-的示例"><span>3.7. 没有_System.gc()_的示例</span></a></h3><p>我们也可以更自然地触发垃圾回收。这种方法将更稳定。然而，它将需要更多的循环来调用垃圾回收器：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public static void main(String[] args) {
    while (true) {
        loadClass();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们使用相同的_loadClass()<em>方法，但我们没有调用_System.gc()</em>，垃圾回收器在我们因为在一个无限循环中加载类而耗尽内存时被触发。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>本文教我们了Java中关于类和静态字段的垃圾回收是如何工作的。我们创建了一个自定义类加载器并用它作为我们的示例。此外，我们还学习了类加载器、类和它们的静态字段之间的联系。为了进一步理解，值得阅读文本中链接的文章。</p><p>代码可在GitHub</p>`,52),t=[s];function d(r,c){return n(),a("div",null,t)}const u=e(l,[["render",d],["__file","2024-07-14-Static Fields and Garbage Collection.html.vue"]]),m=JSON.parse('{"path":"/posts/baeldung/2024-07-14/2024-07-14-Static%20Fields%20and%20Garbage%20Collection.html","title":"Java中的静态字段和垃圾回收","lang":"zh-CN","frontmatter":{"date":"2022-09-05T00:00:00.000Z","category":["Java","Garbage Collection"],"tag":["Java","Static Fields","Garbage Collection"],"head":[["meta",{"name":"keywords","content":"Java, Static Fields, Garbage Collection, Class Loaders"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-14/2024-07-14-Static%20Fields%20and%20Garbage%20Collection.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中的静态字段和垃圾回收"}],["meta",{"property":"og:description","content":"Java中的静态字段和垃圾回收 1. 引言 在本教程中，我们将学习垃圾回收器如何处理静态字段。同时，我们还将涉及类加载和类对象等主题。阅读本文后，我们将更好地理解类、类加载器和静态字段之间的联系，以及垃圾回收器如何处理它们。 2. Java中垃圾回收概述 Java提供了一个相当不错的自动内存管理特性。在大多数情况下，这种方法不如手动管理高效。然而，它有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/09/classloader_diagram-300x263.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-14T20:06:41.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Static Fields"}],["meta",{"property":"article:tag","content":"Garbage Collection"}],["meta",{"property":"article:published_time","content":"2022-09-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-14T20:06:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中的静态字段和垃圾回收\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/09/classloader_diagram-300x263.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/09/Screen-Shot-2022-09-05-at-10.46.21-300x250.png\\"],\\"datePublished\\":\\"2022-09-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-14T20:06:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中的静态字段和垃圾回收 1. 引言 在本教程中，我们将学习垃圾回收器如何处理静态字段。同时，我们还将涉及类加载和类对象等主题。阅读本文后，我们将更好地理解类、类加载器和静态字段之间的联系，以及垃圾回收器如何处理它们。 2. Java中垃圾回收概述 Java提供了一个相当不错的自动内存管理特性。在大多数情况下，这种方法不如手动管理高效。然而，它有..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2. Java中垃圾回收概述","slug":"_2-java中垃圾回收概述","link":"#_2-java中垃圾回收概述","children":[{"level":3,"title":"2.1. 垃圾对象","slug":"_2-1-垃圾对象","link":"#_2-1-垃圾对象","children":[]},{"level":3,"title":"2.2. 静态字段和类对象","slug":"_2-2-静态字段和类对象","link":"#_2-2-静态字段和类对象","children":[]}]},{"level":2,"title":"3. 垃圾回收静态字段的示例","slug":"_3-垃圾回收静态字段的示例","link":"#_3-垃圾回收静态字段的示例","children":[{"level":3,"title":"3.1. 自定义类加载器","slug":"_3-1-自定义类加载器","link":"#_3-1-自定义类加载器","children":[]},{"level":3,"title":"3.2. 文件夹结构","slug":"_3-2-文件夹结构","link":"#_3-2-文件夹结构","children":[]},{"level":3,"title":"3.3. 静态字段持有者","slug":"_3-3-静态字段持有者","link":"#_3-3-静态字段持有者","children":[]},{"level":3,"title":"3.4. 静态字段类","slug":"_3-4-静态字段类","link":"#_3-4-静态字段类","children":[]},{"level":3,"title":"3.5. 上传类","slug":"_3-5-上传类","link":"#_3-5-上传类","children":[]},{"level":3,"title":"3.6. 垃圾回收在行动","slug":"_3-6-垃圾回收在行动","link":"#_3-6-垃圾回收在行动","children":[]},{"level":3,"title":"3.7. 没有_System.gc()_的示例","slug":"_3-7-没有-system-gc-的示例","link":"#_3-7-没有-system-gc-的示例","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1720987601000,"updatedTime":1720987601000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":6.54,"words":1963},"filePathRelative":"posts/baeldung/2024-07-14/2024-07-14-Static Fields and Garbage Collection.md","localizedDate":"2022年9月5日","excerpt":"<hr>\\n<h1>Java中的静态字段和垃圾回收</h1>\\n<h2>1. 引言</h2>\\n<p>在本教程中，我们将学习垃圾回收器如何处理静态字段。同时，我们还将涉及类加载和类对象等主题。阅读本文后，我们将更好地理解类、类加载器和静态字段之间的联系，以及垃圾回收器如何处理它们。</p>\\n<h2>2. Java中垃圾回收概述</h2>\\n<p>Java提供了一个相当不错的自动内存管理特性。在大多数情况下，这种方法不如手动管理高效。然而，它有助于避免难以调试的问题，并减少了样板代码。随着垃圾回收的改进，这个过程变得越来越好。因此，我们应该回顾一下垃圾回收器的工作原理以及我们应用程序中的垃圾是什么。</p>","autoDesc":true}');export{u as comp,m as data};
