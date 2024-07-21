import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as i}from"./app-CXN34Kw1.js";const s={},n=i(`<h1 id="如何使用jni的registernatives-方法" tabindex="-1"><a class="header-anchor" href="#如何使用jni的registernatives-方法"><span>如何使用JNI的RegisterNatives()方法？</span></a></h1><p>在这个简短的教程中，我们将看看JNI的_RegisterNatives()_方法，它用于在Java和C++函数之间创建映射。</p><p>首先，我们将解释JNI _RegisterNatives()_是如何工作的。然后，我们将展示它在_java.lang.Object’_s_registerNatives()_方法中的使用。最后，我们将展示如何在我们自己的Java和C++代码中使用这个功能。</p><p><strong>JVM有两种方式找到并链接本地方法与Java代码。</strong> 第一种方式是以一种特定的方式调用本地函数，以便JVM可以找到它。另一种方式是<strong>使用JNI _RegisterNatives()_方法</strong>。</p><p>正如其名，_RegisterNatives()_方法将本地方法注册到作为参数传递的类中。<strong>通过使用这种方法，我们可以随意命名我们的C++函数</strong>。</p><p>实际上，_java.lang.Object’_s_registerNatives()_方法使用了第二种方法。让我们看看OpenJDK 8中C语言的_java.lang.Object’_s_registerNatives()_方法实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static JNINativeMethod methods[] = {
    {&quot;hashCode&quot;, &quot;()I&quot;, (void *)&amp;JVM_IHashCode},
    {&quot;wait&quot;, &quot;(J)V&quot;, (void *)&amp;JVM_MonitorWait},
    {&quot;notify&quot;, &quot;()V&quot;, (void *)&amp;JVM_MonitorNotify},
    {&quot;notifyAll&quot;, &quot;()V&quot;, (void *)&amp;JVM_MonitorNotifyAll},
    {&quot;clone&quot;, &quot;()Ljava/lang/Object;&quot;, (void *)&amp;JVM_Clone},
};

JNIEXPORT void JNICALL
Java_java_lang_Object_registerNatives(JNIEnv *env, jclass cls)
{
    (*env)-&gt;RegisterNatives(env, cls,
                            methods, sizeof(methods)/sizeof(methods[0]));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，_method[]<em>数组被初始化以存储Java和C++函数名之间的映射。然后，我们看到了一个以非常特定方式命名的方法_Java_java_lang_Object_registerNatives</em>。</p><p>通过这样做，JVM能够将其链接到本地_java.lang.Object’_s_registerNatives()_方法。在内部，_method[]_数组被用在_RegisterNatives()_方法调用中。</p><p>现在，让我们看看我们如何在自己的代码中使用它。</p><h2 id="_3-使用-registernatives-方法" tabindex="-1"><a class="header-anchor" href="#_3-使用-registernatives-方法"><span>3. 使用_RegisterNatives_方法</span></a></h2><p>让我们从Java类开始：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class RegisterNativesHelloWorldJNI {
    public native void register();
    public native String sayHello();

    public static void main(String[] args) {
        RegisterNativesHelloWorldJNI helloWorldJNI = new RegisterNativesHelloWorldJNI();
        helloWorldJNI.register();
        helloWorldJNI.sayHello();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们定义了两个本地方法，_register()<em>和_sayHello()</em>。前者将使用R _egisterNatives()_方法来注册一个自定义的C++函数，以便在调用本地_sayHello()_方法时使用。</p><p>让我们看看Java的_register()_本地方法的C++实现：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>static JNINativeMethod methods[] = {
  {&quot;sayHello&quot;, &quot;()Ljava/lang/String;&quot;, (void*) &amp;hello },
};

JNIEXPORT void JNICALL Java_com_baeldung_jni_RegisterNativesHelloWorldJNI_register (JNIEnv* env, jobject thsObject) {
    jclass clazz = env-&gt;FindClass(&quot;com/baeldung/jni/RegisterNativesHelloWorldJNI&quot;);

    (env)-&gt;RegisterNatives(clazz, methods, sizeof(methods)/sizeof(methods[0]));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与_java.lang.Object_示例类似，我们首先创建一个数组来保存Java和C++方法之间的映射。</p><p>然后，我们看到了一个名为_Java_com_baeldung_jni_RegisterNativesHelloWorldJNI_register_的函数。不幸的是，它必须以这种方式调用，以便JVM能够找到并将其与Java代码链接。</p><p>该函数做了两件事。首先，它找到了所需的Java类。然后，它调用了_RegisterNatives()_方法，并传递了类和映射数组。</p><p>现在，我们可以随意调用第二个本地方法_sayHello()_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>JNIEXPORT jstring JNICALL hello (JNIEnv* env, jobject thisObject) {
    std::string hello = &quot;Hello from registered native C++ !!&quot;;
    std::cout \`&lt;&lt; hello &lt;&lt; std::endl;
    return env-&gt;\`NewStringUTF(hello.c_str());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与完全限定名不同，我们使用了更短、更有意义的名称。</p><p>最后，让我们从_RegisterNativesHelloWorldJNI_类中运行_main()_方法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>Hello from registered native C++ !!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们讨论了JNI _RegisterNatives()_方法。首先，我们解释了_java.lang.Object.registerNatives()_方法在幕后的作用。然后，我们讨论了使用JNI _RegisterNatives()_方法可能的用途。最后，我们展示了如何在我们自己的Java和C++代码中使用它。</p><p>如常，本文的完整源代码可在GitHub上找到。翻译已经完成，以下是剩余部分的翻译：</p><h2 id="_4-结论-1" tabindex="-1"><a class="header-anchor" href="#_4-结论-1"><span>4. 结论</span></a></h2><p>在这篇文章中，我们讨论了JNI的_RegisterNatives()_方法。首先，我们解释了_java.lang.Object.registerNatives()_方法的内部工作原理。然后，我们讨论了使用JNI _RegisterNatives()_方法可能很有用的原因。最后，我们展示了如何在我们自己的Java和C++代码中使用它。</p><p>如往常一样，文章的完整源代码可以在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/1e5547403afca01f9f2e280c3320046e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png" alt="img" loading="lazy"></p><p>OK</p>`,32),l=[n];function r(o,d){return a(),t("div",null,l)}const g=e(s,[["render",r],["__file","2024-07-21-How to use JNI s RegisterNatives   method .html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-21/2024-07-21-How%20to%20use%20JNI%20s%20RegisterNatives%20%20%20method%20.html","title":"如何使用JNI的RegisterNatives()方法？","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JNI"],"tag":["JNI","RegisterNatives"],"head":[["meta",{"name":"keywords","content":"JNI, RegisterNatives, Java, C++"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-21/2024-07-21-How%20to%20use%20JNI%20s%20RegisterNatives%20%20%20method%20.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"如何使用JNI的RegisterNatives()方法？"}],["meta",{"property":"og:description","content":"如何使用JNI的RegisterNatives()方法？ 在这个简短的教程中，我们将看看JNI的_RegisterNatives()_方法，它用于在Java和C++函数之间创建映射。 首先，我们将解释JNI _RegisterNatives()_是如何工作的。然后，我们将展示它在_java.lang.Object’_s_registerNatives(..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-21T17:39:12.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JNI"}],["meta",{"property":"article:tag","content":"RegisterNatives"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-21T17:39:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何使用JNI的RegisterNatives()方法？\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/1e5547403afca01f9f2e280c3320046e?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/e10d6ff4ff6d95fd255cc95a5ab28c0e?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-icn-1.0.0.png\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-21T17:39:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"如何使用JNI的RegisterNatives()方法？ 在这个简短的教程中，我们将看看JNI的_RegisterNatives()_方法，它用于在Java和C++函数之间创建映射。 首先，我们将解释JNI _RegisterNatives()_是如何工作的。然后，我们将展示它在_java.lang.Object’_s_registerNatives(..."},"headers":[{"level":2,"title":"3. 使用_RegisterNatives_方法","slug":"_3-使用-registernatives-方法","link":"#_3-使用-registernatives-方法","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论-1","link":"#_4-结论-1","children":[]}],"git":{"createdTime":1721583552000,"updatedTime":1721583552000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1001},"filePathRelative":"posts/baeldung/2024-07-21/2024-07-21-How to use JNI s RegisterNatives   method .md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在这个简短的教程中，我们将看看JNI的_RegisterNatives()_方法，它用于在Java和C++函数之间创建映射。</p>\\n<p>首先，我们将解释JNI _RegisterNatives()_是如何工作的。然后，我们将展示它在_java.lang.Object’_s_registerNatives()_方法中的使用。最后，我们将展示如何在我们自己的Java和C++代码中使用这个功能。</p>\\n<p><strong>JVM有两种方式找到并链接本地方法与Java代码。</strong> 第一种方式是以一种特定的方式调用本地函数，以便JVM可以找到它。另一种方式是<strong>使用JNI _RegisterNatives()_方法</strong>。</p>","autoDesc":true}');export{g as comp,p as data};
