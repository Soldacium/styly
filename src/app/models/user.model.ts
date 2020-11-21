import { Comment } from './comment.model'

export class User {
    
    displayName?: string;
    totalPosts?: number;
    postsIDs?: Array<any>;
    options?: object;
    comments?: object;
    links?: links;
    desc?: string

}

export class links {
    facebook: string;
    instagram: string;
    pinterest: string;
    email: string;
}