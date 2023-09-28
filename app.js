const colors = require('colors')
const fs = require('fs')
const path = require('path')

// const mainDir = path.join(__dirname)
const mainDir = 'D:\\Copy\\'


const scaningFolder = async (mainDir) => {
    let filesArray = [], dirArray = []

    fs.readdir(mainDir, (err, files) => {
        files.  forEach(file => {
            const filePath = mainDir + file

            if (fs.statSync(filePath).isFile()) {
               filesArray.push(filePath)
            } else dirArray.push(filePath + '\\')
        })

        console.log(`Папка ${mainDir}`.bgYellow)

       if (filesArray.length !== 0) {

           let maxFile = filesArray[0];
           let count = 0

           filesArray.forEach(file => {
               if (count === 0) {
                   count++
                   return
               }
               if (fs.statSync(file).mtime > fs.statSync(maxFile).mtime) {
                   maxFile = file
                   // console.log('Сохранен'.bgGreen, colors.cyan(file), colors.green(fs.statSync(file).mtime))
                   deleteFile(file)
                   return
               }
               deleteFile(file)
               count++
           })
           // console.log('Максимальный файл:'.bgMagenta ,colors.cyan(maxFile), colors.green(fs.statSync(maxFile).mtime))
       }

        if (dirArray.length !== 0) {
            dirArray.forEach(dir => {
                scaningFolder(dir)
            })
        }

    })

}

scaningFolder(mainDir)

const deleteFile = async (path) => {
    await fs.stat(path, (err,  stat) => {
        if (stat) {
            console.log(stat.green)

            fs.rm(path, err => {
                if (!err) console.log('Удален'.bgGreen, colors.green(path))
                else console.log('Ошибка удаления'.bgRed, colors.red(err))
            })

        } else console.log('Файл не найден'.bgRed)
    })
}

