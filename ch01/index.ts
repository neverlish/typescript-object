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

  public getTicketOffice(): TicketOffice {
    return this.ticketOffice;
  }
}

class Theater {
  private ticketSeller: TicketSeller;

  public constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    if (audience.getBag().hasInvitation()) {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }
}