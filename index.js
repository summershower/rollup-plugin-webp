const sharp = require('sharp');
const { join } = require('path');
const suffixReg = /(.jpg)|(.jpeg)|(.png)|(.gif)$/i;
async function convert(file, base, fileName, quality) {
    await sharp(file)
        .webp({
            quality: quality,
            lossless: false,
        })
        .toFile(join(base, fileName.replace(suffixReg, '.webp')), (err) => {
            err && console.error(err);
        });
}
function getStrReg(dirStr) {
    return (dirStr instanceof RegExp && /^\/.+\/$/.test(String(dirStr))) ? new RegExp(dirStr) : new RegExp(`/${dirStr}/`)
}
function webp(pluginOptions = {}) {
    const {
        quality = 80,
        include = [],
        exclude = []
    } = pluginOptions
    return {
        name: 'webp',
        writeBundle(outputOptions, bundle) {
            Object.entries(bundle).forEach(([bundleName, bundleInfo]) => {
                const { fileName, source, type } = bundleInfo;
                if (type !== 'asset') return;
                if (!suffixReg.test(fileName)) return;
                if (!include.some(v => getStrReg(v).test(fileName))) return
                for (let i = 0; i < exclude.length; i++) {
                    if (getStrReg(exclude[i]).test(fileName)) return;
                }
                convert(source, outputOptions.dir, fileName, quality);
            })
        }
    }
}
exports.webp = webp;