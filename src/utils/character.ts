export default interface ICharacter {
	name: string,
	description: string,
	walletAddress: string,
	email: string,
	image: string,
	story:string,
	status:string,
	votes: number,
	createdAt: string //iso date
}