---
date: 2024-06-19
category:
  - Java
  - Algorithms
tag:
  - Matrix
  - Zero
  - Optimization
head:
  - - meta
    - name: keywords
      content: Java, Matrix, Zero, Algorithm, Optimization
---
# Java中将矩阵元素设置为零

矩阵是计算机科学、数学和工程领域中使用的基本数据结构。在某些场景中，我们可能需要根据特定条件或要求将某些矩阵元素设置为零。在本教程中，我们将讨论在Java中高效完成此任务的各种方法。

## 2. 问题理解

给定一个矩阵，我们的目标是将矩阵中每个零元素所在的整行和整列都设置为零。这个操作有效地“清零”了包含至少一个零元素的行和列。

例如，考虑以下矩阵：

```
[1, 2, 3]
[4, 0, 6]
[7, 8, 9]
```

应用转换后，矩阵变为：

```
[1, 0, 3]
[0, 0, 0]
[7, 0, 9]
```

## 3. 简单解决方案

经常采用的策略是使用一种简单的问题解决方法，通常不强调优化或效率考虑。这通常是解决问题最明显的方式，但在性能或资源使用方面可能不是最有效或最高效的。

使用简单方法解决我们的问题，我们可以从复制输入矩阵以保留原始值开始，然后遍历它以检测零元素。

遇到零元素时，我们继续在复制的矩阵中将对应的整行和整列清零。最后，我们使用从副本获得的修改后的值更新原始矩阵：

