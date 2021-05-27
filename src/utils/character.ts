export default interface ICharacter {
	name: string,
	description: string,
	walletAddress: string,
	email: string,
	image: string,
	isStory:boolean,
	status:Status,
	votes: string[],
	createdAt: string //iso date
}

export enum Status {
	APPROVED="appproved",
	INGAME="inGame",
	REJECTED="rejected",
	NOTAPPROVED="notApproved"
}