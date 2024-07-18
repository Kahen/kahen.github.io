---
date: 2022-04-01
category:
  - Java
  - Sound
tag:
  - Java Sound
  - Audio
head:
  - - meta
    - name: keywords
      content: Java, Sound, Audio, Clip, SourceDataLine, JavaFX, JLayer
------
# 如何使用Java播放声音 | Baeldung

## **1. 概述**

在本教程中，我们将学习如何使用Java播放声音。Java声音API旨在平滑且连续地播放声音，甚至是非常长的声音。

作为本教程的一部分，我们将使用Java提供的_Clip_和_SourceDataLine_声音API来播放音频文件。我们还将播放不同音频格式的文件。

此外，我们将讨论每种API的优缺点。进一步地，我们将看到一些第三方Java库也可以播放声音。

一般来说，存在于_javax.sound_包中的Java声音API提供了两种播放音频的方式。在这两种方法之间，声音文件数据的指定方式有所不同。Java声音API可以以流式传输、缓冲的方式处理音频传输，也可以以内存中、非缓冲的方式处理。

Java最知名的两个声音API是_Clip_和_SourceDataLine_。

### **2.1. _Clip_ API**

_Clip_ API是Java的非缓冲或内存中的声音API。_Clip_类是_javax.sound.sampled_包的一部分，**它在读取和播放短声音文件时非常有用**。在播放之前，整个音频文件被加载到内存中，用户对播放有完全的控制。

除了循环声音外，它还允许用户从随机位置开始播放。

让我们首先创建一个示例类，_SoundPlayerWithClip_，它实现了_LineListener_接口，以便接收播放的线路事件（_OPEN_、_CLOSE_、_START_和_STOP_）。我们将实现_LineListener_中的_update()_方法来检查播放状态：

```java
public class SoundPlayerUsingClip implements LineListener {

    boolean isPlaybackCompleted;

    @Override
    public void update(LineEvent event) {
        if (LineEvent.Type.START == event.getType()) {
            System.out.println("播放开始。");
        } else if (LineEvent.Type.STOP == event.getType()) {
            isPlaybackCompleted = true;
            System.out.println("播放完成。");
        }
    }
}
```

其次，让我们从我们项目的资源文件夹中读取音频文件。我们的资源文件夹包含三种不同格式的音频文件——即WAV、MP3和MPEG：

```java
InputStream inputStream = getClass().getClassLoader().getResourceAsStream(audioFilePath);
```

第三，从文件流中，我们将创建一个_AudioInputStream_：

```java
AudioInputStream audioStream = AudioSystem.getAudioInputStream(inputStream);
```

现在，我们将创建一个_DataLine.Info_对象：

```java
AudioFormat audioFormat = audioStream.getFormat();
DataLine.Info info = new DataLine.Info(SourceDataLine.class, audioFormat);
```

让我们从这个_DataLine.Info_创建一个_Clip_对象，打开流，然后调用_start_开始播放音频：

```java
Clip audioClip = (Clip) AudioSystem.getLine(info);
audioClip.addLineListener(this);
audioClip.open(audioStream);
audioClip.start();
```

最后，我们需要关闭任何打开的资源：

```java
audioClip.close();
audioStream.close();
```

一旦代码运行，音频文件将播放。

**由于音频是预加载到内存中的，我们可以从许多其他有用的API中受益。**

我们可以使用_Clip.loop_方法来循环播放音频剪辑。

例如，我们可以将其设置为播放音频五次：

```java
audioClip.loop(4);
```

或者，我们可以将其设置为无限时间播放（或直到被中断）：

```java
audioClip.loop(Clip.LOOP_CONTINUOUSLY);
```

_Clip.setMicrosecondPosition_设置媒体位置。当剪辑下次开始播放时，它将从这个位置开始。例如，要从第30秒开始，我们可以这样设置：

```java
audioClip.setMicrosecondPosition(30_000_000);
```

### **2.2. _SourceDataLine_ API**

_SourceDataLine_ API是Java的缓冲或流式声音API。_SourceDataLine_类是_javax.sound.sampled_包的一部分，它可以播放不能预加载到内存中的长声音文件。

**使用_SourceDataLine_更有效，当我们希望为大音频文件优化内存或当我们希望流式传输实时音频数据时。** 它也很有用，如果我们事先不知道声音有多长以及何时结束。

让我们首先创建一个示例类，并从我们项目的资源文件夹中读取音频文件。我们的资源文件夹包含三种不同格式的音频文件——即WAV、MP3和MPEG：

```java
InputStream inputStream = getClass().getClassLoader().getResourceAsStream(audioFilePath);
```

其次，从文件输入流中，我们将创建一个_AudioInputStream_：

```java
AudioInputStream audioStream = AudioSystem.getAudioInputStream(inputStream);
```

现在，我们将创建一个_DataLine.Info_对象：

```java
AudioFormat audioFormat = audioStream.getFormat();
DataLine.Info info = new DataLine.Info(Clip.class, audioFormat);
```

让我们从这个_DataLine.Info_创建一个_SourceDataLine_对象，打开流，并调用_start_开始播放音频：

```java
SourceDataLine sourceDataLine = (SourceDataLine) AudioSystem.getLine(info);
sourceDataLine.open(audioFormat);
sourceDataLine.start();
```

