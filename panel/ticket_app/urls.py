from django.urls import path
from .views import *

urlpatterns = [
    path("tickets/", ticket, name="ticket"),
    path("tickets/<int:id>/", ticket_details, name="ticket_details"),
    path("admin_panel/", ticket_response, name="ticket_response"),
    path("admin_panel/<int:id>/", ticket_response_id, name="ticket_response_id"),
    path("tickets/<int:ticket_id>/response/", create_ticket_response, name='create_ticket_response'),

]
