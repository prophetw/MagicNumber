### Magic Number
> This is a [magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) implement for determine some format of file.
> You can custom more for yourself.

```bash
## install 
yarn 

## dev
yarn start 

```

```js
const magicNumber = new MagicNumber()
// file is from file picker 
const isPNG = await magicNumber.isPNG(file)

```