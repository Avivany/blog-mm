# 复合数据类型

Go 有四类数据类型：
● 基本类型：数字、字符串和布尔值（上面已介绍）
● 聚合类型：数组(Array)和结构(Struct)
● 引用类型：指针(Pointer)、切片(Slice)、映射(Map)、函数(Function)和通道(Channel)
● 接口类型：接口(Interface)

## 一、数组（Array）

数组是**固定长度、同类型元素**的集合，长度是其类型的一部分（不同长度即不同类型）。

### 创建与初始化

```go
// 声明数组
var 数组名 [数组长度]数组类型

////显示指定数组大小
var nums [5]int              // 零值 [0 0 0 0 0]
names := [3]string{"张三", "李四", "王五"}

//对于数组长度可以使用省略号来进行替换，
//这样编译器会通过初始化值的数量去判断数组的长度。
//不显式指定数组大小，编译器根据赋的值自行推导
auto := [...]int{1, 2, 3, 4, 5} // 编译器推导长度为 5

//指定数组大小情况下，特殊的初始化方式
//// 将数组下标为1和3的元素分别初始化为10和30
spec := [5]int{1: 10, 3: 30}   // [0 10 0 30 0]

arr := [2][3]int{
    {0, 1, 2},
    {3, 4, 5},
}
```

> 注意短声明写法：`nums := [...]int{1, 2, 3}`，不能写成 `nums []int = [...]int{...}`。

### 遍历

```go
//通过for循环进行遍历数组
nums := [...]int{1, 2, 3, 4, 5}
for i := 0; i < len(nums); i++ {
    fmt.Println(nums[i])
}
// 使用range遍历
// 语法 for k, v := range slice/array/string/map/channel { }
for idx, val := range nums {
    fmt.Printf("index: %d, value: %d\n", idx, val)
}

fmt.Println("length =", len(nums)) // 5
```

### 比较与多维

- 仅**相同类型且长度相同**的数组可比较（`==` / `!=`）
- 多维数组大小必须是常量，比如下面语法里的size1，size2，...，sizeN必须是常量


```go
a1 := [2]int{1, 2}
a2 := [2]int{1, 2}
fmt.Println(a1 == a2) // true
```

多维数组
数组的大小必须是常量，不能是变量，比如下面语法里的size1，size2，...，sizeN必须是常量
```go
var 数组名 [数组长度][数组长度]数组类型
var variable_name [size1][size2]...[sizeN] variable_type

var nums [3][4]int // 声明一个 3*4的二维整数型数组
var threeArr [2][3][4]int // 三维数组，大小是 2x3x4
```
多维数组初始化
```go
//初始化直接赋值
arr1 := [2][3]int {
    {0, 1, 2},
    {3, 4, 5}, // 如果花括号}在下一行，这里必须有逗号。如果花括号在这一行可以不用逗号
}

//初始化默认值，后续再赋值
array2 := [2][3]int{}
array2[0][2] = 1
array2[1][1] = 2
fmt.Println("array2=", array2)
```
多维数组访问和修改
```go
//可以通过索引访问和修改多维数组的元素。
package main

import "fmt"

func main() {
	nums := [3][4]int{
		{1, 2, 3, 4},
		{5, 6, 7, 8},
		{9, 10, 11, 12},
	}

	fmt.Println(nums)

	nums[1][2] = 10
	fmt.Println(nums[1][2])
}
```
对于遍历多维数组，可以使用for循环嵌套来进行遍历。下面程序中i代表的是多维数组的行，j代表的是多维数组的列，也就是多维数组要是用两个下标才可以进行访问。
```go
package main

import "fmt"

func main() {
	nums := [3][4]int{
		{1, 2, 3, 4},
		{5, 6, 7, 8},
		{9, 10, 11, 12},
	}

    //数组下标遍历具体的元素
	for i := 0; i < len(nums); i++ {
		for j := 0; j < len(nums[i]); j++ {
			fmt.Printf("nums[%d][%d]=%d\n", i, j, nums[i][j])
		}
	}

    //数组下标遍历某行元素
     for index := range nums {
        // nums[index]类型是一维数组
        fmt.Println(reflect.TypeOf(nums[index])) 
        fmt.Printf("index=%d, value=%v\n", index, nums[index])
    }

    //range遍历
    for index := range nums {
        fmt.Printf("row %d is ", index) //index的值是0,1，表示二维数组的第1行和第2行
        fmt.Println(nums[index]) //nums[index]类型就是一维数组
    }
    for row_index, row_value := range nums {
        for col_index, col_value := range row_value {
            fmt.Printf("nums[%d][%d]=%d ", row_index, col_index, col_value)
        }
        fmt.Println()
    }
    
}
```

