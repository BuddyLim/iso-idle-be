const defaultPosX = 0
const defaultPosY = 0

export class User{
  uuid: string
  posX: number
  posY: number

  constructor(uuid: string){
    this.uuid = uuid
    this.posX = defaultPosX
    this.posY = defaultPosY
  }

  updateUserPosition = (newPosX: number, newPosY: number) =>{
    this.posX = newPosX
    this.posY = newPosY
  }
}