# Generated by Django 5.0.6 on 2024-06-21 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetell', '0004_remove_trip_time_en_remove_trip_time_st_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='name',
            field=models.CharField(max_length=150),
        ),
    ]
