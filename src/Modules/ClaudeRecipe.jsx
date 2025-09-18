import ReactMarkdown from "react-markdown";
import { ChefHat, Clock, Users, Star } from "lucide-react";

export default function ClaudeRecipe({ recipe }) {
  return (
    <section
      className="w-full bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl border border-orange-100 overflow-hidden"
      aria-live="polite"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
        <div className="flex items-center justify-center gap-3 text-white">
          <ChefHat className="w-8 h-8" />
          <h2 className="text-2xl md:text-3xl font-bold">
            Chef Claude Recommends
          </h2>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-8">
        {/* Markdown Content */}
        <ReactMarkdown
          className="prose prose-lg max-w-none 
            prose-headings:text-gray-800 prose-headings:font-bold
            prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-orange-800 prose-h1:border-b prose-h1:border-orange-200 prose-h1:pb-2
            prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-orange-700 prose-h2:flex prose-h2:items-center prose-h2:gap-2
            prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-orange-600
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-ul:space-y-2 prose-ol:space-y-2
            prose-li:text-gray-700 prose-li:marker:text-orange-500
            prose-strong:text-gray-800 prose-strong:font-semibold
            prose-code:bg-orange-100 prose-code:text-orange-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-blockquote:border-l-4 prose-blockquote:border-orange-300 prose-blockquote:bg-orange-50 prose-blockquote:pl-4 prose-blockquote:italic"
        >
          {recipe}
        </ReactMarkdown>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-orange-200 text-center">
          <div className="flex items-center justify-center gap-1 mt-2">
            <span className="text-sm text-gray-500">Powered by</span>
            <ChefHat className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">AI Chef</span>
          </div>
        </div>
      </div>
    </section>
  );
}
