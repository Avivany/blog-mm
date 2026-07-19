# 控制流

Go 使用 `if`、`switch`、`select`、`for` 进行控制，其中 **`for` 是唯一循环关键字**。

## 一、条件语句 if

- 条件**不需要括号**，但**大括号必须**（即使单行）
- 不支持三元运算符，必须写完整 `if`
- 支持在条件前加初始化语句，其变量作用域仅限 `if` 块
  
```go
// 基本语法
if condition {
    // 代码块
}
// 或
if condition {
    // 条件为真时执行
} else {
    // 条件为假时执行
}

// 多条件判断
if condition1 {
    // 条件1为真
} else if condition2 {
    // 条件2为真
} else {
    // 其他情况
}

//带初始化语句的if
// 初始化语句中声明的变量作用域仅限于if语句块
if value := getValue(); value > 10 {
    fmt.Printf("Value is %d\n", value)
} else {
    fmt.Printf("Value is too small: %d\n", value)
}
// value 在这里不可访问
```

```go
if x > 5 {
    fmt.Println("x > 5")
}

score := 85
if score >= 90 {
    fmt.Println("优秀")
} else if score >= 80 {
    fmt.Println("良好")
} else {
    fmt.Println("其他")
}

// 带初始化语句
if err := process(); err != nil {
    fmt.Printf("Error: %v\n", err)
}
// err 在此不可访问
```

支持短路求值（`&&` 前为假则不再计算右侧）。

## 二、分支语句 switch

- 从上到下匹配，匹配即执行，**自动 break**（无需手写）
- 用 `fallthrough` 可继续执行下一个 `case`
- `case` 可为多值（`case 4, 5:`）
- `switch` 后可无表达式（等价于 `if-else` 链）
- 结合 `x.(type)` 可做类型分支（详见接口章）

```go
// 基本语法
if condition {
    // 代码块
}
// 或
if condition {
    // 条件为真时执行
} else {
    // 条件为假时执行
}

// 多条件判断
if condition1 {
    // 条件1为真
} else if condition2 {
    // 条件2为真
} else {
    // 其他情况
}
```

```go
day := 3
switch day {
case 1:
    fmt.Println("星期一")
case 4, 5:
    fmt.Println("周四或周五")
default:
    fmt.Println("其他")
}

// 无表达式
score := 85
switch {
case score >= 90:
    fmt.Println("A")
case score >= 80:
    fmt.Println("B")
default:
    fmt.Println("C")
}

// fallthrough
x := 1
switch x {
case 1:
    fmt.Println("x == 1")
    fallthrough
case 2:
    fmt.Println("x <= 2")
}
// 输出：x == 1 \n x <= 2
```

## 三、选择语句 select

`select` 用于**通道的多路复用**，只能作用于通道操作：

- 监听所有 `case` 的通道，哪个可读/可写就执行哪个
- 多个通道就绪时**随机公平**选取一个
- 没有通道就绪时执行 `default`（无 `default` 则阻塞）

```go
select {
case v := <-ch1:
    fmt.Println("from ch1:", v)
case v := <-ch2:
    fmt.Println("from ch2:", v)
default:
    fmt.Println("no channel ready")
}
```

> 通道详细用法见《并发编程》一章。

## 四、循环语句 for
Go语言只有`for`一种循环语句，但有多种形式;
for循环的写法有三种形式
● (1)、for 初始化语句; 条件语句; 后置语句 { }
● (2)、for 条件语句 { }
● (3)、for { }
与 if 语句和 switch 语句一样，for 循环表达式不需要括号。 但是，大括号是必需的。
分号 (;) 分隔 for 循环的三个组件：
● 在第一次迭代之前执行的初始语句（可选）。
● 在每次迭代之前计算的条件表达式。 该条件为 false 时，循环会停止。
● 在每次迭代结束时执行的后处理语句（可选）。


```go
// 形式一：经典三段式
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// 形式二：类似 while
count := 0
for count < 3 {
    count++
}

// 形式三：无限循环（用 break 退出）
n := 0
for {
    if n >= 3 {
        break
    }
    n++
}

// 形式四：for range 遍历集合
nums := []int{10, 20, 30}
for idx, val := range nums {
    fmt.Println(idx, val)
}
for _, val := range nums { // 忽略索引
    fmt.Println(val)
}
```

