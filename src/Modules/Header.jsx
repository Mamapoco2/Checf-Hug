import { ChefHat } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-orange-200 py-6">
      <div className="flex justify-center items-center gap-3">
        <ChefHat className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-800">Chef Hug</h1>
      </div>
    </header>
  );
}
