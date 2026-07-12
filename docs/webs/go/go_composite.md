# 复合数据类型

Go 数据类型分为四类：基本类型、聚合类型（数组/结构体）、引用类型（指针/切片/映射/函数/通道）、接口类型。

## 一、数组（Array）

数组是**固定长度、同类型元素**的集合，长度是其类型的一部分（不同长度即不同类型）。

### 创建与初始化

```go
var nums [5]int              // 零值 [0 0 0 0 0]
names := [3]string{"张三", "李四", "王五"}
auto := [...]int{1, 2, 3, 4, 5} // 编译器推导长度为 5
spec := [5]int{1: 10, 3: 30}   // [0 10 0 30 0]

arr := [2][3]int{
    {0, 1, 2},
    {3, 4, 5},
}
```

> 注意短声明写法：`nums := [...]int{1, 2, 3}`，不能写成 `nums []int = [...]int{...}`。

### 遍历

```go
nums := [...]int{1, 2, 3, 4, 5}
for i := 0; i < len(nums); i++ {
    fmt.Println(nums[i])
}
for idx, val := range nums {
    fmt.Printf("index: %d, value: %d\n", idx, val)
}

fmt.Println("length =", len(nums)) // 5
```

### 比较与多维

- 仅**相同类型且长度相同**的数组可比较（`==` / `!=`）
- 多维数组大小必须是常量

```go
a1 := [2]int{1, 2}
a2 := [2]int{1, 2}
fmt.Println(a1 == a2) // true
```

## 二、切片（Slice）

切片是对数组的抽象，**长度可变、容量自动扩容**。底层结构：

```go
type slice struct {
    array unsafe.Pointer // 指向底层数组
    len   int
    cap   int
}
```

### 创建

```go
var s1 []int              // nil 切片
s2 := []int{1, 2, 3}      // 字面量
arr := [5]int{1, 2, 3, 4, 5}
s3 := arr[1:3]            // 从数组截取 [2 3]
s4 := make([]int, 5)      // 长度 5 容量 5
s5 := make([]int, 5, 10)  // 长度 5 容量 10
```

- `nil` 切片：`len`/`cap` 均为 0；`s10 := []int{}` 是空切片（非 nil）

### 使用

```go
s := make([]int, 0, 5)
s = append(s, 1)
s = append(s, 2, 3, 4) // append 必须赋值回原切片

for i := 5; i < 15; i++ {
    s = append(s, i)
}
fmt.Printf("len=%d cap=%d\n", len(s), cap(s))

// 截取（与原数组/切片共享底层数组，修改会互相影响）
fmt.Println(s[1:3])

// 复制
s2 := make([]int, len(s))
n := copy(s2, s) // 返回复制的元素个数

// 删除索引 2 的元素
s = append(s[:2], s[3:]...)

// 在索引 2 处插入 99
s = append(s[:2], append([]int{99}, s[2:]...)...)
```

### 扩容策略

- 容量足够时直接在原底层数组操作（共享数据）
- 容量不足时分配新数组并拷贝：旧容量 < 1024 时**翻倍**；≥ 1024 时按 **1.25 倍**增长

> 注意：只能对切片 `append`，不能对数组 `append`；`append` 不改变原切片变量（可能触发重新分配）。

## 三、映射（Map）

map 是基于哈希的**无序键值对**集合，key 唯一。

**要点：**

- key 必须是**可比较类型**（不能是切片、map、函数）
- map **必须初始化后才能写入**；只声明未初始化时只能读，写入会 panic
- 遍历顺序不固定，非并发安全（并发需加锁或用 `sync.Map`）
- 映射元素不可寻址

### 创建

```go
m1 := make(map[string]int)
m2 := make(map[string]int, 100) // 预分配容量
m3 := map[string]int{
    "Alice": 25,
    "Bob":   30,
}
```

### 使用

```go
scores := make(map[string]int)
scores["Alice"] = 95

// 检查 key 是否存在
score, ok := scores["David"]
if ok {
    fmt.Println(score)
}

delete(scores, "Bob")

for k, v := range scores {
    fmt.Printf("%s: %d\n", k, v)
}
fmt.Println("entries:", len(scores))
```

## 四、结构体（Struct）

Go 没有类，通过结构体实现封装，通过方法实现行为，以**组合**实现复用。结构体是**值类型**。

### 定义与初始化