## 二、切片（Slice）

切片是对数组的抽象，**长度可变、容量自动扩容**。底层结构：
切片slice：切片是对数组的抽象。Go数组的长度在定义后是固定的，不可改变的。
切片的长度和容量是不固定的，可以动态增加元素，切片的容量也会根据情况自动扩容
切片的底层数据结构

```go
type slice struct {
    array unsafe.Pointer // 指向底层数组
    len   int
    cap   int
}
```
切片slice是个struct结构体，里面实际有个指针array，类型是unsafe.Pointer，也就是个指针，指向存放数据的数组。

```go
var slice_name []Datatype // 元素类型为Datatype的切片
slice_name := []Datatype{} //字面量创建
//make创建
var slice_name []Datatype = make([]Datatype, len, cap)// cap是切片容量，是make的可选参数
var slice_name []Datatype = make([]Datatype, len)
slice_name := make([]Datatype, len)
```

### 创建

```go
// 1. 直接声明
var s1 []int                    // nil切片
var s2 = []int{1, 2, 3}         // 字面量创建
var s3 = []int{1, 2, 3, 4, 5}   // 字面量创建

// 2. 从数组或切片创建
arr := [5]int{1, 2, 3, 4, 5}
s4 := arr[1:3]                  // [2, 3]
s5 := arr[:3]                   // [1, 2, 3]
s6 := arr[2:]                   // [3, 4, 5]
s7 := arr[:]                    // [1, 2, 3, 4, 5]

// 3. 使用make函数
s8 := make([]int, 5)            // 长度5，容量5: [0,0,0,0,0]
s9 := make([]int, 5, 10)        // 长度5，容量10: [0,0,0,0,0]

//零值nil
//如果slice类型的变量定义后没有初始化赋值，那值就是默认值nil。
//对于nil切片，len和cap函数执行结果都是0。
s10 := []int{}
var s11 []int

fmt.Println("s10==nil", s10==nil) // false
printSlice(s10)

fmt.Println("s11==nil", s11==nil) // true
printSlice(s11)
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

map 是基于哈希的**无序键值对**集合，是一种无序的基于<key, value>对组成的数据结构，key是唯一的。

**要点：**

- key 必须是**可比较类型**（不能是切片、map、函数）
- map **必须初始化后才能写入**；只声明未初始化时只能读，写入会 panic
- 遍历顺序不固定，非并发安全（并发需加锁或用 `sync.Map`）
- 映射元素不可寻址（不能直接取地址）
```go
var map_var map[key_data_type]value_data_type = map[key_data_type]value_data_type{}

var map_var = map[key_data_type]value_data_type{}
//简写
map_var := map[key_data_type]value_data_type{}

/*cap是map容量，超过后会自动扩容*/
map_var := make(map[key_data_type]value_data_type, [cap]) 
```

### 创建

```go
// 使用make函数
m1 := make(map[string]int)
m2 := make(map[string]int, 100) // 预分配容量

// 映射字面量
m3 := map[string]int{
    "Alice": 25,
    "Bob":   30,
}
// 空映射
m4 := map[string]int{}
```

### 使用

```go
package main

import "fmt"

