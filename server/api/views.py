# these imports are left here as a hint to get you started
from django.db.models import Sum
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer, Reservation, Room
from datetime import datetime
from .serializers import CustomerSerializer, ReservationSerializer, RoomSerializer , ReservationWriteSerializer


# TODO: 3
# Define a new class CustomersViewSet.
# Set the queryset attribute to retrieve all Customer objects.
# Set the serializer_class attribute to use the serializers you've created earlier.

# Use the @action decorator from Django REST Framework to add a custom action to the CustomersViewSet.
# The @action decorator should be applied to a method that handles GET requests and retrieves reservations for a specific customer.
# NOTE: the function must be named reservations
# Set the detail parameter to True to indicate that this action is specific to a single customer instance.
# The method should:
# Accept the request and primary key (pk) of the customer.
# Use the pk to filter Reservation objects associated with the customer.
# Serialize the filtered reservations using the reservation serializer you've created.
# Return the serialized data in the response.

# Difficulty Rating:

# Easy for basic CRUD tests (many queries).
# Hard for performance optimization (one query).


class CustomersViewSet(viewsets.ModelViewSet):
    
    
    queryset  = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    @action(detail=True, methods=['get'])
    def reservations(self , request , pk=None):
        reservation = Reservation.objects.filter(customer_id = pk)
        serializer = ReservationSerializer(reservation, many=True)
        print(serializer.data)
        return Response(serializer.data)
        
        



# TODO: 4
# Create a new class ReservationsViewSet.
# Set the queryset attribute to fetch all Reservation objects.
# Assign the appropriate serializer class to the serializer_class attribute.

# Use the @action decorator to add a custom action to the viewset.
# Implement a method to calculate and return the total revenue.
# NOTE: the method must be named total_revenue and it should return a response matching the following format:
# {"total_revenue": some_number}
# The method should:
# Filter reservations to include only those that have been checked out.
# Aggregate the total price of these reservations.

# Difficulty Rating:

# Easy for basic CRUD tests (many queries).
# Medium for aggregations (one or more queries).
# Hard for performance optimization (one query with aggregation).


class ReservationsViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    
    @action(detail=False, methods=['get'])
    def total_revenue(self , request):
        
        checked_out_reservations = Reservation.objects.filter(checked_out = True)

        total_revenue = checked_out_reservations.aggregate(total=Sum('price'))['total'] or 0
        return Response({"total_revenue": total_revenue})
    
class ReservationCreateUpdateViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationWriteSerializer
    
# TODO: 5
# Create a new class RoomsViewSet.
# Set the queryset attribute to fetch all Room objects.
# Assign the appropriate serializer class to the serializer_class attribute.
# Use the @action decorator to add two custom actions to the viewset.
# Implement the occupied Action
# NOTE: the method must be named occupied
# Create a method to list rooms currently occupied on the current date use timezoned date.
# The method should:
# Get the current date using Django's timezone.now().
# Filter rooms based on reservation dates that overlap with the current date and where the room hasn't been checked out.
# Serialize the filtered room data and return it in the response.

# Difficulty Rating:

# Easy for basic CRUD tests (many queries).
# Medium for performance optimization (one query with distinct).

# Implement the available Action
# NOTE: the method must be named available
# Create a method to list rooms available within a specified date range.
# The method should:
# Retrieve the start_date and end_date from the query parameters of the request.
# Check if both dates are provided, and if not, return an error response.
# Parse the dates using the expected format (DD-MM-YYYY).
# Exclude rooms that are reserved during the specified date range and where the room hasn't been checked out.
# Serialize the filtered room data and return it in the response.

# Difficulty Rating:

# Easy for basic CRUD tests (many queries).
# Medium for performance optimization (one query with distinct).
class RoomsViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=False, methods=['get'], url_path='occupied')
    def occupied(self,request):
        current_date = timezone.now().date()
        occupied_rooms = Room.objects.filter(
            reservation__start_date__lte=current_date,
            reservation__end_date__gte=current_date,
            reservation__checked_out=False
        ).distinct()
        serializer = RoomSerializer(occupied_rooms, many=True)
        return Response(serializer.data)
    @action(detail=False, methods=['get'], url_path='available')
    def available(self, request):
        
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')
        if not start_date_str or not end_date_str:
            return Response({
                "error":"The check-in date or check-out date must be provided"
            })
        try:
            start_date = datetime.strptime(start_date_str, '%d-%m-%Y').date()
            end_date = datetime.strptime(end_date_str, '%d-%m-%Y').date()
        except ValueError:
            return Response({
                "error":"Invalid date format. Please use DD-MM-YYYY"
            })
        available_rooms = Room.objects.exclude(
            reservation__start_date__lte=end_date,
            reservation__end_date__gte=start_date,
            reservation__checked_out=False
        ).distinct()

        serializer = RoomSerializer(available_rooms, many=True)
        return Response(serializer.data)
        
       
        