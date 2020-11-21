import { Comment } from './comment.model';

export class Post{
    title: string;
    author: string;
    authorID: string;
    authorLink: string;
    imageID: string;
    date: Date;
    modified?: Date;
    comments?: any;
    numOfComments?: number;
    content: string;

}