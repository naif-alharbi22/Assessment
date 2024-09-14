from rest_framework import serializers
from .models import Customer, Reservation, Room

# TODO: 2
# Create a serializer for each model
# Serialize all the models' fields

# model Customer
class CustomerSerializer(serializers.ModelSerializer):
    class Mete:
        model = Customer
        fields = '__all__'


# model Reservation
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
        
# model Room 
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        