func main() {
    // 创建映射
    scores := make(map[string]int)
    
    // 添加/修改元素
    scores["Alice"] = 95
    scores["Bob"] = 87
    scores["Charlie"] = 92
    
    // 获取元素
    aliceScore := scores["Alice"]
    fmt.Println("Alice's score:", aliceScore)
    
    // 检查键是否存在
    // 如果key存在，那is_exist就是true, value是对应的值。否则is_exist就是false,
    // value是map的value数据类型的零值。
    score, exists := scores["David"]
    if exists {
        fmt.Println("David's score:", score)
    } else {
        fmt.Println("David not found")
    }
    // 或
    if score, exists := scores["David"]; exists {
        fmt.Printf("David的分数: %d\n", score)
    }

    
    
    // 删除元素
    delete(scores, "Bob")
    
    // range 遍历映射
    for key, value := range scores {
        fmt.Printf("%s: %d\n", key, value)
    }
    
    // 只遍历键
    for key := range scores {
        fmt.Println("Key:", key)
    }
    
    // 只遍历值
    for _, value := range scores {
        fmt.Println("Value:", value)
    }
    
    // 获取映射长度
    // len(map)：通过内置的len()函数可以获取map里<key, value>对的数量
    fmt.Println("Number of entries:", len(scores))
}
```

## 四、结构体（Struct）

Go 没有类，通过结构体实现封装，通过方法实现行为，以组合的方式实现继承，更加解耦和轻量，利用interface{}实现多态，需要要继承和实现关键字。结构体是**值类型**。

### 定义与初始化
```go
type struct_name struct {
    member_name1 dataType1
    member_name2 dataType2
    member_name3, member_name4 dataType3
}

// 方式1：必须给结构体里每个成员赋值，如果只给部分成员赋值会编译报错
struct_var := struct_type{value1, value2, value3, value4}
// 方式2：可以给部分或者全部成员赋值，没有赋值的成员的值是成员所属类型的零值
struct_var2 := struct_type{member_name1:value1, member_name2:value2}
```

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
package main

import "fmt"

// 定义结构体
type Point struct {
    X, Y int
}

type Rectangle struct {
    TopLeft, BottomRight Point
    Width, Height        int
}

func main() {
    // 创建结构体实例
    p := Point{10, 20}

    // 访问字段,访问结构体内的成员使用点. ，格式为：结构体变量.成员
    fmt.Println(p.X, p.Y) 
    
    // 修改字段
    p.X = 15
    p.Y = 25
    
    // 结构体指针
    // 指针赋值
    ptr := &p
    fmt.Println(ptr.X)    // 自动解引用，等同于 (*ptr).X
    
    // 嵌套结构体
    rect := Rectangle{
        TopLeft:     Point{1, 1},
        BottomRight: Point{10, 10},
        Width:       9,
        Height:      9,
    }
    fmt.Println(rect.TopLeft.X)
    
    // 结构体比较（如果所有字段都可比较）
    p1 := Point{1, 2}
    p2 := Point{1, 2}
    p3 := Point{1, 3}
    fmt.Println(p1 == p2) // true
    fmt.Println(p1 == p3) // false
}
```

### 结构体指针
语法：`*StructType`。注意:结构体指针访问结构体里的成员，也是用点`.`，Go会自动解引用。
```go
var struct_pointer *struct_type // 指针struct_pointer指向结构体struct_type
struct_var := struct_type{} // 结构体变量
struct_pointer = &struct_var // 指针赋值
```
```go
package main

import "fmt"

type Book struct {
    id int
    author string
    title string
}

func printBook(book *Book) {
    fmt.Println("id:", book.id)
    fmt.Println("author:", book.author)
    fmt.Println("title:", book.title)
}

func main() {
    book := Book{1, "expert", "go"}
    bookPtr := &book
    printBook(bookPtr)
}
```

### 方法

```go
package main

import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

// 值接收者方法：直接绑定结构体（传递是值类型）
// 这个无法改变调用该方法的结构体变量里的成员的值
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

// 指针接收者方法（可以修改结构体）：指针方式绑定结构体（传递是引用类型）
func (c *Circle) SetRadius(r float64) {
    c.Radius = r
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("Area: %.2f\n", c.Area()) //调用方法
    
    c.SetRadius(10) //调用方法
    fmt.Printf("New area: %.2f\n", c.Area())
}
```

