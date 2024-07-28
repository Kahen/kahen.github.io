import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as s,a as o}from"./app-D4B8YWfq.js";const l={},d=o('<h1 id="lombok的-equalsandhashcode注解详解" tabindex="-1"><a class="header-anchor" href="#lombok的-equalsandhashcode注解详解"><span>Lombok的@EqualsAndHashCode注解详解</span></a></h1><p>在本教程中，我们将讨论Lombok的@EqualsAndHashCode注解，该注解基于类的字段生成equals()和hashCode()方法。</p><h2 id="_2-equalsandhashcode的使用" tabindex="-1"><a class="header-anchor" href="#_2-equalsandhashcode的使用"><span>2. @EqualsAndHashCode的使用</span></a></h2><p>Lombok的@EqualsAndHashCode注解默认情况下为给定类生成equals()和hashCode()方法，使用所有非静态和非瞬态字段。</p><h3 id="_3-1-在字段级别使用-equalsandhashcode-exclude排除字段" tabindex="-1"><a class="header-anchor" href="#_3-1-在字段级别使用-equalsandhashcode-exclude排除字段"><span>3.1. 在字段级别使用@EqualsAndHashCode.Exclude排除字段</span></a></h3><p>我们可以使用@EqualsAndHashCode.Exclude注解指示Lombok从equals()和hashCode()方法的生成过程中排除一个字段。</p><h3 id="_3-2-在类级别排除字段" tabindex="-1"><a class="header-anchor" href="#_3-2-在类级别排除字段"><span>3.2. 在类级别排除字段</span></a></h3><p>我们也可以在类级别使用@EqualsAndHashCode.Exclude注解来排除字段。</p><h3 id="_4-1-在字段级别包含特定字段" tabindex="-1"><a class="header-anchor" href="#_4-1-在字段级别包含特定字段"><span>4.1. 在字段级别包含特定字段</span></a></h3><p>要在使用equals()和hashCode()方法生成时包含特定字段，我们可以使用@EqualsAndHashCode.Include注解。</p><h3 id="_4-2-在方法级别包含" tabindex="-1"><a class="header-anchor" href="#_4-2-在方法级别包含"><span>4.2. 在方法级别包含</span></a></h3><p>此外，我们可以通过使用@EqualsAndHashCode.Include注解将自定义方法的结果合并到equals()和hashCode()方法中。</p><h3 id="_4-3-在类级别包含" tabindex="-1"><a class="header-anchor" href="#_4-3-在类级别包含"><span>4.3. 在类级别包含</span></a></h3><p>@EqualsAndHashCode注解包括一个of属性来定义要包含的字段。</p><h2 id="_5-继承中的-equalsandhashcode" tabindex="-1"><a class="header-anchor" href="#_5-继承中的-equalsandhashcode"><span>5. 继承中的@EqualsAndHashCode</span></a></h2><p>当一个类扩展另一个类时，Lombok的@EqualsAndHashCode生成的方法默认不会调用父类的equals()和hashCode()方法。</p><h2 id="_6-lombok-equalsandhashcode配置" tabindex="-1"><a class="header-anchor" href="#_6-lombok-equalsandhashcode配置"><span>6. Lombok @EqualsAndHashCode配置</span></a></h2><p>要配置@EqualsAndHashCode注解的行为，我们需要在我们的项目中创建一个lombok.config文件。</p><h3 id="_6-1-lombok-equalsandhashcode-donotusegetters" tabindex="-1"><a class="header-anchor" href="#_6-1-lombok-equalsandhashcode-donotusegetters"><span>6.1. lombok.equalsAndHashCode.doNotUseGetters</span></a></h3><p>lombok.equalsAndHashCode.doNotUseGetters配置键可以设置为true或false（默认为false）。</p><h3 id="_6-2-lombok-equalsandhashcode-callsuper" tabindex="-1"><a class="header-anchor" href="#_6-2-lombok-equalsandhashcode-callsuper"><span>6.2. lombok.equalsAndHashCode.callSuper</span></a></h3><p>lombok.equalsAndHashCode.callSuper配置键可以设置为call, skip或warn（默认为warn）。</p><h3 id="_6-3-lombok-equalsandhashcode-flagusage" tabindex="-1"><a class="header-anchor" href="#_6-3-lombok-equalsandhashcode-flagusage"><span>6.3. lombok.equalsAndHashCode.flagUsage</span></a></h3><p>Lombok将根据配置将任何@EqualsAndHashCode的使用标记为警告或错误。</p><h2 id="_7-使用-equalsandhashcode解的优点和缺点" tabindex="-1"><a class="header-anchor" href="#_7-使用-equalsandhashcode解的优点和缺点"><span>7. 使用@EqualsAndHashCode解的优点和缺点</span></a></h2><p>使用Lombok的@EqualsAndHashCode注解有优点也有缺点。</p><h3 id="_7-1-优点" tabindex="-1"><a class="header-anchor" href="#_7-1-优点"><span>7.1. 优点</span></a></h3><p>Lombok的@EqualsAndHashCode注解是简化equals()和hashCode()方法创建的有用技术。</p><h3 id="_7-2-缺点" tabindex="-1"><a class="header-anchor" href="#_7-2-缺点"><span>7.2. 缺点</span></a></h3><p>使用Lombok的@EqualsAndHashCode注解有几个缺点。首先，当两个对象具有不同的字段值但相同的哈希码时，它可能会生成不必要的哈希码冲突。</p><h2 id="_8-常见问题" tabindex="-1"><a class="header-anchor" href="#_8-常见问题"><span>8. 常见问题</span></a></h2><p>当在具有双向关系的类上使用Lombok的@EqualsAndHashCode注解时，例如父子关系，可能会发生java.lang.StackOverflowError。</p><h2 id="_9-结论" tabindex="-1"><a class="header-anchor" href="#_9-结论"><span>9. 结论</span></a></h2><p>在本文中，我们看到了Lombok @EqualsAndHashCode注解如何生成equals()和hashCode()方法。我们还探讨了如何在字段和类级别上进行包含和排除以自定义生成的方法。</p><p>使用Lombok @EqualsAndHashCode注解可以节省时间和精力。然而，我们应该意识到潜在的问题，例如哈希码冲突、与其他库的不兼容以及在双向关系中出现的StackOverflowError。</p>',35),h=[d];function n(t,u){return s(),e("div",null,h)}const i=a(l,[["render",n],["__file","2024-07-06-Lombok EqualsAndHashCode Annotation.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-06/2024-07-06-Lombok%20EqualsAndHashCode%20Annotation.html","title":"Lombok的@EqualsAndHashCode注解详解","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","Lombok"],"tag":["equals","hashCode"],"head":[["meta",{"name":"keywords","content":"Lombok, equals, hashCode, Java"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-06/2024-07-06-Lombok%20EqualsAndHashCode%20Annotation.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Lombok的@EqualsAndHashCode注解详解"}],["meta",{"property":"og:description","content":"Lombok的@EqualsAndHashCode注解详解 在本教程中，我们将讨论Lombok的@EqualsAndHashCode注解，该注解基于类的字段生成equals()和hashCode()方法。 2. @EqualsAndHashCode的使用 Lombok的@EqualsAndHashCode注解默认情况下为给定类生成equals()和ha..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T03:37:32.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"equals"}],["meta",{"property":"article:tag","content":"hashCode"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T03:37:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lombok的@EqualsAndHashCode注解详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T03:37:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Lombok的@EqualsAndHashCode注解详解 在本教程中，我们将讨论Lombok的@EqualsAndHashCode注解，该注解基于类的字段生成equals()和hashCode()方法。 2. @EqualsAndHashCode的使用 Lombok的@EqualsAndHashCode注解默认情况下为给定类生成equals()和ha..."},"headers":[{"level":2,"title":"2. @EqualsAndHashCode的使用","slug":"_2-equalsandhashcode的使用","link":"#_2-equalsandhashcode的使用","children":[{"level":3,"title":"3.1. 在字段级别使用@EqualsAndHashCode.Exclude排除字段","slug":"_3-1-在字段级别使用-equalsandhashcode-exclude排除字段","link":"#_3-1-在字段级别使用-equalsandhashcode-exclude排除字段","children":[]},{"level":3,"title":"3.2. 在类级别排除字段","slug":"_3-2-在类级别排除字段","link":"#_3-2-在类级别排除字段","children":[]},{"level":3,"title":"4.1. 在字段级别包含特定字段","slug":"_4-1-在字段级别包含特定字段","link":"#_4-1-在字段级别包含特定字段","children":[]},{"level":3,"title":"4.2. 在方法级别包含","slug":"_4-2-在方法级别包含","link":"#_4-2-在方法级别包含","children":[]},{"level":3,"title":"4.3. 在类级别包含","slug":"_4-3-在类级别包含","link":"#_4-3-在类级别包含","children":[]}]},{"level":2,"title":"5. 继承中的@EqualsAndHashCode","slug":"_5-继承中的-equalsandhashcode","link":"#_5-继承中的-equalsandhashcode","children":[]},{"level":2,"title":"6. Lombok @EqualsAndHashCode配置","slug":"_6-lombok-equalsandhashcode配置","link":"#_6-lombok-equalsandhashcode配置","children":[{"level":3,"title":"6.1. lombok.equalsAndHashCode.doNotUseGetters","slug":"_6-1-lombok-equalsandhashcode-donotusegetters","link":"#_6-1-lombok-equalsandhashcode-donotusegetters","children":[]},{"level":3,"title":"6.2. lombok.equalsAndHashCode.callSuper","slug":"_6-2-lombok-equalsandhashcode-callsuper","link":"#_6-2-lombok-equalsandhashcode-callsuper","children":[]},{"level":3,"title":"6.3. lombok.equalsAndHashCode.flagUsage","slug":"_6-3-lombok-equalsandhashcode-flagusage","link":"#_6-3-lombok-equalsandhashcode-flagusage","children":[]}]},{"level":2,"title":"7. 使用@EqualsAndHashCode解的优点和缺点","slug":"_7-使用-equalsandhashcode解的优点和缺点","link":"#_7-使用-equalsandhashcode解的优点和缺点","children":[{"level":3,"title":"7.1. 优点","slug":"_7-1-优点","link":"#_7-1-优点","children":[]},{"level":3,"title":"7.2. 缺点","slug":"_7-2-缺点","link":"#_7-2-缺点","children":[]}]},{"level":2,"title":"8. 常见问题","slug":"_8-常见问题","link":"#_8-常见问题","children":[]},{"level":2,"title":"9. 结论","slug":"_9-结论","link":"#_9-结论","children":[]}],"git":{"createdTime":1720237052000,"updatedTime":1720237052000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.17,"words":652},"filePathRelative":"posts/baeldung/2024-07-06/2024-07-06-Lombok EqualsAndHashCode Annotation.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将讨论Lombok的@EqualsAndHashCode注解，该注解基于类的字段生成equals()和hashCode()方法。</p>\\n<h2>2. @EqualsAndHashCode的使用</h2>\\n<p>Lombok的@EqualsAndHashCode注解默认情况下为给定类生成equals()和hashCode()方法，使用所有非静态和非瞬态字段。</p>\\n<h3>3.1. 在字段级别使用@EqualsAndHashCode.Exclude排除字段</h3>\\n<p>我们可以使用@EqualsAndHashCode.Exclude注解指示Lombok从equals()和hashCode()方法的生成过程中排除一个字段。</p>","autoDesc":true}');export{i as comp,p as data};
