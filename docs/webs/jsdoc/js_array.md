# JavaScript 数组Array的所有方法

**改变原数组的方法：**  
pop()、push()、shift()、unshift()、splice()、reverse()、sort()   
**不会改变原数组的方法：**   
forEach()、map()、filter()、reduce()、join()、find()、every()、some()、concat()、Array.from()、slice()、findIndex()、fill()、includes()


## 数组创建

### 1.Array()构造函数

```javascript
//使用 Array 构造函数，比如：
let colors = new Array(); 

//如果知道数组中元素的数量，那么可以给构造函数传入一个数值，然后 length 属性就会被自动创建并设置为这个值。 该数组不包含任何实际的元素
//比如，下面的代码会创建一个初始 length 为 20 的数组：
let colors = new Array(20); 

/*JavaScript 数组，其 length 属性设置为该数字（注意：这意味着一个由 arrayLength 个空槽组成的数组，而不是具有实际 undefined 值的槽——参见稀疏数组）
*/

//也可以给 Array 构造函数传入要保存的元素。比如，下面的代码会创建一个包含 3 个字符串值的数组：
let colors = new Array("red", "blue", "green");  

//创建数组时可以给构造函数传一个值。这时候就有点问题了，因为如果这个值是数值，则会创建一个长度为指定数值的数组；而如果这个值是其他类型的，则会创建一个只包含该特定值的数组。下面看一个例子：
let colors = new Array(3); // 创建一个包含 3 个元素的数组
let names = new Array("Jume"); // 创建一个只包含一个元素，即字符串"Jume"的数组

//调用 Array() 时可以使用或不使用 new。两者都会创建一个新的 Array 实例。比如：
let colors = Array(3); // 创建一个包含 3 个元素的数组
let names = Array("Jume"); // 创建一个只包含一个元素，即字符串"Jume"的数组

```

### 2.字面量  
另一种创建数组的方式是使用数组字面量（array literal）表示法。数组字面量是在中括号中包含以
逗号分隔的元素列表，如下面的例子所示：
```javascript
// 创建一个包含 3 个元素的数组
let colors = ["red", "blue", "green"]; 
// 创建一个空数组
let names = []; 
// 创建一个包含 2 个元素的数组
let values = [1,2]; 
在这个例子中，  
第一行创建一个包含 3 个字符串的数组。  
第二行用一对空中括号创建了一个空数组。  
第三行展示了在数组最后一个值后面加逗号的效果：values 是一个包含两个值（1 和 2）的数组。

```
::: tip
与对象一样，在使用数组字面量表示法创建数组不会调用 Array 构造函数。
:::

### 3.ES6创建方式  
- **from()**:用于将类数组结构转换为数组实例
- **of()**:用于将一组参数转换为数组实例
**Array.from()**
第一个参数是一个类数组对象，即任何可迭代的结构，或者有一个 length 属性和可索引元素的结构。这种方式可用于很多场合 

```javascript
// 字符串会被拆分为单字符数组
console.log(Array.from("Jume")); 
// ["J", "u", "m", "e"] 

// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4); 
const s = new Set().add(1).add(2).add(3).add(4); 

console.log(Array.from(m)); // [[1, 2], [3, 4]] 
console.log(Array.from(s)); // [1, 2, 3, 4]

// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4]; 
const a2 = Array.from(a1); 
console.log(a1); // [1, 2, 3, 4] 
console.log(a1 === a2); // false 

// 可以使用任何可迭代对象
const iter = { 
    *[Symbol.iterator]() { 
        yield 1; 
        yield 2; 
        yield 3; 
        yield 4; 
    } 
}; 
console.log(Array.from(iter)); // [1, 2, 3, 4]

// arguments 对象可以被轻松地转换为数组
function getArgsArray() { 
 return Array.from(arguments); 
} 
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4] 

// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = { 
 0: 1, 
 1: 2, 
 2: 3, 
 3: 4, 
 length: 4 
}; 
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]

```
第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像调用 Array.from().map()那样先创建一个中间数组。
第三个可选参数，用于指定映射函数中 this 的值。但这个重写的 this 值在箭头函数中不适用。

