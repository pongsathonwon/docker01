import { AppError } from "../lib/AppError";
import { BaseContact, FullContact } from "../types";

class AppDB {
  private _db: FullContact[] = [
    { id: 1, name: "user1", tel: "0811111111", createAt: 1737879737247 },
    { id: 2, name: "user2", tel: "0822222222", createAt: 1737879737247 },
    { id: 3, name: "user3", tel: "0833333333", createAt: 1737879737247 },
    { id: 4, name: "user4", tel: "0844444444", createAt: 1737879737247 },
    { id: 5, name: "user5", tel: "0855555555", createAt: 1737879737247 },
    { id: 6, name: "user5", tel: "0855555555", createAt: 1737879737247, DeleteAt: 1737899737247 },
  ]
  private _idx = 6
  constructor() { }

  public getAll() {
    return this._db.filter(d => !d?.DeleteAt)
  }

  public getById(id: number): [number, FullContact] {
    const idx = this._db.findIndex(data => data.id === id && !data?.DeleteAt)
    if (idx < 0) throw new AppError(404, `not found contact with id: ${id}`)
    return [idx, this._db[idx]]
  }

  public add(raw: BaseContact) {
    this._idx++
    this._db.push({ ...raw, id: this._idx, createAt: this.getUnix() })
  }

  public update(id: number, body: Partial<BaseContact>) {
    const [idx, prevData] = this.getById(id)
    const nextData = { ...prevData, ...body, updateAt: this.getUnix() }
    this._db[idx] = nextData
    return nextData
  }

  public delete(id: number) {
    const [idx, _] = this.getById(id);
    this._db[idx].DeleteAt = this.getUnix()
  }

  public validateParams(id: string) {
    const validId = parseInt(id)
    if (Number.isNaN(validId)) throw new AppError(400, "id must be number")
    if (validId > this._idx) throw new AppError(404, `not found contact with id: ${id}`)
    return validId
  }

  private getUnix() { return (new Date()).getTime() }
}

const db = new AppDB()
export default db