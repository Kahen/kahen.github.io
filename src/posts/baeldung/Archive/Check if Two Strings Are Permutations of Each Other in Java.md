---
date: 2024-06-15
category:
  - Java
  - Algorithms
tag:
  - String
  - Permutation
  - Anagram
---
# Java中检查两个字符串是否为彼此的排列

排列或变位词是通过重新排列不同单词或短语的字母形成的单词或短语。换句话说，**排列包含与另一个字符串相同的字符，但字符的排列顺序可以变化**。

在本教程中，我们将检查字符串是否是另一个字符串的排列或变位词的解决方案。

### 2.1. 排列
让我们看看单词 "CAT" 的排列：

显然，有六种排列（包括 "CAT" 本身）。我们可以计算 _n!_（字符串长度 _n_ 的阶乘）。

### 2.2. 如何解决问题
正如我们所看到的，一个字符串有许多可能的排列。我们可能会想到创建一个算法，循环遍历所有的字符串排列，以检查是否有一个与我们比较的字符串相等。

这种方法有效，但我们必须首先创建所有可能的排列，这可能代价昂贵，特别是对于长字符串。

**然而，我们注意到无论排列如何，它都包含与原始字符串相同的字符。例如，"CAT" 和 "TAC" 有相同的字符 _\[A,C,T\]_，即使顺序不同。**

因此，我们可以将字符串的字符存储在数据结构中，然后找到一种比较它们的方法。

值得注意的是，如果两个字符串的长度不同，我们可以立即说它们不是排列。

## 3. 排序
解决这个问题最直接的方法是排序和比较两个字符串。

让我们看看算法：

```java
boolean isPermutationWithSorting(String s1, String s2) {
    if (s1.length() != s2.length()) {
        return false;
    }
    char[] s1CharArray = s1.toCharArray();
    char[] s2CharArray = s2.toCharArray();
    Arrays.sort(s1CharArray);
    Arrays.sort(s2CharArray);
    return Arrays.equals(s1CharArray, s2CharArray);
}
```

值得注意的是，字符串是一个原始字符的数组。因此，我们将对两个字符串的字符数组进行排序，并使用 _equals()_ 方法进行比较。

让我们看看算法复杂度：

- 时间复杂度：排序的 _O(n log n)_
- 空间复杂度：排序的 _O(n)_ 辅助空间

现在，让我们看看一些测试，我们检查一个简单单词和一个句子的排列：

```java
@Test
void givenTwoStringsArePermutation_whenSortingCharsArray_thenPermutation() {
    assertTrue(isPermutationWithSorting("baeldung", "luaebngd"));
    assertTrue(isPermutationWithSorting("hello world", "world hello"));
}

```

让我们也测试一下字符不匹配和不同字符串长度的否定案例：

```java
@Test
void givenTwoStringsAreNotPermutation_whenSortingCharsArray_thenNotPermutation() {
    assertFalse(isPermutationWithSorting("baeldung", "luaebgd"));
    assertFalse(isPermutationWithSorting("baeldung", "luaebngq"));
}
```

## 4. 计数频率
如果我们考虑我们的单词是有限的字符，我们可以使用它们在相同维度的数组中的频率。我们可以考虑到我们的字母表中的26个字母，或者更一般地，考虑到扩展的ASCII编码，在我们的数组中最多256个位置。

### 4.1. 两个计数器
我们可以使用两个计数器，每个单词一个：

```java
boolean isPermutationWithTwoCounters(String s1, String s2) {
    if (s1.length() != s2.length()) {
        return false;
    }
    int[] counter1 = new int[256];
    int[] counter2 = new int[256];
    for (int i = 0; i `< s1.length(); i++) {
        counter1[s1.charAt(i)]++;
    }

    for (int i = 0; i < s2.length(); i++) {
        counter2[s2.charAt(i)]++;
    }

    return Arrays.equals(counter1, counter2);
}
```

在每个计数器中保存频率后，我们可以检查计数器是否相等。

让我们看看算法复杂度：

- 时间复杂度：访问计数器的 _O(n)_
- 空间复杂度：计数器的 _O(1)_ 常量大小

接下来，让我们看看一些正例和负例测试用例：

```java
@Test
void givenTwoStringsArePermutation_whenTwoCountersCharsFrequencies_thenPermutation() {
    assertTrue(isPermutationWithTwoCounters("baeldung", "luaebngd"));
    assertTrue(isPermutationWithTwoCounters("hello world", "world hello"));
}

