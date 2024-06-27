---
date: 2024-06-27
category:
  - Java
  - 内存共享
tag:
  - JVM
  - 内存映射
  - 共享内存
head:
  - - meta
    - name: keywords
      content: Java, 内存共享, JVM, 内存映射, 进程间通信
---
# 在同一机器上运行的多个JVM之间共享内存

在本教程中，我们将展示如何在同一台机器上运行的两个或更多JVM之间共享内存。这种能力实现了非常快速的进程间通信，因为我们可以在没有任何I/O操作的情况下移动数据块。

任何在现代操作系统中运行的进程都会获得所谓的虚拟内存空间。我们称之为“虚拟”，因为它看起来像是一个大型的、连续的、可私有寻址的内存空间，实际上它是由遍布物理RAM的页面组成的。这里，“页面”只是操作系统术语，指的是一块连续的内存，其大小范围取决于所使用的特定CPU架构。对于x86-64，页面可以小至4KB或大至1GB。

在给定时间，只有这个虚拟空间的一部分实际上被映射到物理页面。随着时间的推移，当进程开始为其任务消耗更多内存时，操作系统开始分配更多的物理页面，并将它们映射到虚拟空间。当对内存的需求超过物理上可用的内存时，操作系统将开始将当前未使用的页面交换到二级存储中，以为请求腾出空间。

共享内存块的行为就像常规内存一样，但与常规内存不同，它不是私有的单一进程。当一个进程更改了此块内任何字节的内容时，任何其他可以访问这个共享内存的进程都会立即“看到”这个变化。

以下是共享内存的常见用途：
- 调试器（是否曾想知道调试器如何检查另一个进程中的变量？）
- 进程间通信
- 进程间只读内容共享（例如：动态库代码）
- 各种黑客行为；^)

正如名，内存映射文件是一个其内容直接映射到进程虚拟内存的连续区域的常规文件。这意味着我们可以在不显式使用I/O操作的情况下读取和/或更改其内容。操作系统将检测到映射区域的任何写入，并安排后台I/O操作以持久化修改的数据。

由于不能保证这个后台操作何时会发生，操作系统还提供了一个系统调用来刷新任何待处理的更改。这对于像数据库重做日志这样的用例很重要，但对于我们的进程间通信（简称IPC）场景则不需要。

内存映射文件通常由数据库服务器使用，以实现高吞吐量的I/O操作，但我们也可以使用它们来引导基于共享内存的IPC机制。基本思想是所有需要共享数据的进程都映射同一个文件，瞧，它们现在就有了一个共享的内存区域。

### 在Java中创建内存映射文件

在Java中，我们使用_FileChannel_的_map()_方法将文件的一个区域映射到内存中，它返回一个_MappedByteBuffer_，允许我们访问其内容：

```java
MappedByteBuffer createSharedMemory(String path, long size) {
    try (FileChannel fc = (FileChannel)Files.newByteChannel(new File(path).toPath(),
      EnumSet.of(
        StandardOpenOption.CREATE,
        StandardOpenOption.SPARSE,
        StandardOpenOption.WRITE,
        StandardOpenOption.READ))) {

        return fc.map(FileChannel.MapMode.READ_WRITE, 0, size);
    }
    catch( IOException ioe ) {
        throw new RuntimeException(ioe);
    }
}
```

这里使用_SPARSE_选项非常相关。只要底层操作系统和文件系统支持它，我们就可以映射一个相当大的内存区域而实际上不消耗磁盘空间。

现在，让我们创建一个简单的演示应用程序。_Producer_应用程序将分配一个足够大的共享内存来容纳64KB的数据加上一个SHA1哈希（20字节）。接下来，它将开始一个循环，在这个循环中，它将用随机数据填充缓冲区，然后是它的SHA1哈希。我们将连续执行这个操作30秒然后退出：

```java
// ... SHA1摘要初始化省略

MappedByteBuffer shm = createSharedMemory("some_path.dat", 64*1024 + 20);
Random rnd = new Random();

long start = System.currentTimeMillis();
long iterations = 0;
int capacity = shm.capacity();
System.out.println("Starting producer iterations...");
while(System.currentTimeMillis() - start `< 30000) {

    for (int i = 0; i < capacity - hashLen; i++) {
        byte value = (byte) (rnd.nextInt(256) & 0x00ff);
        digest.update(value);
        shm.put(i, value);
    }

    // 在最后写入哈希
    byte[] hash = digest.digest();
    shm.put(capacity - hashLen, hash);
    iterations++;
}

