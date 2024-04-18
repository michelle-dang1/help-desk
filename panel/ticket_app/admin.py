from django.contrib import admin
from .models import Ticket, TicketResponse

# Register your models here.
@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    pass

@admin.register(TicketResponse)
class TicketResponseAdmin(admin.ModelAdmin):
    pass
