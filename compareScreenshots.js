const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
let pixel = [1]; 
let page = [1];
page[0] = 'mainpage.png';
page[1] = 'checkingpage.png';

//read reference and test pictures
const r_mainpage = PNG.sync.read(fs.readFileSync('reference/r_' + page[0]));
const mainpage = PNG.sync.read(fs.readFileSync('test/' + page[0]));

//set width and height of screen
const {width, height} = r_mainpage;
const diff = new PNG({width, height});
 
//compare the pictures and output the difference in pixel
pixel[0] = pixelmatch(r_mainpage.data, mainpage.data, diff.data, width, height, {threshold: 0.5,alpha:0.6});
console.log(pixel[0] + ' Pixel ' + page[0]);

//print picture with difference
fs.writeFileSync('diff/diff_' + page[0] , PNG.sync.write(diff));

const r_checkingpage = PNG.sync.read(fs.readFileSync('reference/r_' + page[1]));
const checkingpage = PNG.sync.read(fs.readFileSync('test/' + page[1]));

//compare the pictures and output the difference in pixel
pixel[1] = pixelmatch(r_checkingpage.data, checkingpage.data, diff.data, width, height, {threshold: 0.5,alpha:0.60});
console.log(pixel[1] + ' Pixel ' + page[1]);

//print picture with difference
fs.writeFileSync('diff/diff_' + page[1], PNG.sync.write(diff));

//write file with difference values
let date = new Date();
fs.appendFile('output.txt',date + ':' + pixel[0] + ',' + pixel[1] + ',' + '\n', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

//print a difference in consolelog
if(pixel[0] > 1000 || pixel[1] > 1000){
    console.log('###########################################################################');
    console.log('a difference!');
    console.log('###########################################################################!');
}


