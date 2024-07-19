---
date: 2022-04-01
category:
  - Java
  - Object-Oriented Programming
tag:
  - Java
  - Inheritance
  - Interfaces
head:
  - - meta
    - name: keywords
      content: Java, Inheritance, Interfaces, Extends, Implements
------
# Java 中的 implements 与 extends

## 1. 概述

在本教程中，我们将讨论面向对象编程的关键概念之一——继承。在 Java 中，用于继承的两个主要关键字是 **_extends_** 和 **_implements_**。

让我们讨论这两个关键字之间的区别。

**我们使用 _extends_ 关键字来继承一个类的属性和方法。** 作为父类的类被称为基类，从这个基类继承的类被称为派生类或子类。主要来说，_extends_ 关键字用于将父类的功能性扩展到派生类。此外，一个基类可以有多个派生类，但一个派生类只能有一个基类，因为 Java 不支持多重继承。

另一方面，**我们使用 _implements_ 关键字来实现一个接口。** 一个接口只包含抽象方法。一个类将实现该接口，并根据所需的功能定义这些抽象方法。**与 _extends_ 不同，任何类都可以实现多个接口。**

尽管这两个关键字都与继承的概念一致，但 _implements_ 关键字主要与抽象相关，并用于定义一个契约，而 _extends_ 用于扩展一个类现有的功能。

## 3. 实现

让我们进入实现，并详细查看 _extends_、_implements_ 以及多重继承。

### 3.1. _extends_

让我们从创建一个名为 _Media_ 的类开始，它有 _id_、_title_ 和 _artist_。这个类将作为基类。_VideoMedia_ 和 _AudioMedia_ 将扩展这个类的功能：

```java
public class Media {
    private int id;
    private String title;
    private String artist;
    // 标准 getter 和 setter
}
```

现在，让我们创建另一个名为 _VideoMedia_ 的类，它 _extends_ 类 _Media_，继承其属性。此外，它还有自己的属性，如 _resolution_ 和 _aspectRatio_：

```java
public class VideoMedia extends Media {
    private String resolution;
    private String aspectRatio;
    // 标准 getter 和 setter
}
```

同样，类 _AudioMedia_ 也 _extends_ 类 _Media_，并将有自己的额外属性，如 _bitrate_ 和 _frequency_：

```java
public class AudioMedia extends Media {
    private int bitrate;
    private String frequency;
    // 标准 getter 和 setter

    @Override
    public void printTitle() {
        System.out.println("AudioMedia Title");
    }
}
```

让我们为基类和派生类创建对象，看看继承的属性：

```java
Media media = new Media();
media.setId(001);
media.setTitle("Media1");
media.setArtist("Artist001");

AudioMedia audioMedia = new AudioMedia();
audioMedia.setId(101);
audioMedia.setTitle("Audio1");
audioMedia.setArtist("Artist101");
audioMedia.setBitrate(3500);
audioMedia.setFrequency("256kbps");

VideoMedia videoMedia = new VideoMedia();
videoMedia.setId(201);
videoMedia.setTitle("Video1");
videoMedia.setArtist("Artist201");
videoMedia.setResolution("1024x768");
videoMedia.setAspectRatio("16:9");

System.out.println(media);
System.out.println(audioMedia);
System.out.println(videoMedia);
```

所有三个类都打印了相关的属性：

```
Media{id=1, title='Media1', artist='Artist001'}
AudioMedia{id=101, title='Audio1', artist='Artist101', bitrate=3500, frequency='256kbps'}
VideoMedia{id=201, title='Video1', artist='Artist201'resolution='1024x768', aspectRatio='16:9'}
```

### 3.2. _implements_

为了理解抽象和接口，我们将创建一个名为 _MediaPlayer_ 的接口，它有两个名为 _play_ 和 _pause_ 的方法。正如之前提到的，这个接口中的所有方法都是抽象的。换句话说，接口只包含方法声明。

