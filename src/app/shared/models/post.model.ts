import { Comment } from './comment.model';

export interface Post {
    title: string;
    type: string;
    tags: string[];
    date: string;
    content: string;
    summary: string;
    comments: Comment[];
    authorID: string;
    uid: string;
}
