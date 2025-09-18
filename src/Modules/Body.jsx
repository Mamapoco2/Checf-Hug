import React from "react";
import { ChefHat, Plus, Sparkles } from "lucide-react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../constant/Ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function getRecipe() {
    setIsLoading(true);
    try {
      const recipeMarkdown = await getRecipeFromMistral(ingredients);
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient && newIngredient.trim()) {
      setIngredients((prevIngredients) => [
        ...prevIngredients,
        newIngredient.trim(),
      ]);
      // Reset form
      document.querySelector('input[name="ingredient"]').value = "";
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AI Recipe Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your ingredients into amazing recipes with the power of
            AI. Just add what you have, and let our chef create something
            delicious!
          </p>
        </div>

        <main className="flex justify-center items-center flex-col">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 w-full max-w-md backdrop-blur-sm bg-white/90">
            <form action={addIngredient} className="space-y-4">
              <div>
                <label
                  htmlFor="ingredient"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add an ingredient
                </label>
                <input
                  id="ingredient"
                  type="text"
                  placeholder="e.g. tomatoes, basil, mozzarella..."
                  aria-label="Add ingredient"
                  name="ingredient"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add Ingredient
              </button>
            </form>
          </div>

          {/* Ingredients List Component */}
          {ingredients.length > 0 && (
            <div className="w-full max-w-2xl mt-8">
              <IngredientsList
                ingredients={ingredients}
                getRecipe={getRecipe}
              />
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <span className="text-gray-600 font-medium">
                  Generating your recipe...
                </span>
              </div>
            </div>
          )}

          {/* Recipe Component */}
          {recipe && !isLoading && (
            <div className="w-full max-w-4xl mt-8">
              <ClaudeRecipe recipe={recipe} />
            </div>
          )}

          {/* Empty State */}
          {ingredients.length === 0 && !recipe && (
            <div className="w-full max-w-2xl mt-8 text-center">
              <div className="bg-white/50 rounded-2xl p-8 border border-orange-100">
                <ChefHat className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Ready to Cook Something Amazing?
                </h3>
                <p className="text-gray-500">
                  Start by adding some ingredients you have on hand, and we'll
                  create a personalized recipe just for you!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
