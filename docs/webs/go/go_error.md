# 错误处理

Go 中**错误（error）**与**异常（panic）**是两个不同概念，用不同机制处理。

## 一、错误 vs 异常

| | 错误 error | 异常 panic |
| --- | --- | --- |
| 性质 | 意料之中的问题，是业务一部分 | 不该出现的问题，与业务无关 |
| 处理 | `error` 接口机制，显式返回与判断 | `panic` 机制，配合 `recover` 捕获 |
| 设计 | 正常控制流 | 极端/不可恢复情况 |

核心原则：**错误是返回值的一部分，必须被显式处理；异常用于真正异常的分支。**

## 二、error 接口

Go 内建 `error` 接口，仅包含一个方法：

```go
type error interface {
    Error() string
}
```

任何实现了 `Error() string` 的类型都可作为错误使用。

## 三、创建错误

### errors.New

```go
import "errors"

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为零")
    }
    return a / b, nil
}
```

### fmt.Errorf

```go
import "fmt"

func login(user string) error {
    return fmt.Errorf("user %s not found", user)
}
```

### 带堆栈的包装（github.com/pkg/errors）

```go
import "github.com/pkg/errors"

func query() error {
    return errors.Wrapf(queryDB(), "query failed for user %s", user)
}
```

`Wrap` / `Errorf` 会记录调用堆栈，便于排查。

## 四、错误处理规范

- 没有失败时不返回 `error`
- 当失败原因只有一个时，返回 `bool` 而非 `error`
- **`error` 应放在返回值的最后一位**
- 错误最好统一定义与管理，避免散落各处（如定义包级错误变量）
- 错误信息应包含足够上下文（谁、做什么、为什么）

```go
// 推荐：统一错误变量
var ErrNotFound = errors.New("not found")

func Get(id int) (*User, error) {
    if id <= 0 {
        return nil, ErrNotFound
    }
    // ...
}
```

## 五、错误判定（errors.Is / errors.As）

Go 1.13+ 推荐使用 `errors.Is` 比较错误、`errors.As` 提取底层类型：

```go
import (
    "errors"
    "os"
)

f, err := os.Open("/test.txt")
if err != nil {
    // 判断是否为特定错误
    if errors.Is(err, os.ErrNotExist) {
        fmt.Println("文件不存在")
    }
    // 提取底层结构类型获取更多信息
    var pathErr *os.PathError
    if errors.As(err, &pathErr) {
        fmt.Println("path:", pathErr.Path)
    }
}
```

> 旧式断言（类型断言到底层结构）仍可用，但 `errors.As` 更安全，能穿透包装层。

## 六、自定义错误

用结构体承载错误码、消息与原因，实现 `error` 接口：

```go
type BizError struct {
    Code    int32
    Message string
    Cause   error
}

func (e *BizError) Error() string {
    if e.Cause != nil {
        return fmt.Sprintf("[%d] %s: %v", e.Code, e.Message, e.Cause)
    }
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

func WrapBizError(code int32, cause error) error {
    return &BizError{
        Code:    code,
        Message: msgMap[code],
        Cause:   cause,
    }
}

const ErrLoginFail = int32(1000)

func login(user string) error {
    return WrapBizError(ErrLoginFail, fmt.Errorf("user %q not found", user))
}
```

实现 `fmt.Formatter` 接口还可在 `%+v` 下输出更丰富的堆栈信息。

## 七、panic 与 recover

### panic

通过内建 `panic()` 抛出异常，参数可为任意类型：

- 若未被捕获，会向上层函数逐层抛出，直至当前协程起点，并终止该协程（含主协程）
- 所有已注册的 `defer` 仍会执行

**何时该用 panic：**

- 入参不该有问题却出现（如 `regexp.MustCompile`）
- 逻辑上不该到达的分支（如 `default` 中）
- 开发阶段用 panic 尽快暴露缺陷

```go
func mustCompile(expr string) *Regexp {
    re, err := Compile(expr)
    if err != nil {
        panic(err) // 编译期正则有误，属不该发生的错误
    }
    return re
}
```

### recover

在 `defer` 中调用 `recover()` 可捕获 panic，返回 panic 的值；正常运行时返回 `nil`。

```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered:", r)
            debug.PrintStack()
        }
    }()

    divide(10, 0) // 内部 panic
}

func divide(a, b int) int {
    if b == 0 {
        panic("除数不能为零")
    }
    return a / b
}
```

**使用注意：**

- `recover()` 只能在 `defer` 函数中生效
- 部署阶段应在合适的上游 `recover`，避免程序整体退出
- 普通业务逻辑错误仍应走 `error` 返回值，而非 `panic`

## 八、错误处理完整示例

```go
package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func find(id int) (string, error) {
    if id <= 0 {
        return "", ErrNotFound
    }
    return "item", nil
}

func handle(id int) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()

    name, err := find(id)
    if err != nil {
        // 包装并上抛，保留原始错误
        return fmt.Errorf("find failed: %w", err)
    }
    fmt.Println("found:", name)
    return nil
}

func main() {
    if err := handle(-1); err != nil {
        if errors.Is(err, ErrNotFound) {
            fmt.Println("捕获到 NotFound:", err)
        } else {
            fmt.Println("其他错误:", err)
        }
    }
}
```

> 使用 `%w` 包装错误后，可用 `errors.Is` / `errors.As` 沿调用链判定与提取，是推荐的现代错误传播方式。
