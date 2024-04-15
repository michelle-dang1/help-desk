from django.db import models

# Ticket model
class Ticket(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254)
    description = models.TextField()
    STATUS_CHOICES = (
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')

    def __str__(self):
        return self.name
    
# Ticket response model
class TicketResponse(models.Model):
    ticket = models.ForeignKey(
        Ticket,
        related_name="responses",
        on_delete=models.CASCADE,
    )
    response_text = models.TextField()
    
    def __str__(self):
        return self.ticket.name

    
