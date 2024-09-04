import pytest

from api.models import Customer, Reservation, Room


@pytest.mark.django_db()
def test_get_reservations(client):
    response = client.get(
        "/api/v1/reservations/",
        content_type="application/json",
    )
    assert response.status_code == 200
    assert len(response.json()) >= 25


@pytest.mark.django_db()
def test_get_reservation(client):
    reservation = Reservation.objects.create(
        customer=Customer.objects.create(
            name="great customer",
            phone="1234567890",
        ),
        room=Room.objects.create(
            name="Single Room 101",
            night_price="50.00",
        ),
        start_date="2024-10-10",
        end_date="2024-10-12",
        total_price="100.00",
    )

    response = client.get(
        f"/api/v1/reservations/{reservation.id}/",
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json() == {
        "id": reservation.id,
        "customer": reservation.customer.id,
        "room": reservation.room.id,
        "start_date": "2024-10-10",
        "end_date": "2024-10-12",
        "total_price": "100.00",
        "checked_in": None,
        "checked_out": None,
    }


@pytest.mark.django_db()
def test_create_reservation(client):
    response = client.post(
        "/api/v1/reservations/",
        {
            "customer": 1,
            "room": 1,
            "start_date": "2024-10-10",
            "end_date": "2024-10-12",
            "total_price": "100.00",
            "checked_in": None,
            "checked_out": None,
        },
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.json()["id"]
    assert response.json()["customer"] == 1
    assert response.json()["room"] == 1
    assert response.json()["start_date"] == "2024-10-10"
    assert response.json()["end_date"] == "2024-10-12"


@pytest.mark.django_db()
def test_delete_reservation(client):
    reservation = Reservation.objects.create(
        customer=Customer.objects.create(
            name="great customer",
            phone="1234567890",
        ),
        room=Room.objects.create(
            name="Single Room 101",
            night_price="50.00",
        ),
        start_date="2024-10-10",
        end_date="2024-10-12",
        total_price="100.00",
    )

    response = client.delete(
        f"/api/v1/reservations/{reservation.id}/",
        content_type="application/json",
    )

    assert response.status_code == 204


@pytest.mark.django_db()
def test_update_reservation(client):
    reservation = Reservation.objects.create(
        customer=Customer.objects.create(
            name="great customer",
            phone="1234567890",
        ),
        room=Room.objects.create(
            name="Single Room 101",
            night_price="50.00",
        ),
        start_date="2024-10-11",
        end_date="2024-10-12",
        total_price="100.00",
    )

    response = client.patch(
        f"/api/v1/reservations/{reservation.id}/",
        {
            "customer": 1,
            "room": 1,
            "start_date": "2024-10-10",
            "end_date": "2024-10-12",
            "total_price": "100.00",
            "checked_in": None,
            "checked_out": None,
        },
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json()["id"] == reservation.id
    assert response.json()["customer"] == 1
    assert response.json()["room"] == 1
    assert response.json()["start_date"] == "2024-10-10"
    assert response.json()["end_date"] == "2024-10-12"


@pytest.mark.django_db()
def test_get_total_revenue(client):
    response = client.get(
        "/api/v1/reservations/total_revenue/",
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json() == {"total_revenue": 490.00}
