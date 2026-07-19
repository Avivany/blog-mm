# 基础数据类型

Go 是静态强类型语言，每个变量都绑定到特定类型。基础类型包括：布尔、数字、字符串。
1. 布尔类型（bool）
2. 数字类型
  ○ 整数类型（int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, uintptr）
  ○ 浮点数类型（float32, float64）
  ○ 复数类型（complex64, complex128）
3. 字符串类型（string）
● 其他：byte，rune，uint，uintptr；

## 一、布尔类型（bool）

- 取值：`true` / `false`，零值为 `false`
- **不能与整数相互转换**，也无法参与数值运算

```go
var b1 bool = true
var b4 bool // 零值为 false

if b1 {
    fmt.Println("b1 is true")
}

// 逻辑运算
and := true && false // false
or := true || false  // true
not := !true         // false
```

## 二、数字类型

### 整数类型

| 类型 | 大小 | 范围 |
| --- | --- | --- |
| `int8` | 8 位 | -128 ~ 127 |
| `int16` | 16 位 | -32768 ~ 32767 |
| `int32` | 32 位 | -2³¹ ~ 2³¹-1 |
| `int64` | 64 位 | -2⁶³ ~ 2⁶³-1 |
| `int` | 平台相关 | 32 位系统为 `int32`，64 位为 `int64` |
| `uint8` | 8 位 | 0 ~ 255 |
| `uint16` | 16 位 | 0 ~ 65535 |
| `uint32` | 32 位 | 0 ~ 4294967295 |
| `uint64` | 64 位 | 0 ~ 2⁶⁴-1 |
| `uint` | 平台相关 | 32 位为 `uint32`，64 位为 `uint64` |

**特殊整型：**

- `int` 与 `uint` 均为平台相关，32 位系统为 `int32`，64 位为 `int64`
- `byte` 即 `uint8`，表示一个 ASCII 字符
- `rune` 即 `int32`，表示一个 UTF-8 字符
- `uintptr` 无符号整型，用于存放指针地址

**注意事项：**

- 不同类型整型不能直接运算，需显式转换
- 整数溢出不会报错，但结果会被截断（wrap around）
- 右移运算：无符号用逻辑移位，有符号用算术移位（正数补 0，负数补 1）

```go
var a int = 10
var b int32 = 20
c := a + int(b) // 必须转换

var u8 uint8 = 255
u8++ // 溢出变为 0

var x int8 = -1
fmt.Printf("%b\n", x>>1) // 11111111（算术右移，保持符号）
```

### 浮点数类型

| 类型 | 大小 | 精度 | 范围 |
| --- | --- | --- | --- |
| `float32` | 32 位 | 约 6 位小数 | ±3.4e38 |
| `float64` | 64 位 | 约 15 位小数 | ±1.8e308 |

**注意事项：**

- **浮点数比较不能用 `==`**（精度问题），应判断差值绝对值是否小于极小值
- **默认浮点类型是 `float64`**
- 不适用于金融计算（建议用整数分或 `math/big`

```go
var f1 float32 = 0.1
var f2 float32 = 0.2
fmt.Println(f1+f2 == 0.3) // 可能为 false

const epsilon = 1e-6
if math.Abs(float64(f1+f2)-0.3) < epsilon {
    fmt.Println("equal")
}

// 数学函数
sqrt := math.Sqrt(16)     // 4
power := math.Pow(2, 3)   // 8
```

### 复数类型

| 类型 | 说明 |
| --- | --- |
| `complex64` | 实部、虚部均为 `float32` |
| `complex128` | 实部、虚部均为 `float64`（默认） |

```go
var c1 complex64 = 1 + 2i
c2 := 3 + 4i // 默认 complex128

realPart := real(c1)  // 实部
imagPart := imag(c1)  // 虚部
magnitude := cmplx.Abs(c1) // 模
```

## 三、字符串类型（string）

- 字符串是**不可变的字节序列**，零值为 `""`
- UTF-8 编码；可按字节索引访问，但**不能修改**
- 拼接用 `+`；大量拼接用 `strings.Builder` 或 `bytes.Buffer` 更高效
- 反引号 `` `...` `` 创建原始字符串（不转义）

```go
s := "Hello, 世界"

// 按字节遍历（注意：中文占多字节）
for i := 0; i < len(s); i++ {
    fmt.Printf("%x ", s[i])
}

// 按字符（rune）遍历
for index, r := range s {
    fmt.Printf("%#U starts at %d\n", r, index)
}

// s[0] = 'h' // 编译错误：字符串不可变

// 高效拼接
var builder strings.Builder
builder.WriteString("Hello")
builder.WriteString(" World")
result := builder.String()
```

### 常用操作

