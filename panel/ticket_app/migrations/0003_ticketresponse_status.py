# Generated by Django 5.0.4 on 2024-04-11 21:29

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("ticket_app", "0002_ticketresponse"),
    ]

    operations = [
        migrations.AddField(
            model_name="ticketresponse",
            name="status",
            field=models.CharField(
                choices=[
                    ("new", "New"),
                    ("in_progress", "In Progress"),
                    ("resolved", "Resolved"),
                ],
                default="new",
                max_length=20,
            ),
        ),
    ]