```javascript
const a1 = [1, 2, 3, 4]; 
const a2 = Array.from(a1, x => x**2); 
const a3 = Array.from(a1, function(x) {return x**this.exponent}, {exponent: 3}); 
console.log(a2); // [1, 4, 9, 16] 
console.log(a3); // [1, 8, 27, 64] 

```

**Array.of()**
可以把一组参数转换为数组。这个方法用于替代在 ES6之前常用的 Array.prototype. slice.call(arguments)，一种异常笨拙的将 arguments 对象转换为数组的写法：   

```javascript 
console.log(Array.of(1, 2, 3, 4)); 
// [1, 2, 3, 4] 
console.log(Array.of(undefined)); 
// [undefined]
```

## 2.检测数组isArray()
一个经典的 ECMAScript 问题是判断一个对象是不是数组。一个全局作用域的情况下，使用 instanceof 操作符就足矣：

```javascript
if (value instanceof Array){ 
 // 操作数组
}

```
使用instanceof的问题是假定只有一个全局执行上下文。如果网页里有多个框架，则可能涉及两个不同的全局执行上下文，因此就会有两个不同版本的 Array 构造函数。如果要把数组从一个框架传给另一个框架，则这个数组的构造函数将有别于在第二个框架内本地创建的数组。

为解决这个问题，ECMAScript 提供了 Array.isArray()方法。这个方法的目的就是确定一个值是否为数组，而不用管它是在哪个全局执行上下文中创建的。来看下面的例子：

```javascript
if (Array.isArray(value)){ 
 // 操作数组
}
```

## 3. 数组增删改查

### a.增-push()、unshift()、splice()
**push()：添加一个元素到数组的最后位置**

```javascript
// 添加一个元素到数组的最后位置
// 方式一:
numbers[numbers.length] = 10

// 方式二:
numbers.push(11)
numbers.push(12, 13)

console.log(numbers) 

```
**unshift()队列方法添加到头部**
当然, 我们在数组首位插入数据可以直接使用unshift方法   

```javascript
// 通过unshift在首位插入数据
numbers.unshift(-2)
numbers.unshift(-4, -3)
alert(numbers) 
// -4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13

```
**splice()添加任意位置**  
splice()的主要目的是在数组中间插入元素，但有 3 种不同的方式使用这个方法  
```javascript
let colors = ["red", "green", "blue"]; 
let removed = colors.splice(0,1); // 删除第一项
alert(colors); // green,blue 
alert(removed); // red，只有一个元素的数组
removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 插入两个元素
alert(colors); // green,yellow,orange,blue 
alert(removed); // 空数组
removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
alert(colors); // green,red,purple,orange,blue 
alert(removed);

```
splice()方法始终返回这样一个数组，它包含从数组中被删除的元素（如果没有删除元素，则返回空数组）

::: tip

1.删除
 -需要给 splice()传 2 个参数：  
  -要删除的第一个元素的位置  
  -要删除的元素数量。可以从数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素。  

2.插入
 -需要给 splice()传 3 个参数：  
        -开始位置、   
        -0 要删除的元素数量 (必须是0 方式3的变形)   
        -要插入的元素   

可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多
个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串
"red"和"green"。   

3.替换
 splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：   
  -开始位置   
  -要删除元素的数量   
  -要插入的任意多个元素。   
  -要插入的元素数量不一定跟删除的元素数量一致。   
比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始
向数组中插入"red"和"green"。  

:::

### b.删--pop()、shift()、splice()   
**pop()栈方法删除尾部元素**  
如果希望删除数组最后的元素, 可以使用pop()方法   

```javascript
// 删除最后的元素
numbers.pop()
alert(numbers) 
// -4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12
```

**shift队列方法删除首位元素**  
```javascript
numbers.shift()
alert(numbers)

```
**splice任意位置删除**  
splice() 方法会改变原始数组。
> 表达式 arr.splice(index, num, item1, item2, ...);  
> 参数说明  
>   第一个参数为 一个整数，用来指定添加/删除元素的位置，可以用负数来从尾部开始数 必填参数  
>   第二个参数为删除元素的数量，若不想删除可以设置为0 可选参数  
>   再后面的参数为 向数组添加的元素 可选参数  
>   如果是删除操作,那么会把删除的元素放在一个新数组中返回。   
>   1.操作的元素会包括开始的元素   
>   2.如果数组的元素不够，会一直删除到数组的最后一位   