**在 Java 中，接口不需要显式声明一个方法为 _abstract_ 或 _public_。** 实现接口 _MediaPlayer_ 的类将定义这些方法：

```java
public interface MediaPlayer {
    void play();

    void pause();
}
```

类 _AudioMediaPlayer_ _implements_ _MediaPlayer_，并为音频媒体定义 _play_ 和 _pause_ 方法：

```java
public class AudioMediaPlayer implements MediaPlayer {

    @Override
    public void play() {
        System.out.println("AudioMediaPlayer is Playing");
    }

    @Override
    public void pause() {
        System.out.println("AudioMediaPlayer is Paused");
    }
}
```

同样，_VideoMediaPlayer_ 实现 _MediaPlayer_ 并为视频媒体提供 _play_ 和 _pause_ 方法定义：

```java
public class VideoMediaPlayer implements MediaPlayer {

    @Override
    public void play() {
        System.out.println("VideoMediaPlayer is Playing");
    }

    @Override
    public void pause() {
        System.out.println("VideoMediaPlayer is Paused");
    }
}
```

进一步，让我们创建 _AudioMediaPlayer_ 和 _VideoMediaPlayer_ 的实例，并为它们调用 _play_ 和 _pause_ 方法：

```java
AudioMediaPlayer audioMediaPlayer = new AudioMediaPlayer();
audioMediaPlayer.play();
audioMediaPlayer.pause();

VideoMediaPlayer videoMediaPlayer = new VideoMediaPlayer();
videoMediaPlayer.play();
videoMediaPlayer.pause();
```

_AudioMediaPlayer_ 和 _VideoMediaPlayer_ 调用它们各自的 _play_ 和 _pause_ 实现：

```
AudioMediaPlayer is Playing
AudioMediaPlayer is Paused

VideoMediaPlayer is Playing
VideoMediaPlayer is Paused
```

### 3.3. 多重继承

**由于歧义问题，Java 不直接支持多重继承。** 当一个类从多个父类继承，并且这两个父类都有一个同名的方法或属性时，会发生歧义问题。因此，子类无法解决要继承的方法或属性的冲突。**然而，一个类可以从多个接口继承。** 让我们创建一个名为 _AdvancedPlayerOptions_ 的接口：

```java
public interface AdvancedPlayerOptions {
    void seek();

    void fastForward();
}
```

类 _MultiMediaPlayer_ _implements_ _MediaPlayer_ 和 _AdvancedPlayerOptions_ 并定义这两个接口中声明的方法：

```java
public class MultiMediaPlayer implements MediaPlayer, AdvancedPlayerOptions {

    @Override
    public void play() {
        System.out.println("MultiMediaPlayer is Playing");
    }

    @Override
    public void pause() {
        System.out.println("MultiMediaPlayer is Paused");
    }

    @Override
    public void seek() {
        System.out.println("MultiMediaPlayer is being seeked");
    }

    @Override
    public void fastForward() {
        System.out.println("MultiMediaPlayer is being fast forwarded");
    }
}
```

现在，我们将创建 _MultiMediaPlayer_ 类的实例并调用所有实现的方法：

```java
MultiMediaPlayer multiMediaPlayer = new MultiMediaPlayer();
multiMediaPlayer.play();
multiMediaPlayer.pause();
multiMediaPlayer.seek();
multiMediaPlayer.fastForward();
```

正如预期的那样，_MultiMediaPlayer_ 调用它的 _play_ 和 _pause_ 实现：

```
MultiMediaPlayer is Playing
MultiMediaPlayer is Paused
MultiMediaPlayer is being seeked
MultiMediaPlayer is being fast forwarded
```

## 4. 结论

在本教程中，我们讨论了 _extends_ 和 _implements_ 之间的显著差异。此外，我们创建了类和接口来演示 _extends_ 和 _implements_ 的概念。**我们还讨论了多重继承以及如何通过接口实现它。**

此实现可在 GitHub 上获取。