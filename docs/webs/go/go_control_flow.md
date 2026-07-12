# 控制流

Go 使用 `if`、`switch`、`select`、`for` 进行控制，其中 **`for` 是唯一循环关键字**。

## 一、条件语句 if

- 条件**不需要括号**，但**大括号必须**（即使单行）
- 不支持三元运算符，必须写完整 `if`
- 支持在条件前加初始化语句，其变量作用域仅限 `if` 块

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

Go 只有 `for` 一种循环，但有多种形式：

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
