import { Genre } from './genre-model';
import { InvolvedCompanies } from './involved-companies-model';
import { MultiplayerModes } from './multiplayer-modes-model';
import { Platforms } from './platforms-model';
import { ReleaseDates } from './release-dates-model';

export interface Game {
  id: number;
  aggregated_rating: number;
  cover: number;
  genres: Genre[];
  involved_companies: InvolvedCompanies[];
  multiplayer_modes: number[];
  name: string;
  platforms: Platforms[];
  release_dates: ReleaseDates[];
  summary: string;
  multiplayer_mode_flags: MultiplayerModes;
  howLongToBeat: number;
  status: string;
}
