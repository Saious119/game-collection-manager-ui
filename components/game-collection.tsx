"use client";

import { useState } from "react";
import { UserCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Game = {
  id: number;
  name: string;
  platform: string;
  releaseDate: string;
  metacriticScore: number;
  howLongToBeat: number;
};

type SortKey = keyof Omit<Game, "id">;

const initialGames: Game[] = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    platform: "Switch",
    releaseDate: "2017-03-03",
    metacriticScore: 97,
    howLongToBeat: 50,
  },
  {
    id: 2,
    name: "Red Dead Redemption 2",
    platform: "PS4",
    releaseDate: "2018-10-26",
    metacriticScore: 97,
    howLongToBeat: 50,
  },
  {
    id: 3,
    name: "Hades",
    platform: "PC",
    releaseDate: "2020-09-17",
    metacriticScore: 93,
    howLongToBeat: 21,
  },
];

export function GameCollection() {
  const [activeTab, setActiveTab] = useState("collection");
  const [games, setGames] = useState<Game[]>(initialGames);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedGames = [...games].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
    if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const handleAdd = () => {
    const newGame: Game = {
      id: games.length + 1,
      name: "New Game",
      platform: "Platform",
      releaseDate: "YYYY-MM-DD",
      metacriticScore: 0,
      howLongToBeat: 0,
    };
    setGames([...games, newGame]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="collection">Collection</TabsTrigger>
              <TabsTrigger value="queue">Queue</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>
          </Tabs>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab}>
          {["collection", "queue", "wishlist"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Name",
                        "Platform",
                        "Release Date",
                        "Critic Score",
                        "How Long To Beat",
                      ].map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() =>
                            handleSort(
                              header.toLowerCase().replace(/ /g, "") as SortKey
                            )
                          }
                        >
                          {header}
                        </th>
                      ))}
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedGames.map((game) => (
                      <tr key={game.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {game.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.platform}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.releaseDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.metacriticScore}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.howLongToBeat} hours
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            title="delete-button"
                            onClick={() => handleDelete(game.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-4">
          <Button onClick={handleAdd}>Add Game</Button>
        </div>
      </main>
    </div>
  );
}