System.out.printf("%d iterations run\n", iterations);
```

为了测试我们确实可以共享内存，我们还将创建一个_Consumer_应用程序，它将读取缓冲区的内容，计算它的哈希，并与_Producer_生成的哈希进行比较。我们将在30秒内重复这个过程。在每次迭代中，我们还将计算缓冲区内容的哈希，并将其与缓冲区末端的一个进行比较：

```java
// ...摘要初始化省略

MappedByteBuffer shm = createSharedMemory("some_path.dat", 64*1024 + 20);
long start = System.currentTimeMillis();
long iterations = 0;
int capacity = shm.capacity();
System.out.println("Starting consumer iterations...");

long matchCount = 0;
long mismatchCount = 0;
byte[] expectedHash = new byte[hashLen];

while (System.currentTimeMillis() - start < 30000) {

    for (int i = 0; i < capacity - 20; i++) {
        byte value = shm.get(i);
        digest.update(value);
    }

    byte[] hash = digest.digest();
    shm.get(capacity - hashLen, expectedHash);

    if (Arrays.equals(hash, expectedHash)) {
        matchCount++;
    } else {
        mismatchCount++;
    }
    iterations++;
}

System.out.printf("%d iterations run. matches=%d, mismatches=%d\n", iterations, matchCount, mismatchCount);
```

为了测试我们的内存共享方案，让我们同时启动这两个程序。这是它们在3GHz，四核Intel I7机器上运行的输出：

```shell
# Producer output
Starting producer iterations...
11722 iterations run

# Consumer output
Starting consumer iterations...
18893 iterations run. matches=11714, mismatches=7179
```

**我们可以看到，在许多情况下，消费者检测到预期计算的值是不同的**。欢迎来到并发问题的精彩世界！

**我们看到的问题的根本原因是我们需要同步对共享内存缓冲区的访问**。_Consumer_必须等待_Producer_完成写入哈希后才能开始读取数据。另一方面，_Producer_也必须等待_Consumer_完成消费数据后再写入。

对于常规的多线程应用程序，解决这个问题并不难。标准库提供了几种同步原语，允许我们控制谁可以在给定时间写入共享内存。

然而，我们的情况是多JVM场景，所以这些标准方法都不适用。那么，我们该怎么办呢？**简短的回答是，我们将不得不作弊**。我们可以诉诸于操作系统特定的机制，如信号量，但这将妨碍我们应用程序的可移植性。这也意味着使用JNI或JNA，这也使事情复杂化。

**进入_Unsafe_**。尽管它的名字有点可怕，但这个标准库类提供了我们实现简单锁定机制所需的确切功能：_compareAndSwapInt()_方法。

这个方法实现了一个原子测试和设置原语，它接受四个参数。**尽管文档中没有明确说明，它可以针对不仅是Java对象，还可以是原始内存地址**。对于后者，我们在第一个参数中传递_null_，这使它将_offset_参数视为虚拟内存地址。

当我们调用这个方法时，它首先会检查目标地址的值，并将其与_expected_值进行比较。如果它们相等，那么它将修改位置的内容为新值，并返回_true_表示成功。如果位置的值与_expected_不同，什么也不发生，方法返回_false_。

**更重要的是，这个原子操作保证即使在多核架构中也能工作，这是同步多个执行线程的关键特性**。

让我们创建一个_SpinLock_类，利用这个方法实现一个（非常！）简单的锁定机制：

```java
//... 包和导入省略

public class SpinLock {
    private static final Unsafe unsafe;

    // ... unsafe初始化省略
    private final long addr;

    public SpinLock(long addr) {
        this.addr = addr;
    }

    public boolean tryLock(long maxWait) {
        long deadline = System.currentTimeMillis() + maxWait;
        while (System.currentTimeMillis() < deadline ) {
            if (unsafe.compareAndSwapInt(null, addr, 0, 1)) {
                return true;
            }
        }
        return false;
    }

