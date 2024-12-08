import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const HomePage = () => {
	return (
		<div className="mx-auto p-6 mt-5 rounded-lg w-2/3">
			<h1 className="text-center text-3xl font-bold">Better WAPI</h1>
			<p className="mt-2">
				Better WAPI is a wrapper around the Wedos API (WAPI). Continue by create
				a new DNS record or listing available records for a certain domain.
			</p>
			<div className="my-8 flex flex-row flex-auto justify-around w-1/2 mx-auto">
				<Link to="/new">
					<Button color="primary" variant="ghost" size="lg">
						Create a record
					</Button>
				</Link>
				<Link to="/records">
					<Button color="primary" variant="ghost" size="lg">
						List records
					</Button>
				</Link>
			</div>
		</div>
	);
};
