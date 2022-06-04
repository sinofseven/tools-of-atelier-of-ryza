declare module "@/data/travelBottleRecipes/one.json" {
  export interface BottleRecipe {
    password: string;
    level: number;
    items: string[];
    enemies: string[];
    annotations: string[];
  }

  export interface Data {
    recipes: BottleRecipe[];
  }

  const data: Data;
  export default data;
}
