export interface Feedback {
    title: string,
    description: string,
    reaction: number | { lower: number; upper: number; },
    createdat?: string,
    userid?: number
}
