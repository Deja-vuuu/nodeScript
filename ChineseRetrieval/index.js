var fs = require('fs');  
var path = require('path');  
//path.join 与 path.resolve
//path.join只是简单的将该路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在terminal中使用cd命令一样。
var filePath = path.join('./app');
var time = new Date().getHours() + "" + new Date().getMinutes();
//调用文件遍历方法  
fileDisplay(filePath);


/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            files.forEach(function (filename) {
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件  
                        var isDir = stats.isDirectory(); //是文件夹  
                        if (isFile) {
                            var content = ''
                            content += fs.readFileSync(filedir, 'utf-8').replace(/[^\u4e00-\u9fa5]/gi, "").replace(/[undefined]/gi, "")
                            fs.writeFile(`./输出内容${time}.txt`, content, function (err) {
                                if (err) console.log('写文件操作失败');
                                else console.log('写文件操作成功!');
                            });

                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }
                    }
                })
            });
        }
    });
}