```go
type Person struct {
    Name string
    Age  int
    City string
}

type Employee struct {
    ID       int
    Person            // 匿名字段（嵌入）
    Department string
    Salary     float64
}

p1 := Person{"Alice", 25, "Beijing"} // 顺序初始化
p2 := Person{Name: "Bob", Age: 30}   // 指定字段，可部分赋值
```

### 使用

```go
p := Point{10, 20}
fmt.Println(p.X, p.Y)
p.X = 15

ptr := &p
fmt.Println(ptr.X) // 指针也用 . 访问（自动解引用）
```

### 方法

```go
type Circle struct {
    Radius float64
}

// 值接收者：不修改原实例
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

// 指针接收者：可修改原实例
func (c *Circle) SetRadius(r float64) {
    c.Radius = r
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("Area: %.2f\n", c.Area())
    c.SetRadius(10)
    fmt.Printf("New area: %.2f\n", c.Area())
}
```

**要点：**

- 结构体是值类型，赋值会拷贝副本
- 字段名大写可导出，小写私有；结构体要被其他包使用，其名与成员名都需大写
- 可加 tag（如 `json:"name"`）配合反射做序列化

## 五、指针（Pointer）

指针存储另一个变量的**内存地址**。

- `&` 取地址；`*` 解引用
- `new(T)` 分配 T 的零值并返回指针；`make` 仅用于 slice/map/chan
- 数组名**不是**首元素指针；指针不支持运算（除 `unsafe`）

```go
x := 42
p := &x
fmt.Println(p)  // 内存地址，如 0xc000014058
fmt.Println(*p) // 42

*p = 100
fmt.Println(x) // 100
```

### 作为函数参数

```go
func modify(x *int) {
    *x = 100
}

func main() {
    a := 10
    modify(&a)
    fmt.Println(a) // 100
}
```

> 避免返回局部变量的地址（函数返回后空间可能被覆盖）；解引用 `nil` 指针会 panic。

## 六、接口（Interface）

接口是一组**方法签名的集合**，没有数据成员。任何类型实现了这些方法即实现了该接口（**隐式实现**，无需 `implements` 关键字）。

### 定义与实现

```go
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ Radius float64 }

func (c Circle) Area() float64       { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64  { return 2 * math.Pi * c.Radius }

func main() {
    var s Shape = Circle{Radius: 5}
    fmt.Printf("area: %.2f\n", s.Area()) // 多态
}
```

### 接收者与赋值

- 若某方法使用**指针接收者**，给接口变量赋值时必须用**指针**
- 若全部方法为值接收者，赋值用值或指针均可

```go
type Animal interface{ speak() }

type Cat struct{ name string }
func (c Cat) speak() { fmt.Println("miao") }

type Dog struct{ name string }
func (d *Dog) speak() { fmt.Println("wang") }

func main() {
    var a Animal = Cat{"a"} // 值接收者：值或指针皆可
    a.speak()

    var b Animal = &Dog{"b"} // 指针接收者：必须用指针
    b.speak()
}
```

### 接口嵌套

```go
type Felines interface{ feet() }
type Mammal interface {
    Felines // 嵌套
    born()
}
```

### 空接口

`interface{}`（Go 1.18+ 别名 `any`）可接受任意类型：

```go
var x interface{} = "hello"
x = 42
x = Circle{Radius: 10}

// 作为 map 值，实现异构 value
m := make(map[string]interface{})
m["a"] = 1
m["b"] = "str"
m["c"] = true
```

### 类型断言 x.(T)

```go
var x interface{} = "a"
v, ok := x.(string)
if ok {
    fmt.Println("assert true, value:", v)
}

// 类型 switch
switch val := x.(type) {
case int:
    fmt.Println("int", val)
case string:
    fmt.Println("string", val)
default:
    fmt.Printf("type: %T\n", val)
}
```

## 七、组合（Composition）

Go 用结构体嵌套实现代码复用，替代继承：

```go
type Person struct {
    Name string
    Age  int
}

func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", p.Name)
}

type Student struct {
    Person // 匿名嵌套，获得其字段与方法
    School string
}

func main() {
    s := Student{
        Person: Person{Name: "张三", Age: 15},
        School: "第一中学",
    }
    fmt.Println(s.Greet())  // 继承自 Person
    fmt.Println(s.Name)     // 继承字段
}
```

- 嵌套结构体的字段/方法可直接访问（类似继承）
- 同名方法会覆盖（重写）
- 可嵌套多个结构体，实现多 "继承" 效果
