import { Component }       from '@angular/core';
import { BlogPost }        from '../../../../shared/models/blog-post';
import { DatabaseService } from '../../../../shared/services/database/database.service';
import { Router }          from '@angular/router';
import { Observable }      from 'rxjs';
import { AuthService }     from '../../../../shared/services/authentication/auth.service';
import { filter, map }     from 'rxjs/operators';
import { objectExists }    from '../../../../shared/services/utilites/utilities.service';
import {Contact}           from '../../../../../../shared/model/contact';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  readonly blogs$: Observable<BlogPost[]> = this.database.getPosts$();

  currentUser$: Observable<string> = this.authService.user$.pipe(
    filter(objectExists),
    map((user) => user.email)
  );

  constructor(private database: DatabaseService, private router: Router, private authService: AuthService) {}

  editPost(postUid?: string) {
    if (postUid) {
      this.router.navigate([`/edit/${postUid}`]);
    } else {
      this.router.navigate([`/edit/${this.database.getNewUid()}`]);
    }
  }

  readPost(postUid: string) {
    this.router.navigate([`/post/${postUid}`]);
  }

  addContactToDatabase(email, firstName) {
    const contact: Contact = {email, firstName};
    // use email as the firebase document uid in case the user tries to sign up multiple times.
    // emails are safe to use as the uid as they are guaranteed to be unique.
    return this.database.set(contact, `contacts/${email}`)
  }

  logout() {
    this.authService.logout();
  }
}