```javascript
// 删除指定位置的几个元素
numbers.splice(5, 3)
alert(numbers) 
// -4,-3,-2,-1,0,4,5,6,7,8,9,10,11,12,13

```

### c.改-splice()
如果我们希望使用splice来修改数据呢?  

```javascript
// 修改指定位置的元素
numbers.splice(5, 3, "a", "b", "c")
alert(numbers) // -4,-3,-2,-1,0,a,b,c,4,5,6,7,8,9,10,11,12,13
```
代码解析:   
上面的代码会从索引5的位置开始修改数据, 修改多少个呢? 第二个参数来决定的.   
第一个参数依然是索引的位置为5(第六个位置)   
第二个参数是要将数组中多少个元素给替换掉, 我们这里是3个(也可以使用3个元素来替换2个, 可以自己尝试一下)后面跟着的就是要替换的元素.   

### d.查-indexOf/lastIndexOf/includes、find/findIndex、at
ECMAScript 提供两类搜索数组的方法：按严格相等搜索和按断言函数搜索。  
**严格相等**  
严格相等查找方法： indexOf()、lastIndexOf()和 includes()这些方法都接收两个参数：要查找的元素和一个可选的起始搜索位置  

::: tip
`indexOf()`和 `includes()`方法从数组前头（第一项）开始向后搜索，而 lastIndexOf()从数组末尾（最后一项）开始向前搜索。  
`indexOf()`和 `lastIndexOf()`都返回要查找的元素在数组中的位置，如果没找到则返回-1。   
`includes()`返回布尔值，表示是否至少找到一个与指定元素匹配的项。在比较第一个参数跟数组每一项时，会使用全等（===）比较，也就是说两项必须严格相等
:::

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
console.log(numbers.indexOf(4)); // 3 
console.log(numbers.lastIndexOf(4)); // 5 
console.log(numbers.includes(4)); // true 

console.log(numbers.indexOf(4, 4)); // 5 
console.log(numbers.lastIndexOf(4, 4)); // 3 
console.log(numbers.includes(4, 7)); // false

let person = { name: "Nicholas" }; 
let people = [{ name: "Nicholas" }]; 
let morePeople = [person]; 
console.log(people.indexOf(person)); // -1 s
console.log(morePeople.indexOf(person)); // 0 
console.log(people.includes(person)); // false  
console.log(morePeople.includes(person)); // true

```
**断言函数**  
ECMAScript 也允许按照定义的断言函数搜索数组，每个索引都会调用这个函数。断言函数的返回值决定了相应索引的元素是否被认为匹配。  

断言函数接收 3 个参数：元素、索引和数组本身。其中元素是数组中当前搜索的元素，索引是当前元素的索引，而数组就是正在搜索的数组。断言函数返回真值，表示是否匹配。  

find()和 findIndex()方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回第一个匹配的元素，findIndex()返回第一个匹配元素的索引。这两个方法也都接收第二个可选的参数，用于指定断言函数内部 this 的值。   
```javascript
const people = [ 
    { 
        name: "Matt", 
        age: 27 
    }, 
    { 
        name: "Nicholas", 
        age: 29 
    } 
]; 
alert(people.find((element, index, array) => element.age < 28)); 
// {name: "Matt", age: 27} 
alert(people.findIndex((element, index, array) => element.age < 28)); 
// 0
//找到匹配项后，这两个方法都不再继续搜索。
const evens = [2, 4, 6]; 
// 找到匹配后，永远不会检查数组的最后一个元素
evens.find((element, index, array) => { 
    console.log(element); 
    console.log(index); 
    console.log(array); 
    return element === 4; 
}); 
// 2 
// 0 
// [2, 4, 6] 
// 4 
// 1 
// [2, 4, 6]
index
```
**at()方法**  
Array.prototype.at(index)方法接收一个整数值并返回该索引对应的元素，允许正数和负数。负整数从数组中的最后一个元素开始倒数。
index
- 要返回的数组元素的索引（从零开始），会被转换为整数。  
- 负数索引从数组末尾开始计数——如果 index < 0，则会访问 index + array.length 位置的元素
- 如果 index < -array.length 或 index >= array.length，则总是返回 undefined，而不会尝试访问相应的属性

```javascript
const array1 = [5, 12, 8, 130, 44];

