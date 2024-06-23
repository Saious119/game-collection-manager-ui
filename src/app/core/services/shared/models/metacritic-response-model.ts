import { ReviewModel } from "./review-model";

export class MetaCriticResponse {
    title!: string;
    description!: string;
    genre!: string;
    platform!: string;
    developer!: string;
    thumbnailUrl!: string;
    metaScore!: number;
    userScore!: number;
    recentReviews!: ReviewModel[];
    recentUserReviews!: ReviewModel[];
}