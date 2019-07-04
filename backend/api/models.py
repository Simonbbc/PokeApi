from django.db import models
import uuid


class Types(models.Model):
    name = models.CharField(max_length=250)


class Evolution(models.Model):
    pre_evolution_key = models.CharField(max_length=250)
    next_evolution_key = models.CharField(max_length=250)
    method = models.CharField(max_length=250)
    level = models.IntegerField()


class Pokemon(models.Model):
    id = models.CharField(primary_key=True, default=uuid.uuid4, editable=False, max_length=250)
    number = models.IntegerField()
    name = models.CharField(max_length=250)
    image = models.CharField(max_length=300)
    description = models.TextField()
    types = models.ManyToManyField(Types)
    evolutions = models.ManyToManyField(Evolution)