@Test
void givenTwoStringsAreNotPermutation_whenTwoCountersCharsFrequencies_thenNotPermutation() {
    assertFalse(isPermutationWithTwoCounters("baeldung", "luaebgd"));
    assertFalse(isPermutationWithTwoCounters("baeldung", "luaebngq"));
}
```

### 4.2. 一个计数器
我们可以更聪明一点，只使用一个计数器：

```java
boolean isPermutationWithOneCounter(String s1, String s2) {
    if (s1.length() != s2.length()) {
        return false;
    }
    int[] counter = new int[256];
    for (int i = 0; i < s1.length(); i++) {
        counter[s1.charAt(i)]++;
        counter[s2.charAt(i)]--;
    }
    for (int count : counter) {
        if (count != 0) {
            return false;
        }
    }
    return true;
}
```

我们在同一个循环中添加和删除频率，只使用一个计数器。因此，我们最后需要检查所有频率是否等于零。

让我们看看算法复杂度：

- 时间复杂度：访问计数器的 _O(n)_
- 空间复杂度：计数器的 _O(1)_ 常量大小

让我们再次看看一些测试：

```java
@Test
void givenTwoStringsArePermutation_whenOneCounterCharsFrequencies_thenPermutation() {
    assertTrue(isPermutationWithOneCounter("baeldung", "luaebngd"));
    assertTrue(isPermutationWithOneCounter("hello world", "world hello"));
}

