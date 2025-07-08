import { CreateForm } from './components/create-form'
import { Header } from './components/header'
import { ListLinks } from './components/list-links'

function Home() {
	return (
		<div className="max-w-[1000px] mx-auto">
			<Header />

			<div className="flex sm:flex-row flex-col gap-5">
				<CreateForm />
				<ListLinks />
			</div>
		</div>
	)
}

export default Home
