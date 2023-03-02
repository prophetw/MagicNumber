class MagicNumber {
	webpMagicNumber: Uint8Array
	pngMagicNumber: Uint8Array
	constructor(){
		this.webpMagicNumber = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0xAB, 0x30, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]);
		this.pngMagicNumber = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
	}

	async isWebP(file: File | ArrayBuffer){

		let fileBytes
		if(file instanceof File){
			// read the first 12 bytes of the file as a Uint8Array
			const blob = file.slice(0, 12);
			const aryBuf = await blob.arrayBuffer()
			fileBytes = new Uint8Array(aryBuf)
		}else{
			fileBytes = new Uint8Array(file.slice(0, 12));
		}
		// compare the file bytes to the WebP magic number
		const isWebP = fileBytes.every((value, index) => value === this.webpMagicNumber[index]);
		return isWebP
	}

	async isPNG(file: File | ArrayBuffer){
		let fileBytes
		if(file instanceof File){
			// read the first 8 bytes of the file as a Uint8Array
			const blob = file.slice(0, 8);
			const aryBuf = await blob.arrayBuffer()
			fileBytes = new Uint8Array(aryBuf)
		}else{
			fileBytes = new Uint8Array(file.slice(0, 12));
		}
		// compare the file bytes to the PNG magic number
		const isPNG = fileBytes.every((value, index) => value === this.pngMagicNumber[index]);
		return isPNG
	}

}

export default MagicNumber