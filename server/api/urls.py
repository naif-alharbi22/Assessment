from django.urls import include, path
from rest_framework import routers

from .views import CustomersViewSet, ReservationsViewSet, RoomsViewSet , ReservationCreateUpdateViewSet

router = routers.DefaultRouter()
router.register(r"customers", CustomersViewSet, basename="customers")
router.register(r"rooms", RoomsViewSet, basename="rooms")
router.register(r"reservations", ReservationsViewSet, basename="reservations")
router.register(r"WriteReservations", ReservationCreateUpdateViewSet, basename="WriteReservations")

app = "api"

urlpatterns = [
    path("v1/", include(router.urls)),
]
