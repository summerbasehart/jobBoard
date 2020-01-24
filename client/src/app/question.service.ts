import { Injectable }       from '@angular/core';
import { PostComponent } from './post/post.component'

import { DropdownQuestion } from './dynamicForm/question-dropdown';
import { QuestionBase }     from './dynamicForm/question-base';
import { TextboxQuestion }  from './dynamicForm/question-textbox';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: PostComponent,
        label: 'Job Applying For:',
        options: [
          {key: '{{post._id}}',  value: '{{post.postTitle}}'},
        ],
        required: true,
        order: 9
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last name',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'phone',
        label: 'Phone',
        required: true,
        order: 4
      }),

      new TextboxQuestion({
        key: 'address',
        label: 'Street Address (Include Unit/Apt #)',
        required: true,
        order: 5
      }),

      new TextboxQuestion({
        key: 'zipcode',
        label: 'Zipcode',
        required: true,
        order: 6
      }),

      new TextboxQuestion({
        key: 'resume',
        label: 'Paste Your Resume Here in Plain Text',
        required: true,
        order: 7
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}