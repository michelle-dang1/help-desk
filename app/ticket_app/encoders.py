from api.common.json import ModelEncoder
from .models import Ticket, TicketResponse

class TicketEncoder(ModelEncoder):
    model = Ticket
    properties = [
        "name",
        "email",
        "description",
        "status",
        "id",
    ]

class TicketResponseEncoder(ModelEncoder):
    model = TicketResponse
    properties = [
        "ticket",
        "response_text",
        "id",
    ]
    encoders={
        "ticket": TicketEncoder(),
    }
