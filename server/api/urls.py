from django.urls import include, path
from rest_framework import routers

from .views import CustomersViewSet, ReservationsViewSet, RoomsViewSet

router = routers.DefaultRouter()
router.register(r"customers", CustomersViewSet, basename="customers")
router.register(r"rooms", RoomsViewSet, basename="rooms")
router.register(r"reservations", ReservationsViewSet, basename="reservations")

app = "api"

urlpatterns = [
    path("v1/", include(router.urls)),
]
