import { v4 as uuidv4 } from 'uuid';
import { User } from './User';

export class Scene{
  id: string
  listOfUser: Map<string, User>

  constructor(){
    this.id = uuidv4()
    this.listOfUser = new Map()
  }

  obtainCurrentSceneInfo = () =>{
    return Object.fromEntries(this.listOfUser)
  }

  addUser = (uuid: string) =>{
    const newUser = new User(uuid)
    this.listOfUser.set(uuid, newUser)
  }

  handeUserMovement = (uuid: string, newPosX: number, newPosY: number) =>{
    const movingUser = this.listOfUser.get(uuid)
  
    if(movingUser !== undefined){
      movingUser.updateUserPosition(newPosX, newPosY)
      this.listOfUser.set(uuid, movingUser)
      return
    }

    this.listOfUser.delete(uuid)
  }

  removeUser = (uuid: string) =>{
    this.listOfUser.delete(uuid)
  }

  shutdownScene = () =>{
    this.listOfUser.clear()
  }
}