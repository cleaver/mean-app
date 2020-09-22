import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: 'Aliqua mollit laborum non nulla velit aliqua irure id. Ex ullamco qui ad magna quis aute velit.', },
  //   {title: 'Second Post', content: 'Veniam sit sit aute non cupidatat proident incididunt Lorem. Anim esse ut sint veniam proident culpa.', },
  //   {title: 'Third Post', content: 'Sint ad deserunt exercitation et ipsum culpa. Adipisicing qui reprehenderit ullamco in excepteur voluptate.', },
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
