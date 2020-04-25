import { AuthorEnum } from '../enums/author.enum';

export interface BlogPost {
  header: string;
  subheader: string;
  prettyUrl: string;
  isPublished: boolean; // is the blog in draft state or publicly viewable?
  updatedOn: any;
  createdOn: any;
  uid: string;
  author: AuthorEnum;
  previewImage: string;
  content: string;
}
