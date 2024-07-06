---
date: 2022-04-01
category:
  - NLP
  - Java
tag:
  - Apache OpenNLP
  - Stanford CoreNLP
head:
  - - meta
    - name: Natural Language Processing Libraries in Java
      content: An overview of various NLP libraries in Java, including Apache OpenNLP and Stanford CoreNLP, and how to implement NLP tasks using them.
------
# Java中的NLP库概览

自然语言处理（NLP）是人工智能（AI）的一个分支，它使计算机能够像人类一样理解书面或口头语言。在AI革命的这个时代，它有着多样的应用。

在本教程中，我们将探索Java中的不同NLP库，并看看如何使用Apache OpenNLP和Stanford CoreNLP实现一些NLP任务。

## 2. NLP是什么？

NLP使计算机能够以类似人类的方式处理文本和单词。它结合了计算语言学、统计学、深度学习和机器学习。

人类每天通过各种媒介在线相互交流。在这样做的过程中，他们分享了不同类型的数据，如文本、语音、图像等。这些数据对于理解人类行为和习惯至关重要。因此，它们被用来训练计算机模仿人类智能。

**NLP使用数据来训练机器模仿人类语言行为**。为此，它遵循了一个包含几个步骤的过程：

1. 它将文本分割成较小的单元，如句子或单词。
2. 它对文本进行标记化，这意味着它为每个单词分配一个唯一的标识符。
3. 它去除停用词，这些是常见的不增加文本意义的词，如“the”、“a”、“and”等。
4. 它对文本进行词干提取或词形还原，这意味着它将每个单词还原为其词根形式或词典形式。
5. 它标记每个单词的词性。
6. 它标记每个单词的命名实体，如人、地点、组织等。

## 3. NLP的用例

NLP是许多现代现实世界应用中机器智能的驱动力。

**机器翻译是一个示例用例**。我们有系统可以将一种特定语言翻译成另一种语言。Google翻译就是这样的一个例子。驱动机器翻译的技术基于NLP算法。

此外，**另一个流行的用例是垃圾邮件检测**。大多数流行的电子邮件服务提供商使用垃圾邮件检测器来确定传入的消息是否为垃圾邮件。垃圾邮件检测应用NLP文本分类技术，根据其语言模式识别垃圾邮件。

此外，**AI聊天机器人现在非常普遍**。流行的例子包括Siri、Google助手、Alexa等。这些应用程序使用语音识别和自然语言来识别语音中的模式，并以适当的、有帮助的评论回应。

**NLP是这些应用程序的核心逻辑，因为它使它们能够处理自然语言输入和输出，如文本和语音，并理解它们背后的含义和意图**。

## 4. OpenNLP

Apache OpenNLP是一个工具包，它利用机器学习来处理自然语言文本。它为常见的NLP任务如标记化、分割、语音标记等提供支持。

**Apache OpenNLP的主要目标是为NLP任务提供支持，并为不同的语言提供大量的预构建模型**。此外，它还提供了一个命令行界面（CLI），方便进行实验和训练。

Apache OpenNLP提供了各种预构建模型供下载。让我们实现一个简单的语言检测器，使用预构建的模型。首先，让我们将OpenNLP依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``org.apache.opennlp``</groupId>``
    ``<artifactId>``opennlp-tools``</artifactId>``
    ``<version>``2.1.1``</version>``
``</dependency>``
```

接下来，让我们使用_langdetect-183.bin_预构建模型实现语言检测器：

```java
@Test
void givenTextInEnglish_whenDetectLanguage_thenReturnsEnglishLanguageCode() {
    String text = "the dream my father told me";
    LanguageDetectorModel model;

    try (InputStream modelIn = new FileInputStream("langdetect-183.bin")) {
        model = new LanguageDetectorModel(modelIn);
    } catch (IOException e) {
        return;
    }

    LanguageDetectorME detector = new LanguageDetectorME(model);
    Language language = detector.predictLanguage(text);
    assertEquals("eng", language.getLang());
}
```

在上面的例子中，我们从OpenNLP获取预构建的模型来检测语言，并将其放在根目录下。然后，我们定义输入数据。接下来，我们加载语言检测器模型。最后，我们创建一个新的_LanguageDetectorME_实例并尝试检测语言。我们用返回的语言测试预期的语言。

## 5. Stanford NLP

斯坦福NLP小组提供了算法，使机器能够处理、生成和理解人类文本和语言。

**CoreNLP是斯坦福NLP小组用Java编写的一套程序，可以执行各种NLP任务，如标记化、词性标注、词形还原等**。它可以通过命令行、Java代码或对服务器的调用来使用。

让我们看看使用Stanford CoreNLP进行标记化的一个例子。我们需要将它的依赖项添加到_pom.xml_：

```xml
``<dependency>``
    ``<groupId>``edu.stanford.nlp``</groupId>``
    ``<artifactId>``stanford-corenlp``</artifactId>``
    ``<version>``4.5.3``</version>``
