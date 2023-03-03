class MagicNumber {
	webpMagicNumber: Uint8Array
	pngMagicNumber: Uint8Array
	jpgMagicNumber: Uint8Array
	jpgMagicNumberEnd: Uint8Array
	hdrMagicNumber: Uint8Array
	constructor(){
		this.webpMagicNumber = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0xAB, 0x30, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]);
		this.pngMagicNumber = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
		this.jpgMagicNumber = new Uint8Array([0xFF, 0xD8]);
		this.jpgMagicNumberEnd = new Uint8Array([0xFF, 0xD9])
		this.hdrMagicNumber = new Uint8Array([0x23, 0x3F, 0x52, 0x41, 0x44, 0x49, 0x41, 0x4E, 0x43, 0x45, 0x0A]);

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
		const isWebP = fileBytes.every((value, index) => {
			if(4<=index && index<=7){
				// skip index 4~7
				return true;
			}
			return value === this.webpMagicNumber[index]
		});
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
			fileBytes = new Uint8Array(file.slice(0, 8));
		}
		// compare the file bytes to the PNG magic number
		const isPNG = fileBytes.every((value, index) => value === this.pngMagicNumber[index]);
		return isPNG
	}

	async isJPG(file: File | ArrayBuffer){
		let fileBytes
		if(file instanceof File){
			// read the first 8 bytes of the file as a Uint8Array
			const blob = file.slice(0, 2);
			const aryBuf = await blob.arrayBuffer()
			fileBytes = new Uint8Array(aryBuf)
		}else{
			fileBytes = new Uint8Array(file.slice(0, 2));
		}
		// compare the file bytes to the PNG magic number
		const isThisFormat = fileBytes.every((value, index) => value === this.jpgMagicNumber[index]);
		return isThisFormat
	}

	async isHDR(file: File | ArrayBuffer){
		let fileBytes
		if(file instanceof File){
			// read the first 8 bytes of the file as a Uint8Array
			const blob = file.slice(0, 11);
			const aryBuf = await blob.arrayBuffer()
			fileBytes = new Uint8Array(aryBuf)
		}else{
			fileBytes = new Uint8Array(file.slice(0, 11));
		}
		console.log(' compare ')
		console.log(this.hdrMagicNumber);
		console.log(fileBytes);
		// compare the file bytes to the PNG magic number
		const isThisFormat = fileBytes.every((value, index) => value === this.hdrMagicNumber[index]);
		return isThisFormat
	}


}

export default MagicNumber