
export class Item{
    private _id : string;
    private _name : string;
    private _amount: number;
    private _added: Date;

    constructor(name : string, amount: number){
        this._name = name;
        this._amount = amount;
        this._added = new Date();
    }

    static fromJSON(json: any): Item {
        const it = new Item(
          json.name,
          json.amount
        );
        it._id = json._id;
        it._added = json._added;
        return it;
      }

      toJSON() {
        return {
          _id: this._id,
          name: this._name,
          amount : this._amount,
          added: this._added
        };
      }

      get id(): string{
          return this._id;
      }
      get name(): string{
          return this._name;
      }
      get amount(): number{
          return this._amount;
      }
      get added(): Date{
          return this._added;
      }
}
