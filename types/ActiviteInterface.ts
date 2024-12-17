/**
 * Représente les droits associés à une activité.
 */
export interface ActivityRights {
  planning_visible: number;
}

/**
 * Représente un utilisateur (propriétaire ou créateur) d'une activité.
 */
export interface ActivityUser {
  login: string;
  title: string;
  picture: string;
}

/**
 * Représente une salle associée à une activité.
 */
export interface ActivityRoom {
  code: string;
  type: string;
  seats: number;
}

/**
 * Interface principale représentant une activité telle qu'elle est reçue du serveur.
 */
export interface ActiviteInterface {
  id: number;
  id_calendar: number;
  calendar_type: string;
  weeks_left: number;
  type: string;
  location: string;
  type_room: string;
  title: string;
  acti_title: string;
  has_to_rate: boolean;
  event_registered: null;
  registered: number;
  rating_event: null;
  start: string;
  end: string;
  description: string;
  nb_place: number;
  color: string;
  confirm_owner: boolean;
  confirm_maker: boolean;
  id_owner: number;
  id_maker: number;
  duration: string;
  rights: ActivityRights;
  nb_rated: number;
  owner: ActivityUser;
  maker: ActivityUser;
  room: ActivityRoom;
}

/**
 * Type utilitaire pour extraire les propriétés nécessaires de ActiviteInterface
 * pour créer une instance de la classe Activite.
 */
export type ActiviteProps = Pick<
  ActiviteInterface,
  "id" | "end" | "start" | "title" | "acti_title" | "room" | "location"
>;
