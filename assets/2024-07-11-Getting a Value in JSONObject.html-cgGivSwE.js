import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,o as n,a as i}from"./app-DYL6w4vU.js";const a={},s=i(`<h1 id="在jsonobject中获取值" tabindex="-1"><a class="header-anchor" href="#在jsonobject中获取值"><span>在JSONObject中获取值</span></a></h1><p>在本教程中，我们将深入探讨在_JSONObject_实例中获取值的具体细节。</p><p>对于Java中JSON支持的一般介绍，请查看JSON-Java的介绍。</p><h2 id="jsonobject结构" tabindex="-1"><a class="header-anchor" href="#jsonobject结构"><span>JSONObject结构</span></a></h2><p><strong>_JSONObject_是一种类似映射的结构</strong>。它将数据保存为一组键值对。<strong>键是_String_类型，而值可以是几种类型</strong>。<strong>此外，值类型可以是原始的或复合的</strong>。原始类型是_String_、_Number_和_Boolean_类型，或_JSONObject.NULL_对象。复合类型是_JSONObject_和_JSONArray_类型。因此，JSON数据可以具有任意的复杂性和嵌套。</p><p>因此，获取嵌套结构中的值需要更多的努力。从这一点开始，让我们参考以下虚构员工的JSON数据：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>{
  &quot;name&quot; : &quot;Bob&quot;,
  &quot;profession&quot; : &quot;Software engineer&quot;,
  &quot;department&quot; : &quot;Research&quot;,
  &quot;age&quot; : 40,
  &quot;family&quot; : [
    {
      &quot;wife&quot; : {
        &quot;name&quot; : &quot;Alice&quot;,
        &quot;profession&quot; : &quot;Doctor&quot;,
        &quot;age&quot; : 38
      }
    },
    {
      &quot;son&quot; : {
        &quot;name&quot; : &quot;Peter&quot;,
        &quot;occupation&quot; : &quot;Schoolboy&quot;,
        &quot;age&quot; : 11
      }
    }
  ],
  &quot;performance&quot; : [
    {
      &quot;2020&quot; : 4.5
    },
    {
      &quot;2021&quot; : 4.8
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jsonobject的getter方法" tabindex="-1"><a class="header-anchor" href="#jsonobject的getter方法"><span>JSONObject的Getter方法</span></a></h2><p>首先，让我们看看_JSONObject_类提供了哪些getter API。<strong>有两个组的方法——_get()_和_opt()_方法</strong>。两组方法的区别在于，当找不到键时，_get()_方法会抛出异常，而_opt()_方法不会抛出异常，而是返回null或根据方法返回特定值。</p><p>此外，每组都有一个通用方法和几个具有类型转换的特定方法。<strong>通用方法返回一个_Object_实例，而特定方法返回一个已经转换过的实例</strong>。让我们使用通用_get()_方法获取JSON数据中的“family”字段。我们假设JSON数据已经被预先加载到_JSONObject_类型的_jsonObject_变量中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    JSONArray family = (JSONArray) jsonObject.get(&quot;family&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以使用特定于_JSONArray_的特定getter以更易读的方式做同样的事情：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    JSONArray family = jsonObject.getJSONArray(&quot;family&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="直接获取值" tabindex="-1"><a class="header-anchor" href="#直接获取值"><span>直接获取值</span></a></h2><p><strong>这种方法通过获取到所需值的路径上的每个中间值来直接获取值</strong>。下面的代码展示了如何直接获取员工儿子的名字：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    JSONArray family = jsonObject.getJSONArray(&quot;family&quot;);
    JSONObject sonObject = family.getJSONObject(1);
    JSONObject sonData = sonObject.getJSONObject(&quot;son&quot;);
    String sonName = sonData.getString(&quot;name&quot;);
    Assertions.assertEquals(sonName, &quot;Peter&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正如我们所看到的，直接获取值的方法有局限性</strong>。首先，我们需要知道JSON数据的确切结构。其次，我们需要知道沿途每个值的数据类型，以便使用正确的_JSONObject_的getter方法。</p><p><strong>此外，当JSON数据的结构是动态的时候，我们需要在代码中添加彻底的检查</strong>。例如，对于所有的_get()_方法，我们需要将代码放在_try-catch_块中。此外，对于_opt()_方法，我们需要添加null或特定值的检查。</p><h2 id="递归获取值" tabindex="-1"><a class="header-anchor" href="#递归获取值"><span>递归获取值</span></a></h2><p>相比之下，JSON据中获取值的递归方法更加灵活且不易出错。在实现这种方法时，我们需要考虑JSON数据的嵌套结构。</p><p>首先，当键的值是_JSONObject_或_JSONArray_类型时，我们需要在该值中传播递归搜索。其次，当在当前递归调用中找到键时，我们需要将其映射的值添加到返回的结果中，无论值是原始类型还是不是。</p><p>下面的方法实现了递归搜索：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    public List\`\`\`\`\`&lt;String&gt;\`\`\`\`\` getValuesInObject(JSONObject jsonObject, String key) {
        List\`\`\`\`\`&lt;String&gt;\`\`\`\`\` accumulatedValues = new ArrayList&lt;&gt;();
        for (String currentKey : jsonObject.keySet()) {
            Object value = jsonObject.get(currentKey);
            if (currentKey.equals(key)) {
                accumulatedValues.add(value.toString());
            }

            if (value instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) value, key));
            } else if (value instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) value, key));
            }
        }

        return accumulatedValues;
    }

    public List\`\`\`\`\`&lt;String&gt;\`\`\`\`\` getValuesInArray(JSONArray jsonArray, String key) {
        List\`\`\`\`\`&lt;String&gt;\`\`\`\`\` accumulatedValues = new ArrayList&lt;&gt;();
        for (Object obj : jsonArray) {
            if (obj instanceof JSONArray) {
                accumulatedValues.addAll(getValuesInArray((JSONArray) obj, key));
            } else if (obj instanceof JSONObject) {
                accumulatedValues.addAll(getValuesInObject((JSONObject) obj, key));
            }
        }

        return accumulatedValues;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了简化，我们提供了两个单独的方法：一个用于在_JSONObject_中的递归搜索，另一个用于_JSONArray_实例中的递归搜索。_JSONObject_是一种类似映射的结构，而_JSONArray_是一种类似数组的结构。因此，它们的迭代是不同的。所以，将所有逻辑放在一个方法中会使代码复杂化，需要进行类型转换和if-else分支。</p><p>最后，让我们为_<code>getValuesInObject()</code>_方法编写测试代码：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>    @Test
    public void getAllAssociatedValuesRecursively() {
        List\`\`\`\`\`&lt;String&gt;\`\`\`\`\` values = jsonObjectValueGetter.getValuesInObject(jsonObject, &quot;son&quot;);
        Assertions.assertEquals(values.size(), 1);

        String sonString = values.get(0);
        Assertions.assertTrue(sonString.contains(&quot;Peter&quot;));
        Assertions.assertTrue(sonString.contains(&quot;Schoolboy&quot;));
        Assertions.assertTrue(sonString.contains(&quot;11&quot;));

        values = jsonObjectValueGetter.getValuesInObject(jsonObject, &quot;name&quot;);
        Assertions.assertEquals(values.size(), 3);

        Assertions.assertEquals(values.get(0), &quot;Bob&quot;);
        Assertions.assertEquals(values.get(1), &quot;Alice&quot;);
        Assertions.assertEquals(values.get(2), &quot;Peter&quot;);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论</span></a></h2><p>在本文中，我们讨论了在_JSONObject_中获取值。本文讨论的片段的完整代码可以在GitHub上找到。</p>`,28),l=[s];function r(d,c){return n(),t("div",null,l)}const v=e(a,[["render",r],["__file","2024-07-11-Getting a Value in JSONObject.html.vue"]]),b=JSON.parse('{"path":"/posts/baeldung/2024-07-11/2024-07-11-Getting%20a%20Value%20in%20JSONObject.html","title":"在JSONObject中获取值","lang":"zh-CN","frontmatter":{"date":"2022-04-01T00:00:00.000Z","category":["Java","JSON"],"tag":["JSONObject","Java","JSON"],"head":[["meta",{"name":"keywords","content":"Java, JSON, JSONObject, get value"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-11/2024-07-11-Getting%20a%20Value%20in%20JSONObject.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"在JSONObject中获取值"}],["meta",{"property":"og:description","content":"在JSONObject中获取值 在本教程中，我们将深入探讨在_JSONObject_实例中获取值的具体细节。 对于Java中JSON支持的一般介绍，请查看JSON-Java的介绍。 JSONObject结构 _JSONObject_是一种类似映射的结构。它将数据保存为一组键值对。键是_String_类型，而值可以是几种类型。此外，值类型可以是原始的或复..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-11T05:42:17.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"JSONObject"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"JSON"}],["meta",{"property":"article:published_time","content":"2022-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-11T05:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在JSONObject中获取值\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-11T05:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"在JSONObject中获取值 在本教程中，我们将深入探讨在_JSONObject_实例中获取值的具体细节。 对于Java中JSON支持的一般介绍，请查看JSON-Java的介绍。 JSONObject结构 _JSONObject_是一种类似映射的结构。它将数据保存为一组键值对。键是_String_类型，而值可以是几种类型。此外，值类型可以是原始的或复..."},"headers":[{"level":2,"title":"JSONObject结构","slug":"jsonobject结构","link":"#jsonobject结构","children":[]},{"level":2,"title":"JSONObject的Getter方法","slug":"jsonobject的getter方法","link":"#jsonobject的getter方法","children":[]},{"level":2,"title":"直接获取值","slug":"直接获取值","link":"#直接获取值","children":[]},{"level":2,"title":"递归获取值","slug":"递归获取值","link":"#递归获取值","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1720676537000,"updatedTime":1720676537000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":3.67,"words":1101},"filePathRelative":"posts/baeldung/2024-07-11/2024-07-11-Getting a Value in JSONObject.md","localizedDate":"2022年4月1日","excerpt":"\\n<p>在本教程中，我们将深入探讨在_JSONObject_实例中获取值的具体细节。</p>\\n<p>对于Java中JSON支持的一般介绍，请查看JSON-Java的介绍。</p>\\n<h2>JSONObject结构</h2>\\n<p><strong>_JSONObject_是一种类似映射的结构</strong>。它将数据保存为一组键值对。<strong>键是_String_类型，而值可以是几种类型</strong>。<strong>此外，值类型可以是原始的或复合的</strong>。原始类型是_String_、_Number_和_Boolean_类型，或_JSONObject.NULL_对象。复合类型是_JSONObject_和_JSONArray_类型。因此，JSON数据可以具有任意的复杂性和嵌套。</p>","autoDesc":true}');export{v as comp,b as data};
