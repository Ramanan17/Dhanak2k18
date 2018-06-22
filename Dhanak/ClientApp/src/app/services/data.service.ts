import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
@Injectable(
 
)
export class DataService {

  constructor(public http:Http) { 

  }
  getRegisteredevents(id)
  {
    return this.http.get("/api/registration/"+id).pipe(map((response: any) => response.json()));
  }
  registerUser(userid,eventid)
  {
    return this.http.post("/api/registration/"+userid+"/"+eventid,null).pipe(map((response: any) => response.json()));
  }
  getUser(name)
  {
    return this.http.get("/api/user/name/"+name).pipe(map((response: any) => response.json()));
  }
  updateuser(user,id)
  {
    return this.http.put("/api/user/"+id,user).pipe(map((response: any) => response.json()));
  }
  addUser(user)
  {
    return this.http.post("/api/user",user).pipe(map((response: any) => response.json()));
  }
getCategory()
{
   return this.http.get("/api/category").pipe(map((response: any) => response.json()));
}
addEvents(event)
{
  return this.http.post('/api/events',event).pipe(map((response: any) => response.json()));
}
editEvents(event,id)
{
  return this.http.put("/api/events/"+id,event).pipe(map((response: any) => response.json()));
}

getEvents()
{
  return this.http.get("/api/events").pipe(map((response: any) => response.json()));
}
getEvent(id)
{
  return this.http.get("/api/events/"+id).pipe(map((response: any) => response.json()));
}
getCategories(id)
{
  return this.http.get("/api/category/values/"+id).pipe(map((response: any) => response.json()));
}
deleteEvent(id)
{
  return this.http.delete('/api/events/'+id).pipe(map((response: any) => response.json()));
}
}