```go
length := len(s)              // 字节长度
combined := s1 + " " + s2     // 拼接
firstByte := s1[0]            // 取字节（非字符）
sub := s1[1:4]                // 切片

hasPrefix := strings.HasPrefix(s1, "He")
contains := strings.Contains(s1, "ell")
upper := strings.ToUpper(s1)
parts := strings.Split("a,b,c", ",")

runes := []rune(s)            // 转 rune 切片后可修改
str := string(runes)
```

### 转义字符

`\n` 换行、`\r` 回车、`\t` 制表符、`\'` 单引号、`\"` 双引号、`\\` 反斜杠。

## 四、类型转换

Go **不支持隐式转换**，必须显式转换。注意事项：转换时要注意精度丢失和溢出

```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

f2 := 3.14
i2 := int(f2) // 3，截断小数部分

// 字符串与数值：使用 strconv
num, _ := strconv.Atoi("123")    // 字符串转整数
str := strconv.Itoa(123)         // 整数转字符串
fl, _ := strconv.ParseFloat("3.14", 64)

// 字节/rune 切片互转
bytes := []byte("hello")
str2 := string(bytes)
runes2 := []rune("hello")
str3 := string(runes2)
```

**注意：** 大整型转小整型超出范围不会报错，但会截断；浮点转整型丢失小数部分。

## 五、类型别名与自定义类型

```go
// 类型别名：与原类型完全等价（重构时有用）
type MyInt = int

// 自定义类型：基于已有类型定义新类型，需转换才能与基础类型互操作
type MyReal int

var a MyInt = 10 // 本质就是 int
var b MyReal = 20
var c int = int(b) // 需要转换
```

## 六、零值汇总

| 类型 | 零值 |
| --- | --- |
| `bool` | `false` |
| 数值类型 | `0`（复数 `0+0i`） |
| `string` | `""` |
| 指针 / 切片 / map / 函数 / channel / 接口 | `nil` |
| 结构体 | 每个字段取其类型的零值 |

```go
var p *int          // nil
var s []int         // nil
var m map[string]int // nil
var ch chan int     // nil
var fn func()       // nil
var iface interface{} // nil

type Circle struct{ radius float64 }
var c Circle // c.radius == 0
```
```go
// 1.整数溢出
var u8 uint8 = 255
u8++  // 0，溢出但不报错

// 使用安全运算
import "math"
if u8 < math.MaxUint8 {
    u8++
}

// 2. 浮点数精度
s := "hello"
// s[0] = 'H'  // 错误：字符串不可变

// 正确做法
bytes := []byte(s)
bytes[0] = 'H'
s = string(bytes)

//3. 字符串不可变性
s := "hello"
// s[0] = 'H'  // 错误：字符串不可变

// 正确做法
bytes := []byte(s)
bytes[0] = 'H'
s = string(bytes)
```

## 七、类型选择建议

- 一般情况使用 `int`
- 需要明确大小时使用具体类型（如 `int32`）
- 浮点数优先使用 `float64`
- 字符处理使用 `rune` 而非 `byte`

## 八、默认值

● 数值：所有数值类型的零值都是0
  ○ 整数，零值是0。byte, rune, uintptr也是整数类型，所以零值也是0。
  ○ 浮点数，零值是0
  ○ 复数，零值是0+0i
● bool，零值是false
● 字符串，零值是空串""
● 指针：var a *int，零值是nil
● 切片：var a []int，零值是nil
● map：var a map[string] int，零值是nil
● 函数：var a func(string) int，零值是nil
● channel：var a chan int，通道channel，零值是nil
● 接口：var a interface_type，接口interface，零值是nil
● 结构体: var instance StructName，结构体里每个field的零值是对应field的类型的零值
```go
//指针：var a *int，零值是nil
num := 100
var a * int = &num

//切片：var a []int，零值是nil
var a []int = []int{1,2}
list := [6]int{1,2} //size为6的数组，前面2个元素是1和2，后面的是默认值0

//map：var a map[string] int，零值是nil
dict := map[string] int{"a":1, "b":2}

//函数：var a func(string) int，零值是nil
function := func(str string) string {
  return str
}
result := function("hello fans")
fmt.Println("result=", result)

channel：var a chan int，通道channel，零值是nil
var a chan int = make(chan int)
var b = make(chan string)
c := make(chan bool)

//接口：var a interface_type，接口interface，零值是nil
type Animal interface {
  speak()
}
type Cat struct {
  name string
  age int
}
func(cat Cat) speak() {
  fmt.Println("dog...")
}
// 定义一个接口变量a
var a Animal = Cat{"zzz", 1}
a.speak() // miao...

//结构体: var instance StructName，结构体里每个field的零值是对应field的类型的零值
type Circle struct {
  radius float64
}
var c1 Circle
c1.radius = 10.00
```