```java
public class SetMatrixToZero {
    static void setZeroesByNaiveApproach(int[][] matrix) {
        int row = matrix.length;
        int col = matrix[0].length;
        int [][] result = new int[row][col];

        for (int i = 0; i `< row; i++) {
            for (int j = 0; j < col; j++) {
                result[i][j] = matrix[i][j];
            }
        }

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (matrix[i][j] == 0) {
                    for (int k = 0; k < col; k++) {
                        result[i][k] = 0;
                    }
                    for (int k = 0; k < row; k++) {
                        result[k][j] = 0;
                    }
                }
            }
        }

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                matrix[i][j] = result[i][j];
            }
        }
    }
}
```

**虽然这种方法简单直接，但它的时间复杂度为O(m*n)，其中m是行数，n是列数。它的空间复杂度是O(m*n)。** 对于大型矩阵，这种方法可能不够高效。

让我们通过以下测试来验证这种方法：

```java
@Test
void givenMatrix_whenUsingSetZeroesByNaiveApproach_thenSetZeroes() {
    int[][] matrix = {
        {1, 2, 3},
        {4, 0, 6},
        {7, 8, 9}
    };
    int[][] expected = {
        {1, 0, 3},
        {0, 0, 0},
        {7, 0, 9}
    };
    SetMatrixToZero.setZeroesByNaiveApproach(matrix);
    assertArrayEquals(expected, matrix);
}
```

## 4. 时间优化方法

这种方法侧重于通过使用额外的空间来存储矩阵中零元素的索引来提高解决方案的时间复杂度。

它首先遍历矩阵以识别零元素，并将它们的行和列索引存储在单独的_HashSet_中。然后，它再次遍历矩阵，并根据存储的索引将相应的行和列设置为零：

```java
static void setZeroesByTimeOptimizedApproach(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;

    Set`<Integer>`` rowSet = new HashSet<>();
    Set`<Integer>` colSet = new HashSet<>();

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] == 0) {
                rowSet.add(i);
                colSet.add(j);
            }
        }
    }

    for (int row: rowSet) {
        for (int j = 0; j < cols; j++) {
            matrix[row][j] = 0;
        }
    }

    for (int col: colSet) {
        for (int i = 0; i < rows; i++) {
            matrix[i][col] = 0;
        }
    }
}
```

**这种方法具有O(m*n)的时间复杂度，并需要额外的空间O(m+n)来存储索引，这在大型矩阵中可能是低效的。**

我们可以通过以下测试来验证上述方法：

```java
@Test
void givenMatrix_whenUsingSetZeroesByTimeOptimizedApproach_thenSetZeroes() {
    int[][] matrix = {
        {1, 2, 3},
        {4, 0, 6},
        {7, 8, 9}
    };
    int[][] expected = {
        {1, 0, 3},
        {0, 0, 0},
        {7, 0, 9}
    };
    SetMatrixToZero.setZeroesByTimeOptimizedApproach(matrix);
    assertArrayEquals(expected, matrix);
}
```

## 5. 最优方法

**这种方法通过就地修改原始矩阵而不使用额外空间来优化空间复杂度。**

它首先检查第一行和第一列是否包含任何零。

然后，它通过将相应的元素设置为零来标记第一行和第一列中的零元素。接下来，它遍历矩阵（不包括第一行和第一列）来标记第一行和第一列中的零元素。

最后，它遍历第一行和第一列，根据需要将整个行或列设置为零。

我们将上述步骤拆分为单独的辅助方法。以下代码检查矩阵的第一行中是否至少有一个零：

```java
static boolean hasZeroInFirstRow(int[][] matrix, int cols) {
    for (int j = 0; j < cols; j++) {
        if (matrix[0][j] == 0) {
            return true;
        }
    }
    return false;
}
```

类似地，我们检查矩阵的第一列中是否至少有一个零：

```java
static boolean hasZeroInFirstCol(int[][] matrix, int rows) {
    for (int i = 0; i < rows; i++) {
        if (matrix[i][0] == 0) {
            return true;
        }
    }
    return false;
}
```

我们通过将第一行和第一列中的相应元素设置为零来标记矩阵中零的位置：

```java
static void markZeroesInMatrix(int[][] matrix, int rows, int cols) {
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < cols; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
}
```

接下来，我们根据矩阵第一列中的标记将行中的零设置为零：

```java
static void setZeroesInRows(int[][] matrix, int rows, int cols) {
    for (int i = 1; i < rows; i++) {
        if (matrix[i][0] == 0) {
            for (int j = 1; j < cols; j++) {
                matrix[i][j] = 0;
            }
        }
    }
}
```

类似地，我们根据矩阵第一行中的标记将列中的零设置为零：

```java
static void setZeroesInCols(int[][] matrix, int rows, int cols) {
    for (int j = 1; j < cols; j++) {
        if (matrix[0][j] == 0) {
            for (int i = 1; i < rows; i++) {
                matrix[i][j] = 0;
            }
        }
    }
}
```

现在，我们将第一行中的所有元素设置为零：

```java
static void setZeroesInFirstRow(int[][] matrix, int cols) {
    for (int j = 0; j < cols; j++) {
        matrix[0][j] = 0;
    }
}
```

我们对第一列采取类似的方法：

```java
static void setZeroesInFirstCol(int[][] matrix, int rows) {
    for (int i = 0; i < rows; i++) {
        matrix[i][0] = 0;
    }
}
```

我们将所有前面的步骤合并，并在此方法中执行它们：

```java
static void setZeroesByOptimalApproach(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;

    boolean firstRowZero = hasZeroInFirstRow(matrix, cols);
    boolean firstColZero = hasZeroInFirstCol(matrix, rows);

    markZeroesInMatrix(matrix, rows, cols);

    setZeroesInRows(matrix, rows, cols);
    setZeroesInCols(matrix, rows, cols);

    if (firstRowZero) {
        setZeroesInFirstRow(matrix, cols);
    }
    if (firstColZero) {
        setZeroesInFirstCol(matrix, rows);
    }
}

**这种方法消除了对额外空间的需求，结果空间复杂度为O(1)。整体空间复杂度保持为O(m*n)。**

它在现有的矩阵内实现了预期的结果，并保持了O(m*n)的时间复杂度，其中n表示行数，n表示列数。**这种效率使其适合处理大型矩阵。**

让我们编写测试来评估这种方法：

```java
@Test
void givenMatrix_whenUsingSetZeroesByOptimalApproach_thenSetZeroes() {
    int[][] matrix = {
        {1, 2, 3},
        {4, 0, 6},
        {7, 8, 9}
    };
    int[][] expected = {
        {1, 0, 3},
        {0, 0, 0},
        {7, 0, 9}
    };
    SetMatrixToZero.setZeroesByOptimalApproach(matrix);
    assertArrayEquals(expected, matrix);
}
```

## 6. 结论

在本教程中，我们探讨了在矩阵中将元素设置为零的各种方法。简单方法旨在实现预期结果，而不优先考虑优化或性能。相比之下，时间优化方法通过使用额外的空间来降低时间复杂度。

然而，最优方法既提高了时间复杂度，也不需要任何额外的空间，使其成为上述所有方法中更好的选择。重要的是要承认，这个问题可能还有几种其他最优解。

如常，完整的源代码可在GitHub上获得。

文章发布后30天内开放评论。对于此日期之后的任何问题，请使用网站上的联系表单。

OK