    public void unlock() {
        unsafe.putInt(addr, 0);
    }
}
```

这个实现缺少关键特性，比如在释放锁之前检查它是否拥有锁，但这对我们的目的来说足够了。

好的，我们如何获得我们将用于存储锁状态的内存地址呢？这必须是共享内存缓冲区内的地址，以便两个进程都可以使用它，但_MappedByteBuffer_类没有公开实际的内存地址。

检查_map()_返回的对象，我们可以看到它是一个_DirectByteBuffer_。**这个类有一个公共方法叫做_address()_，它返回我们想要的确切内容。不幸的是，这个类是包私有的，所以我们不能使用简单的类型转换来访问这个方法。

要绕过这个限制，我们将再次使用一点技巧，并使用反射来调用这个方法：

```java
private static long getBufferAddress(MappedByteBuffer shm) {
    try {
        Class<?>` cls = shm.getClass();
        Method maddr = cls.getMethod("address");
        maddr.setAccessible(true);
        Long addr = (Long) maddr.invoke(shm);
        if (addr == null) {
            throw new RuntimeException("Unable to retrieve buffer's address");
        }
        return addr;
    } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException ex) {
        throw new RuntimeException(ex);
    }
}
```

在这里，我们使用_setAccessible()_使_address()_方法可以通过_Method_句柄调用。**然而，请注意，从Java 17开始，除非我们明确使用运行时_–add-opens_标志，否则这种技术将不起作用。**

### 向_Producer_和_Consumer_添加同步

现在我们有了锁定机制，让我们首先应用到_Producer_。为了这个演示的目的，我们假设_Producer_总是在_Consumer_之前启动。我们需要这样做，这样我们就可以初始化缓冲区，清除其内容，包括我们将与_SpinLock_一起使用的区域：

```java
public static void main(String[] args) throws Exception {

    // ... 摘要初始化省略
    MappedByteBuffer shm = createSharedMemory("some_path.dat", 64*1024 + 20);

    // 清理锁区域
    shm.putInt(0, 0);

    long addr = getBufferAddress(shm);
    System.out.println("Starting producer iterations...");

    long start = System.currentTimeMillis();
    long iterations = 0;
    Random rnd = new Random();
    int capacity = shm.capacity();
    SpinLock lock = new SpinLock(addr);
    while(System.currentTimeMillis() - start < 30000) {

        if (!lock.tryLock(5000)) {
            throw new RuntimeException("Unable to acquire lock");
        }

        try {
            // 跳过前4个字节，因为它们被锁使用
            for (int i = 4; i < capacity - hashLen; i++) {
                byte value = (byte) (rnd.nextInt(256) & 0x00ff);
                digest.update(value);
                shm.put(i, value);
            }

            // 在最后写入哈希
            byte[] hash = digest.digest();
            shm.put(capacity - hashLen, hash);
            iterations++;
        }
        finally {
            lock.unlock();
        }
    }
    System.out.printf("%d iterations run\n", iterations);
}
```

与未同步版本相比，只有微小的变化：

- 获取与_MappedByteBuffer_关联的内存地址
- 使用这个地址创建一个_SpinLock_实例。锁使用一个_int_，所以它将占用缓冲区最初的四个字节
- 使用_SpinLock_实例来保护填充随机数据及其哈希的代码

现在，让我们对_Consumer_端进行类似的更改：

```java
private static void main(String args[]) throws Exception {

    // ... 摘要初始化省略
    MappedByteBuffer shm = createSharedMemory("some_path.dat", 64*1024 + 20);
    long addr = getBufferAddress(shm);

    System.out.println("Starting consumer iterations...");

    Random rnd = new Random();
    long start = System.currentTimeMillis();
    long iterations = 0;
    int capacity = shm.capacity();

    long matchCount = 0;
    long mismatchCount = 0;
    byte[] expectedHash = new byte[hashLen];
    SpinLock lock = new SpinLock(addr);
    while (System.currentTimeMillis() - start < 30000) {

        if (!lock.tryLock(5000)) {
            throw new RuntimeException("Unable to acquire lock");
        }

        try {
            for (int i = 4; i < capacity - hashLen; i++) {
                byte value = shm.get(i);
                digest.update(value);
            }

            byte[] hash = digest.digest();
            shm.get(capacity - hashLen, expectedHash);

            if (Arrays.equals(hash, expectedHash)) {
                matchCount++;
            } else {
                mismatchCount++;
            }

            iterations++;
        }
        finally {
            lock.unlock();
        }
    }

    System.out.printf("%d iterations run. matches=%d, mismatches=%d\n", iterations, matchCount, mismatchCount);
}
```

有了这些更改，我们现在可以运行双方，并与之前的结果进行比较：

```shell
# Producer output
Starting producer iterations...
8543 iterations run

# Consumer output
Starting consumer iterations...
8607 iterations run. matches=8607, mismatches=0
```

**正如预期的那样，报告的迭代次数将低于未同步版本**。主要原因是我们大部分时间都在持有锁的代码的关键部分。持有锁的程序阻止了对方做任何事情。

如果我们比较第一种情况报告的平均迭代次数，它将大约与我们这次得到的迭代次数之和相同。这表明锁机制本身增加的开销是最小的。

### 结论

在本教程中，我们探讨了如何在运行在同一台机器上的两个JVM之间共享内存区域。我们可以将这里介绍的技术作为构建高吞吐量、低延迟进程间通信库的基础。

像往常一样，所有代码都可以在GitHub上找到。

OK