let index = 2;

console.log(`Using an index of ${index} the item returned is ${array1.at(index)}`);
// Expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${array1.at(index)}`);
// Expected output: "Using an index of -2 item returned is 130"

```

## 4.复制和填充-fill/copyWithin

### a.填充-fill()

> fill()方法可以向一个已有的数组中插入全部或部分相同的值。  
> -开始索引用于指定开始填充的位置，它是可选的。  
> -如果不提供结束索引，则一直填充到数组末尾。  
> -负值索引从数组末尾开始计算。也可以将负索引想象成数组长度加上它得到的一个正索引：  

```javascript
const zeroes = [0, 0, 0, 0, 0]; 
// 用 5 填充整个数组
zeroes.fill(5); 
console.log(zeroes); // [5, 5, 5, 5, 5]

zeroes.fill(0); // 重置

// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3); 
console.log(zeroes); // [0, 0, 0, 6, 6] 

zeroes.fill(0); // 重置

// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3); 
console.log(zeroes); // [0, 7, 7, 0, 0]; 

zeroes.fill(0); // 重置

// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1) 
// (-1 + zeroes.length = 4) 
zeroes.fill(8, -4, -1); // 加上数组长度就变成正的了
console.log(zeroes); // [0, 8, 8, 8, 0];

fill()静默忽略超出数组边界、零长度及方向相反的索引范围：
const zeroes = [0, 0, 0, 0, 0];

// 索引过低，忽略
zeroes.fill(1, -10, -6); 
console.log(zeroes); // [0, 0, 0, 0, 0] 

// 索引过高，忽略
zeroes.fill(1, 10, 15); 
console.log(zeroes); // [0, 0, 0, 0, 0]

// 索引反向，忽略
zeroes.fill(2, 4, 2); 
console.log(zeroes); // [0, 0, 0, 0, 0] 

// 索引部分可用，填充可用部分
zeroes.fill(4, 3, 10) 
console.log(zeroes); // [0, 0, 0, 4, 4]

```

### b. 复制- copyWithin()  
`copyWithin()`会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与 fill()使用同样的计算方法：

```javascript
let ints, 
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset();

// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5); 
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] 
reset(); 

// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5); 
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]

reset(); 
// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3); 
alert(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9] 
reset(); 

// JavaScript 引擎在插值前会完整复制范围内的值
// 因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6); 
alert(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9] 
reset(); 

// 支持负索引值，与 fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3); 
alert(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6] 

copyWithin()
//静默忽略超出数组边界、零长度及方向相反的索引范围：
let ints, 
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset();

// 索引过低，忽略
ints.copyWithin(1, -15, -12); 
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset() 

// 索引过高，忽略
ints.copyWithin(1, 12, 15); 
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 索引反向，忽略
ints.copyWithin(2, 4, 2); 
alert(ints); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 

// 索引部分可用，复制、填充可用部分
ints.copyWithin(4, 7, 10) 
alert(ints); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9];

```

## 5.转换方法-toString/valueOf/toLocaleString

### a. toString/valueOf 
> 前面提到过，所有对象都有 toLocaleString()、toString()和 valueOf()方法。
> 其中，valueOf()返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。 
> 也就是说，对数组的每个值都会调用其 toString()方法，以得到最终的字符串。
```javascript
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // red,blue,green 
alert(colors.valueOf()); // red,blue,green 
alert(colors); // red,blue,green

```

### b.toLocaleString()
```javascript
let person1 = { 
    toLocaleString() { 
        return "Nikolaos"; 
    }, 
    toString() { 
        return "Nicholas"; 
    } 
}; 

let person2 = { 
    toLocaleString() { 
        return "Grigorios"; 
    }, 
    toString() { 
        return "Greg"; 
    } 
}; 
let people = [person1, person2]; 
alert(people); // Nicholas,Greg 
alert(people.toString()); // Nicholas,Greg 
alert(people.toLocaleString()); // Nikolaos,Grigorios

