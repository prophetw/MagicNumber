import MagicNumber from "./MagicNumber"

class Btn {
	btn: HTMLButtonElement
	constructor(name: string, fn: ()=>void, describe=''){
		const btn = document.createElement('button')
		btn.addEventListener('click', fn)
		btn.title = describe
		btn.innerHTML = name
		this.btn = btn
		const container = document.getElementById('option-container')
		if(container){
			container.append(btn)
		}
	}
	getBtnDom(){
		return this.btn;
	}
}

class FilePicker {
	filePicker: HTMLInputElement
	pickEndCallback: ()=>void
	constructor(){
		this.filePicker = document.createElement('input')
		this.filePicker.style.width = '0px'
		this.filePicker.style.height = '0px'
		this.filePicker.type="file"
		document.body.append(this.filePicker)
		this.init()
	}
	init(){
		this.filePicker.addEventListener('change', ()=>{
			if(this.pickEndCallback){
				this.pickEndCallback()
			}
		})
	}
	showFilePicker(pickEndCallback?: ()=>void){
		this.filePicker.click()
		if(pickEndCallback){
			this.pickEndCallback = pickEndCallback
		}
	}
}

class AsyncFileReader{
	fileReader: FileReader
	constructor(){
 		this.fileReader = new FileReader()
	}
	async readAsArrayBuffer(file: File): Promise<ArrayBuffer>{
		let resolveFn
		let rejectFn
		const promise = new Promise((resolve, reject)=>{
			resolveFn = resolve
			rejectFn = reject
		})
		this.fileReader.readAsArrayBuffer(file)
		this.fileReader.onload = (event)=>{
			if(event && event.target){
			  const arrayBuffer = event.target.result;
				if(arrayBuffer instanceof ArrayBuffer){
					resolveFn(arrayBuffer)
				}else{
					rejectFn('not array buffer type')
				}
			}else{
				rejectFn('err')
			}
		}
		// @ts-ignore
		return promise;
	}
}

const filePicker = new FilePicker();
const asyncFR = new AsyncFileReader();


class AsciiDecode{
	uint8Ary: Uint8Array
	constructor(buf: Uint8Array){
		this.uint8Ary = buf
	}
	decodeToAscii(){
		const offset = 0
		const step = 10
		const ascii = this.uint8Ary.slice(offset, step)
		console.log(ascii);
		const str = String.fromCharCode.apply(null, ascii)
		console.log(' str ', str);
	}
}

const magicNumber = new MagicNumber()
const btn = new Btn('file picker', ()=>{
	filePicker.showFilePicker(async ()=>{
		const files = filePicker.filePicker.files
		if(files!==null){
			const file = files[0]
			console.log('file', file);
			if(file instanceof File){
				const isPng = await magicNumber.isPNG(file)
				console.log(' isPng ', isPng);

			}
		}
	})
})


// fileReader.readAsArrayBuffer()
