import { Participation } from './Participation';

/**
 * Represents a country's complete Olympic Games history.
 * Includes all participations across different Olympic editions.
 */
export interface Olympic {
  /** Unique identifier for the country */
  id: number;

  /** Name of the country */
  country: string;

  /** List of all Olympic Games participations for this country */
  participations: Participation[];
}
