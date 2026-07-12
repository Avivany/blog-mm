# 并发编程

Go 通过 **goroutine（协程）** 实现并发，通过 **channel（通道）** 实现协程间通信与同步。

## 一、背景概念

- **串行**：多个任务由一个处理器按时间先后逐个执行
- **并行**：多个任务在同一时刻由多个处理器同时执行
- **并发**：宏观并行、微观分片执行
- **进程**：操作系统分配资源的最小单位
- **线程**：操作系统调度的最小单位
- **协程（goroutine）**：轻量级线程，栈仅 2KB 且动态增长，调度不依赖内核，开销小

## 二、协程 goroutine

- 用 `go` 关键字启动，调度由运行时负责
- 程序启动时创建主协程执行 `main()`；`main()` 结束则其他协程停止
- 协程运行顺序不固定

```go
func doJob(name string) {
    fmt.Println("doJob:", name)
}

func main() {
    go doJob("job1") // 启动协程

    x := "nothing"
    go func() {
        x = doJob("job2") // 闭包捕获外部变量
    }()

    fmt.Println("x:", x)             // nothing（协程可能尚未运行）
    time.Sleep(100 * time.Millisecond)
    fmt.Println("x:", x)             // job2
}
```

> 实际项目中应使用同步原语（如 `sync.WaitGroup`、`channel`）等待协程，而非 `time.Sleep`。

## 三、通道 channel

通道是用于协程间传递指定类型数据的队列，是**引用类型**。

### 创建

```go
var ch chan string          // 仅声明，为 nil
ch = make(chan string)      // 无缓冲
ch2 := make(chan string, 2) // 缓冲容量为 2
```

- 未初始化（nil）的通道发送/接收会**阻塞**
- `len(ch)` 为缓冲区中数据量；`cap(ch)` 为容量（初始化后不变）

### 发送与接收

```go
ch <- "hello"     // 发送
v := <-ch         // 接收
v, ok := <-ch     // ok 为 false 表示通道已关闭且无数据
```

- 无缓冲通道：发送时若无接收方则阻塞
- 有缓冲通道：缓冲区满才阻塞发送
- 已关闭通道发送会 panic；接收已关闭通道则读完剩余数据后不阻塞

### 关闭

```go
close(ch)
```

- 原则：**只允许发送端关闭**，接收端不关闭；多发送端时不要关闭

### 示例：协程计算结果回传

```go
func doJob(name string, ch chan string) {
    ch <- name + "_result"
    close(ch)
}

func main() {
    ch := make(chan string)
    go doJob("job1", ch)
    data, ok := <-ch
    fmt.Println(data, ok) // job1_result true
}
```

### 遍历通道

```go
ch2 := make(chan string, 2)
go func() {
    for _, a := range "abcd" {
        ch2 <- string(a)
    }
    close(ch2)
}()
for x := range ch2 { // 遍历完数据后退出
    fmt.Print(x, " ")
}
```

### 只读 / 只写通道

作为函数参数/返回值时借助编译器限制方向：

```go
func ReadOnly(ch <-chan int) { // 只读
    for x := range ch {
        fmt.Print(x, " ")
    }
}

func WriteOnly(ch chan<- int) { // 只写
    for i := 0; i < 10; i++ {
        ch <- i
    }
    close(ch)
}

func main() {
    ch := make(chan int)
    go WriteOnly(ch)
    ReadOnly(ch)
}
```

## 四、选择语句 select

`select` 用于通道多路复用（详见《控制流》），常与 `default` 配合实现非阻塞：

```go
select {
case v := <-ch1:
    fmt.Println("ch1:", v)
case v := <-ch2:
    fmt.Println("ch2:", v)
default:
    fmt.Println("no data")
}
```

## 五、综合示例：生产消费

```go
func producer(ch chan int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consumer(ch chan int) {
    for v := range ch {
        fmt.Println("consume:", v)
    }
}

func main() {
    ch := make(chan int, 2)
    go producer(ch)
    consumer(ch)
}
```