**要点：**

- 结构体是值类型，赋值会拷贝副本
- 字段名大写可导出，小写私有；结构体要被其他包使用，其名与成员名都需大写
- 可加 tag（如 `json:"name"`）配合反射做序列化

## 五、指针（Pointer）

指针存储另一个变量的**内存地址**。在 Go 中，指针允许你直接访问和操作内存中的数据，而不是操作数据的副本。

● 内存地址：每个变量在内存中都有一个唯一的地址，指针的值就是这个地址。
● 指针类型：在 Go 中，指针类型用 * 表示。例如，*int 表示指向整数的指针，*string 表示指向字符串的指针。
● 使用 & 操作符(取地址)获取变量的内存地址。
● 使用 * 操作符(解引用)进行间接寻址，即访问指针指向的实际值。

- `new(T)` 分配 T 的零值并返回指针；`make` 仅用于 slice/map/chan
- 数组名**不是**首元素指针；指针不支持运算（除 `unsafe`）

```go
//指针声明与初始化
// 声明指针变量时需要指定其指向的数据类型，并且可以通过 & 操作符初始化。
var p *int // 声明一个指向 int 类型的指针
p = new(int) // 分配新的 int 变量，并返回其地址
*p = 21 // 修改指针所指向的值

或简化
p2 := new(int)    // 创建一个int类型的指针，并分配零值
*p2 = 21

//方法2
// 直接对已有变量取地址来初始化指针。
var a int = 42
p := &a // 初始化指针 p 为变量 a 的地址
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
### 修改指针指向的值
```go
package main

import "fmt"

func main() {
    x := 42
    p := &x        // p 指向 x 的地址
    *p = 100       // 通过解引用修改 x 的值
    fmt.Println(x) // 输出 100，因为 x 的值被修改
}
```
### 指针操作
```go
// 1. 取值与赋值
//通过 * 操作符可以读取或修改指针指向的值。
var a int = 10
p := &a
fmt.Println(*p) // 输出: 10
*p = 20
fmt.Println(a) // 输出: 20

//2. 作为参数传递
// 将指针传递给函数可以实现“按引用”传递，允许函数修改外部变量的值。
func modify(x *int) {
	*x = 100
}
 
func main() {
	a := 10
	modify(&a)
	fmt.Println(a) // 输出: 100
}

```


> 避免返回局部变量的地址（函数返回后空间可能被覆盖）；解引用 `nil` 指针会 panic。

### 复合类型中的指针
```go
//1.数组
// 数组名本身就是指向数组第一个元素的指针。
arr := [3]int{1, 2, 3}
ptr := &arr[0]
fmt.Println(*ptr) // 输出: 1

//2.切片
// 切片本质上是一个包含指向底层数组的指针、长度和容量的结构体。
sl := []int{1, 2, 3}
fmt.Println(sl[0]) // 输出: 1

//3.结构体
//结构体字段可以通过指针访问和修改。
type Person struct {
	Name string
	Age  int
}
 
func main() {
	p := &Person{Name: "Alice", Age: 30}
	fmt.Println(p.Name) // 输出: Alice
	p.Age = 31
	fmt.Println(p.Age) // 输出: 31
}
```
注意点 ⚠️
● 结构体指针可以直接访问字段，无需显式解引用
● 数组和切片虽然相似，但在内存管理和性能上有显著差异
● 空指针异常:尝试解引用 nil 指针会导致运行时 panic。

## 六、接口（Interface）

接口是一组**方法签名的集合**，没有数据成员。任何类型实现了这些方法即实现了该接口（**隐式实现**，无需 `implements` 关键字）。
```go
// 定义接口
type interface_name interface {
  method_name1([参数列表]) [返回值列表]
  method_name2([参数列表]) [返回值列表]
  method_nameN([参数列表]) [返回值列表]
}

// 定义结构体类型
type struct_name struct {
    data_member1 data_type
    data_member2 data_type
    data_memberN data_type
}

// 实现接口interface_name里的方法method_name1
func(struct_var struct_name) method_name1([参数列表])[返回值列表] {
    /*具体方法实现*/
}

