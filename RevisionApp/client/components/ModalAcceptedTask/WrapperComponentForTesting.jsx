// WrapperComponentForTesting.js
import React from "react";
import ModalAcceptedTask from "./ModalAcceptedTask";

const WrapperComponentForTesting = ({ id, time }) => {
	return (
		<div data-testid={`acceptedTaskModal-${id}`}>
			<ModalAcceptedTask id={id} time={time} />
		</div>
	);
};

export default WrapperComponentForTesting;
