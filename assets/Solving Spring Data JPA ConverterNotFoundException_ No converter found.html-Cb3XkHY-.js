import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as i,a as t}from"./app-D5eVDadB.js";const a={},l=t(`<h1 id="解决spring-data-jpa转换器未找到异常-没有找到转换器-baeldung" tabindex="-1"><a class="header-anchor" href="#解决spring-data-jpa转换器未找到异常-没有找到转换器-baeldung"><span>解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung</span></a></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述"><span>1. 概述</span></a></h2><p>在使用Spring Data JPA时，我们经常利用派生和自定义查询以我们偏好的格式返回结果。一个典型的例子是DTO投影，它提供了一种很好的方式仅选择某些特定列，减少选择不必要数据的开销。</p><p>然而，DTO投影并不总是容易实现，如果实现不当可能会导致_ConverterNotFoundException_。因此，在本简短教程中，我们将阐明如何在使用Spring Data JPA时避免_ConverterNotFoundException_异常。</p><h2 id="_2-实践中的异常理解" tabindex="-1"><a class="header-anchor" href="#_2-实践中的异常理解"><span>2. 实践中的异常理解</span></a></h2><p>在跳转到解决方案之前，让我们通过一个实际例子来理解异常及其堆栈跟踪的含义。</p><p>为了简化事情，我们将使用H2数据库。首先，让我们在_pom.xml_文件中添加它的依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\\&lt;dependency\\&gt;
    \\&lt;groupId\\&gt;com.h2database\\&lt;/groupId\\&gt;
    \\&lt;artifactId\\&gt;h2\\&lt;/artifactId\\&gt;
    \\&lt;version\\&gt;2.2.224\\&lt;/version\\&gt;
\\&lt;/dependency\\&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-h2配置" tabindex="-1"><a class="header-anchor" href="#_2-1-h2配置"><span>2.1. H2配置</span></a></h3><p>Spring Boot为H2嵌入式数据库提供了内在支持。<strong>按照设计，它配置应用程序使用用户名_sa_和空密码连接到H2</strong>。</p><p>首先，让我们在_application.properties_文件中添加数据库连接凭据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>spring.datasource.url=jdbc:h2:mem:mydb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是我们需要设置的H2配置与Spring Boot。</p><h3 id="_2-2-实体类" tabindex="-1"><a class="header-anchor" href="#_2-2-实体类"><span>2.2. 实体类</span></a></h3><p>现在，让我们定义一个JPA实体。例如，我们考虑_Employee_类：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Entity
public class Employee {

    @Id
    private int id;
    @Column
    private String firstName;
    @Column
    private String lastName;
    @Column
    private double salary;

    // 标准的getter和setter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们通过标识符、名字、姓氏和薪水来定义一个员工。</p><p>通常，我们使用_@Entity_注解来表示_Employee_类是一个JPA实体。此外，<em>@Id_标记表示主键的字段。此外，我们使用</em>@Column_将每个实体字段绑定到其相应的表列。</p><h3 id="_2-3-jpa存储库" tabindex="-1"><a class="header-anchor" href="#_2-3-jpa存储库"><span>2.3. JPA存储库</span></a></h3><p>接下来，我们将创建一个Spring Data JPA存储库来处理存储和检索员工的逻辑：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Repository
public interface EmployeeRepository extends JpaRepository\\&lt;Employee, Integer\\&gt; {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们将假设我们需要显示员工的全名。因此，我们将依赖DTO投影来仅选择_firstName_和_lastName_。</p><p>由于_Employee_类包含额外的数据，让我们创建一个名为_EmployeeFullName_的新类，其中仅包含名字和姓氏：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public class EmployeeFullName {

    private String firstName;
    private String lastName;

    // 标准的getter和setter

    public String fullName() {
        return getFirstName()
              .concat(&quot; &quot;)
              .concat(getLastName());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>值得注意的是，我们创建了一个自定义方法_fullName()_来显示员工的全名</strong>。现在，让我们向_EmployeeRepository_添加一个派生查询，以返回员工的全名：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>EmployeeFullName findEmployeeFullNameById(int id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们创建一个测试以确保一切按预期工作：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmployee_whenGettingFullName_thenThrowException() {
    Employee emp = new Employee();
    emp.setId(1);
    emp.setFirstName(&quot;Adrien&quot;);
    emp.setLastName(&quot;Juguet&quot;);
    emp.setSalary(4000);

    employeeRepository.save(emp);

    assertThatThrownBy(() -\\&gt; employeeRepository
      .findEmployeeFullNameById(1))
      .isInstanceOfAny(ConverterNotFoundException.class)
      .hasMessageContaining(&quot;No converter found capable of converting from type&quot;
        + &quot;[com.baeldung.spring.data.noconverterfound.models.Employee&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所示，测试因_ConverterNotFoundException_失败。</p><p>异常的根本原因是_JpaRepository_期望其派生查询返回_Employee_实体类的实例。<strong>由于方法返回一个_EmployeeFullName_对象，Spring Data JPA无法找到合适的转换器将预期的_Employee_对象转换为新的_EmployeeFullName_对象</strong>。</p><h2 id="_3-解决方案" tabindex="-1"><a class="header-anchor" href="#_3-解决方案"><span>3. 解决方案</span></a></h2><p>当使用类来实现DTO投影时，Spring Data JPA默认使用构造函数来确定应该检索的字段。<strong>因此，这里的基本解决方案是向_EmployeeFullName_类添加一个参数化构造函数</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public EmployeeFullName(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，我们告诉Spring Data JPA仅选择_firstName_和_lastName_。现在，让我们添加另一个测试来测试解决方案：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmployee_whenGettingFullNameUsingClass_thenReturnFullName() {
    Employee emp = new Employee();
    emp.setId(2);
    emp.setFirstName(&quot;Azhrioun&quot;);
    emp.setLastName(&quot;Abderrahim&quot;);
    emp.setSalary(3500);

    employeeRepository.save(emp);

    assertThat(employeeRepository.findEmployeeFullNameById(2).fullName())
      .isEqualTo(&quot;Azhrioun Abderrahim&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不出所料，测试成功通过。</p><p><strong>另一种解决方案是使用基于接口的投影</strong>。这样，我们就不必担心构造函数。<strong>因此，我们可以使用一个接口而不是一个类，该接口公开了要读取的字段的getter</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>public interface IEmployeeFullName {
    String getFirstName();

    String getLastName();

    default String fullName() {
        return getFirstName().concat(&quot; &quot;)
          .concat(getLastName());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，我们使用了一个默认方法来显示全名。接下来，让我们创建另一个派生查询，返回类型为_IEmployeeFullName_的实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>IEmployeeFullName findIEmployeeFullNameById(int id);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，让我们添加另一个测试来验证这第二个解决方案：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>@Test
void givenEmployee_whenGettingFullNameUsingInterface_thenReturnFullName() {
    Employee emp = new Employee();
    emp.setId(3);
    emp.setFirstName(&quot;Eva&quot;);
    emp.setLastName(&quot;Smith&quot;);
    emp.setSalary(6500);

    employeeRepository.save(emp);

    assertThat(employeeRepository.findIEmployeeFullNameById(3).fullName())
      .isEqualTo(&quot;Eva Smith&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正如预期的那样，基于接口的解决方案奏效。</p><h2 id="_4-结论" tabindex="-1"><a class="header-anchor" href="#_4-结论"><span>4. 结论</span></a></h2><p>在本文中，我们学习了什么导致Spring Data JPA出现_ConverterNotFoundException_。在此过程中，我们看到了如何在实践中重现和修复异常。</p><p>如常，示例的完整源代码可在GitHub上找到。</p>`,46),s=[l];function d(r,o){return i(),n("div",null,s)}const p=e(a,[["render",d],["__file","Solving Spring Data JPA ConverterNotFoundException_ No converter found.html.vue"]]),c=JSON.parse('{"path":"/posts/baeldung/Archive/Solving%20Spring%20Data%20JPA%20ConverterNotFoundException_%20No%20converter%20found.html","title":"解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung","lang":"zh-CN","frontmatter":{"date":"2024-06-14T00:00:00.000Z","category":["Spring Data JPA","ConverterNotFoundException"],"tag":["Spring Data JPA","JPA","DTO","Converter"],"description":"解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung 1. 概述 在使用Spring Data JPA时，我们经常利用派生和自定义查询以我们偏好的格式返回结果。一个典型的例子是DTO投影，它提供了一种很好的方式仅选择某些特定列，减少选择不必要数据的开销。 然而，DTO投影并不总是容易实现，如果实现不当可能会导致_Co...","head":[["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/Archive/Solving%20Spring%20Data%20JPA%20ConverterNotFoundException_%20No%20converter%20found.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung"}],["meta",{"property":"og:description","content":"解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung 1. 概述 在使用Spring Data JPA时，我们经常利用派生和自定义查询以我们偏好的格式返回结果。一个典型的例子是DTO投影，它提供了一种很好的方式仅选择某些特定列，减少选择不必要数据的开销。 然而，DTO投影并不总是容易实现，如果实现不当可能会导致_Co..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T09:54:56.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"Spring Data JPA"}],["meta",{"property":"article:tag","content":"JPA"}],["meta",{"property":"article:tag","content":"DTO"}],["meta",{"property":"article:tag","content":"Converter"}],["meta",{"property":"article:published_time","content":"2024-06-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-21T09:54:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"解决Spring Data JPA转换器未找到异常：没有找到转换器 | Baeldung\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-06-14T00:00:00.000Z\\",\\"dateModified\\":\\"2024-06-21T09:54:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]]},"headers":[{"level":2,"title":"1. 概述","slug":"_1-概述","link":"#_1-概述","children":[]},{"level":2,"title":"2. 实践中的异常理解","slug":"_2-实践中的异常理解","link":"#_2-实践中的异常理解","children":[{"level":3,"title":"2.1. H2配置","slug":"_2-1-h2配置","link":"#_2-1-h2配置","children":[]},{"level":3,"title":"2.2. 实体类","slug":"_2-2-实体类","link":"#_2-2-实体类","children":[]},{"level":3,"title":"2.3. JPA存储库","slug":"_2-3-jpa存储库","link":"#_2-3-jpa存储库","children":[]}]},{"level":2,"title":"3. 解决方案","slug":"_3-解决方案","link":"#_3-解决方案","children":[]},{"level":2,"title":"4. 结论","slug":"_4-结论","link":"#_4-结论","children":[]}],"git":{"createdTime":1718963696000,"updatedTime":1718963696000,"contributors":[{"name":"Lance Li","email":"lance.jx.li@gtomato.com","commits":1}]},"readingTime":{"minutes":3.95,"words":1186},"filePathRelative":"posts/baeldung/Archive/Solving Spring Data JPA ConverterNotFoundException: No converter found.md","localizedDate":"2024年6月14日","excerpt":"\\n<h2>1. 概述</h2>\\n<p>在使用Spring Data JPA时，我们经常利用派生和自定义查询以我们偏好的格式返回结果。一个典型的例子是DTO投影，它提供了一种很好的方式仅选择某些特定列，减少选择不必要数据的开销。</p>\\n<p>然而，DTO投影并不总是容易实现，如果实现不当可能会导致_ConverterNotFoundException_。因此，在本简短教程中，我们将阐明如何在使用Spring Data JPA时避免_ConverterNotFoundException_异常。</p>\\n<h2>2. 实践中的异常理解</h2>\\n<p>在跳转到解决方案之前，让我们通过一个实际例子来理解异常及其堆栈跟踪的含义。</p>","autoDesc":true}');export{p as comp,c as data};
