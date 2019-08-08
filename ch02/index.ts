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
    return this.movie.calculateMovieFee(this).times(audienceCount);
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
  private audienceCount: number;;

  public constructor(customer: Customer, screening: Screening, fee: Money, audienceCount: number) {
    this.customer = customer;
    this.screening = screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }
}

class Duration {

}

class Movie {
  private title: string;
  private runningTime: Duration;
  private fee: Money;
  private discountPolicy: DiscountPolicy;

  public constructor(title: string, runningTime: Duration, fee: Money, discountPolicy: DiscountPolicy) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountPolicy = discountPolicy;
  }

  public getFee(): Money {
    return this.fee;
  }

  public calculateMovieFee(screening: Screening): Money {
    return this.fee.minus(this.discountPolicy.calculateDiscountAmount(screening));
  }
}

abstract class DiscountPolicy {
  private conditions: DiscountCondition[] = [];

  public constructor(...conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  public calculateDiscountAmount(screening: Screening) {
    for (const each of this.conditions) {
      if (each.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening);
      }
    }
    return Money.ZERO;
  }

  protected abstract getDiscountAmount(screening: Screening): Money;
}

interface DiscountCondition {
  isSatisfiedBy(screening: Screening): boolean;
}

class SequenceCondition implements DiscountCondition {
  private sequence: number;

  public constructor(sequence: number) {
    this.sequence = sequence;
  }

  public isSatisfiedBy(screening: Screening) {
    return screening.isSequence(this.sequence);
  }
}

class PeriodCondition implements DiscountCondition {
  private dayOfWeek: number;
  private startTime: Date;
  private endTime: Date;

  public constructor(dayOfWeek: number, startTime: Date, endTime: Date) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public isSatisfiedBy(screening: Screening): boolean {
    return (screening.getStartTime().getDay() === this.dayOfWeek) &&
      (this.startTime.getTime() - screening.getStartTime().getTime() <= 0) &&
      (this.endTime.getTime() - screening.getStartTime().getTime() >= 0);
  }
}

class AmountDiscountPolicy extends DiscountPolicy {
  private discountAmount: Money;

  public constructor(discountAmount: Money, ...conditions: DiscountCondition[]) {
    super(...conditions);
    this.discountAmount = discountAmount;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return this.discountAmount;
  }
}

class PercentDiscountPolicy extends DiscountPolicy {
  private percent: number;

  public constructor(percent: number, ...conditions: DiscountCondition[]) {
    super(...conditions);
    this.percent = percent;
  }

  protected getDiscountAmount(screening: Screening): Money {
    return screening.getMovieFee().times(this.percent);
  }
}