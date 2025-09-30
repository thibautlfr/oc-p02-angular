/**
 * Represents a country's participation in a specific Olympic Games edition.
 * Contains performance metrics including medals won and athletes sent.
 */
export interface Participation {
  /** Unique identifier for this participation record */
  id: number;

  /** Year when the Olympic Games took place */
  year: number;

  /** Host city of the Olympic Games */
  city: string;

  /** Total number of medals won by the country in this edition */
  medalsCount: number;

  /** Total number of athletes representing the country in this edition */
  athleteCount: number;
}
