import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as s,a as t}from"./app-on0L14Tx.js";const p={},e=t('<hr><h1 id="javafx-button-事件处理器添加指南" tabindex="-1"><a class="header-anchor" href="#javafx-button-事件处理器添加指南"><span>JavaFX Button 事件处理器添加指南</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><h3 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述"><span>1.1. 概述</span></a></h3><p>在这个简短的教程中，我们将<strong>查看JavaFX的_Button_组件，并了解如何处理用户交互</strong>。</p><h3 id="_1-2-javafx-api" tabindex="-1"><a class="header-anchor" href="#_1-2-javafx-api"><span>1.2. JavaFX API</span></a></h3><p>在Java 8、9和10中，无需额外设置即可开始使用JavaFX库。从JDK 11开始，该项目将从JDK中移除，应将以下依赖项添加到pom.xml中：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.openjfx```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```javafx-controls```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```${javafx.version}```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.openjfx```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```javafx-fxml```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n        ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```${javafx.version}```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n    ``<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>``\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>`\n\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>```org.openjfx```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>```javafx-maven-plugin```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>```\n            ```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>```${javafx-maven-plugin.version}```<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>```\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n                `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mainClass</span><span class="token punctuation">&gt;</span></span>`Main`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mainClass</span><span class="token punctuation">&gt;</span></span>`\n            `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-应用程序设置" tabindex="-1"><a class="header-anchor" href="#_2-应用程序设置"><span>2. 应用程序设置</span></a></h2><p>首先，<strong>让我们创建一个小型应用程序，以便专注于事件处理器</strong>。让我们从一个包含按钮的简单FXML布局开始：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>`<span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>`\n`<span class="token prolog">&lt;?import javafx.scene.control.*?&gt;</span>`\n`<span class="token prolog">&lt;?import javafx.scene.layout.*?&gt;</span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BorderPane</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>fx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://javafx.com/fxml<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://javafx.com/javafx<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name"><span class="token namespace">fx:</span>controller</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>com.baeldung.button.eventhandler.ButtonEventHandlerController<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">prefHeight</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>200.0<span class="token punctuation">&quot;</span></span> <span class="token attr-name">prefWidth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>300.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>center</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Button</span> <span class="token attr-name"><span class="token namespace">fx:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button<span class="token punctuation">&quot;</span></span> <span class="token attr-name">HBox.hgrow</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ALWAYS<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>center</span><span class="token punctuation">&gt;</span></span>`\n\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bottom</span><span class="token punctuation">&gt;</span></span>`\n        `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Label</span> <span class="token attr-name"><span class="token namespace">fx:</span>id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>label<span class="token punctuation">&quot;</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>测试标签<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>`\n    `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bottom</span><span class="token punctuation">&gt;</span></span>`\n`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>BorderPane</span><span class="token punctuation">&gt;</span></span>`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们创建_ButtonEventHandlerController_类。<strong>这个类负责连接UI元素和应用程序逻辑</strong>。我们将在_initialize_方法中设置按钮的标签：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ButtonEventHandlerController</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">ButtonEventHandlerController</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@FXML</span>\n    <span class="token keyword">private</span> <span class="token class-name">Button</span> button<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@FXML</span>\n    <span class="token keyword">private</span> <span class="token class-name">Label</span> label<span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@FXML</span>\n    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        button<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token string">&quot;点击我&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们启动应用程序。我们应该会看到一个标题为“点击我”的按钮位于窗口中心，以及一个测试标签位于窗口底部：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/javafx_button_event_handler_app_preview-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="_3-点击事件" tabindex="-1"><a class="header-anchor" href="#_3-点击事件"><span>3. 点击事件</span></a></h2><p>让我们从处理简单的点击事件开始，并在initialize方法中添加一个事件处理器：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>button<span class="token punctuation">.</span><span class="token function">setOnAction</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">EventHandler</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ActionEvent</span><span class="token punctuation">&gt;</span></span>`<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">ActionEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;OnAction {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们测试一下。当我们点击按钮时，会显示一个新的日志消息：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>INFO c.b.b.e.ButtonEventHandlerController - OnAction javafx.event.ActionEvent[source=Button[id=searchButton, styleClass=button]&#39;Click me&#39;]\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>由于事件处理器接口只有一个方法，我们可以将其视为函数式接口，并用单个lambda表达式替换这些行，使我们的代码更易于阅读</strong>：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>searchButton<span class="token punctuation">.</span><span class="token function">setOnAction</span><span class="token punctuation">(</span>event <span class="token operator">-&gt;</span> logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;OnAction {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们尝试添加另一个点击事件处理器。我们可以简单地复制这行代码，并更改日志消息，以便在测试应用程序时能够看到差异：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>button<span class="token punctuation">.</span><span class="token function">setOnAction</span><span class="token punctuation">(</span>event <span class="token operator">-&gt;</span> logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;OnAction {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nbutton<span class="token punctuation">.</span><span class="token function">setOnAction</span><span class="token punctuation">(</span>event <span class="token operator">-&gt;</span> logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;OnAction2 {}&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们点击按钮时，我们只看到“OnAction 2”消息。这是因为第二个_setOnAction_方法调用用第二个事件处理器替换了第一个事件处理器。</p><h2 id="_4-不同事件" tabindex="-1"><a class="header-anchor" href="#_4-不同事件"><span>4. 不同事件</span></a></h2><p><strong>我们也可以处理其他类型的事件，如鼠标按下/释放、拖动和键盘事件</strong>。</p><p>让我们为我们的按钮添加一个悬停效果。当光标开始悬停在按钮上时，我们将显示一个阴影，并在光标离开时移除效果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Effect</span> shadow <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DropShadow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsearchButton<span class="token punctuation">.</span><span class="token function">setOnMouseEntered</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> searchButton<span class="token punctuation">.</span><span class="token function">setEffect</span><span class="token punctuation">(</span>shadow<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nsearchButton<span class="token punctuation">.</span><span class="token function">setOnMouseExited</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> searchButton<span class="token punctuation">.</span><span class="token function">setEffect</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-重用事件处理器" tabindex="-1"><a class="header-anchor" href="#_5-重用事件处理器"><span>5. 重用事件处理器</span></a></h2><p>在某些情况下，我们可能希望多次使用相同的事件处理器。让我们创建一个事件处理器，当我们点击鼠标的次要按钮时，将增加按钮的字体大小：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">EventHandler</span>`<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MouseEvent</span><span class="token punctuation">&gt;</span></span>` rightClickHandler <span class="token operator">=</span> event <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MouseButton</span><span class="token punctuation">.</span><span class="token constant">SECONDARY</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span><span class="token function">getButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        button<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Font</span><span class="token punctuation">(</span>button<span class="token punctuation">.</span><span class="token function">getFont</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然而，它没有功能，因为我们没有将它与任何事件关联。让我们将这个事件处理器用于按钮和标签的鼠标按下事件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>button<span class="token punctuation">.</span><span class="token function">setOnMousePressed</span><span class="token punctuation">(</span>rightClickHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\nlabel<span class="token punctuation">.</span><span class="token function">setOnMousePressed</span><span class="token punctuation">(</span>rightClickHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，当我们测试应用程序并使用鼠标的次要按钮点击标签或按钮时，我们可以看到字体大小增加。</p><h2 id="_6-结论" tabindex="-1"><a class="header-anchor" href="#_6-结论"><span>6. 结论</span></a></h2><p>我们学习了如何为JavaFX按钮添加事件处理器，并根据事件类型执行不同的操作。</p><p>如往常一样，代码实现可在GitHub上找到。</p><p><img src="https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&amp;r=g" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png" alt="img" loading="lazy"><img src="https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg" alt="img" loading="lazy"></p>',39),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-22-Adding EventHandler to JavaFX Button.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Adding%20EventHandler%20to%20JavaFX%20Button.html","title":"JavaFX Button 事件处理器添加指南","lang":"zh-CN","frontmatter":{"date":"2022-01-01T00:00:00.000Z","category":["JavaFX","事件处理"],"tag":["JavaFX Button","事件处理器"],"head":[["meta",{"name":"keywords","content":"JavaFX, Button, 事件处理, 事件处理器"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Adding%20EventHandler%20to%20JavaFX%20Button.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JavaFX Button 事件处理器添加指南"}],["meta",{"property":"og:description","content":"JavaFX Button 事件处理器添加指南 1. 引言 1.1. 概述 在这个简短的教程中，我们将查看JavaFX的_Button_组件，并了解如何处理用户交互。 1.2. JavaFX API 在Java 8、9和10中，无需额外设置即可开始使用JavaFX库。从JDK 11开始，该项目将从JDK中移除，应将以下依赖项添加到pom.xml中： 2..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/01/javafx_button_event_handler_app_preview-1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T09:18:42.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JavaFX Button"}],["meta",{"property":"article:tag","content":"事件处理器"}],["meta",{"property":"article:published_time","content":"2022-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T09:18:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JavaFX Button 事件处理器添加指南\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/01/javafx_button_event_handler_app_preview-1.png\\",\\"https://www.baeldung.com/wp-content/themes/baeldung/icon/logo.svg\\",\\"https://secure.gravatar.com/avatar/dc417739e22ae675b0e1f7012bbddaa5?s=50&r=g\\",\\"https://secure.gravatar.com/avatar/74d85e58eea7ae3bd05956bff5cb1b49?s=50&r=g\\",\\"https://www.baeldung.com/wp-content/uploads/2022/04/announcement-icon.png\\",\\"https://www.baeldung.com/wp-content/uploads/2016/05/baeldung-rest-post-footer-main-1.2.0.jpg\\"],\\"datePublished\\":\\"2022-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T09:18:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"JavaFX Button 事件处理器添加指南 1. 引言 1.1. 概述 在这个简短的教程中，我们将查看JavaFX的_Button_组件，并了解如何处理用户交互。 1.2. JavaFX API 在Java 8、9和10中，无需额外设置即可开始使用JavaFX库。从JDK 11开始，该项目将从JDK中移除，应将以下依赖项添加到pom.xml中： 2..."},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[{"level":3,"title":"1.1. 概述","slug":"_1-1-概述","link":"#_1-1-概述","children":[]},{"level":3,"title":"1.2. JavaFX API","slug":"_1-2-javafx-api","link":"#_1-2-javafx-api","children":[]}]},{"level":2,"title":"2. 应用程序设置","slug":"_2-应用程序设置","link":"#_2-应用程序设置","children":[]},{"level":2,"title":"3. 点击事件","slug":"_3-点击事件","link":"#_3-点击事件","children":[]},{"level":2,"title":"4. 不同事件","slug":"_4-不同事件","link":"#_4-不同事件","children":[]},{"level":2,"title":"5. 重用事件处理器","slug":"_5-重用事件处理器","link":"#_5-重用事件处理器","children":[]},{"level":2,"title":"6. 结论","slug":"_6-结论","link":"#_6-结论","children":[]}],"git":{"createdTime":1721639922000,"updatedTime":1721639922000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.37,"words":1012},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Adding EventHandler to JavaFX Button.md","localizedDate":"2022年1月1日","excerpt":"<hr>\\n<h1>JavaFX Button 事件处理器添加指南</h1>\\n<h2>1. 引言</h2>\\n<h3>1.1. 概述</h3>\\n<p>在这个简短的教程中，我们将<strong>查看JavaFX的_Button_组件，并了解如何处理用户交互</strong>。</p>\\n<h3>1.2. JavaFX API</h3>\\n<p>在Java 8、9和10中，无需额外设置即可开始使用JavaFX库。从JDK 11开始，该项目将从JDK中移除，应将以下依赖项添加到pom.xml中：</p>\\n<div class=\\"language-xml\\" data-ext=\\"xml\\" data-title=\\"xml\\"><pre class=\\"language-xml\\"><code>`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependencies</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.openjfx```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```javafx-controls```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```${javafx.version}```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.openjfx```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```javafx-fxml```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n        ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```${javafx.version}```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n    ``<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependency</span><span class=\\"token punctuation\\">&gt;</span></span>``\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>dependencies</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>build</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>plugins</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n        `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>plugin</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n            ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```org.openjfx```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>groupId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n            ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```javafx-maven-plugin```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>artifactId</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n            ```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```${javafx-maven-plugin.version}```<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>version</span><span class=\\"token punctuation\\">&gt;</span></span>```\\n            `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>configuration</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n                `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>mainClass</span><span class=\\"token punctuation\\">&gt;</span></span>`Main`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>mainClass</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n            `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>configuration</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n        `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>plugin</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n    `<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>plugins</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>build</span><span class=\\"token punctuation\\">&gt;</span></span>`\\n</code></pre></div>","autoDesc":true}');export{r as comp,d as data};