@Test
void givenTwoStringsAreNotPermutation_whenOneCounterCharsFrequencies_thenNotPermutation() {
    assertFalse(isPermutationWithOneCounter("baeldung", "luaebgd"));
    assertFalse(isPermutationWithOneCounter("baeldung", "luaebngq"));
}
```

### 4.3. 使用 HashMap
我们可以使用一个映射而不是一个数组来计算频率。想法是一样的，但是使用映射允许我们存储更多的字符。**这有助于处理Unicode，包括例如东欧、非洲、亚洲或表情符号字符**。

让我们看看算法：

```java
boolean isPermutationWithMap(String s1, String s2) {
    if (s1.length() != s2.length()) {
        return false;
    }
    Map<Character, Integer>` charsMap = new HashMap<>();
    for (int i = 0; i `< s1.length(); i++) {
        charsMap.merge(s1.charAt(i), 1, Integer::sum);
    }

    for (int i = 0; i < s2.length(); i++) {
        if (!charsMap.containsKey(s2.charAt(i)) || charsMap.get(s2.charAt(i)) == 0) {
            return false;
        }
        charsMap.merge(s2.charAt(i), -1, Integer::sum);
    }

    return true;
}
```

一旦我们知道了一个字符串字符的频率，我们可以检查另一个字符串是否包含所有所需的匹配项。

值得注意的是，在使用映射时，我们不会像前面的示例那样按位置比较数组。因此，我们已经知道如果映射中的键不存在或者频率值不对应。

让我们看看算法复杂度：

- 时间复杂度：在常数时间内访问映射的 _O(n)_
- 空间复杂度：根据我们存储在映射中的字符数量 _O(m)_，取决于字符串的复杂性

对于测试，这次我们也可以添加非ASCII字符：

```java
@Test
void givenTwoStringsArePermutation_whenCountCharsFrequenciesWithMap_thenPermutation() {
    assertTrue(isPermutationWithMap("baelduňg", "luaebňgd"));
    assertTrue(isPermutationWithMap("hello world", "world hello"));
}
```

对于否定案例，为了获得100%的测试覆盖率，我们必须考虑映射不包含键或者存在值不匹配的情况：

```java
@Test
void givenTwoStringsAreNotPermutation_whenCountCharsFrequenciesWithMap_thenNotPermutation() {
    assertFalse(isPermutationWithMap("baelduňg", "luaebgd"));
    assertFalse(isPermutationWithMap("baeldung", "luaebngq"));
    assertFalse(isPermutationWithMap("baeldung", "luaebngg"));
}
```

## 5. 包含排列的字符串
如果我们想检查一个字符串是否包含另一个字符串作为排列怎么办？例如，我们可以看到字符串 "acab" 包含 "ba" 作为排列；"ab" 是 "ba" 的排列，并且从第三个字符开始包含在 "acab" 中。

我们可以遍历前面讨论的所有排列，但那不会很高效。计数频率也不会起作用。例如，检查 "cb" 是否是 "acab" 的排列包含会导致误报。

**然而，我们仍然可以使用计数器作为起点，然后使用滑动窗口技术来检查排列。**

我们对每个字符串使用频率计数器。我们首先向潜在排列的计数器中添加。然后，我们循环遍历第二个字符串的字符，并遵循以下模式：

- 向新考虑的窗口中添加一个新的后续字符
- 当超过窗口长度时，移除一个前面的字符

窗口具有潜在排列字符串的长度。让我们在图表中描绘这个：

让我们看看算法。_s2_ 是我们想要检查包含的字符串。此外，我们将情况简化为字母表的26个字符，以简化：

```java
boolean isPermutationInclusion(String s1, String s2) {
    int ns1 = s1.length(), ns2 = s2.length();
    if (ns1 < ns2) {
        return false;
    }

    int[] s1Count = new int[26];
    int[] s2Count = new int[26];

    for (char ch : s2.toCharArray()) {
        s2Count[ch - 'a']++;
    }

    for (int i = 0; i < ns1; ++i) {
        s1Count[s1.charAt(i) - 'a']++;
        if (i >`= ns2) {
            s1Count[s1.charAt(i - ns2) - 'a']--;
        }
        if (Arrays.equals(s1Count, s2Count)) {
            return true;
        }
    }

    return false;
}
```

让我们看看最后的循环，我们应用滑动窗口。**我们向频率计数器中添加。然而，当窗口超过排列长度时，我们移除一个字符的发生次数。**

值得注意的是，如果字符串具有相同的长度，我们就陷入了我们之前看到的变位词案例。

让我们看看算法复杂度。设 _l1_ 和 _l2_ 分别是字符串 _s1_ 和 _s2_ 的长度：

- 时间复杂度：根据字符串之间的差异和字符的范围，为 _O(l1 + 26*(l2 - l1))_
- 空间复杂度：用于跟踪频率的常量空间 _O(1)_

让我们看看一些正例测试用例，我们检查完全匹配或排列：

```java
@Test
void givenTwoStrings_whenIncludePermutation_thenPermutation() {
    assertTrue(isPermutationInclusion("baeldung", "ea"));
    assertTrue(isPermutationInclusion("baeldung", "ae"));
}
```

让我们看看一些否定测试用例：

```java
@Test
void givenTwoStrings_whenNotIncludePermutation_thenNotPermutation() {
    assertFalse(isPermutationInclusion("baeldung", "au"));
    assertFalse(isPermutationInclusion("baeldung", "baeldunga"));
}
```

## 6. 结论
在本文中，我们看到了检查一个字符串是否是另一个字符串排列的一些算法。对字符串字符进行排序和比较是一个直接的解决方案。更有趣的是，我们可以通过在计数器中存储字符频率并比较它们来实现线性复杂度。我们也可以使用映射而不是频率数组来获得相同的结果。最后，我们还看到了使用滑动窗口来检查一个字符串是否包含另一个字符串排列的问题变体。

正如往常一样，本文中介绍的代码可以在 GitHub 上找到。

评论在文章发布后30天内开放。对于超过此日期的任何问题，请使用网站上的联系表单。

OK