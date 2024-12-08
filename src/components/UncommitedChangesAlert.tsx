import { Alert, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { commitChanges } from "../redux/thunks/records/commit";
import type { RootState } from "../app/store";
import type { UnknownAction } from "@reduxjs/toolkit";

export const UncommitedChangesAlert = () => {
	const dispatch = useDispatch();
	const currentDomain = useSelector((state: RootState) => state.domain.domain);

	return (
		<div className="flex items-center justify-center w-full">
			<Alert
				color="warning"
				description="You have uncommited changes. To apply the changes to your DNS records, commit the changes."
				endContent={
					<Button
						color="warning"
						size="sm"
						variant="flat"
						onClick={() =>
							dispatch(commitChanges(currentDomain) as unknown as UnknownAction)
						}
					>
						Commit
					</Button>
				}
				title="You have uncommited changes"
				variant="faded"
			/>
		</div>
	);
};
