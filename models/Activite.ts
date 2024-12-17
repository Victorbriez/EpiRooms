import { ActiviteProps } from "@/types/ActiviteInterface";

export class Activite {
  readonly id: number;
  readonly end: Date;
  readonly start: Date;
  readonly title: string;
  readonly roomCode: string;

  constructor(props: ActiviteProps) {
    this.id = props.id;
    this.end = new Date(props.end);
    this.start = new Date(props.start);
    this.title = props.acti_title ?? props.title ?? "N/A";
    this.roomCode = props.room?.code ?? props.location ?? "N/A";
  }

  getDurationInMinutes(): number {
    return (this.end.getTime() - this.start.getTime()) / 60000;
  }

  isOngoing(date: Date = new Date()): boolean {
    return date >= this.start && date <= this.end;
  }

  toString(): string {
    return `Activité: ${this.title} (ID: ${this.id}) - Salle: ${
      this.roomCode
    } - Début: ${this.start.toLocaleString()} - Fin: ${this.end.toLocaleString()}`;
  }
}
