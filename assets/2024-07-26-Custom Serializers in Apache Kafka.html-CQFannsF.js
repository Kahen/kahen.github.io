import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,a as t}from"./app-CJGTm_7y.js";const p={},e=t('<h1 id="apache-kafka中的自定义序列化器" tabindex="-1"><a class="header-anchor" href="#apache-kafka中的自定义序列化器"><span>Apache Kafka中的自定义序列化器</span></a></h1><ol><li>引言</li></ol><p>在Apache Kafka中传输消息时，客户端和服务器约定使用一种共同的语法格式。Apache Kafka提供了默认的转换器（例如_String_和_Long_），但同时也支持特定用例的自定义序列化器。在本教程中，我们将看到如何实现它们。</p><p><strong>序列化是将对象转换为字节的过程</strong>。反序列化是相反的过程——将字节流转换为对象。简而言之，它<strong>将内容转换为可读和可解释的信息</strong>。</p><p>正如我们所提到的，Apache Kafka为几种基本类型提供了预构建的序列化器和反序列化器，并允许我们实现自定义序列化器：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2021/08/kafka1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>上图显示了通过网络向Kafka主题发送消息的过程。在此过程中，自定义序列化器在生产者发送消息到主题之前将对象转换为字节。同样，它还展示了反序列化器如何将字节转换回对象，以便消费者正确处理。</p><h3 id="_2-1-自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_2-1-自定义序列化器"><span>2.1. 自定义序列化器</span></a></h3><p>Apache Kafka为几种基本类型提供了预构建的序列化器和反序列化器：</p><ul><li><em>StringSerializer</em></li><li><em>ShortSerializer</em></li><li><em>IntegerSerializer</em></li><li><em>LongSerializer</em></li><li><em>DoubleSerializer</em></li><li><em>BytesSerializer</em></li></ul><p>但它还提供了实现自定义(反)序列化器的能力。为了序列化我们自己的对象，我们将实现_Serializer_接口。同样，为了创建自定义反序列化器，我们将实现_Deserializer_接口。</p><p>两个接口都有三种方法可供覆盖：</p><ul><li><em>configure</em>: 用于实现配置细节</li><li><em>serialize/deserialize</em>: <strong>这些方法包括我们自定义序列化和反序列化的实际实现</strong>。</li><li><em>close</em>: 使用此方法关闭Kafka会话</li></ul><h2 id="_3-在apache-kafka中实现自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_3-在apache-kafka中实现自定义序列化器"><span>3. 在Apache Kafka中实现自定义序列化器</span></a></h2><p><strong>Apache Kafka提供了自定义序列化器的能力</strong>。不仅可以为消息值实现特定的转换器，还可以为键实现。</p><h3 id="_3-1-依赖性" tabindex="-1"><a class="header-anchor" href="#_3-1-依赖性"><span>3.1. 依赖性</span></a></h3><p>为了实现示例，我们将简单地在_pom.xml_中添加Kafka Consumer API依赖项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>`&lt;dependency&gt;`\n    `&lt;groupId&gt;`org.apache.kafka`&lt;/groupId&gt;`\n    `&lt;artifactId&gt;`kafka-clients`&lt;/artifactId&gt;`\n    `&lt;version&gt;`3.4.0`&lt;/version&gt;`\n`&lt;/dependency&gt;`\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-自定义序列化器" tabindex="-1"><a class="header-anchor" href="#_3-2-自定义序列化器"><span>3.2. 自定义序列化器</span></a></h3><p>首先，我们将使用Lombok指定通过Kafka发送的自定义对象：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>\n<span class="token annotation punctuation">@AllArgsConstructor</span>\n<span class="token annotation punctuation">@NoArgsConstructor</span>\n<span class="token annotation punctuation">@Builder</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageDto</span> <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>\n    <span class="token keyword">private</span> <span class="token class-name">String</span> version<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们将为生产者实现Kafka提供的_Serializer_接口以发送消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomSerializer</span> <span class="token keyword">implements</span> <span class="token class-name">Serializer</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>`` configs<span class="token punctuation">,</span> <span class="token keyword">boolean</span> isKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token class-name">MessageDto</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;在序列化时收到Null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;序列化中...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsBytes</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">SerializationException</span><span class="token punctuation">(</span><span class="token string">&quot;在将MessageDto序列化为byte[]时出错&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们将覆盖接口的_serialize_方法</strong>。因此，在我们的实现中，我们将使用_Jackson ObjectMapper_转换自定义对象。然后我们将返回字节流以正确地将消息发送到网络。</p><h3 id="_3-3-自定义反序列化器" tabindex="-1"><a class="header-anchor" href="#_3-3-自定义反序列化器"><span>3.3. 自定义反序列化器</span></a></h3><p>同样，我们将为消费者实现_Deserializer_接口：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomDeserializer</span> <span class="token keyword">implements</span> <span class="token class-name">Deserializer</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>``` <span class="token punctuation">{</span>\n    <span class="token keyword">private</span> <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">Map</span>``<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span>`` configs<span class="token punctuation">,</span> <span class="token keyword">boolean</span> isKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token class-name">MessageDto</span> <span class="token function">deserialize</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;在反序列化时收到Null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;反序列化中...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> objectMapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">SerializationException</span><span class="token punctuation">(</span><span class="token string">&quot;在将byte[]反序列化为MessageDto时出错&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token annotation punctuation">@Override</span>\n    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如前一节一样，<strong>我们将覆盖接口的_deserialize_方法</strong>。因此，我们将使用相同的_Jackson ObjectMapper_将字节流转换为自定义对象。</p><h3 id="_3-4-消费示例消息" tabindex="-1"><a class="header-anchor" href="#_3-4-消费示例消息"><span>3.4. 消费示例消息</span></a></h3><p>让我们通过一个工作示例来发送和接收带有自定义序列化器和反序列化器的示例消息。</p><p>首先，我们将创建并配置Kafka生产者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">KafkaProducer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">createKafkaProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> kafka<span class="token punctuation">.</span><span class="token function">getBootstrapServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">CLIENT_ID_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">CONSUMER_APP_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;org.apache.kafka.common.serialization.StringSerializer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_SERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;com.baeldung.kafka.serdes.CustomSerializer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们将配置值序列化器属性为我们的自定义类</strong>，并将键序列化器配置为默认的_StringSerializer_。</p><p>其次，我们将创建Kafka消费者：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">KafkaConsumer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>`````` <span class="token function">createKafkaConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token class-name">Properties</span> props <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">BOOTSTRAP_SERVERS_CONFIG</span><span class="token punctuation">,</span> kafka<span class="token punctuation">.</span><span class="token function">getBootstrapServers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">CLIENT_ID_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">CONSUMER_APP_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">GROUP_ID_CONFIG</span><span class="token punctuation">,</span> <span class="token constant">CONSUMER_GROUP_ID</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">AUTO_OFFSET_RESET_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;earliest&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">KEY_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;org.apache.kafka.common.serialization.StringDeserializer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    props<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ConsumerConfig</span><span class="token punctuation">.</span><span class="token constant">VALUE_DESERIALIZER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token string">&quot;com.baeldung.kafka.serdes.CustomDeserializer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>除了键和值反序列化器使用我们的自定义类</strong>，还必须包括组ID。除此之外，我们将自动偏移重置配置设置为_earliest_，以确保生产者在消费者开始之前发送了所有消息。</p><p>一旦我们创建了生产者和消费者客户端，就是时候发送一个示例消息了：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MessageDto</span> msgProd <span class="token operator">=</span> <span class="token class-name">MessageDto</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">message</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token string">&quot;1.0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">KafkaProducer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>`````` producer <span class="token operator">=</span> <span class="token function">createKafkaProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>``````<span class="token punctuation">(</span><span class="token constant">TOPIC</span><span class="token punctuation">,</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> msgProd<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;已发送消息 &quot;</span> <span class="token operator">+</span> msgProd<span class="token punctuation">)</span><span class="token punctuation">;</span>\nproducer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以通过订阅主题来使用消费者接收消息：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">AtomicReference</span>```<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>``` msgCons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">KafkaConsumer</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>`````` consumer <span class="token operator">=</span> <span class="token function">createKafkaConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token constant">TOPIC</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token class-name">ConsumerRecords</span>``````<span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">MessageDto</span><span class="token punctuation">&gt;</span></span>`````` records <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nrecords<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>record <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>\n    msgCons<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;已接收消息 &quot;</span> <span class="token operator">+</span> record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nconsumer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台中的结果是：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>序列化中...\n已发送消息 MessageDto(message=test, version=1.0)\n反序列化中...\n已接收消息 MessageDto(message=test, version=1.0)\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本教程中，我们展示了生产者如何在Apache Kafka中使用序列化器通过网络发送消息。同样，我们还展示了消费者如何使用反序列化器来解释接收到的消息。</p><p>此外，我们学习了可用的默认序列化器，最重要的是，实现了自定义序列化器和反序列化器的能力。</p><p>如常，代码可在GitHub上找到。 OK</p>',46),o=[e];function c(l,i){return a(),s("div",null,o)}const r=n(p,[["render",c],["__file","2024-07-26-Custom Serializers in Apache Kafka.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/2024-07-26/2024-07-26-Custom%20Serializers%20in%20Apache%20Kafka.html","title":"Apache Kafka中的自定义序列化器","lang":"zh-CN","frontmatter":{"date":"2024-07-26T00:00:00.000Z","category":["Apache Kafka","序列化"],"tag":["Kafka","序列化","自定义序列化器"],"head":[["meta",{"name":"keywords","content":"Apache Kafka, 自定义序列化器, 消息传输, 序列化, 反序列化"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-26/2024-07-26-Custom%20Serializers%20in%20Apache%20Kafka.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Apache Kafka中的自定义序列化器"}],["meta",{"property":"og:description","content":"Apache Kafka中的自定义序列化器 引言 在Apache Kafka中传输消息时，客户端和服务器约定使用一种共同的语法格式。Apache Kafka提供了默认的转换器（例如_String_和_Long_），但同时也支持特定用例的自定义序列化器。在本教程中，我们将看到如何实现它们。 序列化是将对象转换为字节的过程。反序列化是相反的过程——将字节流..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2021/08/kafka1.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-26T16:22:10.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Kafka"}],["meta",{"property":"article:tag","content":"序列化"}],["meta",{"property":"article:tag","content":"自定义序列化器"}],["meta",{"property":"article:published_time","content":"2024-07-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-26T16:22:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache Kafka中的自定义序列化器\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2021/08/kafka1.png\\"],\\"datePublished\\":\\"2024-07-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-26T16:22:10.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Apache Kafka中的自定义序列化器 引言 在Apache Kafka中传输消息时，客户端和服务器约定使用一种共同的语法格式。Apache Kafka提供了默认的转换器（例如_String_和_Long_），但同时也支持特定用例的自定义序列化器。在本教程中，我们将看到如何实现它们。 序列化是将对象转换为字节的过程。反序列化是相反的过程——将字节流..."},"headers":[{"level":3,"title":"2.1. 自定义序列化器","slug":"_2-1-自定义序列化器","link":"#_2-1-自定义序列化器","children":[]},{"level":2,"title":"3. 在Apache Kafka中实现自定义序列化器","slug":"_3-在apache-kafka中实现自定义序列化器","link":"#_3-在apache-kafka中实现自定义序列化器","children":[{"level":3,"title":"3.1. 依赖性","slug":"_3-1-依赖性","link":"#_3-1-依赖性","children":[]},{"level":3,"title":"3.2. 自定义序列化器","slug":"_3-2-自定义序列化器","link":"#_3-2-自定义序列化器","children":[]},{"level":3,"title":"3.3. 自定义反序列化器","slug":"_3-3-自定义反序列化器","link":"#_3-3-自定义反序列化器","children":[]},{"level":3,"title":"3.4. 消费示例消息","slug":"_3-4-消费示例消息","link":"#_3-4-消费示例消息","children":[]}]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1722010930000,"updatedTime":1722010930000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":4.75,"words":1424},"filePathRelative":"posts/baeldung/2024-07-26/2024-07-26-Custom Serializers in Apache Kafka.md","localizedDate":"2024年7月26日","excerpt":"\\n<ol>\\n<li>引言</li>\\n</ol>\\n<p>在Apache Kafka中传输消息时，客户端和服务器约定使用一种共同的语法格式。Apache Kafka提供了默认的转换器（例如_String_和_Long_），但同时也支持特定用例的自定义序列化器。在本教程中，我们将看到如何实现它们。</p>\\n<p><strong>序列化是将对象转换为字节的过程</strong>。反序列化是相反的过程——将字节流转换为对象。简而言之，它<strong>将内容转换为可读和可解释的信息</strong>。</p>\\n<p>正如我们所提到的，Apache Kafka为几种基本类型提供了预构建的序列化器和反序列化器，并允许我们实现自定义序列化器：</p>","autoDesc":true}');export{r as comp,d as data};
