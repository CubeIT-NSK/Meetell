# Generated by Django 5.0.6 on 2024-05-28 03:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=250)),
                ('answer', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('max_distance', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Trip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('name', models.CharField(max_length=100)),
                ('time_st', models.TimeField()),
                ('time_en', models.TimeField()),
                ('sex', models.CharField(choices=[('M', 'Men'), ('W', 'Woman'), ('A', 'All')], max_length=1)),
                ('year_st', models.PositiveSmallIntegerField()),
                ('year_en', models.PositiveSmallIntegerField()),
                ('time_sp', models.PositiveSmallIntegerField()),
                ('distance', models.FloatField()),
                ('ratting', models.FloatField(default=0.0)),
                ('city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetell.city')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('tg_id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=33)),
                ('distance', models.FloatField(default=0.0)),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('birthday', models.DateField(blank=True, default=None, null=True)),
                ('sex', models.CharField(choices=[('M', 'Men'), ('W', 'Woman'), ('A', 'All')], default=None, max_length=1)),
                ('ratting', models.FloatField(default=0.0)),
                ('level', models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='meetell.level')),
            ],
        ),
        migrations.CreateModel(
            name='TripUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate_user', models.PositiveSmallIntegerField()),
                ('state', models.CharField(choices=[('W', 'Waiting'), ('N', 'No'), ('Y', 'Yes'), ('R', 'Rate'), ('E', 'End')], default='W', max_length=1)),
                ('trip', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetell.trip')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetell.user')),
            ],
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_friend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='first', to='meetell.user')),
                ('second_friend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='second', to='meetell.user')),
            ],
        ),
    ]