import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as s,a as t}from"./app-Bxrsut6s.js";const e={},p=t(`<h1 id="java中使用flatbuffers进行序列化" tabindex="-1"><a class="header-anchor" href="#java中使用flatbuffers进行序列化"><span>Java中使用FlatBuffers进行序列化</span></a></h1><p>在这个教程中，我们将探索Java中的FlatBuffers，并使用它进行序列化和反序列化操作。</p><p>序列化是将Java对象转换为可以在网络上传输或在文件中持久化的字节流的过程。Java通过_java.io.Serializable_接口以及_java.io.ObjectOutputStream_和_java.io.ObjectInputStream_类提供了内置的对象序列化机制。</p><p>然而，由于它在处理复杂对象图和依赖类时的方法复杂，以及一些其他缺点，Java中有几种库可用于序列化和反序列化。</p><p>一些广泛使用的Java序列化库包括Jackson和Gson。一个较新的Java对象序列化格式标准是Protocol Buffers。Protocol Buffers是由Google开发的一种与语言无关的二进制序列化格式。它们在高性能环境和分布式系统中使用，其中效率和互操作性至关重要。</p><p>FlatBuffers是由Google开发的高效跨平台序列化库。它支持多种语言，如C、C++、Java、Kotlin和Go。FlatBuffers是为游戏开发而创建的；因此，性能和低内存开销在设计中是默认考虑的因素。</p><p>FlatBuffers和Protocol Buffers都是由Google创建的，并且是非常相似的基于二进制的数据格式。这两种格式都支持高效的高速序列化和反序列化。主要的区别在于FlatBuffers在访问之前不需要将数据解包到中间数据结构。</p><p>一个完整的FlatBuffers实现包括以下组件：</p><ul><li>一个FlatBuffer模式文件</li><li>一个_flatc_编译器</li><li>序列化和反序列化代码</li></ul><p>FlatBuffer模式文件作为我们将要使用的的数据模型结构的模板。模式文件的语法遵循类似于C类型或其他接口描述语言（IDL）格式的模式。我们需要定义模式和_flatc_编译器，然后编译模式文件。</p><p>FlatBuffer是一个包含嵌套对象（如结构体、表和向量）的二进制缓冲区，这些对象使用偏移量进行组织。</p><p>这种安排允许数据在原地遍历，类似于传统的基于指针的数据结构。然而，与许多内存中的数据结构不同，FlatBuffers严格遵循对齐和字节序（始终是小端）的规则，确保跨平台兼容性。此外，对于表对象，FlatBuffers提供了向前和向后的兼容性。</p><p>FlatBuffers中的表是用于表示具有命名字段的复杂结构的最基本数据结构。表类似于某些语言中的类或结构体，并支持多种类型的字段，如int、short、string、结构体、向量甚至其他表。</p><p>_flatc_编译器是FlatBuffers提供的关键工具，它根据模式生成各种编程语言的代码，如C++和Java，以帮助根据模式序列化和反序列化数据。这个编译器输入模式定义，并生成所需编程语言的代码。</p><p>在接下来的部分中，我们将编译我们的模式文件以生成代码。但是，我们需要首先构建并设置我们的编译器才能使用它。</p><p>我们首先将_flatbuffers_库克隆到我们的系统中：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> clone https://github.com/google/flatbuffers.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一旦创建了_flatbuffers_目录，我们使用_cmake_将库构建为可执行文件。CMake（跨平台Make）是一个开源的、平台独立的构建系统，旨在自动化构建软件项目的过程：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> flatbuffers
$ <span class="token function">mkdir</span> build
$ <span class="token builtin class-name">cd</span> build
$ cmake <span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这完成了_flatc_编译器的构建过程。我们可以通过打印版本来验证安装是否成功：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ ./flatc <span class="token parameter variable">--version</span>
flatc version <span class="token number">23.5</span>.26
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译后的文件现在存储在_flatbuffers/build_路径下，_flatc_可执行文件也在同一个目录中。我们将使用此文件构建所有模式文件，因此我们可以为此路径创建一个快捷方式或别名。</p><p>在本节中，我们将通过实现我们的用例来探索FlatBuffers库。假设我们正在开发一个跨越不同地形的游戏，如海洋、山脉和平原。每种地形都有其独特的属性。</p><p>地形信息对于加载游戏级别并将其通过网络传输给玩家是必要的。高效的序列化和反序列化是必需的。</p><p>我们将从定义我们的地形模式类型开始。在_flatbuffer_中，地形是一个表。它可以有许多属性，如名称（Sea, Land, Mountain, Desert等）、颜色和位置（以3D向量坐标的形式）。地形也可以应用效果。例如，沙漠中可能有沙尘暴或陆地上的洪水。效果可以是原始模式中的一个单独的表。</p><p>有了这个理解，让我们按照以下方式编写我们的模式：</p><div class="language-flatbuffers line-numbers-mode" data-ext="flatbuffers" data-title="flatbuffers"><pre class="language-flatbuffers"><code>namespace MyGame.baeldung;
enum Color:byte { Brown = 0, Red = 1, Green = 2, Blue = 3, White = 4 }
struct Vec3 {
  x:float;
  y:float;
  z:float;
}
table Terrain {
  pos:Vec3; // Struct.
  name:string;
  color:Color = Blue;
  navigation: string;
  effects: [Effect]
}

table Effect {
  name:string;
  damage:short;
}

root_type Terrain;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们有一个用于标识地形颜色的枚举，一个用于坐标的结构体，以及两个表，Terrain和Effect，其中Terrain是根类型。</p><p><em>flatc_编译器已经准备好了，我们使用它来编译我们的模式文件_terrain.fbs</em>：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> <span class="token variable"><span class="token variable">\`</span><span class="token operator">&lt;</span>path to schema<span class="token operator">&gt;</span><span class="token variable">\`</span></span>
$ flatc <span class="token parameter variable">--java</span> terrain.fbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该注意到，_flatc_路径可能因系统而异，这取决于前一节中描述的安装位置。</p><p>我们的模式已经编译好了，准备就绪。我们可以开始使用模式为我们的游戏创建一些地形。作为这个示例演示的一部分，我们将为地形创建一个沙漠地形和一些效果。</p><p>要在Java中使用FlatBuffers，我们需要添加一个Maven依赖项：</p><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\`com.google.flatbuffers\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`flatbuffers-java\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>\`
    \`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\`23.5.26\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>\`
\`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以导入_flatbuffers_库以及我们模式生成的文件：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token class-name">MyGame</span><span class="token punctuation">.</span>terrains<span class="token punctuation">.</span>*<span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>flatbuffers<span class="token punctuation">.</span></span><span class="token class-name">FlatBufferBuilder</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>作为编译过程的一部分生成的文件位于模式的_namespace_部分定义的相同路径下（在我们的例子中是_MyGame_）。</p><p>由于编译，我们现在可以使用一个_Effect_类，该类提供了一个_createEffect()_方法。我们将使用它来创建我们想要的效果。我们首先创建一个初始缓冲区大小为1024字节的构建器对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">FlatBufferBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FlatBufferBuilder</span><span class="token punctuation">(</span><span class="token constant">INITIAL_BUFFER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> sandstormOffset <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">createString</span><span class="token punctuation">(</span><span class="token string">&quot;sandstorm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">short</span> damage <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> sandStorm <span class="token operator">=</span> <span class="token class-name">MyGame</span><span class="token punctuation">.</span>terrains<span class="token punctuation">.</span>Effect<span class="token punctuation">.</span><span class="token function">createEffect</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> sandstormOffset<span class="token punctuation">,</span> damage<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以以相同的方式添加更多效果。</p><p>接下来，我们创建我们的沙漠地形。让我们为地形分配一个颜色，并给它一个名称和它的导航位置：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">byte</span> color <span class="token operator">=</span> <span class="token class-name">MyGame</span><span class="token punctuation">.</span>terrains<span class="token punctuation">.</span>Color<span class="token punctuation">.</span><span class="token constant">YELLOW</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> terrainName <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">createString</span><span class="token punctuation">(</span><span class="token string">&quot;Desert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> navigationName <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">createString</span><span class="token punctuation">(</span><span class="token string">&quot;south&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们使用_Terrain_类的自动生成的静态方法添加更多的地形元数据和效果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">int</span> effectOffset <span class="token operator">=</span> <span class="token class-name">MyGame</span><span class="token punctuation">.</span>terrains<span class="token punctuation">.</span>Terrain<span class="token punctuation">.</span><span class="token function">createEffectsVector</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> effects<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">startTerrain</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">addName</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> terrainName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">addColor</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">addNavigation</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> navigationName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">addEffects</span><span class="token punctuation">(</span>builder<span class="token punctuation">,</span> effectOffset<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> desert <span class="token operator">=</span> <span class="token function">endTerrain</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span><span class="token function">finish</span><span class="token punctuation">(</span>desert<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们序列化我们的地形及其效果到我们的_flatbuffer_。我们可以存储缓冲区或将其通过网络传输给客户端：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buf <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">dataBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们反序列化_flatbuffer_对象并访问地形。我们将从一个由缓冲区创建的序列化字节数组开始，并将转换为_ByteBuffer_缓冲区：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">ByteBuffer</span> buf <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>nio<span class="token punctuation">.</span></span>ByteBuffer</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这允许我们从缓冲区获取根_Terrain_对象的访问器，并访问其所有属性：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Terrain</span> myTerrain <span class="token operator">=</span> <span class="token class-name">Terrain</span><span class="token punctuation">.</span><span class="token function">getRootAsTerrain</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>terrain<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Desert&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>terrain<span class="token punctuation">.</span><span class="token function">navigation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;south&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译器生成的代码显示，每个实体的属性都有一个相关的访问器。我们也可以访问相关的效果：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">Effect</span> effect1 <span class="token operator">=</span> terrain<span class="token punctuation">.</span><span class="token function">effectsVector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Effect</span> effect2 <span class="token operator">=</span> terrain<span class="token punctuation">.</span><span class="token function">effectsVector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>effect1<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Sandstorm&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>effect2<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;Drought&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FlatBuffers主要是只读的，这是由于它们的静态模板结构。然而，我们可能会遇到需要在将_flatbuffer_发送到另一段代码之前更改其中某些内容的情况。假设我们想要将沙尘暴效果的损害分数从现有的3更新为10。</p><p>在这种情况下，_flatbuffers_的就地变异就派上用场了。</p><p>只有在我们使用_–gen-mutable_参数构建模式时，_flatbuffer_的变异才是可能的：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ ./<span class="token punctuation">..</span>/flatc --gen-mutable <span class="token parameter variable">--java</span> terrain.fbs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这为我们提供了所有访问器上的_mutate()<em>方法，我们可以使用它来就地修改_flatbuffer</em></p>`,57),l=[p];function o(c,i){return s(),n("div",null,l)}const d=a(e,[["render",o],["__file","2024-06-21-Serialization with FlatBuffers in Java.html.vue"]]),v=JSON.parse('{"path":"/posts/baeldung/2024-06-21/2024-06-21-Serialization%20with%20FlatBuffers%20in%20Java.html","title":"Java中使用FlatBuffers进行序列化","lang":"zh-CN","frontmatter":{"date":"2024-06-21T00:00:00.000Z","category":["Java","Serialization"],"tag":["FlatBuffers","Tutorial"],"head":[["meta",{"name":"keywords","content":"Java, FlatBuffers, Serialization, Tutorial, Google, Cross-platform, Game Development"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-06-21/2024-06-21-Serialization%20with%20FlatBuffers%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Java中使用FlatBuffers进行序列化"}],["meta",{"property":"og:description","content":"Java中使用FlatBuffers进行序列化 在这个教程中，我们将探索Java中的FlatBuffers，并使用它进行序列化和反序列化操作。 序列化是将Java对象转换为可以在网络上传输或在文件中持久化的字节流的过程。Java通过_java.io.Serializable_接口以及_java.io.ObjectOutputStream_和_java...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T11:12:22.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"FlatBuffers"}],["meta",{"property":"article:tag","content":"Tutorial"}],["meta",{"property":"article:published_time","content":"2024-06-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T11:12:22.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Java中使用FlatBuffers进行序列化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-21T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T11:12:22.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Java中使用FlatBuffers进行序列化 在这个教程中，我们将探索Java中的FlatBuffers，并使用它进行序列化和反序列化操作。 序列化是将Java对象转换为可以在网络上传输或在文件中持久化的字节流的过程。Java通过_java.io.Serializable_接口以及_java.io.ObjectOutputStream_和_java...."},"headers":[],"git":{"createdTime":1718968342000,"updatedTime":1718968342000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.11,"words":2132},"filePathRelative":"posts/baeldung/2024-06-21/2024-06-21-Serialization with FlatBuffers in Java.md","localizedDate":"2024年6月21日","excerpt":"\\n<p>在这个教程中，我们将探索Java中的FlatBuffers，并使用它进行序列化和反序列化操作。</p>\\n<p>序列化是将Java对象转换为可以在网络上传输或在文件中持久化的字节流的过程。Java通过_java.io.Serializable_接口以及_java.io.ObjectOutputStream_和_java.io.ObjectInputStream_类提供了内置的对象序列化机制。</p>\\n<p>然而，由于它在处理复杂对象图和依赖类时的方法复杂，以及一些其他缺点，Java中有几种库可用于序列化和反序列化。</p>\\n<p>一些广泛使用的Java序列化库包括Jackson和Gson。一个较新的Java对象序列化格式标准是Protocol Buffers。Protocol Buffers是由Google开发的一种与语言无关的二进制序列化格式。它们在高性能环境和分布式系统中使用，其中效率和互操作性至关重要。</p>","autoDesc":true}');export{d as comp,v as data};
