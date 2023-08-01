export const AsyncStates = {
	INITIAL: "INITIAL",
	LOADING: "LOADING",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR",
}

export const defaultHeaders = {
	"Content-Type": "application/json" || "multipart/form-data",
	"Access-Control-Allow-Origin": "*",
}

export const userTypeOptions = [
	{ value: "recruiter", label: "Recruiter" },
	{ value: "applicant", label: "Candidate" },
]

export const paymentDuration = [
	{ value: "PER MONTH", label: "PER MONTH" },
	{ value: "PER YEAR", label: "PER YEAR" },
	{ value: "HOURLY", label: "HOURLY" }
]

export const jobType = [
	{ value: "full-time", label: "Full Time" },
	{ value: "part-time", label: "Part Time" },
	{ value: "contract", label: "Contract" },
	{ value: "internship", label: "Internship" },
]


export const blogCategoryOptions = [
	"Technology",
	"Fashion",
	"Food",
	"Politics",
	"Sports",
	"Business",
];

export const cardCommonStyles = { borderRadius: "12px", boxShadow: "rgb(0 0 0 / 12%) 0px 6px 16px" }