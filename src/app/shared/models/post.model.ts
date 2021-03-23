import { Comment } from './comment.model';

export interface Post {
    title: string;
    tags: string[];
    date: string;
    content: string;
    summary: string;
    comments: Comment[];
    author: string;
    imgUrl: string;
    _id: string;
}