```
::: tip
toLocaleString()方法也可能返回跟 toString()和 valueOf()相同的结果，但也不一定。  
在调用数组的 toLocaleString()方法时，会得到一个逗号分隔的数组值的字符串。
它与另外两个方法唯一的区别是，为了得到最终的字符串，会调用数组每个值的 toLocaleString()方法，而不是toString()方法。
:::

## 6.分割（join）与转化(split)

### a. 指定符号分割join

join()方法接收一个参数，即字符串分隔符，返回包含所有项的字符串；  
```javascript
let colors = ["red", "green", "blue"]; 
alert(colors.join(",")); // red,green,blue 
alert(colors.join("||")); // red||green||blue

```

::: warning

注意 如果数组中某一项是 null 或 undefined，则在 join()、toLocaleString()、toString()和 valueOf()返回的结果中会以空字符串表示。

::: 

### b.字符串转数组split()
方法用于把一个字符串分割成字符串数组  

```javascript

let str="How are you doing today?"

console.log(str.split(" ") + "<br />")
console.log(str.split("") + "<br />")
console.log(str.split(" ",3))
// How,are,you,doing,today?
// H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
// How,are,you

在本例中，我们将分割结构更为复杂的字符串：
"2:3:4:5".split(":") //将返回["2", "3", "4", "5"]
"|a|b|c".split("|") //将返回["", "a", "b", "c"]

//使用下面的代码，可以把句子分割成单词：
var words = sentence.split(' ')
//或者使用正则表达式作为 separator：
var words = sentence.split(/\s+/)


```

## 7.迭代器方法(keys/values/entries)
在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法

```javascript
// 迭代器方法三个方法
keys()返回数组索引的迭代器
values()返回数组元素的迭代器
entries()返回索引/值对的迭代器


const a = ["foo", "bar", "baz", "qux"]; 
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例

const aKeys = Array.from(a.keys()); 
const aValues = Array.from(a.values()); 
const aEntries = Array.from(a.entries()); 
console.log(aKeys); // [0, 1, 2, 3] 
console.log(aValues); // ["foo", "bar", "baz", "qux"] 
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]


//使用 ES6 的解构可以非常容易地在循环中拆分键/值对：
const a = ["foo", "bar", "baz", "qux"]; 
for (const [idx, element] of a.entries()) { 
    alert(idx); 
    alert(element); 
} 
// 0 
// foo 
// 1 
// bar 
// 2 
// baz 
// 3 
// qux


```

## 8.迭代方法  
5个迭代方法
接收 3个参数：数组元素、元素索引和数组本身  
以每一项为参数运行的函数，以及可选的作为函数运行上下文的作用域对象（影响函数中 this 的值）。  
**这些方法都不改变调用它们的数组。**  

```javascript
every()：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回true。 
some()：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。
filter()：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
forEach()：对数组每一项都运行传入的函数，没有返回值。
map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

```
### a. every()

功能：判断数组中每一项是否都满足条件，只有所有项都满足条件，才会返回true。   
参数：every()接收一个回调函数作为参数，这个回调函数需要有返回值，every(callback);callback默认有三个参数，分别为value，index，self。

**功能1：**  当回调函数的返回值为true时，类似于forEach的功能，遍历所有；如果为false，那么停止执行，后面的数据不再遍历，停在第一个返回false的位置。

```javascript
//demo1:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.every(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
})
// 打印结果为：
// Tom--0--true
//因为回调函数中没有return true，默认返回undefined，等同于返回false

//demo2:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.every(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
    return value.length < 4;
})
// 打印结果为：
// Tom--0--true
// abc--1--true
// Jack--2--true
//因为当遍历到Jack时，回调函数到return返回false，
//此时Jack已经遍历，但是后面数据就不再被遍历了

//demo3:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.every(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
    return true;
})
// 打印结果为：
// Tom--0--true
// abc--1--true
// Jack--2--true
// Lucy--3--true
// Lily--4--true
// May--5--true
//因为每个回调函数的返回值都是true，那么会遍历数组所有数据，等同于forEach功能

