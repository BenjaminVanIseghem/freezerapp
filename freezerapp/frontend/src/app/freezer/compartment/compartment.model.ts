import { Item } from '../item/item.model';

export class Compartment{

    private _id: string;
    private _name: string;
    private _items: Item[];

    constructor(name: string){
        this._name = name;
        this._items = new Array<Item>();
    }

    get name(){
        return this._name;
    }
    get id(){
        return this._id;
    }

    get items(){
        return this._items;
    }

    static fromJSON(json: any): Compartment {
        const comp = new Compartment(
          json.name
        );
        comp._id = json._id;
        comp._items = json.items;
        return comp;
      }

      toJSON() {
        return {
          _id: this._id,
          name: this._name,
          items: this._items
        };
      }
}