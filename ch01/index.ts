class Invitation {
  private when: Date;
}

class Ticket {
  private fee: number;

  public getFee(): number {
    return this.fee;
  }
}

class Bag {
  private amount: number;
  private invitation: Invitation;
  private ticket: Ticket;

  public hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    } else {
      this.setTicket(ticket);
      this.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }

  public hasInvitation(): boolean {
    return this.invitation != null;
  }

  public hasTicket(): boolean {
    return this.ticket != null;
  }

  public setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }

  public constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    if (invitation) {
      this.invitation = invitation;
    }
  }
}

class Audience {
  private bag: Bag;

  public constructor(bag: Bag) {
    this.bag = bag;
  }

  public getBag(): Bag {
    return this.bag;
  }

  public buy(ticket: Ticket): number {
    return this.bag.hold(ticket);
  }
}

class TicketOffice {
  private amount: number;
  private tickets: Ticket[] = [];

  public constructor(amount: number, ...tickets: Ticket[]) {
    this.amount = amount;
    this.tickets.push(...tickets);
  }

  public getTicket(): Ticket {
    return this.tickets.pop();
  }

  public sellTicketTo(audience: Audience): void {
    this.plusAmount(audience.buy(this.getTicket()));
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }
}

class TicketSeller {
  private ticketOffice: TicketOffice;

  public constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  public sellTo(audience: Audience): void {
    this.ticketOffice.sellTicketTo(audience);
  }
}

class Theater {
  private ticketSeller: TicketSeller;

  public constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    this.ticketSeller.sellTo(audience);
  }
}