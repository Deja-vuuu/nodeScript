var fs = require('fs');  
var xlsx = require('node-xlsx');  
var time = new Date().getHours()+""+new Date().getMinutes();
// var list = xlsx.parse("./excel/" +"1.xlsx"); //读取excel  

  
  
// var datas=[];  
// var data=[1,2,3];  
// var data1=[4,5,6];  
// datas.push(data);    //一行一行添加的 不是一列一列  
// datas.push(data1);      
// writeXls(datas);  
function writeXls(datas) {  
    var buffer = xlsx.build([  
        {  
            name:'翻译',  
            data:datas     
        }  
    ]);  
    fs.writeFileSync('test.xlsx',buffer);   //生成excel  
}  

const data = [
    [1, 2, 3],
    [true, false, null, 'sheetjs'], 
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
    ['baz', null, 'qux']
];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const option = {'!merges': [ range ]};
var buffer = xlsx.build([{name: "mySheetName", data: data}], option); // Returns a buffer
fs.writeFileSync(`${time}`,buffer)