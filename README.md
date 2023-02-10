# rollup-plugin-webp   

A rollup plugin for convert images to webp. After building, the same name webp files will be generated in the directory of files ending with .jpg, .jpeg, .png, and .gif suffixes.  

这是一个用于将图片转换成Webp格式的rollup插件，构建时会在.jpg、.jpeg、.png、.gif后缀结尾的文件的目录下生成一个.webp格式的同名文件。  

## Usage
#### Install
```shell
npm i rollup-plugin-webp -D
```
#### Config
```js
const { webp } = require('rollup-plugin-webp');

export default {
    ...
    plugins: [
        ...
        webp()
    ]
}
```

#### Options

You can provide parameters to control the details of the conversion. 

你可以传入参数控制转换的细节。

```js
webp({
    quality: 80,
    include: ['valentinesDayActivity'], // regular expressions or string
})
```

|Key|Type|Default|Description|
|----|----|----|----|
|quality|`number`|80|The quality of the generated webp file (1-100), the larger the number, the higher the quality of the file and the larger the space occupied|
|include|`(string\|RegExp)[]`|[]|Folders that need to be included (whitelist mode), you can provide regular expression or string, and the string will be converted to a regular expression like new RegExp(\`/${yourString}/\`)|
|exclude|`(string\|RegExp)[]`|[]|Folders that need to be excluded (blacklist mode), regular expressions or strings can be provided|

## Tips

Not all devices support the Webp format, please do not use webp format images directly in the project, the following is a usage of the Vue framework.

不是所有的设备都可以兼容Webp格式的图片，使用前请做好webp兼容性测试，以下是Vue框架中的一种用法。
```js
// CustomDirectives.js
let isSupportWebp = false;
const checkWebpSupport = () => {
    const img = new Image();
    img.onload = () => {
        isSupportWebp = img.width > 0 && img.height > 0;
    };
    img.onerror = () => {
        isSupportWebp = false;
    };
    img.src = `data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==`;
};
checkWebpSupport();

const src = {
    beforeMount(el, binding) {
        const targetFileSrc = new URL(
            `../assets/images/${binding?.value}`,
            import.meta.url
        )?.href;
        const webpFileName = targetFileSrc?.replace(/(.jpg)|(.jpeg)|(.png)|(.gif)$/i, '.webp');
        const s = isSupportWebp ? webpFileName : targetFileSrc;
        el.onerror = () => {
            el.src = targetFileSrc;
            el.onerror = null;
        };
        if (s) el.src = s;
    },
};
export default {
    src
};
```
```js
// main.ts
import { src } from '@utils/CustomDirectives';
const app = createApp(App);
app.directive('src', src); // Register this custom directive globally
app.mount('#app');
```
```html
<!-- If the device supports webp, it actually points to 'assets/images/banner.webp' -->
<img v-src="'banner.jpg'"/>
```

## Github
[Github](https://github.com/summershower/rollup-plugin-webp)

This is a very simple plugin for our internal project, it has not been rigorously tested by Jest. If you are interested in it, welcome to commit pull request to improve this plugin.

这是一个用于我们业务项目的非常简单的插件，并未经过严谨的Jest测试，如果你有兴趣，欢迎发起pr请求完善此插件。