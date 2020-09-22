import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  // posts = [
  //   {
  //     title: 'First Post',
  //     content:
  //       'Aliqua mollit laborum non nulla velit aliqua irure id. Ex ullamco qui ad magna quis aute velit.',
  //   },
  //   {
  //     title: 'Second Post',
  //     content:
  //       'Veniam sit sit aute non cupidatat proident incididunt Lorem. Anim esse ut sint veniam proident culpa.',
  //   },
  //   {
  //     title: 'Third Post',
  //     content:
  //       'Sint ad deserunt exercitation et ipsum culpa. Adipisicing qui reprehenderit ullamco in excepteur voluptate.',
  //   },
  // ];
  @Input() posts: Post[] = [];
}