`for range` 可遍历数组、切片、字符串、map、通道。

## 五、循环控制 break / continue / goto

### break

```go
for i := 0; i < 10; i++ {
    if i == 5 {
        break
    }
    fmt.Println(i) // 0 1 2 3 4
}
```

**带标签的 break**（跳出多层循环）：

```go
outer:
for i := 0; i < 5; i++ {
    for j := 0; j < 5; j++ {
        if i == 2 && j == 2 {
            break outer
        }
        fmt.Printf("i=%d j=%d\n", i, j)
    }
}
```

### continue

```go
for i := 0; i < 10; i++ {
    if i%2 == 0 {
        continue
    }
    fmt.Println(i) // 1 3 5 7 9
}
```

**带标签的 continue**（跳过外层循环的当前迭代）：

```go
outer:
for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
        if j == 1 {
            continue outer
        }
        fmt.Printf("i=%d j=%d\n", i, j)
    }
}
```

### goto

跳转到函数内标签位置，容易导致结构混乱，应谨慎使用。

```go
i := 0
start:
if i < 5 {
    fmt.Println(i)
    i++
    goto start
}
```

## 六、延迟执行 defer

`defer` 将函数调用推迟到**外层函数返回之前**执行，常用于资源释放、解锁。

**特点：**

- 多个 `defer` 按**后进先出（LIFO）**顺序执行
- `defer` 的参数在 **`defer` 语句出现时即求值**，函数调用则延迟执行

```go
func main() {
    defer fmt.Println("defer 1")
    defer fmt.Println("defer 2")
    fmt.Println("hello")
}
// 输出：hello \n defer 2 \n defer 1
```

### 资源清理示例

```go
func readFile() error {
    f, err := os.Open("test.txt")
    if err != nil {
        return err
    }
    defer f.Close() // 函数返回前确保关闭

    // 读取 f ...
    return nil
}
```

### 参数求值时机

```go
x := 1
defer fmt.Println("defer 时 x =", x) // x 在此时已求值为 1
x = 2
fmt.Println("修改后 x =", x)
// 输出：修改后 x = 2 \n defer 时 x = 1
```

> `panic` / `recover` 与错误处理的完整逻辑见《错误处理》一章。

## 七、综合示例：猜数字游戏

```go
func main() {
    rand.Seed(time.Now().UnixNano())
    target := rand.Intn(100) + 1
    attempts := 0
    maxAttempts := 7

game:
    for attempts < maxAttempts {
        attempts++
        var guess int
        _, err := fmt.Scanf("%d", &guess)
        if err != nil {
            continue
        }

        switch {
        case guess < target:
            fmt.Println("太小了!")
        case guess > target:
            fmt.Println("太大了!")
        default:
            fmt.Printf("恭喜! 第%d次猜中: %d\n", attempts, target)
            break game
        }
    }
}
```
注意事项
1. if语句中定义的变量作用域仅限于if-else块内。
2. switch语句的case条件不需要break，如果需要继续执行下一个case，使用fallthrough。
3. for循环的多种形式要灵活运用，特别是for-range在遍历容器时非常方便。
4. break和continue可以配合标签使用，用于控制多层循环。
5. defer常用于资源管理，如文件关闭、锁释放等，确保资源被正确释放。