```
**功能2：** 当每个回调函数的返回值都为true时，every的返回值为true，只要有一个回调函数的返回值为false，every的返回值都为false
```javascript

//demo1:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.every(function(value,index,self){
    return value.length > 3;
})
console.log(a);//false

//demo2:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.every(function(value,index,self){
    return value.length > 2;
})
console.log(a);//true
```

### b.some()
功能：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。   
参数：some()接收一个回调函数作为参数，这个回调函数需要有返回值，some(callback);callback默认有三个参数，分别为value，index，self。

**功能1：** 因为要判断数组中的每一项，只要有一个回调函数返回true，some都会返回true，所以与every正好相反，当遇到一个回调函数的返回值为true时，可以确定结果，那么停止执行，后面都数据不再遍历，停在第一个返回true的位置；当回调函数的返回值为false时，需要继续向后执行，到最后才能确定结果，所以会遍历所有数据，实现类似于forEach的功能，遍历所有。

```javascript
//demo1:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.some(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
    return value.length > 3;
})
// 打印结果为：
// Tom--0--true
// abc--1--true
// Jack--2--true

//demo2:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.some(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
    return true;
})
// 打印结果为：
// Tom--0--true

//demo3:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.some(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr == self))
    return false;
})
// 打印结果为：
// Tom--0--true
// abc--1--true
// Jack--2--true
// Lucy--3--true
// Lily--4--true
// May--5--true

```
**功能2：**  与every相反，只要有一个回调函数的返回值都为true，some的返回值为true，所有回调函数的返回值为false，some的返回值才为false

```javascript
//demo1:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.some(function(value,index,self){
    return value.length > 3;
})
console.log(a);//true

//demo2:
var arr = ["Tom","abc","Jack","Lucy","Lily","May"];
var a = arr.some(function(value,index,self){
    return value.length > 4;
})
console.log(a);//false
```

### c.filter()
功能：1.同forEach功能；2.filter的回调函数需要返回布尔值，当为true时，将本次数组的数据返回给filter，最后filter将所有回调函数的返回值组成新数组返回（此功能可理解为“过滤”）。   
参数：filter(callback);callback默认有三个参数，分别为value，index，self。

```javascript
//功能1：同forEach
var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.filter(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr === self))
})
// 打印结果为：
// Tom--0--true
// Jack--1--true
// Lucy--2--true
// Lily--3--true
// May--4--true

//功能2：当回调函数的返回值为true时，本次的数组值返回给filter，被filter组成新数组返回
var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.filter(function(value,index,self){
    return value.length > 3;
})
console.log(a);         //["Jack", "Lucy", "Lily"]
console.log(arr);       //["Tom", "Jack", "Lucy", "Lily", "May"]---原数组未改变
```

### d.forEach()
功能：ES5新增方法，用来遍历数组，该方法没有返回值。forEach接收的回调函数会根据数组的每一项执行，该回调函数默认有三个参数，分别为：遍历到的数组的数据，对应的索引，数组自身。   
参数：forEach(callback);callback默认有三个参数，分别为value，index，self。

```javascript
var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.forEach(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr === self));
})
// 打印结果为：
// Tom--0--true
// Jack--1--true
// Lucy--2--true
// Lily--3--true
// May--4--true
console.log(a);     
//undefined---forEach没有返回值
//该方法为遍历方法，不会修改原数组
```

### e.map()
功能：1.同forEach功能；2.map的回调函数会将执行结果返回，最后map将所有回调函数的返回值组成新数组返回。   
参数：map(callback);callback默认有三个参数，分别为value，index，self。

```javascript
//功能1：同forEach
var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.map(function(value,index,self){
    console.log(value + "--" + index + "--" + (arr === self))
})
// 打印结果为：
// Tom--0--true
// Jack--1--true
// Lucy--2--true
// Lily--3--true
// May--4--true

