"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { error } from "console";
import { Game } from "@/models/game-model";

export default function NewGameDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [response, setResponse] = useState(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const encodedGameName = encodeURIComponent(formData.title);
    e.preventDefault();
    try {
      const gameInfoRequest = await axios
        .get("https://localhost:5001/IGDB/GetGameInfo/" + encodedGameName)
        .then((res) => {
          res.data.status = "new";
          setResponse(res.data);
          console.log(res.data);
          axios
            .post(
              "https://localhost:5001/GameCollection/AddNewGame?user=test",
              res.data,
              { headers: { "Content-Type": "application/json" } }
            )
            .then((res2) => {
              console.log(res2);
              setResponse(res2.data);
            })
            .catch((error) => {
              console.error("There was an error adding a game!", error);
            });
        })
        .catch((error) => {
          console.error("There was an error Getting the game info!", error);
        });
      console.log("Event submitted");
      setOpen(false);
      // Reset form data after submission
      setFormData({ title: "" });
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Schedule Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Schedule New Event</DialogTitle>
          <DialogDescription>
            Enter the event title and release date. Click submit when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