// 实现接口interface_name里的方法method_name2
func(struct_var struct_name) method_name2([参数列表])[返回值列表] {
    /*具体方法实现*/
}

/* 实现接口interface_name里的方法method_name3
注意：下面用了指针接受者。函数可以使用值接受者或者指针接受者，上面的method_name1和method_name1使用的是值接受者。
如果用了指针接受者，那给interface变量赋值的时候要传指针
*/
func(struct_var *struct_name) method_name3([参数列表])[返回值列表] {
    /*具体方法实现*/
}

```

### 定义与实现

```go
package main

import (
    "fmt"
    "math"
)

// 定义接口
type Shape interface {
    Area() float64
    Perimeter() float64
}

//可变的接口
type Resizable interface {
    Resize(factor float64)
}

// 实现接口的圆结构体
type Circle struct {
    Radius float64
}

//实现接口矩形结构体
type Rectangle struct {
    Width, Height float64
}

// Circle 实现 Shape 接口
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

// Rectangle 实现 Shape 接口
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

// 指针接收者实现 Resizable 接口
func (c *Circle) Resize(factor float64) {
    c.Radius *= factor
}

func main() {
    var s Shape
    
    // 多态性
    s = Circle{Radius: 5}
    fmt.Printf("Circle area: %.2f\n", s.Area())
    
    s = Rectangle{Width: 3, Height: 4}
    fmt.Printf("Rectangle area: %.2f\n", s.Area())
    
    // 类型断言
    c := Circle{Radius: 5}
    var shape Shape = c
    var resizable Resizable = &c  // 注意：需要指针
    
    // 空接口
    var anything interface{} = "hello"
    anything = 42
    anything = Circle{Radius: 10}
    
    // 类型开关
    describe(shape)
    describe(resizable)
    describe(anything)
}

func describe(i interface{}) {
    switch v := i.(type) {
    case Shape:
        fmt.Printf("Shape with area: %.2f\n", v.Area())
    case Resizable:
        fmt.Println("Resizable object")
    case string:
        fmt.Printf("String: %s\n", v)
    case int:
        fmt.Printf("Integer: %d\n", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
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
断言：断言接口变量x是T类型
● 语法：value是将x转化为T类型后的变量，ok是布尔值，true表示断言成功，false表示断言失败

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
package main
 
import "fmt"
 
// 基础结构体
type Person struct {
    Name string
    Age  int
}
 
func (p Person) Greet() string {
    return fmt.Sprintf("Hello, I'm %s", p.Name)
}
 
// 学生结构体，嵌套Person
type Student struct {
    Person  // 匿名嵌套，获得Person的字段和方法
    School  string
    Grade   int
}
 
// 教师结构体，嵌套Person
type Teacher struct {
    Person   // 匿名嵌套
    Subject  string
    Students int
}
 
// 为Student添加新方法
func (s Student) Study() string {
    return fmt.Sprintf("%s is studying at %s", s.Name, s.School)
}
 
// 重写Person的Greet方法
func (t Teacher) Greet() string {
    return fmt.Sprintf("Hello, I'm %s, teaching %s", t.Name, t.Subject)
}
 
func main() {
    student := Student{
        Person: Person{
            Name: "张三",
            Age:  15,
        },
        School: "第一中学",
        Grade:  9,
    }
    
    fmt.Println(student.Greet())  // 继承自Person
    fmt.Println(student.Study())  // Student自己的方法
    fmt.Printf("年龄: %d\n", student.Age)  // 继承自Person的字段
    
    teacher := Teacher{
        Person: Person{
            Name: "李四",
            Age:  35,
        },
        Subject:  "数学",
        Students: 45,
    }
    
    fmt.Println(teacher.Greet())  // 重写的Greet方法
    fmt.Printf("教授科目: %s\n", teacher.Subject)
}
```

- 嵌套结构体的字段/方法可直接访问（类似继承）
- 同名方法会覆盖（重写）
- 可嵌套多个结构体，实现多 "继承" 效果
