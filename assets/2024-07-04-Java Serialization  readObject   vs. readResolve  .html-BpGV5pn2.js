import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-PwTSkUjG.js";const n={},s=i(`<h1 id="java-序列化-readobject-与-readresolve-baeldung" tabindex="-1"><a class="header-anchor" href="#java-序列化-readobject-与-readresolve-baeldung"><span>Java 序列化：readObject() 与 readResolve() | Baeldung</span></a></h1><p>在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。</p><p>Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readResolve()_和_readObject()_方法，这些方法在使用反序列化时常引发问题。</p><h3 id="_3-使用-readobject" tabindex="-1"><a class="header-anchor" href="#_3-使用-readobject"><span>3. 使用 <em>readObject()</em></span></a></h3><p>在序列化过程中，Java对象被转换为字节流以保存在文件中或通过互联网传输。在反序列化期间，使用_ObjectInputStream_的_readObject()_方法将序列化字节流转换回原始对象，该方法在内部调用_defaultReadObject()_进行默认反序列化。</p><p><strong>如果我们的类中存在_readObject()_方法，ObjectInputStream的_readObject()_方法将使用我们类的_readObject()_方法从流中读取对象。</strong></p><p>例如，在某些情况下，我们可以在我们的类中实现_readObject()_，以特定方式反序列化任何字段。</p><p>在我们展示用例之前，让我们检查一下在我们类中实现_readObject()_方法的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，假设我们有一个_User_类，它有两个字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class User implements Serializable {
    private static final long serialVersionUID = 3659932210257138726L;
    private String userName;
    private String password;
    // 标准的setters, getters, 构造函数(s) 和 toString()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们不想以明文形式序列化_password_，那么我们可以做什么？让我们看看Java的_readObject()_如何在这里帮助我们。</p><h3 id="_3-1-添加-writeobject-以在序列化期间进行自定义更改" tabindex="-1"><a class="header-anchor" href="#_3-1-添加-writeobject-以在序列化期间进行自定义更改"><span>3.1. 添加 <em>writeObject()</em> 以在序列化期间进行自定义更改</span></a></h3><p>首先，我们可以在序列化期间，在_writeObject()_方法中对对象的字段进行特定更改，例如对_password_进行编码。</p><p>所以，对于我们的_User_类，让我们实现_writeObject()_方法，并在序列化期间为我们的密码字段添加额外的字符串前缀：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void writeObject(ObjectOutputStream oos) throws IOException {
    this.password = &quot;xyz&quot; + password;
    oos.defaultWriteObject();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-测试没有-readobject-实现的情况" tabindex="-1"><a class="header-anchor" href="#_3-2-测试没有-readobject-实现的情况"><span>3.2. 测试没有 <em>readObject()</em> 实现的情况</span></a></h3><p>现在，让我们测试我们的_User_类，但这次没有实现_readObject()<em>。在这种情况下，将调用ObjectInputStream类的_readObject()</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testDeserializeObj_withDefaultReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;user.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User(&quot;Sachin&quot;, &quot;Kumar&quot;);
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream(&quot;user.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), &quot;Sachin&quot;);
    assertEquals(deserializedUser.getPassword(), &quot;xyzKumar&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到密码是_xyzKumar_，因为我们的类中还没有_readObject()_，它可以检索原始字段并进行自定义更改。</p><h3 id="_3-3-添加-readobject-以在反序列化期间进行自定义更改" tabindex="-1"><a class="header-anchor" href="#_3-3-添加-readobject-以在反序列化期间进行自定义更改"><span>3.3. 添加 <em>readObject()</em> 以在反序列化期间进行自定义更改</span></a></h3><p>接下来，我们可以在_readObject()<em>方法中，在反序列化期间对对象的字段进行特定更改，例如解码_password</em>。</p><p>让我们在我们的_User_类中实现_readObject()_方法，并删除我们在序列化期间添加到密码字段的额外字符串前缀：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
    ois.defaultReadObject();
    this.password = password.substring(3);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-测试-readobject-实现" tabindex="-1"><a class="header-anchor" href="#_3-4-测试-readobject-实现"><span>3.4. 测试 <em>readObject()</em> 实现</span></a></h3><p>让我们再次测试我们的_User_类，只是这次，我们有一个自定义的_readObject()_方法将在反序列化期间被调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testDeserializeObj_withOverriddenReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;user.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User(&quot;Sachin&quot;, &quot;Kumar&quot;);
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream(&quot;user.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), &quot;Sachin&quot;);
    assertEquals(deserializedUser.getPassword(), &quot;Kumar&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以注意到几件事。首先，对象是不同的，其次，我们的自定义_readObject()_被调用，密码字段被正确转换。</p><h3 id="_4-使用-readresolve" tabindex="-1"><a class="header-anchor" href="#_4-使用-readresolve"><span>4. 使用 <em>readResolve()</em></span></a></h3><p>在Java反序列化中，_readResolve()_方法用于用不同的对象替换在反序列化期间创建的对象。这在我们需要确保我们的应用程序中只有一个特定类的实例存在，或者当我们想要用可能已经存在于内存中的不同实例替换对象时非常有用。</p><p>让我们回顾一下在我们的类中添加_readResolve()_的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>_readObject()_示例中的一件事是对象_hashCode_是不同的。这是因为在反序列化期间，新对象是从流对象创建的。</strong></p><p>我们可能想要使用_readResolve()_的一个常见场景是创建单例实例。我们可以使用_readResolve()_确保反序列化的对象与单例实例的现有实例相同。</p><p>让我们以创建单例对象为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;
    private static Singleton INSTANCE = new Singleton();
    
    private Singleton() {
    }
    
    public static Singleton getInstance() {
        return INSTANCE;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-测试没有-readresolve-实现的情况" tabindex="-1"><a class="header-anchor" href="#_4-1-测试没有-readresolve-实现的情况"><span>4.1. 测试没有 <em>readResolve()</em> 实现的情况</span></a></h3><p>此时，我们还没有添加任何_readResolve()_方法。让我们测试我们的_Singleton_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testSingletonObj_withNoReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;singleton.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream(&quot;singleton.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertNotEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到两个对象是不同的，这违背了我们的_Singleton_类的目标。</p><h3 id="_4-2-测试-readresolve-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-测试-readresolve-实现"><span>4.2. 测试 <em>readResolve()</em> 实现</span></a></h3><p>为了解决这个问题，让我们在我们的_Singleton_类中添加_readResolve()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private Object readResolve() throws ObjectStreamException {
    return INSTANCE;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们再次测试我们的_Singleton_类，这次加入了_readResolve()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testSingletonObj_withCustomReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;singleton.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream(&quot;singleton.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到两个对象具有相同的_hashCode_。</p><h3 id="_5-readobject-与-readresolve" tabindex="-1"><a class="header-anchor" href="#_5-readobject-与-readresolve"><span>5. <em>readObject()</em> 与 <em>readResolve()</em></span></a></h3><p>让我们快速总结一下这两种方法之间的区别：</p><table><thead><tr><th><em>readResolve()</em></th><th><em>readObject()</em></th></tr></thead><tbody><tr><td>方法返回类型是Object</td><td>方法返回类型是void</td></tr><tr><td>没有方法参数</td><td><em>ObjectInputStream</em> 作为参数</td></tr><tr><td>通常用于实现单例模式，反序列化后需要返回相同的对象</td><td>用于设置未序列化的非瞬时字段的值，例如从其他字段派生的字段或动态初始化的字段</td></tr><tr><td>抛出 <em>ClassNotFoundException</em>, <em>ObjectStreamException</em></td><td>抛出 <em>ClassNotFoundException</em>, <em>IOException</em></td></tr><tr><td>由于不读取整个对象图，所以比_readObject()_ 快</td><td>由于读取整个对象图，所以比_readResolve()_ 慢</td></tr></tbody></table><hr><p>date: 2024-07-05 category:</p><ul><li>Java</li><li>序列化 tag:</li><li>readObject</li><li>readResolve head:</li><li><ul><li>meta</li><li>name: keywords content: Java, 序列化, readObject, readResolve, Baeldung</li></ul></li></ul><hr><h1 id="java-序列化-readobject-与-readresolve-baeldung-1" tabindex="-1"><a class="header-anchor" href="#java-序列化-readobject-与-readresolve-baeldung-1"><span>Java 序列化：readObject() 与 readResolve() | Baeldung</span></a></h1><h2 id="_1-概览" tabindex="-1"><a class="header-anchor" href="#_1-概览"><span>1. 概览</span></a></h2><p>在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。</p><p>Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readResolve()_和_readObject()_方法，这些方法在使用反序列化时常引发问题。</p><h2 id="_3-使用-readobject-1" tabindex="-1"><a class="header-anchor" href="#_3-使用-readobject-1"><span>3. 使用 <em>readObject()</em></span></a></h2><p>在序列化过程中，Java对象被转换为字节流以保存在文件中或通过互联网传输。在反序列化期间，使用_ObjectInputStream_的_readObject()_方法将序列化字节流转换回原始对象，该方法在内部调用_defaultReadObject()_进行默认反序列化。</p><p><strong>如果我们的类中存在_readObject()_方法，ObjectInputStream的_readObject()_方法将使用我们类的_readObject()_方法从流中读取对象。</strong></p><p>例如，在某些情况下，我们可以在我们的类中实现_readObject()_，以特定方式反序列化任何字段。</p><p>在我们展示用例之前，让我们检查一下在我们类中实现_readObject()_方法的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void readObject(ObjectInputStream stream) throws IOException, ClassNotFoundException;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，假设我们有一个_User_类，它有两个字段：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class User implements Serializable {
    private static final long serialVersionUID = 3659932210257138726L;
    private String userName;
    private String password;
    // 标准的setters, getters, 构造函数(s) 和 toString()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，我们不想以明文形式序列化_password_，那么我们可以做什么？让我们看看Java的_readObject()_如何在这里帮助我们。</p><h3 id="_3-1-添加-writeobject-以在序列化期间进行自定义更改-1" tabindex="-1"><a class="header-anchor" href="#_3-1-添加-writeobject-以在序列化期间进行自定义更改-1"><span>3.1. 添加 <em>writeObject()</em> 以在序列化期间进行自定义更改</span></a></h3><p>首先，我们可以在序列化期间，在_writeObject()_方法中对对象的字段进行特定更改，例如对_password_进行编码。</p><p>所以，对于我们的_User_类，让我们实现_writeObject()_方法，并在序列化期间为我们的密码字段添加额外的字符串前缀：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void writeObject(ObjectOutputStream oos) throws IOException {
    this.password = &quot;xyz&quot; + password;
    oos.defaultWriteObject();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-测试没有-readobject-实现的情况-1" tabindex="-1"><a class="header-anchor" href="#_3-2-测试没有-readobject-实现的情况-1"><span>3.2. 测试没有 <em>readObject()</em> 实现的情况</span></a></h3><p>现在，让我们测试我们的_User_类，但这次没有实现_readObject()<em>。在这种情况下，将调用ObjectInputStream类的_readObject()</em>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testDeserializeObj_withDefaultReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;user.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User(&quot;Sachin&quot;, &quot;Kumar&quot;);
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream(&quot;user.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), &quot;Sachin&quot;);
    assertEquals(deserializedUser.getPassword(), &quot;xyzKumar&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到密码是_xyzKumar_，因为我们的类中还没有_readObject()_，它可以检索原始字段并进行自定义更改。</p><h3 id="_3-3-添加-readobject-以在反序列化期间进行自定义更改-1" tabindex="-1"><a class="header-anchor" href="#_3-3-添加-readobject-以在反序列化期间进行自定义更改-1"><span>3.3. 添加 <em>readObject()</em> 以在反序列化期间进行自定义更改</span></a></h3><p>接下来，我们可以在_readObject()<em>方法中，在反序列化期间对对象的字段进行特定更改，例如解码_password</em>。</p><p>让我们在我们的_User_类中实现_readObject()_方法，并删除我们在序列化期间添加到密码字段的额外字符串前缀：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private void readObject(ObjectInputStream ois) throws ClassNotFoundException, IOException {
    ois.defaultReadObject();
    this.password = password.substring(3);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-测试-readobject-实现-1" tabindex="-1"><a class="header-anchor" href="#_3-4-测试-readobject-实现-1"><span>3.4. 测试 <em>readObject()</em> 实现</span></a></h3><p>让我们再次测试我们的_User_类，只是这次，我们有一个自定义的_readObject()_方法将在反序列化期间被调用：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testDeserializeObj_withOverriddenReadObject() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;user.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    User acutalObject = new User(&quot;Sachin&quot;, &quot;Kumar&quot;);
    oos.writeObject(acutalObject);
    
    // 反序列化
    User deserializedUser = null;
    FileInputStream fis = new FileInputStream(&quot;user.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedUser = (User) ois.readObject();
    assertNotEquals(deserializedUser.hashCode(), acutalObject.hashCode());
    assertEquals(deserializedUser.getUserName(), &quot;Sachin&quot;);
    assertEquals(deserializedUser.getPassword(), &quot;Kumar&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以注意到几件事。首先，对象是不同的，其次，我们的自定义_readObject()_被调用，密码字段被正确转换。</p><h2 id="_4-使用-readresolve-1" tabindex="-1"><a class="header-anchor" href="#_4-使用-readresolve-1"><span>4. 使用 <em>readResolve()</em></span></a></h2><p>在Java反序列化中，_readResolve()_方法用于用不同的对象替换在反序列化期间创建的对象。这在我们需要确保我们的应用程序中只有一个特定类的实例存在，或者当我们想要用可能已经存在于内存中的不同实例替换对象时非常有用。</p><p>让我们回顾一下在我们的类中添加_readResolve()_的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>ANY-ACCESS-MODIFIER Object readResolve() throws ObjectStreamException;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>_readObject()_示例中的一件事是对象_hashCode_是不同的。这是因为在反序列化期间，新对象是从流对象创建的。</strong></p><p>我们可能想要使用_readResolve()_的一个常见场景是创建单例实例。我们可以使用_readResolve()_确保反序列化的对象与单例实例的现有实例相同。</p><p>让我们以创建单例对象为例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Singleton implements Serializable {
    private static final long serialVersionUID = 1L;
    private static Singleton INSTANCE = new Singleton();
    
    private Singleton() {
    }
    
    public static Singleton getInstance() {
        return INSTANCE;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-1-测试没有-readresolve-实现的情况-1" tabindex="-1"><a class="header-anchor" href="#_4-1-测试没有-readresolve-实现的情况-1"><span>4.1. 测试没有 <em>readResolve()</em> 实现的情况</span></a></h3><p>此时，我们还没有添加任何_readResolve()_方法。让我们测试我们的_Singleton_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testSingletonObj_withNoReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;singleton.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream(&quot;singleton.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertNotEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到两个对象是不同的，这违背了我们的_Singleton_类的目标。</p><h3 id="_4-2-测试-readresolve-实现-1" tabindex="-1"><a class="header-anchor" href="#_4-2-测试-readresolve-实现-1"><span>4.2. 测试 <em>readResolve()</em> 实现</span></a></h3><p>为了解决这个问题，让我们在我们的_Singleton_类中添加_readResolve()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>private Object readResolve() throws ObjectStreamException {
    return INSTANCE;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们再次测试我们的_Singleton_类，这次加入了_readResolve()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
public void testSingletonObj_withCustomReadResolve() throws ClassNotFoundException, IOException {
    // 序列化
    FileOutputStream fos = new FileOutputStream(&quot;singleton.ser&quot;);
    ObjectOutputStream oos = new ObjectOutputStream(fos);
    Singleton actualSingletonObject = Singleton.getInstance();
    oos.writeObject(actualSingletonObject);
    
    // 反序列化
    Singleton deserializedSingletonObject = null;
    FileInputStream fis = new FileInputStream(&quot;singleton.ser&quot;);
    ObjectInputStream ois = new ObjectInputStream(fis);
    deserializedSingletonObject = (Singleton) ois.readObject();
    assertEquals(actualSingletonObject.hashCode(), deserializedSingletonObject.hashCode());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们可以看到两个对象具有相同的_hashCode_。</p><h2 id="_5-readobject-与-readresolve-1" tabindex="-1"><a class="header-anchor" href="#_5-readobject-与-readresolve-1"><span>5. <em>readObject()</em> 与 <em>readResolve()</em></span></a></h2><p>让我们快速总结一下这两种方法之间的区别：</p><table><thead><tr><th><em>readResolve()</em></th><th><em>readObject()</em></th></tr></thead><tbody><tr><td>方法返回类型是Object</td><td>方法返回类型是void</td></tr><tr><td>没有方法参数</td><td><em>ObjectInputStream</em> 作为参数</td></tr><tr><td>通常用于实现单例模式，反序列化后需要返回相同的对象</td><td>用于设置未序列化的非瞬时字段的值，例如从其他字段派生的字段或动态初始化的字段</td></tr><tr><td>抛出 <em>ClassNotFoundException</em>, <em>ObjectStreamException</em></td><td>抛出 <em>ClassNotFoundException</em>, <em>IOException</em></td></tr><tr><td>由于不读取整个对象图，所以比_readObject()_ 快</td><td>由于读取整个对象图，所以比_read</td></tr></tbody></table>`,103),d=[s];function r(l,c){return a(),t("div",null,d)}const u=e(n,[["render",r],["__file","2024-07-04-Java Serialization  readObject   vs. readResolve  .html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-07-04/2024-07-04-Java%20Serialization%20%20readObject%20%20%20vs.%20readResolve%20%20.html","title":"Java 序列化：readObject() 与 readResolve() | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-07-05T00:00:00.000Z","category":["Java","序列化"],"tag":["readObject","readResolve"],"head":[["meta",{"name":"keywords","content":"Java, 序列化, readObject, readResolve, Baeldung"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-04/2024-07-04-Java%20Serialization%20%20readObject%20%20%20vs.%20readResolve%20%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java 序列化：readObject() 与 readResolve() | Baeldung"}],["meta",{"property":"og:description","content":"Java 序列化：readObject() 与 readResolve() | Baeldung 在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。 Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readRes..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-04T22:59:25.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"readObject"}],["meta",{"property":"article:tag","content":"readResolve"}],["meta",{"property":"article:published_time","content":"2024-07-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-04T22:59:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java 序列化：readObject() 与 readResolve() | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-07-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-04T22:59:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java 序列化：readObject() 与 readResolve() | Baeldung 在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。 Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readRes..."},"headers":[{"level":3,"title":"3. 使用 readObject()","slug":"_3-使用-readobject","link":"#_3-使用-readobject","children":[]},{"level":3,"title":"3.1. 添加 writeObject() 以在序列化期间进行自定义更改","slug":"_3-1-添加-writeobject-以在序列化期间进行自定义更改","link":"#_3-1-添加-writeobject-以在序列化期间进行自定义更改","children":[]},{"level":3,"title":"3.2. 测试没有 readObject() 实现的情况","slug":"_3-2-测试没有-readobject-实现的情况","link":"#_3-2-测试没有-readobject-实现的情况","children":[]},{"level":3,"title":"3.3. 添加 readObject() 以在反序列化期间进行自定义更改","slug":"_3-3-添加-readobject-以在反序列化期间进行自定义更改","link":"#_3-3-添加-readobject-以在反序列化期间进行自定义更改","children":[]},{"level":3,"title":"3.4. 测试 readObject() 实现","slug":"_3-4-测试-readobject-实现","link":"#_3-4-测试-readobject-实现","children":[]},{"level":3,"title":"4. 使用 readResolve()","slug":"_4-使用-readresolve","link":"#_4-使用-readresolve","children":[]},{"level":3,"title":"4.1. 测试没有 readResolve() 实现的情况","slug":"_4-1-测试没有-readresolve-实现的情况","link":"#_4-1-测试没有-readresolve-实现的情况","children":[]},{"level":3,"title":"4.2. 测试 readResolve() 实现","slug":"_4-2-测试-readresolve-实现","link":"#_4-2-测试-readresolve-实现","children":[]},{"level":3,"title":"5. readObject() 与 readResolve()","slug":"_5-readobject-与-readresolve","link":"#_5-readobject-与-readresolve","children":[]},{"level":2,"title":"1. 概览","slug":"_1-概览","link":"#_1-概览","children":[]},{"level":2,"title":"3. 使用 readObject()","slug":"_3-使用-readobject-1","link":"#_3-使用-readobject-1","children":[{"level":3,"title":"3.1. 添加 writeObject() 以在序列化期间进行自定义更改","slug":"_3-1-添加-writeobject-以在序列化期间进行自定义更改-1","link":"#_3-1-添加-writeobject-以在序列化期间进行自定义更改-1","children":[]},{"level":3,"title":"3.2. 测试没有 readObject() 实现的情况","slug":"_3-2-测试没有-readobject-实现的情况-1","link":"#_3-2-测试没有-readobject-实现的情况-1","children":[]},{"level":3,"title":"3.3. 添加 readObject() 以在反序列化期间进行自定义更改","slug":"_3-3-添加-readobject-以在反序列化期间进行自定义更改-1","link":"#_3-3-添加-readobject-以在反序列化期间进行自定义更改-1","children":[]},{"level":3,"title":"3.4. 测试 readObject() 实现","slug":"_3-4-测试-readobject-实现-1","link":"#_3-4-测试-readobject-实现-1","children":[]}]},{"level":2,"title":"4. 使用 readResolve()","slug":"_4-使用-readresolve-1","link":"#_4-使用-readresolve-1","children":[{"level":3,"title":"4.1. 测试没有 readResolve() 实现的情况","slug":"_4-1-测试没有-readresolve-实现的情况-1","link":"#_4-1-测试没有-readresolve-实现的情况-1","children":[]},{"level":3,"title":"4.2. 测试 readResolve() 实现","slug":"_4-2-测试-readresolve-实现-1","link":"#_4-2-测试-readresolve-实现-1","children":[]}]},{"level":2,"title":"5. readObject() 与 readResolve()","slug":"_5-readobject-与-readresolve-1","link":"#_5-readobject-与-readresolve-1","children":[]}],"git":{"createdTime":1720133965000,"updatedTime":1720133965000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":10.63,"words":3189},"filePathRelative":"posts/baeldung/2024-07-04/2024-07-04-Java Serialization  readObject   vs. readResolve  .md","localizedDate":"2024年7月5日","excerpt":"\\n<p>在本教程中，我们将探讨如何在Java反序列化API中使用_readObject()_和_readResolve()_方法。此外，我们将检查这两种方法之间的区别。</p>\\n<p>Java序列化涵盖了序列化和反序列化如何更深入地工作。在本文中，我们将重点关注_readResolve()_和_readObject()_方法，这些方法在使用反序列化时常引发问题。</p>\\n<h3>3. 使用 <em>readObject()</em></h3>\\n<p>在序列化过程中，Java对象被转换为字节流以保存在文件中或通过互联网传输。在反序列化期间，使用_ObjectInputStream_的_readObject()_方法将序列化字节流转换回原始对象，该方法在内部调用_defaultReadObject()_进行默认反序列化。</p>","autoDesc":true}');export{u as comp,b as data};
