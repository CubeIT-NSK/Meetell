# Generated by Django 5.0.6 on 2024-06-21 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetell', '0002_photouser'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='chat_link',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]
