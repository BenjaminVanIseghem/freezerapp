
export class Item{
    private _id : string;
    private _name : string;
    private _amount: number;
    private _added: Date;
    private _details: string;

    constructor(name : string, amount: number, details?: string){
        this._name = name;
        this._amount = amount;
        this._added = new Date();
        this._details = details;
    }

    static fromJSON(json: any): Item {
        const it = new Item(
          json.name,
          json.amount,
          json.details
        );
        it._id = json._id;
        it._added = json.added;
        return it;
      }

      toJSON() {
        return {
          _id: this._id,
          name: this._name,
          amount : this._amount,
          added: this._added,
          details: this._details
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
      get details(): string{
          return this._details;
      }
      add(){
          this._amount++;
      }
      substract(){
          this._amount--;
      }
}