``</dependency>``
```

接下来，让我们进行标记化：

```java
@Test
void givenSampleText_whenTokenize_thenExpectedTokensReturned() {
    Properties props = new Properties();
    props.setProperty("annotators", "tokenize");
    StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

    String text = "The german shepard display an act of kindness";
    Annotation document = new Annotation(text);
    pipeline.annotate(document);

    List`<CoreMap>` sentences = document.get(CoreAnnotations.SentencesAnnotation.class);
    StringBuilder tokens = new StringBuilder();

    for (CoreMap sentence : sentences) {
        for (CoreLabel token : sentence.get(CoreAnnotations.TokensAnnotation.class)) {
            String word = token.get(CoreAnnotations.TextAnnotation.class);
            tokens.append(word).append(" ");
        }
    }
    assertEquals("The german shepard display an act of kindness", tokens.toString().trim());
}
```

在上面的例子中，我们使用标记化注释器设置_StanfordCoreNLP_对象。接下来，我们创建一个新的_Annotation_实例。最后，我们实现逻辑以从示例句子生成标记。

## 6. CogComp NLP

**CogComp NLP是由认知计算组开发的自然语言处理（NLP）库的集合**。它为NLP任务提供了各种工具和模块，如标记化、词形还原、词性标注等。

CogComp NLP可以作为命令行工具或Java API使用。CogComp NLP中一个流行的模块是_cogcomp-nlp-pipeline_，它对给定的文本执行基本的NLP任务。然而，_cogcomp-nlp-pipeline_仅适用于英文纯文本。

另一个模块是_similarity_，它测量文本或其他对象之间的相似性并返回一个分数。

## 7. GATE

通用文本工程架构（GATE）是一个工具包，能够解决文本分析和语言处理的问题。它是开发用于处理人类语言的软件组件的极好基础设施。此外，它也是一个用于NLP的极好工具包。

这个工具包拥有一个庞大的开发者和研究人员社区，他们使用它进行信息提取、情感分析、社交媒体挖掘和生物医学文本处理。

**GATE通过为语言处理软件提供架构来帮助开发者和研究人员。此外，它提供了一个实现了该架构的类库**。

## 8. Apache UIMA

非结构化信息管理应用程序（UIMA）是能够处理和分析大量非结构化数据（包括文本、音频和视频）的软件系统。它们有助于创建组件，可以从内容中检测情感、实体和其他类型的信息。这些组件是用Java或C++编写的。

此外，Apache UIMA是一个框架，使我们能够使用UIMA组件构建应用程序，并处理大量的非结构化数据。它帮助我们从数据中提取相关信息，并将其用于各种目的。

## 9. MALLET

MAchine Learning for LangaugE Toolkit（MALLET）是一个Java包，为NLP任务提供了各种工具和算法，如文档分类、主题建模和序列标记。MALLET中包含的一种算法是朴素贝叶斯算法，它在NLP中广泛用于文本分类和情感分析。

MALLET是一个开源的Java包，为文本分析提供了各种工具。这些工具之一是主题建模，它可以在大量未标记的文本文档集合中发现主要主题。

**此外，MALLET还可以将文本文档转换为数值向量，这些向量可以用于机器学习**。此外，它可以作为命令行工具或直接Java API使用。

## 10. 结论

在本文中，我们学习了NLP的关键内容以及NLP的用例。此外，我们还看到了不同的Java NLP库和工具包。我们还分别使用CoreNLP和OpenNLP查看了标记化和句子检测的示例。

如常，示例的完整源代码可在GitHub上找到。