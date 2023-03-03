import MagicNumber from "./MagicNumber"
import axios from 'axios'

class UrlLoader {
	btn: HTMLButtonElement
	input: HTMLInputElement
	constructor(btnName: string, fn: (ctx: UrlLoader)=>void, describe=''){
		const btn = document.createElement('button')
		const input = document.createElement('input')
		input.type='text'
		input.value = ''
		input.placeholder = 'input file link'
		btn.addEventListener('click', ()=>{
			fn(this)
		})
		input.addEventListener('change', e=>{
			if(e && e.target){
				console.log(e.target.value);
				input.value = e.target.value
			}
		})
		btn.title = describe
		btn.innerHTML = btnName
		this.btn = btn
		this.input = input
		const container = document.getElementById('option-container')
		if(container){
			container.append(input)
			container.append(btn)
		}
	}
	getBtnDom(){
		return this.btn;
	}
}
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
const magicNumber = new MagicNumber()

const urlInput = new UrlLoader('DownloadUrl', async (ctx)=>{
	const url = ctx.input.value;
	console.log(' url is : ', url);
	const res = await axios.get('https://cdn.polyhaven.com/asset_img/primary/dam_wall.png', { responseType: 'arraybuffer' })
	console.log(' result is : ', res);
	const arrayBuffer = res.data as ArrayBuffer;
	const isPNG = await magicNumber.isPNG(new Uint8Array(arrayBuffer))
	console.log(' is PNG L   ', isPNG);




})
const asyncFR = new AsyncFileReader();

const btn = new Btn('file picker', ()=>{
	filePicker.showFilePicker(async ()=>{
		const files = filePicker.filePicker.files
		if(files!==null){
			const file = files[0]
			console.log('file', file);
			if(file instanceof File){
				const isWebP = await magicNumber.isWebP(file);
				if(isWebP){
					console.log(' isWebP ', isWebP);
					return 
				}
				const isPng = await magicNumber.isPNG(file);
				if(isPng){
					console.log(' isPng ', isPng);
					return 
				}
				const isJpg = await magicNumber.isJPG(file);
				if(isJpg){
					console.log(' isJpg ', isJpg);
					return 
				}

			}
		}
	})
})


// fileReader.readAsArrayBuffer()
