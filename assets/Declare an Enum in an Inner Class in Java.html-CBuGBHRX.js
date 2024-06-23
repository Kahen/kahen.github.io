import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,a as t}from"./app-CPbsBEaw.js";const i={},r=t(`<h1 id="在java中声明内部类的枚举" tabindex="-1"><a class="header-anchor" href="#在java中声明内部类的枚举"><span>在Java中声明内部类的枚举</span></a></h1><p>当我们使用Java进行编程时，枚举是一种方便的方式来定义一组固定的常量。然而，在Java 16之前的版本中，在内部类中创建枚举可能会引入一些复杂性和考虑因素。</p><p>在本教程中，我们将深入探讨Java 16之前内部类中静态类型的历史悠久限制，然后讨论Java 16及更高版本中这些规则的显著放宽。</p><p>在Java 16之前，Java语言规范（JLS）严格规定了内部类中静态类型的规则：</p><ul><li>嵌套的枚举类型隐式地是静态的，如JLS §8.9所述。</li><li>在非静态嵌套类型（内部类）中声明静态嵌套类型（包括枚举）是被禁止的，如JLS §8.1.3所述。</li></ul><p>让我们用一个Java 16之前的版本中的例子来说明这个限制：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class Outer {
    public class Inner {
        public static enum MyEnum {
            VALUE1, VALUE2, VALUE3
        }
    }
    public static void main(String[] args) {
        Outer outer = new Outer();
        Outer.Inner.MyEnum value = Outer.Inner.MyEnum.VALUE1;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Java 16之前的版本中，尝试将_MyEnum_枚举定义为非静态内部类的静态成员会导致编译错误。</p><p>Java 16引入了一项重大变化，实施了JEP 395，放宽了有关内部类中静态成员的某些规则。</p><p>这种放宽反映在JLS中§8.1.3的措辞更新中，明确允许内部类声明和继承静态成员，包括静态枚举，尽管内部类本身不是静态的。</p><p>相应地，之前的代码片段将成功运行，我们可以使用完全限定名称_Outer.Inner.MyEnum.VALUE1_来访问枚举常量（<em>VALUE1</em>、<em>VALUE2_和_VALUE3</em>）。</p><p>总之，Java 16及更高版本中关于内部类中静态类型，包括枚举的规则放宽，代表了Java语言特性的重要演变。此外，这一变化使开发人员能够采用更灵活和富有表现力的编码模式，增强了内部类中代码的封装和组织。</p><p>如常，我们可以在GitHub上找到本文的完整代码示例。</p>`,13),l=[r];function s(c,p){return n(),e("div",null,l)}const m=a(i,[["render",s],["__file","Declare an Enum in an Inner Class in Java.html.vue"]]),d=JSON.parse('{"path":"/posts/baeldung/Archive/Declare%20an%20Enum%20in%20an%20Inner%20Class%20in%20Java.html","title":"在Java中声明内部类的枚举","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Java","Programming"],"tag":["Java Enums","Inner Classes"],"description":"在Java中声明内部类的枚举 当我们使用Java进行编程时，枚举是一种方便的方式来定义一组固定的常量。然而，在Java 16之前的版本中，在内部类中创建枚举可能会引入一些复杂性和考虑因素。 在本教程中，我们将深入探讨Java 16之前内部类中静态类型的历史悠久限制，然后讨论Java 16及更高版本中这些规则的显著放宽。 在Java 16之前，Java语...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Declare%20an%20Enum%20in%20an%20Inner%20Class%20in%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在Java中声明内部类的枚举"}],["meta",{"property":"og:description","content":"在Java中声明内部类的枚举 当我们使用Java进行编程时，枚举是一种方便的方式来定义一组固定的常量。然而，在Java 16之前的版本中，在内部类中创建枚举可能会引入一些复杂性和考虑因素。 在本教程中，我们将深入探讨Java 16之前内部类中静态类型的历史悠久限制，然后讨论Java 16及更高版本中这些规则的显著放宽。 在Java 16之前，Java语..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Java Enums"}],["meta",{"property":"article:tag","content":"Inner Classes"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在Java中声明内部类的枚举\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":1.79,"words":536},"filePathRelative":"posts/baeldung/Archive/Declare an Enum in an Inner Class in Java.md","localizedDate":"2024年6月14日","excerpt":"\\n<p>当我们使用Java进行编程时，枚举是一种方便的方式来定义一组固定的常量。然而，在Java 16之前的版本中，在内部类中创建枚举可能会引入一些复杂性和考虑因素。</p>\\n<p>在本教程中，我们将深入探讨Java 16之前内部类中静态类型的历史悠久限制，然后讨论Java 16及更高版本中这些规则的显著放宽。</p>\\n<p>在Java 16之前，Java语言规范（JLS）严格规定了内部类中静态类型的规则：</p>\\n<ul>\\n<li>嵌套的枚举类型隐式地是静态的，如JLS §8.9所述。</li>\\n<li>在非静态嵌套类型（内部类）中声明静态嵌套类型（包括枚举）是被禁止的，如JLS §8.1.3所述。</li>\\n</ul>","autoDesc":true}');export{m as comp,d as data};
