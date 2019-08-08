class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getStartTime(): Date {
    return this.whenScreened;
  }

  public isSequence(sequence: number): boolean {
    return this.sequence == sequence;
  }

  public getMovieFee(): Money {
    return this.movie.getFee();
  }
}