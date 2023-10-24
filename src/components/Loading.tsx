import React from "react";

const Loading = () => {
	return (
		<div className="absolute left-[50%] top-[50%] bg-[#0000007A] -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-items-center">
			<div className="lds-ring inline-block relative w-[80px] h-[80px]">
				<div className="box-border block absolute w-16 h-16 m-2 border-8 border-white rounded-[50%]"></div>
				<div className="box-border block absolute w-16 h-16 m-2 border-8 border-white rounded-[50%]"></div>
				<div className="box-border block absolute w-16 h-16 m-2 border-8 border-white rounded-[50%]"></div>
				<div className="box-border block absolute w-16 h-16 m-2 border-8 border-white rounded-[50%]"></div>
			</div>
		</div>
	);
};

export default Loading;