//功能2：每次回调函数的返回值被map组成新数组返回
var arr = ["Tom","Jack","Lucy","Lily","May"];
var a = arr.map(function(value,index,self){
    return "hi:"+value;
})
console.log(a);     //["hi:Tom", "hi:Jack", "hi:Lucy", "hi:Lily", "hi:May"]
console.log(arr);   //["Tom", "Jack", "Lucy", "Lily", "May"]---原数组未改变
```
## 9.排序(sort/reverse)

### a.reverse()
功能：颠倒数组中元素的顺序  
```javascript
var arr = [10, 20, 30, 40]
res=arr.reverse()
console.log(arr);//[40,30,20,10]
console.log(res);//[40,30,20,10]
```

### b.sort()
默认情况下，sort()会按照升序重新排列数组元素，即最小的值在前面，最大的值在后面。为此，sort()会在每一项上调用 String()转型函数，然后比较字符串来决定顺序。即使数组的元素都是数值，也会先把数组转换为字符串再比较、排序。
```javascript
//如果省略，元素按照转换为的字符串的各个字符的Unicode位来进行排序
let values = [0, 1, 5, 10, 15]; 
values.sort(); 
alert(values); // 0,1,10,15,5

/*
如果需要按照数值排序，需要传参。sort(callback)，callback为回调函数，该函数应该具有两个参数，比较这两个参数，然后返回一个用于说明这两个值的相对顺序的数字（a-b）。其返回值如下：
若 a 小于 b，返回一个小于 0 的值。
若 a 等于 b，则返回 0。
若 a 大于 b，则返回一个大于 0 的值。
arr.sort(function (a,b) {return a-b}) 会正序排列
arr.sort(function (a,b) {return b-a}) 会倒序排列
*/
var arr = [6,1024,52,256,369];
console.log(arr.sort(fn));  //[6, 52, 256, 369, 1024]
console.log(arr);           //[6, 52, 256, 369, 1024]---原数组改变
function fn(a,b){
    return a-b;
}

```

## 10 .拼接(concat())与切片（slice()）

### a.拼接Array.prototype.concat()
concat()方法可以在现有数组全部元素基础上创建**一个新数组**。它首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组。如果传入一个或多个数组，则 concat()会把这些数组的每一项都添加到结果数组。如果参数不是数组，则直接把它们添加到结果数组末尾。
```javascript
let colors = ["red", "green", "blue"]; 
let colors2 = colors.concat("yellow", ["black", "brown"]); 
console.log(colors); // ["red", "green","blue"] 
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```
打平数组参数的行为可以重写，方法是在参数数组上指定一个特殊的符号：Symbol.isConcatSpreadable。这个符号能够阻止 concat()打平参数数组。相反，把这个值设置为 true 可以强制打平类数组对象：

```javascript
let colors = ["red", "green", "blue"]; 
let newColors = ["black", "brown"]; 
let moreNewColors = { 
    [Symbol.isConcatSpreadable]: true, 
    length: 2, 
    0: "pink", 
    1: "cyan" 
}; 
newColors[Symbol.isConcatSpreadable] = false; 

// 强制不打平数组
let colors2 = colors.concat("yellow", newColors); 

// 强制打平类数组对象
let colors3 = colors.concat(moreNewColors); 

console.log(colors); // ["red", "green", "blue"] 
console.log(colors2); // ["red", "green", "blue", "yellow", ["black", "brown"]] 
console.log(colors3); // ["red", "green", "blue", "pink", "cyan"]

```
concat() 方法是一种复制方法。它不会更改 this 或作为参数提供的任何数组，而是返回包含与原始数组中的元素相同的元素的浅拷贝。

### b.切片slice()
功能：可从已有的数组中返回选定的元素。  
该方法接收两个参数slice(start,end)，strat为必选，表示从第几位开始；end为可选，表示到第几位结束(不包含end位)，
省略表示到最后一位；
start和end都可以为负数，负数时表示从最后一位开始算起，如-1表示最后一位。
参数：slice(startIndex, endIndex)
```javascript
var arr = ["Tom","Jack","Lucy","Lily","May"];
console.log(arr.slice(1,3));        //["Jack","Lucy"]
console.log(arr.slice(1));          //["Jack","Lucy","Lily","May"]
console.log(arr.slice(-4,-1));      //["Jack","Lucy","Lily"]
console.log(arr.slice(-2));         //["Lily","May"]
console.log(arr.slice(1,-2));       //["Jack","Lucy"]
console.log(arr);                   //["Tom","Jack","Lucy","Lily","May"]---原数组未改变
```
