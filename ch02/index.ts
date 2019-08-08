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

  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation(customer, this, this.calculateFee(audienceCount), audienceCount);
  }

  private calculateFee(audienceCount: number): Money {
    return this.movie.calculateMovie(this).times(audienceCount);
  }
}

class Customer {

}

class Money {
  public static ZERO: Money = Money.wons(0);

  private amount: number;

  public static wons(amount: number): Money {
    return new Money(amount);
  }

  constructor(amount: number) {
    this.amount = amount;
  }

  public plus(amount: Money): Money {
    return new Money(this.amount + amount.amount);
  }

  public minus(amount: Money): Money {
    return new Money(this.amount - amount.amount);
  }

  public times(percent: number) {
    return new Money(this.amount * percent);
  }

  public isLessThan(other: Money): boolean {
    return this.amount < other.amount;
  }

  public isGreaterThanOrEqual(other: Money): boolean {
    return this.amount >= other.amount;
  }
}

class Reservation {
  private customer: Customer;
  private screening: Screening;
  private fee: Money;
  private audienceCount: number;

  public constructor(customer: Customer, screening: Screening, fee: Money, audienceCount: number) {
    this.customer = customer;
    this.screening = screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }
}