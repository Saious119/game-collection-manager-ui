"use client";

import { useEffect, useState } from "react";
import { UserCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Game } from "@/models/game-model";
import axios from "axios";
import { LoadingSpinner } from "./ui/spinner";
import NewGameDialog from "./new-game-dialog";

type SortKey = keyof Omit<Game, "id">;

export function GameCollection() {
  const [activeTab, setActiveTab] = useState("collection");
  //const [games, setGames] = useState<Game[]>(initialGames);
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>(null);

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://localhost:5001/GameCollection/GetCollection/test")
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

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

  const handleDelete = (game: Game) => {
    axios
      .post(
        "https://localhost:5001/GameCollection/DeleteGame?user=test",
        game,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res2) => {
        console.log(res2);
      })
      .catch((error) => {
        console.error("There was an error adding a game!", error);
      });
    //setGames(games.filter((game) => game.id !== id));
  };

  // const handleAdd = () => {
  //   const newGame: Game = {
  //     id: games.length + 1,
  //     name: "New Game",
  //     metacriticScore: 0,
  //     howLongToBeat: 0,
  //   };
  //   setGames([...games, newGame]);
  // };

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
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.platforms[0]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {game.release_dates[0]}
                        </td> */}
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
                            onClick={() => handleDelete(game)}
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
          {/* <Button onClick={openAddDialog}>Add Game</Button> */}
          <NewGameDialog></NewGameDialog>
        </div>
      </main>
    </div>
  );
}
