import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as a,a as t}from"./app-8nJ1rqSf.js";const i={},s=t(`<h1 id="cassandra中的请求路由和snitch" tabindex="-1"><a class="header-anchor" href="#cassandra中的请求路由和snitch"><span>Cassandra中的请求路由和Snitch</span></a></h1><p>在本教程中，我们将学习Snitch的作用以及Cassandra如何使用它来高效地路由请求。我们还将查看Cassandra中可用的各种类型的Snitch。</p><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><h2 id="_2-snitch是什么" tabindex="-1"><a class="header-anchor" href="#_2-snitch是什么"><span>2. Snitch是什么？</span></a></h2><p>Snitch简单地报告每个节点所属的机架和数据中心——本质上，它确定并告知Cassandra集群的网络拓扑。</p><p>有了对集群拓扑的了解，包括节点之间的相对接近性，Cassandra能够高效地将请求路由到集群中的适当节点。</p><h3 id="_2-1-写操作中的snitch" tabindex="-1"><a class="header-anchor" href="#_2-1-写操作中的snitch"><span>2.1. 写操作中的Snitch</span></a></h3><p>Cassandra使用Snitch的信息将节点分组到机架和数据中心中。<strong>为了避免在写操作期间发生相关故障，Cassandra尽一切努力不在同一机架上存储副本。</strong></p><h3 id="_2-2-读操作中的snitch" tabindex="-1"><a class="header-anchor" href="#_2-2-读操作中的snitch"><span>2.2. 读操作中的Snitch</span></a></h3><p>我们知道，在读取操作期间，Cassandra必须根据它们的一致性级别联系一些节点和副本。<strong>为了使读取操作高效，Cassandra使用Snitch的信息来识别将最快返回副本的节点。</strong></p><p>然后查询该节点以获取完整行信息。接着，Cassandra查询其他副本节点的哈希值以确保返回最新的数据。</p><h2 id="_3-snitch的类型" tabindex="-1"><a class="header-anchor" href="#_3-snitch的类型"><span>3. Snitch的类型</span></a></h2><p><strong>默认的Snitch，<em>SimpleSnitch</em>，不是拓扑感知的。也就是说，它不知道集群的机架和数据中心。</strong> 因此，它不适用于多数据中心部署。</p><p>出于这个原因，Cassandra提出了各种类型的Snitch来满足我们的要求。通常，我们可以通过在配置文件_cassandra.yml_文件中的_endpoint_snitch_属性来配置Snitch的类型。</p><p>让我们看看一些Snitch的类型以及它们的工作原理。</p><h3 id="_3-1-propertyfilesnitch" tabindex="-1"><a class="header-anchor" href="#_3-1-propertyfilesnitch"><span>3.1. <em>PropertyFileSnitch</em></span></a></h3><p>_PropertyFileSnitch_是一个机架感知的Snitch。我们可以在名为_cassandra-topology.properties_的文件中以键值属性的形式提供集群拓扑信息。在这个属性文件中，我们为每个节点提供机架和数据中心的名称。</p><p>此外，我们可以使用任何名称来命名机架和数据中心。但是**，我们需要确保数据中心名称与在keyspace定义中定义的_NetworkTopologyStrategy_相匹配。**</p><p>以下是_cassandra-topology.properties_文件的示例内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code># Cassandra节点IP=数据中心:机架
172.86.22.125=DC1:RAC1
172.80.23.120=DC1:RAC1
172.84.25.127=DC1:RAC1

192.53.34.122=DC1:RAC2
192.55.36.134=DC1:RAC2
192.57.302.112=DC1:RAC2

# 未知节点的默认设置
default=DC1:RAC1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，有两个机架（RAC1, RAC2）和一个数据中心（DC1）。任何未覆盖的节点IP将落入默认数据中心（DC1）和机架（RAC1）。</p><p>这种Snitch的一个缺点是，我们需要确保_cassandra-topology.properties_文件与集群中的所有节点保持同步。</p><h3 id="_3-2-gossipingpropertyfilesnitch" tabindex="-1"><a class="header-anchor" href="#_3-2-gossipingpropertyfilesnitch"><span>3.2. <em>GossipingPropertyFileSnitch</em></span></a></h3><p>_GossipingPropertyFileSnitch_也是一个机架感知的Snitch。为了避免像_PropertyFileSnitch_那样手动同步机架和数据中心，在这个Snitch中，我们只需要在_cassandra-rackdc.properties_文件中为每个节点单独定义机架和数据中心的名称。</p><p><strong>这些机架和数据中心的信息将使用gossip协议与所有节点交换。</strong></p><p>以下是_cassandra-rackdc.properties_文件的示例内容：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>dc=DC1
rack=RAC1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-ec2snitch" tabindex="-1"><a class="header-anchor" href="#_3-3-ec2snitch"><span>3.3. <em>Ec2Snitch</em></span></a></h3><p>顾名思义，_Ec2Snitch_与在Amazon Web Service (AWS) EC2中的集群部署有关。在单个AWS区域部署中，区域名称被视为数据中心，可用区名称被视为机架。</p><p>如果我们只需要单数据中心部署，则不需要属性配置。而在多数据中心部署的情况下，我们可以在_cassandra-rackdc.properties_文件中指定_dc_suffix_。</p><p>例如，在_us-east_区域，如果我们需要几个数据中心，我们可以提供_dc_suffix_配置如下：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>dc_suffix=_1_DC1
dc_suffix=_1_DC2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述每个配置进入两个不同的节点。因此，结果为_us_east_1_DC1_和_us_east_1_DC2_作为数据中心的名称。</p><h3 id="_3-4-ec2multiregionsnitch" tabindex="-1"><a class="header-anchor" href="#_3-4-ec2multiregionsnitch"><span>3.4. <em>Ec2MultiRegionSnitch</em></span></a></h3><p>在AWS的多区域集群部署中，我们应该使用_Ec2MultiRegionSnitch_。此外，我们需要配置_cassandra.yaml_和_cassandra-rackdc.properties_。</p><p>我们必须将公共IP地址配置为_broadcast_address_，并且如果需要，也可以将其用作_cassandra.yaml_中的种子节点。此外，我们必须将专用IP地址配置为_listen_address._ 最后，我们必须在公共IP防火墙上打开_session_port_或_ssl_session_port_。</p><p>这些配置允许节点跨AWS区域通信，从而实现跨区域的多数据中心部署。在单区域的情况下，Cassandra节点在建立连接后切换到专用IP地址进行通信。</p><p><em>cassandra_rackdc.properties_中每个节点跨区域的_dc_suffix_数据中心配置类似于_Ec2Snitch</em>。</p><h3 id="_3-5-googlecloudsnitch" tabindex="-1"><a class="header-anchor" href="#_3-5-googlecloudsnitch"><span>3.5. <em>GoogleCloudSnitch</em></span></a></h3><p>顾名思义，_GoogleCloudSnitch_用于在Google Cloud Platform的一个或多个区域中部署集群。与AWS类似，区域名称被视为数据中心，可用区是机架。</p><p>在单数据中心部署的情况下，我们不需要任何配置。相反，在多数据中心部署的情况下，类似于_Ec2Snitch_，我们可以在_cassandra-rackdc.properties_文件中设置_dc_suffix_。</p><h3 id="_3-6-rackinferringsnitch" tabindex="-1"><a class="header-anchor" href="#_3-6-rackinferringsnitch"><span>3.6. <em>RackInferringSnitch</em></span></a></h3><p>_RackInferringSnitch_根据节点IP地址的第三和第二八位推断节点到机架和数据中心的接近度。</p><h2 id="_4-动态snitching" tabindex="-1"><a class="header-anchor" href="#_4-动态snitching"><span>4. 动态Snitching</span></a></h2><p>默认情况下，Cassandra将我们在_cassandra.yml_文件中配置的任何Snitch类型包装在另一种称为_DynamicEndpointSnitch_的Snitch中。这种动态Snitch从已经配置的基础Snitch中获取集群拓扑的基本信息。然后，它监控节点的读取延迟，甚至跟踪任何节点的压缩操作。</p><p><strong>然后，动态Snitch使用这些性能数据来为任何读取查询选择最佳的副本节点。</strong> 这样，Cassandra避免了将读取请求路由到表现不佳或忙碌（性能慢）的副本节点。</p><p>动态Snitch使用gossip使用的_Phi accrual failure detection_机制的修改版本来确定读取请求上的最佳副本节点。_badness threshold_是一个可配置的参数，它决定了首选节点必须与表现最佳的节点相比表现得多差，才能失去其优先地位。</p><p>Cassandra定期重置每个节点的性能分数，以允许表现不佳的节点恢复并表现得更好，以便重新获得其优先地位。</p><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本教程中，我们学习了什么是Snitch，并且还了解了我们可以在Cassandra集群部署中配置的一些Snitch类型。</p>`,50),c=[s];function r(h,d){return a(),e("div",null,c)}const o=n(i,[["render",r],["__file","2024-07-24-Request Routing and Snitches in Cassandra.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/2024-07-24/2024-07-24-Request%20Routing%20and%20Snitches%20in%20Cassandra.html","title":"Cassandra中的请求路由和Snitch","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Cassandra","Database"],"tag":["Snitch","Request Routing"],"head":[["meta",{"name":"keywords","content":"Cassandra, Snitch, Request Routing, Database"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-24/2024-07-24-Request%20Routing%20and%20Snitches%20in%20Cassandra.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Cassandra中的请求路由和Snitch"}],["meta",{"property":"og:description","content":"Cassandra中的请求路由和Snitch 在本教程中，我们将学习Snitch的作用以及Cassandra如何使用它来高效地路由请求。我们还将查看Cassandra中可用的各种类型的Snitch。 1. 概述 2. Snitch是什么？ Snitch简单地报告每个节点所属的机架和数据中心——本质上，它确定并告知Cassandra集群的网络拓扑。 有了..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-24T13:29:30.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Snitch"}],["meta",{"property":"article:tag","content":"Request Routing"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-24T13:29:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cassandra中的请求路由和Snitch\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-24T13:29:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Cassandra中的请求路由和Snitch 在本教程中，我们将学习Snitch的作用以及Cassandra如何使用它来高效地路由请求。我们还将查看Cassandra中可用的各种类型的Snitch。 1. 概述 2. Snitch是什么？ Snitch简单地报告每个节点所属的机架和数据中心——本质上，它确定并告知Cassandra集群的网络拓扑。 有了..."},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. Snitch是什么？","slug":"_2-snitch是什么","link":"#_2-snitch是什么","children":[{"level":3,"title":"2.1. 写操作中的Snitch","slug":"_2-1-写操作中的snitch","link":"#_2-1-写操作中的snitch","children":[]},{"level":3,"title":"2.2. 读操作中的Snitch","slug":"_2-2-读操作中的snitch","link":"#_2-2-读操作中的snitch","children":[]}]},{"level":2,"title":"3. Snitch的类型","slug":"_3-snitch的类型","link":"#_3-snitch的类型","children":[{"level":3,"title":"3.1. PropertyFileSnitch","slug":"_3-1-propertyfilesnitch","link":"#_3-1-propertyfilesnitch","children":[]},{"level":3,"title":"3.2. GossipingPropertyFileSnitch","slug":"_3-2-gossipingpropertyfilesnitch","link":"#_3-2-gossipingpropertyfilesnitch","children":[]},{"level":3,"title":"3.3. Ec2Snitch","slug":"_3-3-ec2snitch","link":"#_3-3-ec2snitch","children":[]},{"level":3,"title":"3.4. Ec2MultiRegionSnitch","slug":"_3-4-ec2multiregionsnitch","link":"#_3-4-ec2multiregionsnitch","children":[]},{"level":3,"title":"3.5. GoogleCloudSnitch","slug":"_3-5-googlecloudsnitch","link":"#_3-5-googlecloudsnitch","children":[]},{"level":3,"title":"3.6. RackInferringSnitch","slug":"_3-6-rackinferringsnitch","link":"#_3-6-rackinferringsnitch","children":[]}]},{"level":2,"title":"4. 动态Snitching","slug":"_4-动态snitching","link":"#_4-动态snitching","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1721827770000,"updatedTime":1721827770000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":5.34,"words":1601},"filePathRelative":"posts/baeldung/2024-07-24/2024-07-24-Request Routing and Snitches in Cassandra.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将学习Snitch的作用以及Cassandra如何使用它来高效地路由请求。我们还将查看Cassandra中可用的各种类型的Snitch。</p>\\n<h2>1. 概述</h2>\\n<h2>2. Snitch是什么？</h2>\\n<p>Snitch简单地报告每个节点所属的机架和数据中心——本质上，它确定并告知Cassandra集群的网络拓扑。</p>\\n<p>有了对集群拓扑的了解，包括节点之间的相对接近性，Cassandra能够高效地将请求路由到集群中的适当节点。</p>\\n<h3>2.1. 写操作中的Snitch</h3>\\n<p>Cassandra使用Snitch的信息将节点分组到机架和数据中心中。<strong>为了避免在写操作期间发生相关故障，Cassandra尽一切努力不在同一机架上存储副本。</strong></p>","autoDesc":true}');export{o as comp,_ as data};
