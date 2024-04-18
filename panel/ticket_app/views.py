from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
from .models import Ticket, TicketResponse
from .encoders import TicketEncoder, TicketResponseEncoder
import json

# List and create ticket
@require_http_methods(["GET", "POST"])
def ticket(request):
    if request.method == "GET":
        ticket = Ticket.objects.all()
        return JsonResponse(
            {"tickets": ticket},
            encoder=TicketEncoder,
        )
    # POST method
    else:
        try:
            content = json.loads(request.body)
            ticket = Ticket.objects.create(**content)
            return JsonResponse(
                ticket,
                encoder=TicketEncoder,
                safe=False,
            )    
        except:
            return JsonResponse(
                {"message": "Couldn't create help desk ticket"}
            )

# Ticket details, delete, and edit
@require_http_methods(["GET", "DELETE", "PUT"])
def ticket_details(request, id):
    if request.method == "GET":
        try:
            ticket = Ticket.objects.get(id=id)
            return JsonResponse(
                ticket,
                encoder=TicketEncoder,
                safe=False,
            )
        except Ticket.DoesNotExist:
            return JsonResponse(
                {"message: Ticket does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            ticket = Ticket.objects.get(id=id).delete()
            return JsonResponse(
                ticket,
                encoder=TicketEncoder,
                safe=False,
            )
        except Ticket.DoesNotExist:
            return JsonResponse(
                {"message": "Ticket does not exist"},
                status=400
            )
    else:
        try:
            content = json.loads(request.body)
            Ticket.objects.filter(id=id).update(**content)
            ticket = Ticket.objects.get(id=id)
            return JsonResponse(
                ticket,
                encoder=TicketEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not update ticket"}
            )

# List ticket responses
@require_http_methods(["GET"])
def ticket_response(request):
    if request.method == "GET":
        ticket_response = TicketResponse.objects.all()
        return JsonResponse(
            {"ticket_responses": ticket_response},
            encoder=TicketResponseEncoder,
        )

# Respond to specific ticket
@require_http_methods(["GET", "DELETE", "PUT"])
def ticket_response_id(request, id):
    if request.method == "GET":
        try:
            ticket_response = TicketResponse.objects.get(id=id)
            return JsonResponse(
                ticket_response,
                encoder=TicketResponseEncoder,
                safe=False,
            )
        except TicketResponse.DoesNotExist:
            return JsonResponse(
                {"message: Ticket does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            ticket_response = TicketResponse.objects.get(id=id).delete()
            return JsonResponse(
                ticket_response,
                encoder=TicketResponseEncoder,
                safe=False,
            )
        except TicketResponse.DoesNotExist:
            return JsonResponse(
                {"message": "Ticket response does not exist"},
                status=400
            )
    else:
        try:
            content = json.loads(request.body)
            TicketResponse.objects.filter(id=id).update(**content)
            ticket_response = TicketResponse.objects.get(id=id)
            return JsonResponse(
                ticket_response,
                encoder=TicketResponseEncoder,
                safe=False
            )
        except:
            return JsonResponse(
                {"message": "Could not update ticket"}
            )

# Create responses to help tickets
@require_http_methods(["POST"])
def create_ticket_response(request, ticket_id):
    if request.method == 'POST':
        content = json.loads(request.body)
        ticket = get_object_or_404(Ticket, id=ticket_id)
        response_text = TicketResponse.objects.create(ticket=ticket, response_text=content['response_text'])
        return JsonResponse(
            response_text,
            encoder=TicketResponseEncoder,
            safe=False
        )
    else:
        return JsonResponse({"message": "Couldn't create response"})