现在，在_SourceDataLine_的情况下，**音频数据是分块加载的，我们需要提供缓冲区大小**：

```java
private static final int BUFFER_SIZE = 4096;
```

现在，让我们从_AudioInputStream_读取音频数据并将其发送到_SourceDataLine_的播放缓冲区，直到它到达流的末尾：

```java
byte[] bufferBytes = new byte[BUFFER_SIZE];
int readBytes = -1;
while ((readBytes = audioStream.read(bufferBytes)) != -1) {
    sourceDataLine.write(bufferBytes, 0, readBytes);
}
```

最后，让我们关闭任何打开的资源：

```java
sourceDataLine.drain();
sourceDataLine.close();
audioStream.close();
```

一旦代码运行，音频文件将播放。

在这里，我们不需要实现任何_LineListener_接口。

### **2.3. _Clip_和_SourceDataLine_的比较**

让我们讨论一下两者的优缺点：

| Clip| SourceDataLine|
| ---| ---|
| 支持从音频的任何位置播放。见_setMicrosecondPosition(long)_或_setFramePosition(int)_。| 不能从声音的任意位置开始播放。|
| 支持循环播放（全部或部分声音）。见_setLoopPoints(int, int)_和_loop(int)_。| 不能播放（循环）全部或部分声音。|
| 可以在播放之前知道声音的持续时间。见_getFrameLength()_或_getMicrosecondLength()_。| 不能在播放之前知道声音的持续时间。|
| 可以在当前位置停止播放，并稍后恢复播放。见_stop()_和_start()_| 不能在中间停止和恢复播放。|
| 不适合且效率低下地播放大音频文件，因为它是内存中的。| 适合且高效地播放长声音文件或实时流式传输声音。|
| _Clip’s start()_方法确实播放声音，但它不会阻塞当前线程（它立即返回），因此需要实现_LineListener_接口以了解播放状态。| 与_Clip_不同，我们不需要实现_LineListener_接口以知道何时播放完成。|
| 不能控制要写入音频线播放缓冲区的声音数据。| 可以控制要写入音频线播放缓冲区的声音数据。|

### **2.4. Java API对MP3格式的支持**

目前，_Clip_和_SourceDataLine_可以播放AIFC、AIFF、AU、SND和WAV格式的音频文件。

我们可以使用_AudioSystem_检查支持的音频格式：

```java
Type[] list = AudioSystem.getAudioFileTypes();
StringBuilder supportedFormat = new StringBuilder("支持的格式：");
for (Type type : list) {
    supportedFormat.append(", " + type.toString());
}
System.out.println(supportedFormat.toString());
```

**然而，我们不能使用Java声音API _Clip_和_SourceDataLine_播放流行的MP3/MPEG音频格式。** 我们需要寻找一些第三方库来播放MP3格式。

如果我们向_Clip_或_SourceDataLine_ API提供MP3格式文件，我们将得到_UnsupportedAudioFileException_：

```java
javax.sound.sampled.UnsupportedAudioFileException: could not get audio input stream from input file
    at javax.sound.sampled.AudioSystem.getAudioInputStream(AudioSystem.java:1189)
```

## **3. 第三方Java API播放声音**

让我们看看一些也可以播放不同音频格式文件的第三方库。

### 3.1. JavaFX库

JavaFX有_Media_和_MediaPlayer_类，可以播放MP3文件。它也可以播放其他音频格式，如WAV。

让我们创建一个示例类，并使用_Media_和_MediaPlayer_类来播放我们的MP3文件：

```java
String audioFilePath = "AudioFileWithMp3Format.mp3";
SoundPlayerUsingJavaFx soundPlayerWithJavaFx = new SoundPlayerUsingJavaFx();
try {
    com.sun.javafx.application.PlatformImpl.startup(() -> {});
    Media media = new Media(
      soundPlayerWithJavaFx.getClass()```java
      .getClassLoader().getResource(audioFilePath).toExternalForm());
    MediaPlayer mp3Player = new MediaPlayer(media);
    mp3Player.play();
} catch (Exception ex) {
    System.out.println("播放过程中发生错误：" + ex.getMessage());
}
```

JavaFX API的一个优点是它可以播放WAV、MP3和MPEG音频格式。

### 3.2. JLayer库

JLayer库**可以播放包括MP3在内的MPEG格式的音频**。**然而，它不能播放其他格式，如WAV。**

让我们使用Javazoom的_Player_类创建一个示例类：

```java
String audioFilePath = "AudioFileWithMp3Format.mp3";
SoundPlayerUsingJavaZoom player = new SoundPlayerUsingJavaZoom();
try {
    BufferedInputStream buffer = new BufferedInputStream(
      player.getClass().getClassLoader().getResourceAsStream(audioFilePath));
    Player mp3Player = new Player(buffer);
    mp3Player.play();
} catch (Exception ex) {
    System.out.println("播放过程中发生错误：" + ex.getMessage());
}
```

## **4. 结论**

在本文中，我们学习了如何使用Java播放声音。我们还了解了两种不同的Java声音API，_Clip_和_SourceDataLine_。后来，我们看到了_Clip_和_SourceDataLine_ API之间的区别，这将帮助我们为任何用例选择适当的API。

最后，我们看到了一些也可以播放音频并支持其他格式的第三方库，如MP3。

一如既往，本文中使用示例代码可在GitHub上找到。
OK