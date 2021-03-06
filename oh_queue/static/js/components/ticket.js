let Ticket = ({state, ticket}) => {
  let assignment = ticketAssignment(app.state, ticket);
  let location = ticketLocation(app.state, ticket);

  var status;
  if (ticket.status === 'pending') {
    status = ticketDisplayTime(ticket) + ' in ' + location.name;
  } else {
    if (isStaff(state)) {
      status = (isTicketHelper(state, ticket) ? 'You' : ticket.helper.name) + ' (Started helping ' + ticketTimeSinceAssigned(ticket)+ ')';
    } else {
      status = ticketStatus(state, ticket);
    }
  }

  var description;
  if (isStaff(state) || ticketIsMine(state, ticket)) {
    description = ticket.description;
  }

  let question = ticketQuestion(app.state, ticket);

  return (
    <TicketLink state={state} ticket={ticket}>
      <div className="pull-left ticket-index">{ticketPosition(state, ticket)}</div>
      <h4 className="pull-left">
        {assignment.name} {question}
        <br className="visible-xs" />
        <small className="visible-xs ticket-status-xs">{status}</small>
        <small className="visible-xs ticket-desc-xs">{description}</small>
        <small className="visible-xs ticket-created-xs">Ticket created: {ticketTimeAgo(ticket)}</small>
      </h4>
      <h4 className="pull-left hidden-xs ticket-desc-md "><small>{description}</small></h4>
      <h4 className="pull-left hidden-xs ticket-created-md "><small>Ticket created: {ticketTimeAgo(ticket)}</small></h4>
      <h4 className="pull-right hidden-xs ticket-status-md">
        <small>{status} {moment.duration(moment.utc().diff(moment.utc(ticket.created))).asDays() > 1 &&
        <span className="badge"> Old Ticket </span>}
        </small>
      </h4>

    </TicketLink>
  );
}

let TicketLink = ({state, ticket, children}) => {
  var {Link} = ReactRouterDOM;
  let highlight = ticketIsMine(state, ticket) || isTicketHelper(state, ticket);
  let link = ticketIsMine(state, ticket) || isStaff(state);
  let ticketClass = classNames({
    'ticket-row': true,
    'clearfix': true,
    'ticket-link': link,
    'ticket-highlight': highlight,
  });
  if (link) {
    return (
      <div className={ticketClass}>
        <Link to={`/tickets/${ticket.id}`} className="clearfix">
          {children}
        </Link>
      </div>
    );
  } else {
    return (
      <div className={ticketClass}>
        {children}
      </div>
    );
  }
}