```go
package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano())

    // 猜数字游戏
    target := rand.Intn(100) + 1
    attempts := 0
    maxAttempts := 7

    fmt.Println("猜数字游戏 (1-100)")
    fmt.Printf("你有%d次机会\n", maxAttempts)

game:
    for attempts < maxAttempts {
        attempts++
        fmt.Printf("\n第%d次尝试: ", attempts)

        var guess int
        _, err := fmt.Scanf("%d", &guess)

        if err != nil {
            fmt.Println("请输入有效的数字!")
            continue
        }

        switch {
        case guess < 1 || guess > 100:
            fmt.Println("请输入1-100之间的数字!")
            attempts-- // 不计算无效尝试
        case guess < target:
            fmt.Println("太小了!")
        case guess > target:
            fmt.Println("太大了!")
        default:
            fmt.Printf("恭喜! 你在第%d次猜中了数字%d!\n", attempts, target)
            break game
        }

        if attempts == maxAttempts {
            fmt.Printf("\n游戏结束! 正确答案是%d\n", target)
        }
    }

    // 统计结果
    switch {
    case attempts == 1:
        fmt.Println("太厉害了! 一次猜中!")
    case attempts <= 3:
        fmt.Println("很棒! 表现不错!")
    case attempts <= 5:
        fmt.Println("不错! 继续努力!")
    default:
        fmt.Println("加油! 下次会更好!")
    }
}
```
## panic函数
运行时错误会使 Go 程序进入紧急状态。 可以强制程序进入紧急状态，但运行时错误（例如数组访问超出范围、取消对空指针的引用）也可能会导致进入紧急状态。
内置 panic() 函数会停止正常的控制流。 所有推迟的函数调用都会正常运行。 进程会在堆栈中继续，直到所有函数都返回。 然后，程序会崩溃并记录日志消息。 此消息包含错误和堆栈跟踪，有助于诊断问题的根本原因。
调用 panic() 函数时，可以添加任何值作为参数。 通常，你会发送一条错误消息，说明为什么会进入紧急状态。
```go
package main

import "fmt"

func main() {
    g(0)
    fmt.Println("Program finished successfully!")
}

func g(i int) {
    if i > 3 {
        fmt.Println("Panicking!")
        panic("Panic in g() (major)")
    }
    defer fmt.Println("Defer in g()", i)
    fmt.Println("Printing in g()", i)
    g(i + 1)
}

//运行代码时，输出如下所示：
Printing in g() 0
Printing in g() 1
Printing in g() 2
Printing in g() 3
Panicking!
Defer in g() 3
Defer in g() 2
Defer in g() 1
Defer in g() 0
panic: Panic in g() (major)

goroutine 1 [running]:
main.g(0x4)
        /Users/johndoe/go/src/helloworld/main.go:13 +0x22e
main.g(0x3)
        /Users/johndoe/go/src/helloworld/main.go:17 +0x17a
main.g(0x2)
        /Users/johndoe/go/src/helloworld/main.go:17 +0x17a
main.g(0x1)
        /Users/johndoe/go/src/helloworld/main.go:17 +0x17a
main.g(0x0)
        /Users/johndoe/go/src/helloworld/main.go:17 +0x17a
main.main()
        /Users/johndoe/go/src/helloworld/main.go:6 +0x2a
exit status 2
```
一切正常运行。 程序输出 g() 函数接收的值。
当 i 大于 3 时，程序会进入紧急状态。 会显示“Panicking!”消息。 此时，控制流中断，所有推迟的函数都开始输出“Defer in g()”消息。
程序崩溃，并显示完整的堆栈跟踪。 不会显示“Program finished successfully!”消息。

### recover 函数
Go 提供内置函数 recover()，允许你在出现紧急状况之后重新获得控制权。 只能在已推迟的函数中使用此函数。 如果调用 recover() 函数，则在正常运行的情况下，它会返回 nil，没有任何其他作用。
```go
package main

import "fmt"

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered in main", r)
        }
    }()
    g(0)
    fmt.Println("Program finished successfully!")
}

func g(i int) {
    if i > 3 {
        fmt.Println("Panicking!")
        panic("Panic in g() (major)")
    }
    defer fmt.Println("Defer in g()", i)
    fmt.Println("Printing in g()", i)
    g(i + 1)
}

// 输出
Printing in g() 0
Printing in g() 1
Printing in g() 2
Printing in g() 3
Panicking!
Defer in g() 3
Defer in g() 2
Defer in g() 1
Defer in g() 0
Recovered in main Panic in g() (major)
```
在 main() 函数中，你会将一个可以调用 recover() 函数的匿名函数推迟。 当程序处于紧急状态时，对 recover() 的调用无法返回 nil。 你可以在此处执行一些操作来清理混乱，但在这种情况下，你可以直接输出一些内容。
panic 和 recover 的组合是 Go 处理异常的惯用方式。 其他编程语言使用 try/catch 块。 Go 首选此处所述的方法。