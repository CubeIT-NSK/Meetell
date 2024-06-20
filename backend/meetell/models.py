from django.db import models


class SexSelection(models.TextChoices):
    MEN = 'M', 'Men'
    WOMEN = 'W', 'Woman'
    ALL = 'A', 'All'

class StateSelection(models.TextChoices):
    WAIT = 'W', 'Waiting'
    NO = 'N', 'No'
    YES = 'Y', 'Yes'
    RATE = 'R', 'Rate'
    END = 'E', 'End'

class FAQ(models.Model):
    question = models.CharField(max_length=250)
    answer = models.TextField()

class User(models.Model):
    tg_id = models.BigIntegerField(primary_key=True)
    user_name = models.CharField(max_length=33)
    level = models.ForeignKey('Level', on_delete=models.CASCADE, default='1')
    distance = models.FloatField(default=0.0)
    name = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(default=None, blank=True, null=True)
    sex = models.CharField(max_length=1, choices=SexSelection.choices, default=None)
    ratting = models.FloatField(default=0.0)

class PhotoUser(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    photo = models.TextField()

class Friend(models.Model):
    first_friend = models.ForeignKey('User', on_delete=models.CASCADE, related_name="first")
    second_friend = models.ForeignKey('User', on_delete=models.CASCADE, related_name="second")

class Trip(models.Model):
    date = models.DateField()
    name = models.CharField(max_length=100)
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    time_st = models.TimeField()
    time_en = models.TimeField()
    sex = models.CharField(max_length=1, choices=SexSelection.choices)
    year_st = models.PositiveSmallIntegerField()
    year_en = models.PositiveSmallIntegerField()
    time_sp = models.PositiveSmallIntegerField()
    distance = models.FloatField()
    ratting = models.FloatField(default=0.0)

class TripUser(models.Model):
    trip = models.ForeignKey('Trip', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    rate_user = models.PositiveSmallIntegerField()
    state = models.CharField(max_length=1, 
                             choices=StateSelection.choices, 
                             default=StateSelection.WAIT)

class City(models.Model):
    name = models.CharField(max_length=20)

class Level(models.Model):
    name = models.CharField(max_length=20)
    max_distance = models.FloatField()
