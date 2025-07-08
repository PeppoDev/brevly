import { toast } from 'react-toastify'

type ToastType = 'success' | 'error'

function triggerToast(message: string, type: ToastType = 'success') {
	toast(message, {
		type,
		className: 'font-normal text-sm',
	})
}

export { triggerToast }
