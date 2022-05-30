declare module "@/data/synthesisItems/one.json" {
  export interface Categories {
    have: string[];
    optional: string[];
  }
  export interface InjectedNumbers {
    max: number;
    min: number;
  }
  export interface Elements {
    have: string[];
    optional: string[];
    max: number;
    min: number;
  }
  export interface SynthesisItems {
    name: string;
    level: number;
    categories: Categories;
    createdNumbers: number;
    injectedNumbers: InjectedNumbers;
    elements: Elements;
    sourceItems: string[];
    effectsInFrame: string[];
    effectsNotInFrame: string[];
    baseRecipes: { [key: string]: string };
  }
  const data: { [key: string]: SynthesisItems };
  export default data;
}
