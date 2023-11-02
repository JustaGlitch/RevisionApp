| ROUTE | METHOD | REQUIREMENTS | RESPONSE |
| --- | --- | --- | --- |
| `/student` | `GET` | null | EVERYTHING |
| `/student/:user_id` | `GET` | id in params | returns student with id |
| `/student/:user_id` | `PATCH` | id in params, BODY (things to change eg "password": new password) | returns updated student
| `/student/:user_id` | `DELETE` | id in params | student deleted message |
| `/student/register` | `POST` | BODY ("username": username, "password": password) | registers user and makes token (can log in like this )|
| `/student/login` | `POST` | BODY ("username": username, "password": password) | checks it matches user in database and makes token |
| `/student/profile` | `GET` | HEADER ("authorization": token) | returns username, current pokemon and class of user |
| `/student/pokemon` | `GET` | null | EVERYTHING |
| `/student/pokemon/baby` | `GET` | null | ALL FIRST FORM POKEMON |
| `/student/pokemon/:id` | `GET` | id in params | returns ONE pokemon |
| `/student/pokemon/current` | `GET` | HEADER ("authorization": token) | returns current poke of student |
| `/student/pokemon/collection` | `GET` | HEADER ("authorization": token) | returns collection of pokemon student has |
| `/student/pokemon/new` | `POST` | HEADER ("authorization": token) | sets a new pokemon or returns that already a pokemon |
| `/student/pokemon/evolve` | `POST` | HEADER ("authorization": token), BODY ("studyTime" : INT of timer) | returns evolved pokemon or adds to collection (this makes students current pokemon null and let's a new pokemon be added) |
| `/admin` | `GET` |
| `/admin` | `POST` |
| `/admin/:admin_id` | `GET` |
| `/admin/:admin_id` | `PATCH` |
| `/admin/:admin_id` | `DELETE` |
| `/admin/register` | `POST` |
| `/admin/login` | `POST` |
| `/admin/profile` | `GET` |
| `/class` | `GET` | null | EVERYTHING |
| `/class` | `POST` | BODY ("admin_id": admin_id, "classname": classname) | returns new class 
| `/class/:class_id` | `GET` | id in params |
| `/class/:class_id` | `PATCH` | id in params, BODY ("admin_id": admin_id, "classname": classname) | returns updated class |
| `/class/:class_id` | `DELETE` | id in params | returns deleted message |
| `/class/classname/:classname` | `GET` | name in params | returns class id |
| `/tasks` | `GET` | null | returns all tasks |
| `/tasks` | `POST` | BODY ("title": title, "description": description, "admin_id": admin_id, "user_id": user_id, "class_id": class_id, "completed": BOOL, "suggested_time": INT,"taskCreated_at": this.time ) | creates new task, returning new task |
| `/tasks/:task_id` | `GET` | id in params | returns task with id |
| `/tasks/:task_id` | `PATCH` | id in params, BODY () | returns updated task
| `/tasks/:task_id` | `DELETE` | id in params | returns deleted message |
| `/studySession` | `GET` | null | EVERYTHING |
| `/studySession` | `POST` | BODY ("user_id":user_id, "duration": INT) | returns new session |
| `/studySession/:session_id` | `GET` | id in params | returns session with id |
| `/studySession/:session_id` | `PATCH` | id in params, BODY ("user_id":user_id, "duration": INT) | returns updated session |
| `/studySession/:session_id` | `DELETE` | id in params | returns deleted message |
| `/students` | `GET` | null | EVERYTHING |
| `/students` | `POST` | BODY ("user_id": user_id, "class_id":class_id) | returns new student |
| `/students/:student_id` | `GET` | id in params | returns student with id |
| `/students/:student_id` | `PATCH` | id in params, BODY("user_id": user_id, "class_id":class_id)  | returns updated student |
| `/students/:student_id` | `DELETE` | id in params | returns deleted message |


`student/1` returns user_id, username, password, pokemon
`students/1` (with an S at the end) returns student_id, user_id, class_id (based on student_id, user_id does not always equal student_id)

returned students from /student paths return classname

`/pokemon/new/:id` is for the starter pokemon
`/pokemon/new` returns a random new baby pokemon that is not in the collection
`/pokemon/evolve` returns a message followed by a pokemon
this is returned when evolving to a middle stage
{
  "message": "current pokemon:",
  "pokemon": {
    "pokemon_id": 157,
    "name": "dragonair",
    "evolution_stage": "middle",
    "evolves_to": 156,
    "study_time": 60,
    "sprite_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png",
    "threeD_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/148.png"
  }
}
this is returned when evolving to a final stage
{
  "message": "added to collection:",
  "pokemon": {
    "pokemon_id": 156,
    "name": "dragonite",
    "evolution_stage": "final",
    "evolves_to": null,
    "study_time": null,
    "sprite_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    "threeD_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/149.png"
  }
}
the pokemon is added to the collection when fully evolved and doesn't need to be worried about
`/pokemon/current` returns the current pokemon

`/pokemon/new` needs to called when current pokemon is null