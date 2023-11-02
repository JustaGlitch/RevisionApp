| ROUTE | METHOD | REQUIREMENTS | RESPONSE |
| --- | --- | --- | --- |
<!-- | `/student` | `GET` | 
| `/student` | `POST` |
| `/student/:user_id` | `GET` |
| `/student/:user_id` | `PATCH` |
| `/student/:user_id` | `DELETE` |
| `/student/register` | `POST` |
| `/student/login` | `POST` |
| `/student/profile` | `GET` | -->
| `/student/pokemon` | `GET` | null | EVERYTHING |
| `/student/pokemon/baby` | `GET` | null | ALL FIRST FORM POKEMON |
| `/student/pokemon/:id` | `GET` | id in params | returns ONE pokemon |
| `/student/pokemon/current` | `GET` | HEADER ("authorization": token) | returns current poke of student |
| `/student/pokemon/collection` | `GET` | HEADER ("authorization": token) | returns collection of pokemon student has |
| `/student/pokemon/new` | `POST` | HEADER ("authorization": token) | sets a new pokemon or returns that already a pokemon |
| `/student/pokemon/evolve` | `POST` | HEADER ("authorization": token) BODY ("studyTime" : INT of timer) | returns evolved pokemon or adds to collection (this makes students current pokemon null and let's a new pokemon be added) |
<!-- | `/admin` | `GET` |
| `/admin` | `POST` |
| `/admin/:admin_id` | `GET` |
| `/admin/:admin_id` | `PATCH` |
| `/admin/:admin_id` | `DELETE` |
| `/admin/register` | `POST` |
| `/admin/login` | `POST` |
| `/admin/profile` | `GET` |
| `/class` | `GET` |
| `/class` | `POST` |
| `/class/:class_id` | `GET` |
| `/class/:class_id` | `PATCH` |
| `/class/:class_id` | `DELETE` |
| `/class/classname/:classname` | `GET` |
| `/tasks` | `GET` |
| `/tasks` | `POST` |
| `/tasks/:task_id` | `GET` |
| `/tasks/:task_id` | `PATCH` |
| `/tasks/:task_id` | `DELETE` |
| `/studySession` | `GET` |
| `/studySession` | `POST` |
| `/studySession/:session_id` | `GET` |
| `/studySession/:session_id` | `PATCH` |
| `/studySession/:session_id` | `DELETE` |
| `/students` | `GET` |
| `/students` | `POST` |
| `/students/:student_id` | `GET` |
| `/students/:student_id` | `PATCH` |
| `/students/:student_id` | `DELETE` | -->