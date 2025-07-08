export function downloadFileByUrl(url: string) {
	const anchor = document.createElement('a')
	anchor.href = url
	anchor.download = ''
	anchor.target = '_blank'
	anchor.click()
	anchor.remove()
}
