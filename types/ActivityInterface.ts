export interface ActivityRights {
  planning_visible: number;
}

export interface ActivityUser {
  login: string;
  title: string;
  picture: string;
}

export interface ActivityRoom {
  code: string;
  type: string;
  seats: number;
}

export interface ActivityInterface {
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

export type ActivityProps = Pick<
  ActivityInterface,
  "id" | "end" | "start" | "title" | "acti_title" | "room" | "location"
>;
