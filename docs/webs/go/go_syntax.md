# 程序结构与函数

> 内容整理自个人语雀知识库及网络资料，重新组织语言后沉淀于此。示例均经过校验，可直接运行。

## 一、环境准备

### 安装与配置

从 [go.dev](https://go.dev/dl/) 下载安装包并解压到 `/usr/local`，将 `/usr/local/go/bin` 加入 `PATH` 即可。

常用环境变量：

| 变量 | 说明 |
| --- | --- |
| `GOROOT` | Go 安装目录，包含编译器、标准库等 |
| `GOPATH` | 工作目录，存放第三方依赖源码与可执行文件 |
| `GO111MODULE` | 模块管理模式，`on/off/auto`（Go 1.16 后默认 `on`） |
| `GOPROXY` | 模块代理地址，多个用逗号隔开，`direct` 表示直连源站 |
| `GOPRIVATE` | 标记私有仓库（同时设置 `GONOPROXY` 与 `GONOSUMDB`） |

```bash
# 下载并解压（Linux 示例）
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz

# 配置 PATH 与国内代理
export PATH=$PATH:/usr/local/go/bin
go env -w GOPROXY=https://goproxy.cn,direct
```

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `go version` | 查看 Go 版本 |
| `go env` | 查看环境变量 |
| `go mod init <name>` | 初始化模块（生成 `go.mod`） |
| `go mod tidy` | 整理依赖（补缺失、删无用） |
| `go build` | 编译生成可执行文件 |
| `go run main.go` | 直接运行源码（常用于单文件） |
| `go fmt` | 格式化代码 |
| `go vet` | 静态检查潜在错误 |
| `go test` | 运行单元测试 |

### 代码风格要点

- 每条语句以换行结束，**不需要分号**（一行多语句才需分号，但不建议）
- 左花括号 **不另起一行**
- 使用 tab 缩进，`go fmt` 会自动格式化
- `if` / `for` / `switch` 条件**不需要括号**
- 变量类型可省略，编译器自动推断
- `switch` 的 `case` 执行完**自动 break**，无需手写

## 二、程序结构

一个可执行的 Go 程序由 **包声明、导入、函数、变量、语句与注释** 组成。

```go
// 包声明：每个源码文件开头必须且只能有一个 package 声明
package main

// 导入包
import "fmt"

// 如果导入多个包，使用括号分组导入
// import (
//     "fmt"
//     "math"
// )

// 函数
// 连续多个同名类型的形参，除最后一个外可省略类型：a, b int
func add(a, b int) int {
    return a + b
}

// 全局变量
var m int = 10

// 批量声明（常用于全局变量）
var (
    x string
    y string
    z int
)

func main() {
    // 显式类型声明
    var n int = 100

    // 先声明后初始化
    var d float64
    d = 3.25

    // 简短声明：声明并初始化（类型推断），仅函数内可用
    a, b := 1, 2
    res := add(a, b)

    fmt.Println("a=", a, "b=", b, "a+b=", res)
    fmt.Println("Hello, World!")
}
```

**要点提示：**

- Go 使用 `:=` 进行短变量声明，自动推断类型
- 变量声明后默认初始化为零值（数值为 `0`，字符串为 `""`，布尔为 `false`）
- Go 没有 `public`/`private` 关键字，通过**标识符首字母大小写**控制可见性：**大写导出，小写私有**
- `func main()` 是程序入口；若存在 `func init()`，则先执行所有 `init()` 再执行 `main()`
- 源码目录名与包名无强制一致，但约定保持一致（如 `math/rand` 包源码以 `package rand` 开头）
- 只有声明 `package main` 且定义 `func main()` 才能生成可执行程序

## 三、变量

Go 是静态强类型语言，变量类型在编译期确定。

### 声明方式

```go
// 方式一：显式指定类型，不赋值（初始化为零值）
var a int
a = 10

// 方式二：显式指定类型并赋值
var b int = 10

// 方式三：省略类型，编译器推断
var c = 10

// 方式四：简短声明（仅函数内可用）
d := 10
```

### 多变量与批量声明

```go
// 同时声明多个同类型变量
var e, f int = 1, 2

// 不同类型可同时声明
name, age := "saycode", 10

// 批量声明（常用于全局变量）
var (
    g int    = 60
    h string = "hello"
)
```

### 特殊变量 `_`（下划线）

赋值给 `_` 的值会被直接丢弃，常用于忽略不需要的返回值。

```go
_, b := 1, 3 // 1 被丢弃，b = 3
```

### 平行赋值

```go
x, y := 1, 2
x, y = y, x // 交换两个变量的值，无需临时变量
```

### 作用域

从高到低分为：

- **块作用域**：`{}` 内或 `if`/`for` 语句内声明的变量
- **函数作用域**：函数内（含参数、返回值）
- **全局作用域**：函数外声明，作用域在整个包（大写则对外可见）

> 注意：在 Go 中，声明变量后**不使用会编译报错**（常量、空白标识符 `_` 除外）。

## 四、常量

常量是不可变的值，支持字符、字符串、布尔值和数字值。

```go
package main

import "fmt"

// 定义常量
const PI = 3.14

const (
    StatusOK       = 200
    StatusNotFound = 404
)

// 枚举常量
const (
    Monday    = iota // 0
    Tuesday          // 1
    Wednesday        // 2
)

func main() {
    const r = 2
    const area = PI * r * r
    fmt.Println(area)
}
```

**要点：**

- 常量声明时必须赋值，且之后不可修改
- 常量（含局部常量）可定义后不使用；而局部变量定义后必须使用，否则编译报错
- 可用 `iota` 作为 `const` 块内的行计数器，从 0 开始，每行自增 1
- `iota` 支持断层：

```go
const (
    a = iota // 0
    b        // 1
    c = "ha" // 独立值，iota 仍为 2
    d        // "ha"，iota 为 3
    e = 100  // iota 为 4
    f        // 100，iota 为 5
    g = iota // 6，恢复计数
    h        // 7
)
```

### 数字进制表示

| 进制 | 写法 | 示例 |
| --- | --- | --- |
| 十进制 | 常规 | `123` |
| 八进制 | `0` 开头 | `0123` |
| 十六进制 | `0x` 开头 | `0x123` |
| 二进制 | `0b` 开头 | `0b10101` |

## 五、函数

### 定义

```go
func name(parameters) (results) {
    body
}
```

```go
func sum(number1 string, number2 string) int {
    int1, _ := strconv.Atoi(number1)
    int2, _ := strconv.Atoi(number2)
    return int1 + int2
}
```

**函数名特点：**

- 首字母大写 → 公开函数（可被其他包调用）
- 首字母小写 → 内部函数（仅包内可用）
- **不支持函数重载**（同名不同参数类型不被允许）

**参数特点：**

- 同类型连续参数可简写：`func f(s string, x, y int)`
- 支持可变参数 `...`：实际类型为切片

```go
func total(nums ...int) int {
    s := 0
    for _, n := range nums {
        s += n
    }
    return s
}
// 调用：total(1, 2, 3) 或 total(slice...)
```

### 多返回值

```go
func calc(n1, n2 string) (sum int, mul int) {
    i1, _ := strconv.Atoi(n1)
    i2, _ := strconv.Atoi(n2)
    sum = i1 + i2
    mul = i1 * i2
    return // 命名返回值可省略 return 后的变量
}

func main() {
    s, m := calc("3", "4")
    fmt.Println(s, m)

    // 不需要的返回值用 _ 忽略
    s, _ = calc("3", "4")
}
```

### 指针参数（按引用传递）

Go 是**按值传递**：函数收到的是值的副本，修改不影响调用方。

```go
func updateName(name string) {
    name = "David" // 仅修改本地副本
}

func main() {
    firstName := "John"
    updateName(firstName)
    fmt.Println(firstName) // 仍为 John
}
```

如需修改调用方变量，使用指针：

```go
func updateName(name *string) {
    *name = "David"
}

func main() {
    firstName := "John"
    updateName(&firstName)
    fmt.Println(firstName) // David
}
```

- `&` 取变量地址；`*` 解引用（访问指针指向的值）

### init 与 main

- `init()`：包初始化时执行，可定义多个；无参数无返回值；用 `import _ "pkg"` 仅为执行其 `init`
- `main()`：仅 `main` 包可定义，无参数无返回值；所有 `init` 执行完后才执行

### 匿名函数与闭包

```go
func main() {
    // 匿名函数赋值给变量
    greet := func(s string) {
        fmt.Println("hello", s)
    }
    greet("world")

    // 闭包：内部函数捕获外部变量
    counter := 0
    inc := func() int {
        counter++
        return counter
    }
    fmt.Println(inc()) // 1
    fmt.Println(inc()) // 2
}
```

## 六、格式化输出

```go
package main

import "fmt"

func main() {
    fmt.Print("Hello", "World")        // 不换行：HelloWorld
    fmt.Println("Hello", "World")      // 换行，参数间加空格
    fmt.Printf("Name: %s, Age: %d\n", "Alice", 25)
}
```

### 常用动词

| 动词 | 说明 |
| --- | --- |
| `%v` | 默认格式输出值 |
| `%+v` | 结构体同时输出字段名 |
| `%#v` | Go 语法格式（完整表示） |
| `%T` | 输出值的类型 |
| `%d` | 十进制整数 |
| `%b` / `%o` / `%x` / `%X` | 二进制 / 八进制 / 十六进制（小写/大写） |
| `%c` / `%U` | Unicode 字符 / Unicode 格式 |
| `%f` | 浮点数（默认 6 位小数） |
| `%e` / `%E` | 科学计数法（小写/大写 e） |
| `%g` / `%G` | 更紧凑的浮点表示 |
| `%s` | 字符串 |
| `%q` | 带双引号的字符串 |
| `%t` | 布尔值 `true`/`false` |
| `%p` | 指针地址 |

### 宽度与精度

```go
fmt.Printf("|%5d|\n", 123)     // |  123| 右对齐宽度 5
fmt.Printf("|%-5d|\n", 123)    // |123  | 左对齐宽度 5
fmt.Printf("|%05d|\n", 123)    // |00123| 前导零
fmt.Printf("|%8.3f|\n", 3.14159) // |   3.142| 宽度 8 精度 3
```

### 结构体

```go
type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Bob", Age: 30}
fmt.Printf("%v\n", p)   // {Bob 30}
fmt.Printf("%+v\n", p)  // {Name:Bob Age:30}
fmt.Printf("%#v\n", p)  // main.Person{Name:"Bob", Age:30}
```

## 七、包与可见性

```go
// 包名一般与目录名一致（也可不同，导入时需用实际包名）
package calculator

// 大写标识符对外可见
func Add(a, b int) int { return a + b }

// 小写标识符仅包内可见
func internalHelper() {}
```

```go
package main

import (
    "fmt"
    calc "calculator" // 包别名
    _ "some/pkg"      // 匿名导入：仅执行其 init 函数
)

func main() {
    fmt.Println(calc.Add(1, 2))
}
```

**要点：**

- 同目录下源码文件首行用 `package` 声明包名，包名不含 `-`
- 通过包名前缀引用外部成员，**仅首字母大写者可被引用**
- `import _ "pkg"` 用于仅执行该包的 `init` 函数
