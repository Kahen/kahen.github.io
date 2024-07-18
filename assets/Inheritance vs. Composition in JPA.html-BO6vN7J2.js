import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as a,a as n}from"./app-CE5go3V-.js";const i={},r=n('<h1 id="jpa中的继承与组合" tabindex="-1"><a class="header-anchor" href="#jpa中的继承与组合"><span>JPA中的继承与组合</span></a></h1><h2 id="_1-引言" tabindex="-1"><a class="header-anchor" href="#_1-引言"><span>1. 引言</span></a></h2><p>继承和组合是面向对象编程（OOP）中的两个基本概念，我们同样可以在JPA中利用它们进行数据建模。在JPA中，继承和组合都是用于建模实体之间关系的技术，但它们代表了不同类型的关系。在本教程中，我们将探讨这两种方法及其含义。</p><h2 id="_2-1-单表继承-sti" tabindex="-1"><a class="header-anchor" href="#_2-1-单表继承-sti"><span>2.1. 单表继承（STI）</span></a></h2><p>单表继承（STI）涉及将所有子类映射到单个数据库表中。通过使用鉴别器列来区分子类实例，这简化了模式管理和查询执行。</p><p>我们首先使用@Entity注解定义_Employee_实体类作为超类。接下来，我们将继承策略设置为InheritanceType.SINGLE_TABLE，以便将所有子类映射到同一个数据库表。</p><p>然后，我们使用@DiscriminatorColumn注解来指定_Employee_类中的鉴别器列。此列用于区分单表中的不同类型实体。</p><h2 id="_2-2-连接表继承-jti" tabindex="-1"><a class="header-anchor" href="#_2-2-连接表继承-jti"><span>2.2. 连接表继承（JTI）</span></a></h2><p>另一方面，连接表继承（JTI）将子类拆分到它们各自的表中。每个子类都有自己的表来存储其独特的详细信息。此外，还有一个表来保存所有子类共有的共享信息。</p><h2 id="_2-3-类表继承-tpc" tabindex="-1"><a class="header-anchor" href="#_2-3-类表继承-tpc"><span>2.3. 类表继承（TPC）</span></a></h2><p>当使用JPA中的类表继承（TPC）策略时，继承层次结构中的每个类都对应其专用的数据库表。因此，我们会看到为每个类：<em>Shape</em>、_Square_和_Circle_创建了单独的表。这与JTI不同，后者每个子类有自己的表来存储其独特细节，共享属性存储在连接表中。</p><h2 id="_3-jpa中的组合" tabindex="-1"><a class="header-anchor" href="#_3-jpa中的组合"><span>3. JPA中的组合</span></a></h2><p>组合表示一个“拥有-a”关系，其中一个对象包含另一个对象作为其组件部分。在JPA中，组合通常使用实体关系实现，例如一对一、一对多或多对多关联。</p><h3 id="_3-1-一对一组合" tabindex="-1"><a class="header-anchor" href="#_3-1-一对一组合"><span>3.1. 一对一组合</span></a></h3><p>在一对一组合关系中，一个实体包含另一个实体的一个实例作为其组件部分。这通常使用拥有实体表中的外键来引用关联实体的主键来建模。</p><h3 id="_3-2-一对多组合" tabindex="-1"><a class="header-anchor" href="#_3-2-一对多组合"><span>3.2. 一对多组合</span></a></h3><p>在一对多组合关系中，一个实体包含另一个实体的实例集合作为其部分。这通常使用“多”端实体表中的外键来引用“一”端实体的主键来建模。</p><h3 id="_3-3-多对多组合" tabindex="-1"><a class="header-anchor" href="#_3-3-多对多组合"><span>3.3. 多对多组合</span></a></h3><p>在多对多组合关系中，双方的实体都包含对方实体的实例集合作为其组件部分。这通常使用数据库中的连接表来表示实体之间的关联。</p><h2 id="_4-总结" tabindex="-1"><a class="header-anchor" href="#_4-总结"><span>4. 总结</span></a></h2><p>这个表格突出了继承和组合之间的主要区别，包括它们的关系性质、代码可重用性、灵活性和耦合度：</p><table><thead><tr><th>方面</th><th>继承</th><th>组合</th></tr></thead><tbody><tr><td>关系性质</td><td>表示一个“是一个”关系。</td><td>表示一个“拥有一个”关系。</td></tr><tr><td>代码可重用性</td><td>在层次结构内促进代码重用。子类从超类继承行为和属性。</td><td>组件可以在不同的上下文中重用，没有继承中固有的紧密耦合。</td></tr><tr><td>灵活性</td><td>更改超类可能会影响所有子类，可能导致级联变化。</td><td>个别组件的更改不会影响包含对象。</td></tr><tr><td>耦合度</td><td>类之间的紧密耦合。子类与超类的实现细节紧密绑定。</td><td>更松散的耦合。组件与包含对象解耦，减少了依赖。</td></tr></tbody></table><h2 id="_5-结论" tabindex="-1"><a class="header-anchor" href="#_5-结论"><span>5. 结论</span></a></h2><p>在本文中，我们探讨了JPA实体建模中继承和组合之间的基本差异。</p><p>继承提供了代码可重用性和清晰的层次结构，适用于子类共享共同行为和属性的场景。另一方面，组合提供了更大的灵活性和适应性，允许动态对象组装和减少组件之间的依赖。</p>',25),p=[r];function l(h,o){return a(),t("div",null,p)}const c=e(i,[["render",l],["__file","Inheritance vs. Composition in JPA.html.vue"]]),_=JSON.parse('{"path":"/posts/baeldung/Archive/Inheritance%20vs.%20Composition%20in%20JPA.html","title":"JPA中的继承与组合","lang":"zh-CN","frontmatter":{"date":"2024-06-16T00:00:00.000Z","category":["JPA","数据库"],"tag":["继承","组合"],"description":"JPA中的继承与组合 1. 引言 继承和组合是面向对象编程（OOP）中的两个基本概念，我们同样可以在JPA中利用它们进行数据建模。在JPA中，继承和组合都是用于建模实体之间关系的技术，但它们代表了不同类型的关系。在本教程中，我们将探讨这两种方法及其含义。 2.1. 单表继承（STI） 单表继承（STI）涉及将所有子类映射到单个数据库表中。通过使用鉴别器...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Inheritance%20vs.%20Composition%20in%20JPA.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"JPA中的继承与组合"}],["meta",{"property":"og:description","content":"JPA中的继承与组合 1. 引言 继承和组合是面向对象编程（OOP）中的两个基本概念，我们同样可以在JPA中利用它们进行数据建模。在JPA中，继承和组合都是用于建模实体之间关系的技术，但它们代表了不同类型的关系。在本教程中，我们将探讨这两种方法及其含义。 2.1. 单表继承（STI） 单表继承（STI）涉及将所有子类映射到单个数据库表中。通过使用鉴别器..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"继承"}],["meta",{"property":"article:tag","content":"组合"}],["meta",{"property":"article:published_time","content":"2024-06-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"JPA中的继承与组合\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-16T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 引言","slug":"_1-引言","link":"#_1-引言","children":[]},{"level":2,"title":"2.1. 单表继承（STI）","slug":"_2-1-单表继承-sti","link":"#_2-1-单表继承-sti","children":[]},{"level":2,"title":"2.2. 连接表继承（JTI）","slug":"_2-2-连接表继承-jti","link":"#_2-2-连接表继承-jti","children":[]},{"level":2,"title":"2.3. 类表继承（TPC）","slug":"_2-3-类表继承-tpc","link":"#_2-3-类表继承-tpc","children":[]},{"level":2,"title":"3. JPA中的组合","slug":"_3-jpa中的组合","link":"#_3-jpa中的组合","children":[{"level":3,"title":"3.1. 一对一组合","slug":"_3-1-一对一组合","link":"#_3-1-一对一组合","children":[]},{"level":3,"title":"3.2. 一对多组合","slug":"_3-2-一对多组合","link":"#_3-2-一对多组合","children":[]},{"level":3,"title":"3.3. 多对多组合","slug":"_3-3-多对多组合","link":"#_3-3-多对多组合","children":[]}]},{"level":2,"title":"4. 总结","slug":"_4-总结","link":"#_4-总结","children":[]},{"level":2,"title":"5. 结论","slug":"_5-结论","link":"#_5-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.35,"words":1005},"filePathRelative":"posts/baeldung/Archive/Inheritance vs. Composition in JPA.md","localizedDate":"2024年6月16日","excerpt":"\\n<h2>1. 引言</h2>\\n<p>继承和组合是面向对象编程（OOP）中的两个基本概念，我们同样可以在JPA中利用它们进行数据建模。在JPA中，继承和组合都是用于建模实体之间关系的技术，但它们代表了不同类型的关系。在本教程中，我们将探讨这两种方法及其含义。</p>\\n<h2>2.1. 单表继承（STI）</h2>\\n<p>单表继承（STI）涉及将所有子类映射到单个数据库表中。通过使用鉴别器列来区分子类实例，这简化了模式管理和查询执行。</p>\\n<p>我们首先使用@Entity注解定义_Employee_实体类作为超类。接下来，我们将继承策略设置为InheritanceType.SINGLE_TABLE，以便将所有子类映射到同一个数据库表。</p>","autoDesc":true}');export{c as comp,_ as data};
