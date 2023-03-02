### Magic Number
#### Purpose
>  
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

// file from local 
// file is from file picker 
const isPNG = await magicNumber.isPNG(file)

// file from remote 
// make a GET request for an ArrayBuffer
axios.get('https://example.com/image.png', { responseType: 'arraybuffer' })
  .then(response => {
    // handle the response data as an ArrayBuffer
    const arrayBuffer = response.data;
    console.log(arrayBuffer);
		const isPNG = await magicNumber.isPNG(arrayBuffer)
  })
  .catch(error => {
    console.error(error);
  });




```