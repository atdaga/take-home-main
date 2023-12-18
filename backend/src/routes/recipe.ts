import { RecipeModel } from "../models"
import { Request, Response } from "express"

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  // _next: NextFunction
): Promise<void> => {
  // TODO fetch and return a recipe. Done.
  const { id } = req.params
  if (id) {
    const foundRecipe = await RecipeModel.findById(id)
    if (foundRecipe) {
      const { id, name, instructions, ingredients } = foundRecipe
      res.send({
        id,
        name,
        instructions,
        ingredients: ingredients.map(({ name, unit, amount }) => `${amount} ${unit} ${name}`),
      })
      return
    }
  }

  res.sendStatus(404)
}
