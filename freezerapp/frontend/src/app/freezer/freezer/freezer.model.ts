import { Compartment } from '../compartment/compartment.model';

export class Freezer{

    private _id: string;
    private _name: string;
    private _created: Date;
    private _compartments = new Array<Compartment>();

    constructor( name : string, comps: Compartment[] = []){
      this._name = name;
      this._compartments = comps;
      this._created = new Date();
    }

    static fromJSON(json: any): Freezer {
        const fre = new Freezer(
          json.name,
          json.compartments.map(Compartment.fromJSON)
        );
        fre._id = json._id;
        return fre;
      }

      toJSON() {
        return {
          _id: this._id,
          name: this._name,
          compartments: this._compartments,
          created: this._created
        };
      }

      get id(): string {
        return this._id;
      }
      get name(): string {
        return this._name;
      }
      get created(): Date {
        return this._created;
      }
      get compartments(): Compartment[]{
        return this._compartments;
      }
      addCompartment(comp : Compartment){
        this._compartments.push(comp);
      }
}