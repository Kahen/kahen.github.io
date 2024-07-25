import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,a as d}from"./app-C5JhSR9j.js";const i={},t=d(`<h1 id="cassandra查询语言和java中的cassandra批处理" tabindex="-1"><a class="header-anchor" href="#cassandra查询语言和java中的cassandra批处理"><span>Cassandra查询语言和Java中的Cassandra批处理</span></a></h1><p>在本教程中，我们将学习Cassandra批处理查询及其不同的用例。我们将分析针对单分区和多分区表的批处理查询。</p><p>我们将探索在_Cqlsh_以及Java应用程序中的批处理。</p><h2 id="_2-cassandra批处理基础" tabindex="-1"><a class="header-anchor" href="#_2-cassandra批处理基础"><span>2. Cassandra批处理基础</span></a></h2><p>像Cassandra这样的分布式数据库与关系型数据库不同，<strong>不支持ACID（原子性、一致性、隔离性和持久性）属性</strong>。然而，在某些情况下，我们需要多个数据修改操作是原子的和/或隔离的操作。</p><p>批处理语句将多个数据修改语言语句（如INSERT、UPDATE和DELETE）组合在一起，以实现针对单个分区的原子性和隔离性，或者仅在针对多个分区时实现原子性。</p><p>以下是批处理查询的语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN [ ( UNLOGGED | COUNTER ) ] BATCH
[ USING TIMESTAMP [ epoch_microseconds ] ]
dml_statement [ USING TIMESTAMP [ epoch_microseconds ] ] ;
[ dml_statement [ USING TIMESTAMP [ epoch_microseconds ] ] [ ; ... ] ]
APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们通过一个例子来了解上述语法：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,&#39;banana&#39;);

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,&#39;banana&#39;);

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，我们使用不带任何可选参数如_UNLOGGED_或_USING TIMESTAMP_的_BEGIN BATCH_语句来启动批处理查询，然后包括所有的DML操作，即针对_product_表的插入语句。</p><p>最后，我们使用_APPLY BATCH_语句来执行批处理。</p><p>我们应该注意，我们将无法撤销任何批处理查询，因为<strong>批处理查询不支持回滚功能</strong>。</p><h3 id="_2-1-单分区" tabindex="-1"><a class="header-anchor" href="#_2-1-单分区"><span>2.1. 单分区</span></a></h3><p><strong>批处理语句将所有DML语句应用于单个分区，确保原子性和隔离性</strong>。</p><p>针对单个分区的批处理可以减少客户端-服务器流量，并更有效地更新具有单行变异的表。这是因为只有在批处理操作写入单个分区时才会发生批处理隔离。</p><p>单分区批处理还可以涉及具有相同分区键并位于同一keyspace中的两个不同的表。</p><p><strong>单分区批处理操作默认为未记录的</strong>，因此不会因记录而遭受性能损失。</p><p>下图描述了从协调节点_H_到分区节点_B_及其复制节点_C_、_D_的单分区批处理请求流程：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/single-partition.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>版权：Datastax</p><h3 id="_2-2-多分区" tabindex="-1"><a class="header-anchor" href="#_2-2-多分区"><span>2.2. 多分区</span></a></h3><p>涉及多个分区的批处理需要精心设计，因为它涉及多个节点之间的协调。多分区批处理的最佳用例是将相同的数据写入两个相关表，即具有不同分区键但具有相同列的两个表。</p><p>多分区批处理操作<strong>使用_batchlog_机制来确保原子性</strong>。协调节点将批处理日志请求发送到批处理日志节点，一旦收到确认收据，它就执行批处理语句。然后，它从节点中删除_batchlog_并向客户端发送确认。</p><p>建议避免使用多分区批处理查询。这是因为这样的查询对协调节点施加了巨大压力，并严重影响了其性能。</p><p>我们只有在没有其他可行选项时才应该使用多分区批处理。</p><p>下图描述了从协调节点_H_到分区节点_B_、<em>E_及其各自的复制节点_C</em>、<em>D_和_F</em>、_G_的多分区批处理请求流程：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/multi-partition.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>版权：Datastax</p><h2 id="_3-在-cqlsh-中的批处理执行" tabindex="-1"><a class="header-anchor" href="#_3-在-cqlsh-中的批处理执行"><span>3. 在_Cqlsh_中的批处理执行</span></a></h2><p>首先，让我们创建一个_product_表来运行一些批处理查询：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE product (
  product_id UUID,
  variant_id UUID,
  product_name text,
  description text,
  price float,
  PRIMARY KEY (product_id, variant_id)
  );
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-无时间戳的单分区批处理" tabindex="-1"><a class="header-anchor" href="#_3-1-无时间戳的单分区批处理"><span>3.1. 无时间戳的单分区批处理</span></a></h3><p>我们将执行下面的批处理查询，目标是_product_表的单个分区，并且不提供时间戳：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,&#39;banana&#39;) IF NOT EXISTS;

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,&#39;banana&#39;) IF NOT EXISTS;

UPDATE product SET price = 7.12, description = &#39;banana v1&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = &#39;banana v2&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述查询<strong>使用比较和设置（CAS）逻辑</strong>，即_IF NOT EXISTS_子句，所有此类条件语句必须返回_true_才能执行批处理。如果任何此类语句返回_false_，则整个批处理将不被处理。</p><p>执行上述查询后，我们将获得以下成功的确认：</p><figure><img src="https://www.baeldung.com/wp-content/uploads/2022/01/useBatchExamplesAck.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>现在让我们验证批处理执行后数据的_writetime_是否相同：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>cqlsh:testkeyspace&gt; select product_id, variant_id, product_name, description, price, writetime(product_name) from product;

@ Row 1
-------------------------+--------------------------------------
product_id | 3a043b68-20ee-4ece-8f4b-a07e704bc9f5
variant_id | b84b9366-9998-4b2d-9a96-7e9a59a94ae5
product_name | Banana
description | banana v1
price | 12
writetime(product_name) | 1639275574653000

@ Row 2
-------------------------+--------------------------------------
product_id | 3a043b68-20ee-4ece-8f4b-a07e704bc9f5
variant_id | facc3997-299d-419b-b133-a54b5d4dfc3b
product_name | Banana
description | banana v2
price | 12
writetime(product_name) | 1639275574653000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-使用时间戳的单分区-批处理" tabindex="-1"><a class="header-anchor" href="#_3-2-使用时间戳的单分区-批处理"><span><strong>3.2. 使用时间戳的单分区</strong> 批处理</span></a></h3><p>现在我们将看到使用_USING TIMESTAMP_选项的批处理查询示例，以提供以微秒为单位的_epoch_时间格式的时间戳。</p><p>下面的批处理查询将相同的时间戳应用于所有DML语句：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH USING TIMESTAMP 1638810270

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,&#39;banana&#39;);

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,&#39;banana&#39;);

UPDATE product SET price = 7.12, description = &#39;banana v1&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7fAND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = &#39;banana v2&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们指定任何单个DML语句的自定义时间戳：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,&#39;banana&#39;);

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,&#39;banana&#39;) USING TIMESTAMP 1638810270;

UPDATE product SET price = 7.12, description = &#39;banana v1&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3 USING TIMESTAMP 1638810270;

UPDATE product SET price = 11.90, description = &#39;banana v2&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们将看到一个无效的批处理查询，其中既有自定义时间戳又有比较和设置（CAS）逻辑，即_IF NOT EXISTS_子句：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH USING TIMESTAMP 1638810270

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f3,&#39;banana&#39;) IF NOT EXISTS;

INSERT INTO product (product_id, variant_id, product_name)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,0e9ef8f7-d32b-4926-9d37-27225933a5f5,&#39;banana&#39;) IF NOT EXISTS;

UPDATE product SET price = 7.12, description = &#39;banana v1&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f3;

UPDATE product SET price = 11.90, description = &#39;banana v2&#39;
WHERE product_id = 2c11bbcd-4587-4d15-bb57-4b23a546bd7f AND variant_id=0e9ef8f7-d32b-4926-9d37-27225933a5f5;

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述查询时，我们将获得以下错误：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>InvalidRequest: Error from server: code=2200 [Invalid query]
message=&quot;Cannot provide custom timestamp for conditional BATCH&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上述错误是因为客户端时间戳对于任何条件插入或更新都是禁止的。</p><h3 id="_3-3-多分区-批处理查询" tabindex="-1"><a class="header-anchor" href="#_3-3-多分区-批处理查询"><span><strong>3.3. 多分区</strong> 批处理查询</span></a></h3><p><strong>多分区批处理的最佳用例</strong> <strong>是将完全相同的数据插入到两个相关表中</strong>。</p><p>让我们将相同的数据插入到具有不同分区键的_product_by_name_和_product_by_id_表中：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN BATCH

INSERT INTO product_by_name (product_name, product_id, description, price)
VALUES (&#39;banana&#39;,2c11bbcd-4587-4d15-bb57-4b23a546bd7f,&#39;banana&#39;,12.00);

INSERT INTO product_by_id (product_id, product_name, description, price)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,&#39;banana&#39;,&#39;banana&#39;,12.00);

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在让我们启用上述查询的_UNLOGGED_选项：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN UNLOGGED BATCH

INSERT INTO product_by_name (product_name, product_id, description, price)
VALUES (&#39;banana&#39;,2c11bbcd-4587-4d15-bb57-4b23a546bd7f,&#39;banana&#39;,12.00);

INSERT INTO product_by_id (product_id, product_name, description, price)
VALUES (2c11bbcd-4587-4d15-bb57-4b23a546bd7f,&#39;banana&#39;,&#39;banana&#39;,12.00);

APPLY BATCH;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述_UNLOGGED_批处理查询不会确保原子性或隔离性</strong>，并且不使用_batch log_来写入数据。</p><h3 id="_3-4-对-counter-更新的批处理" tabindex="-1"><a class="header-anchor" href="#_3-4-对-counter-更新的批处理"><span>3.4. 对_Counter_更新的批处理</span></a></h3><p>我们需要使用_COUNTER_选项对任何计数器列进行操作，因为**_counter_更新操作不是幂等的**。</p><p>让我们创建一个存储_sales_vol_为_Counter_数据类型的_table product_by_sales_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>CREATE TABLE product_by_sales (
  product_id UUID,
  sales_vol counter,
  PRIMARY KEY (product_id)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的_counter_批处理查询将_sales_vol_增加两次100：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BEGIN COUNTER BATCH

UPDATE product_by_sales
SET sales_vol = sales_vol + 100
WHERE product_id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

UPDATE product_by_sales
SET sales_vol = sales_vol + 100
WHERE product_id = 6ab09bec-e68e-48d9-a5f8-97e6fb4c9b47;

APPLY BATCH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-java中的批处理操作" tabindex="-1"><a class="header-anchor" href="#_4-java中的批处理操作"><span>4. Java中的批处理操作</span></a></h2><p>让我们看一些在Java应用程序中构建和执行批处理查询的示例。</p><h3 id="_4-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_4-1-maven依赖"><span>4.1. Maven依赖</span></a></h3><p>首先，我们需要包括与DataStax相关的Maven依赖：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>\`\`&lt;dependency&gt;\`\`
    \`\`&lt;groupId&gt;\`\`com.datastax.oss\`\`&lt;/groupId&gt;\`\`
    \`\`&lt;artifactId&gt;\`\`java-driver-core\`\`&lt;/artifactId&gt;\`\`
    \`\`&lt;version&gt;\`\`4.1.0\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
\`\`&lt;dependency&gt;\`\`
   \`\`&lt;groupId&gt;\`\`com.datastax.oss\`\`&lt;/groupId&gt;\`\`
   \`\`&lt;artifactId&gt;\`\`java-driver-query-builder\`\`&lt;/artifactId&gt;\`\`
   \`\`&lt;version&gt;\`\`4.1.0\`\`&lt;/version&gt;\`\`
\`\`&lt;/dependency&gt;\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-单分区批处理" tabindex="-1"><a class="header-anchor" href="#_4-2-单分区批处理"><span>4.2. 单分区批处理</span></a></h3><p>让我们看一个示例，看看如何执行单分区数据的批处理。</p><p>我们将使用_BatchStatement_实例构建批处理查询。_BatchStatement_是通过_DefaultBatchType_枚举和_BoundStatement_实例实例化的。</p><p>首先，我们将创建一个方法，通过将_Product_属性绑定到_PreparedStatement_插入查询来获取_BoundStatement_实例：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>BoundStatement getProductVariantInsertStatement(Product product, UUID productId) {
    String insertQuery = new StringBuilder(&quot;&quot;)
      .append(&quot;INSERT INTO &quot;)
      .append(PRODUCT_TABLE_NAME)
      .append(&quot;(product_id, variant_id, product_name, description, price) &quot;)
      .append(&quot;VALUES (&quot;)
      .append(&quot;:product_id&quot;)
      .append(&quot;, &quot;)
      .append(&quot;:variant_id&quot;)
      .append(&quot;, &quot;)
      .append(&quot;:product_name&quot;)
      .append(&quot;, &quot;)
      .append(&quot;:description&quot;)
      .append(&quot;, &quot;)
      .append(&quot;:price&quot;)
      .append(&quot;);&quot;)
      .toString();

    PreparedStatement preparedStatement = session.prepare(insertQuery);

    return preparedStatement.bind(
      productId,
      UUID.randomUUID(),
      product.getProductName(),
      product.getDescription(),
      product.getPrice());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们将使用相同的_Product__UUID_执行上述创建的_BoundStatement_的_BatchStatement_：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>UUID productId = UUID.randomUUID();
BoundStatement productBoundStatement1 = this.getProductVariantInsertStatement(productVariant1, productId);
BoundStatement productBoundStatement2 = this.getProductVariantInsertStatement(productVariant2, productId);

BatchStatement batch = BatchStatement.newInstance(DefaultBatchType.UNLOGGED,
            productBoundStatement1, productBoundStatement2);

session.execute(batch);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码使用_UNLOGGED_批处理在同一分区键上插入两个产品变体。</p><h3 id="_4-3-多分区批处理" tabindex="-1"><a class="header-anchor" href="#_4-3-多分区批处理"><span>4.3. 多分区批处理</span></a></h3><p>现在，让我们看看如何将相同的数据</p>`,79),s=[t];function r(l,c){return a(),n("div",null,s)}const b=e(i,[["render",r],["__file","2024-07-22-Cassandra Batch in Cassandra Query Language and Java.html.vue"]]),p=JSON.parse('{"path":"/posts/baeldung/2024-07-22/2024-07-22-Cassandra%20Batch%20in%20Cassandra%20Query%20Language%20and%20Java.html","title":"Cassandra查询语言和Java中的Cassandra批处理","lang":"zh-CN","frontmatter":{"date":"2022-01-01T00:00:00.000Z","category":["Cassandra","Java"],"tag":["CQL","Batch"],"head":[["meta",{"name":"Cassandra Java Batch","content":"学习Cassandra批处理查询及其在Cqlsh和Java中的应用。"}],["meta",{"property":"og:url","content":"https://www.kahen.xyz/posts/baeldung/2024-07-22/2024-07-22-Cassandra%20Batch%20in%20Cassandra%20Query%20Language%20and%20Java.html"}],["meta",{"property":"og:site_name","content":"Baeldung 中文网"}],["meta",{"property":"og:title","content":"Cassandra查询语言和Java中的Cassandra批处理"}],["meta",{"property":"og:description","content":"Cassandra查询语言和Java中的Cassandra批处理 在本教程中，我们将学习Cassandra批处理查询及其不同的用例。我们将分析针对单分区和多分区表的批处理查询。 我们将探索在_Cqlsh_以及Java应用程序中的批处理。 2. Cassandra批处理基础 像Cassandra这样的分布式数据库与关系型数据库不同，不支持ACID（原子性..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://www.baeldung.com/wp-content/uploads/2022/01/single-partition.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-22T13:29:15.000Z"}],["meta",{"property":"article:author","content":"Kahen"}],["meta",{"property":"article:tag","content":"CQL"}],["meta",{"property":"article:tag","content":"Batch"}],["meta",{"property":"article:published_time","content":"2022-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-22T13:29:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Cassandra查询语言和Java中的Cassandra批处理\\",\\"image\\":[\\"https://www.baeldung.com/wp-content/uploads/2022/01/single-partition.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/01/multi-partition.png\\",\\"https://www.baeldung.com/wp-content/uploads/2022/01/useBatchExamplesAck.png\\"],\\"datePublished\\":\\"2022-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-22T13:29:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Kahen\\",\\"url\\":\\"https://www.kahen.xyz\\"}]}"]],"description":"Cassandra查询语言和Java中的Cassandra批处理 在本教程中，我们将学习Cassandra批处理查询及其不同的用例。我们将分析针对单分区和多分区表的批处理查询。 我们将探索在_Cqlsh_以及Java应用程序中的批处理。 2. Cassandra批处理基础 像Cassandra这样的分布式数据库与关系型数据库不同，不支持ACID（原子性..."},"headers":[{"level":2,"title":"2. Cassandra批处理基础","slug":"_2-cassandra批处理基础","link":"#_2-cassandra批处理基础","children":[{"level":3,"title":"2.1. 单分区","slug":"_2-1-单分区","link":"#_2-1-单分区","children":[]},{"level":3,"title":"2.2. 多分区","slug":"_2-2-多分区","link":"#_2-2-多分区","children":[]}]},{"level":2,"title":"3. 在_Cqlsh_中的批处理执行","slug":"_3-在-cqlsh-中的批处理执行","link":"#_3-在-cqlsh-中的批处理执行","children":[{"level":3,"title":"3.1. 无时间戳的单分区批处理","slug":"_3-1-无时间戳的单分区批处理","link":"#_3-1-无时间戳的单分区批处理","children":[]},{"level":3,"title":"3.2. 使用时间戳的单分区 批处理","slug":"_3-2-使用时间戳的单分区-批处理","link":"#_3-2-使用时间戳的单分区-批处理","children":[]},{"level":3,"title":"3.3. 多分区 批处理查询","slug":"_3-3-多分区-批处理查询","link":"#_3-3-多分区-批处理查询","children":[]},{"level":3,"title":"3.4. 对_Counter_更新的批处理","slug":"_3-4-对-counter-更新的批处理","link":"#_3-4-对-counter-更新的批处理","children":[]}]},{"level":2,"title":"4. Java中的批处理操作","slug":"_4-java中的批处理操作","link":"#_4-java中的批处理操作","children":[{"level":3,"title":"4.1. Maven依赖","slug":"_4-1-maven依赖","link":"#_4-1-maven依赖","children":[]},{"level":3,"title":"4.2. 单分区批处理","slug":"_4-2-单分区批处理","link":"#_4-2-单分区批处理","children":[]},{"level":3,"title":"4.3. 多分区批处理","slug":"_4-3-多分区批处理","link":"#_4-3-多分区批处理","children":[]}]}],"git":{"createdTime":1721654955000,"updatedTime":1721654955000,"contributors":[{"name":"Kahen","email":"Kahen@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":7.8,"words":2340},"filePathRelative":"posts/baeldung/2024-07-22/2024-07-22-Cassandra Batch in Cassandra Query Language and Java.md","localizedDate":"2022年1月1日","excerpt":"\\n<p>在本教程中，我们将学习Cassandra批处理查询及其不同的用例。我们将分析针对单分区和多分区表的批处理查询。</p>\\n<p>我们将探索在_Cqlsh_以及Java应用程序中的批处理。</p>\\n<h2>2. Cassandra批处理基础</h2>\\n<p>像Cassandra这样的分布式数据库与关系型数据库不同，<strong>不支持ACID（原子性、一致性、隔离性和持久性）属性</strong>。然而，在某些情况下，我们需要多个数据修改操作是原子的和/或隔离的操作。</p>\\n<p>批处理语句将多个数据修改语言语句（如INSERT、UPDATE和DELETE）组合在一起，以实现针对单个分区的原子性和隔离性，或者仅在针对多个分区时实现原子性。</p>","autoDesc":true}');export{b as comp,p as data};
