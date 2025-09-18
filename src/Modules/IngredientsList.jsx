import { ChefHat, Sparkles, ShoppingBasket, X } from "lucide-react";

export default function IngredientsList(props) {
  const ingredientsListItems = props.ingredients.map((ingredient, index) => (
    <li key={ingredient} className="group">
      <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-orange-100 hover:border-orange-200 hover:shadow-md transition-all duration-200">
        <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex-shrink-0"></div>
        <span className="text-gray-700 font-medium flex-grow capitalize">
          {ingredient}
        </span>
        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm font-bold">
          {index + 1}
        </div>
      </div>
    </li>
  ));

  return (
    <section className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl border border-orange-100 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
            <ShoppingBasket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Your Ingredients
            </h2>
            <p className="text-gray-500 text-sm">
              {props.ingredients.length} ingredient
              {props.ingredients.length !== 1 ? "s" : ""} ready to cook
            </p>
          </div>
        </div>

        {/* Ingredients List */}
        <ul className="space-y-3 mb-8" aria-live="polite">
          {ingredientsListItems}
        </ul>

        {/* Recipe Generation Section */}
        {props.ingredients.length > 0 && (
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6 border border-orange-200">
            {props.ingredients.length >= 3 ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Ready to Create Magic?
                  </h3>
                  <Sparkles className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-gray-600 mb-4 max-w-md mx-auto">
                  You have enough ingredients to create an amazing recipe! Let
                  our AI chef work its magic.
                </p>
                <button
                  onClick={props.getRecipe}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 mx-auto cursor-pointer"
                >
                  <ChefHat className="w-5 h-5" />
                  Generate Recipe
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Almost Ready!
                </h3>
                <p className="text-gray-500 text-sm">
                  Add {3 - props.ingredients.length} more ingredient
                  {3 - props.ingredients.length !== 1 ? "s" : ""} to generate
                  your recipe
                </p>
                <div className="flex justify-center mt-3">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < props.ingredients.length
                            ? "bg-orange-400"
                            : "bg-orange-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
