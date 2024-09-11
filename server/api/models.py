from django.db import models


class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)


class Room(models.Model):
    name = models.CharField(max_length=100)
    night_price = models.DecimalField(max_digits=10, decimal_places=2)


class Reservation(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    checked_in = models.DateTimeField(null=True)
    checked_out = models.DateTimeField(null=True)
