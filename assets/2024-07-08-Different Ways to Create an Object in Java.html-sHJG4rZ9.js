import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as t,a as n}from"./app-CNQ479je.js";const i={},s=n(`<h1 id="java中创建对象的不同方式" tabindex="-1"><a class="header-anchor" href="#java中创建对象的不同方式"><span>Java中创建对象的不同方式</span></a></h1><p>Java是一种面向对象编程（OOP）语言。这意味着Java使用对象，通常组织在类中，来模拟状态和行为。</p><p>在本教程中，我们将探讨我们可以创建对象的一些不同方式。</p><p>在我们大多数示例中，我们将使用一个非常简单的_兔子_对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Rabbit {
    String name = &quot;&quot;;

    public Rabbit() {
    }

    // getter/setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们的_兔子_对象不一定有_名字_，尽管如果需要，我们可以设置一个_名字_。</p><p>现在，让我们创建一些_兔子_对象！</p><h3 id="_2-使用-new-操作符创建对象" tabindex="-1"><a class="header-anchor" href="#_2-使用-new-操作符创建对象"><span>2. 使用_new_操作符创建对象</span></a></h3><p><strong>使用_new_关键字可能是创建对象最常见的方式：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Rabbit rabbit = new Rabbit();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在上面的示例中，我们将一个新的_兔子_实例分配给一个名为_rabbit_的变量。</p><p>_new_关键字表示我们想要一个新对象实例。它通过使用该对象内的构造器类来实现这一点。</p><p>如果没有在类中定义构造器，将使用一个内在的默认构造器。</p><h3 id="_3-使用-class-newinstance-方法创建对象" tabindex="-1"><a class="header-anchor" href="#_3-使用-class-newinstance-方法创建对象"><span>3. 使用_Class.newInstance()_方法创建对象</span></a></h3><p>由于Java是一种基于对象的语言，将Java的关键概念作为对象存储是有意义的。</p><p>一个例子是_Class_对象，它存储了有关Java类的所有信息。</p><p><strong>要访问_兔子_类对象，我们使用_qualified class name_的_Class.forName()_</strong>（包含类的包名的名称）。</p><p><strong>一旦我们获得了我们的_兔子_对应的类对象，我们将调用_newInstance()_方法</strong>，它创建了一个新的_兔子_对象实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Rabbit rabbit = (Rabbit) Class
  .forName(&quot;com.baeldung.objectcreation.objects.Rabbit&quot;)
  .newInstance();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，我们必须将新对象实例转换为_兔子_类型。</p><p>这个版本的一个稍微不同之处是使用_class_关键字而不是_Class_对象，这更加简洁：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Rabbit rabbit = Rabbit.class.newInstance();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们也使用_Constructor_类来产生一个类似的替代方案：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Rabbit rabbit = Rabbit.class.getConstructor().newInstance();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在所有这些情况下，我们都在使用任何对象都可用的内置_newInstance()_方法。</p><p><strong>_newInstance()_方法依赖于构造函数的可见性。</strong></p><p>例如，如果_兔子_只有私有构造函数，并且我们尝试使用上述的_newInstance_方法之一，我们将看到一个_IllegalAccessException_的堆栈跟踪：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>java.lang.IllegalAccessException: Class com.baeldung.objectcreation.CreateRabbits cannot access
  a member of class com.baeldung.objectcreation.objects.Rabbit with modifiers &quot;private&quot;
  at sun.reflect.Reflection.ensureMemberAccess(Reflection.java:102)
  at java.lang.Class.newInstance(Class.java:436)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-使用-clone-方法创建对象" tabindex="-1"><a class="header-anchor" href="#_4-使用-clone-方法创建对象"><span>4. 使用_clone()_方法创建对象</span></a></h3><p>现在让我们看看如何克隆一个对象。</p><p><strong>_clone()_方法接受一个对象，并在新内存中产生它的一个完全副本。</strong></p><p>然而，并非所有类都可以被克隆。</p><p><strong>只有实现了_Clonable_接口的类才能被克隆。</strong></p><p>该类还必须包含_clone()_方法的实现，所以让我们创建一个名为_CloneableRabbit_的类，它与_兔子_相同，但也实现了_clone()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public Object clone() throws CloneNotSupportedException {
    return super.clone();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们克隆_CloneableRabbit_的代码是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ClonableRabbit clonedRabbit = (ClonableRabbit) originalRabbit.clone();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果我们考虑使用_clone()_方法，我们可能想要使用Java复制构造函数代替。</p><h3 id="_5-使用反序列化创建对象" tabindex="-1"><a class="header-anchor" href="#_5-使用反序列化创建对象"><span>5. 使用反序列化创建对象</span></a></h3><p>我们已经涵盖了一些明显的例子，所以让我们开始跳出常规思考。</p><p><strong>我们可以通过反序列化来创建对象</strong>（从外部数据中读取，然后我们可以从中创建对象）。</p><p>为了演示这一点，首先，我们需要一个可序列化的类。</p><p><strong>我们可以通过复制_兔子_并实现_Serializable_接口来使我们的类可序列化：</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class SerializableRabbit implements Serializable {
    //class contents
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们将一个名为Peter的_兔子_写入到测试目录中的一个文件：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>SerializableRabbit originalRabbit = new SerializableRabbit();
originalRabbit.setName(&quot;Peter&quot;);

File resourcesFolder = new File(&quot;src/test/resources&quot;);
resourcesFolder.mkdirs(); //creates the directory in case it doesn&#39;t exist

File file = new File(resourcesFolder, &quot;rabbit.ser&quot;);

try (FileOutputStream fileOutputStream = new FileOutputStream(file);
  ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);) {
    objectOutputStream.writeObject(originalRabbit);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将再次读取它：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>try (FileInputStream fis = new FileInputStream(file);
  ObjectInputStream ois = new ObjectInputStream(fis);) {
    return (SerializableRabbit) ois.readObject();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们检查名字，我们将看到这个新创建的_兔子_对象是Peter。</p><p>这整个概念是一个很大的主题，称为反序列化。</p><h3 id="_6-其他创建对象的方式" tabindex="-1"><a class="header-anchor" href="#_6-其他创建对象的方式"><span>6. 其他创建对象的方式</span></a></h3><p>如果我们深入挖掘，会发现有很多我们可以做的事情本质上是创建对象。</p><p>以下是一些我们经常使用的熟悉类，以及其他我们可能永远不会使用的类。</p><h4 id="_6-1-函数式接口" tabindex="-1"><a class="header-anchor" href="#_6-1-函数式接口"><span>6.1. 函数式接口</span></a></h4><p>我们可以通过使用函数式接口来创建一个对象：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Supplier\`&lt;Rabbit&gt;\` rabbitSupplier = Rabbit::new;
Rabbit rabbit = rabbitSupplier.get();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码使用_Supplier_函数式接口来提供_兔子_对象。</p><p>我们使用方法引用操作符，即_兔子::new_中的双冒号操作符。</p><p>双冒号操作符文章包含更多示例，比如如何处理构造函数中的参数。</p><h4 id="_6-2-unsafe-allocateinstance" tabindex="-1"><a class="header-anchor" href="#_6-2-unsafe-allocateinstance"><span>6.2. <em>Unsafe.AllocateInstance</em></span></a></h4><p>让我们快速提到一种我们不会推荐用于我们的代码的对象创建方法。</p><p>**_sun.misc.Unsafe_类是一个低级类，用于核心Java类中，**这意味着它不是设计用于我们的代码。</p><p>然而，它确实包含一个名为_allocateInstance_的方法，可以在不调用构造函数的情况下创建对象。</p><p>由于**_Unsafe_不推荐在核心库之外使用**，我们这里没有包含示例。</p><h4 id="_6-3-数组" tabindex="-1"><a class="header-anchor" href="#_6-3-数组"><span>6.3. 数组</span></a></h4><p>另一种在Java中创建对象的方式是通过初始化数组。</p><p>代码结构看起来与之前使用_new_关键字的示例相似：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Rabbit[] rabbitArray = new Rabbit[10];
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然而，在运行代码时，我们看到<strong>它没有显式使用构造函数方法</strong>。所以，虽然它在外部看起来使用相同的代码风格，但幕后的内部机制是不同的。</p><h4 id="_6-4-枚举" tabindex="-1"><a class="header-anchor" href="#_6-4-枚举"><span>6.4. 枚举</span></a></h4><p>让我们再次快速看看另一个常见的对象，枚举。</p><p>枚举只是类的一种特殊类型，我们以面向对象的方式考虑它们。</p><p>所以如果我们有一个枚举：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public enum RabbitType {
    PET,
    TAME,
    WILD
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码将在我们初始化枚举时每次都创建对象</strong>，这与上述在运行时创建对象的示例不同。</p><h3 id="_7-结论" tabindex="-1"><a class="header-anchor" href="#_7-结论"><span>7. 结论</span></a></h3><p>在本文中，我们看到了我们可以使用关键字，如_new_或_class_来创建一个对象。</p><p>我们了解到，克隆或反序列化等其他操作可以创建对象。</p><p>我们还看到，Java充满了创建对象的方式，其中许多我们可能已经在不知不觉中使用了。</p><p>如往常一样，我们讨论的所有方式的完整示例都可以在GitHub上找到。</p>`,80),l=[s];function r(d,c){return t(),a("div",null,l)}const b=e(i,[["render",r],["__file","2024-07-08-Different Ways to Create an Object in Java.html.vue"]]),u=JSON.parse('{"path":"/posts/baeldung/2024-07-08/2024-07-08-Different%20Ways%20to%20Create%20an%20Object%20in%20Java.html","title":"Java中创建对象的不同方式","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Object Creation"],"tag":["Java","OOP","Object Creation"],"head":[["meta",{"name":"keywords","content":"Java对象创建,Java对象实例化,Java对象序列化,Java对象克隆"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-08/2024-07-08-Different%20Ways%20to%20Create%20an%20Object%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中创建对象的不同方式"}],["meta",{"property":"og:description","content":"Java中创建对象的不同方式 Java是一种面向对象编程（OOP）语言。这意味着Java使用对象，通常组织在类中，来模拟状态和行为。 在本教程中，我们将探讨我们可以创建对象的一些不同方式。 在我们大多数示例中，我们将使用一个非常简单的_兔子_对象： 我们的_兔子_对象不一定有_名字_，尽管如果需要，我们可以设置一个_名字_。 现在，让我们创建一些_兔子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-08T17:38:51.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"OOP"}],["meta",{"property":"article:tag","content":"Object Creation"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-08T17:38:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中创建对象的不同方式\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-08T17:38:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中创建对象的不同方式 Java是一种面向对象编程（OOP）语言。这意味着Java使用对象，通常组织在类中，来模拟状态和行为。 在本教程中，我们将探讨我们可以创建对象的一些不同方式。 在我们大多数示例中，我们将使用一个非常简单的_兔子_对象： 我们的_兔子_对象不一定有_名字_，尽管如果需要，我们可以设置一个_名字_。 现在，让我们创建一些_兔子..."},"headers":[{"level":3,"title":"2. 使用_new_操作符创建对象","slug":"_2-使用-new-操作符创建对象","link":"#_2-使用-new-操作符创建对象","children":[]},{"level":3,"title":"3. 使用_Class.newInstance()_方法创建对象","slug":"_3-使用-class-newinstance-方法创建对象","link":"#_3-使用-class-newinstance-方法创建对象","children":[]},{"level":3,"title":"4. 使用_clone()_方法创建对象","slug":"_4-使用-clone-方法创建对象","link":"#_4-使用-clone-方法创建对象","children":[]},{"level":3,"title":"5. 使用反序列化创建对象","slug":"_5-使用反序列化创建对象","link":"#_5-使用反序列化创建对象","children":[]},{"level":3,"title":"6. 其他创建对象的方式","slug":"_6-其他创建对象的方式","link":"#_6-其他创建对象的方式","children":[]},{"level":3,"title":"7. 结论","slug":"_7-结论","link":"#_7-结论","children":[]}],"git":{"createdTime":1720460331000,"updatedTime":1720460331000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.74,"words":1723},"filePathRelative":"posts/baeldung/2024-07-08/2024-07-08-Different Ways to Create an Object in Java.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>Java是一种面向对象编程（OOP）语言。这意味着Java使用对象，通常组织在类中，来模拟状态和行为。</p>\\n<p>在本教程中，我们将探讨我们可以创建对象的一些不同方式。</p>\\n<p>在我们大多数示例中，我们将使用一个非常简单的_兔子_对象：</p>\\n<div class=\\"language-text\\" data-ext=\\"text\\" data-title=\\"text\\"><pre class=\\"language-text\\"><code>public class Rabbit {\\n    String name = \\"\\";\\n\\n    public Rabbit() {\\n    }\\n\\n    // getter/setter\\n}\\n</code></pre></div>","autoDesc":true}');export{b as comp,u as data};
