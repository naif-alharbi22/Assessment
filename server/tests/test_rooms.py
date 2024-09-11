import pytest
import time_machine

from api.models import Room


@pytest.mark.django_db()
def test_get_rooms(client):
    response = client.get(
        "/api/v1/rooms/",
        content_type="application/json",
    )

    assert response.status_code == 200
    assert len(response.json()) >= 5


@pytest.mark.django_db()
def test_get_room(client):
    room = Room.objects.create(
        name="Single Room 101",
        night_price="50.00",
    )

    response = client.get(
        f"/api/v1/rooms/{room.id}/",
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json() == {
        "id": room.id,
        "name": "Single Room 101",
        "night_price": "50.00",
    }


@pytest.mark.django_db()
def test_create_room(client):
    response = client.post(
        "/api/v1/rooms/",
        {
            "name": "Single Room 101",
            "night_price": "50.00",
        },
        content_type="application/json",
    )

    assert response.status_code == 201
    assert response.json()["id"]
    assert response.json()["name"] == "Single Room 101"
    assert response.json()["night_price"] == "50.00"


@pytest.mark.django_db()
def test_delete_room(client):
    room = Room.objects.create(
        name="Single Room 101",
        night_price="50.00",
    )

    response = client.delete(
        f"/api/v1/rooms/{room.id}/",
        content_type="application/json",
    )

    assert response.status_code == 204


@pytest.mark.django_db()
def test_update_room(client):
    room = Room.objects.create(
        name="Single Room 101",
        night_price="50.00",
    )

    response = client.patch(
        f"/api/v1/rooms/{room.id}/",
        {
            "name": "Single Room 1022",
            "night_price": "50.00",
        },
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json()["id"] == room.id
    assert response.json()["name"] == "Single Room 1022"
    assert response.json()["night_price"] == "50.00"


@pytest.mark.django_db()
def test_get_currently_occupied_rooms(client):
    with time_machine.travel("2024-09-11T14:26:39"):
        response = client.get(
            "/api/v1/rooms/occupied/",
            content_type="application/json",
        )
        assert len(response.json()) == 1
        assert response.json() == [
            {"id": 3, "name": "Suite 301", "night_price": "120.00"}
        ]
        assert response.status_code == 200


@pytest.mark.django_db()
def test_get_currently_occupied_rooms_in_one_query(
    client, django_assert_max_num_queries
):
    with time_machine.travel("2024-09-11T14:26:39"):
        with django_assert_max_num_queries(1):
            response = client.get(
                "/api/v1/rooms/occupied/",
                content_type="application/json",
            )
            assert len(response.json()) == 1
            assert response.json() == [
                {"id": 3, "name": "Suite 301", "night_price": "120.00"}
            ]
            assert response.status_code == 200


@pytest.mark.django_db()
def test_get_available_rooms_in_date_range(client):
    response = client.get(
        "/api/v1/rooms/available/",
        {
            "end_date": "28-12-2024",
            "start_date": "10-12-2024",
        },
        content_type="application/json",
    )

    assert response.status_code == 200
    assert response.json() == [
        {"id": 1, "name": "Single Room 101", "night_price": "50.00"},
        {"id": 2, "name": "Double Room 201", "night_price": "80.00"},
        {"id": 3, "name": "Suite 301", "night_price": "120.00"},
        {"id": 4, "name": "Family Room 401", "night_price": "150.00"},
        {"id": 5, "name": "Penthouse 501", "night_price": "200.00"},
    ]


@pytest.mark.django_db()
def test_get_available_rooms_in_date_range_in_one_query(
    client, django_assert_max_num_queries
):
    with django_assert_max_num_queries(1):
        response = client.get(
            "/api/v1/rooms/available/",
            {
                "end_date": "28-12-2024",
                "start_date": "10-12-2024",
            },
            content_type="application/json",
        )

        assert response.status_code == 200
        assert response.json() == [
            {"id": 1, "name": "Single Room 101", "night_price": "50.00"},
            {"id": 2, "name": "Double Room 201", "night_price": "80.00"},
            {"id": 3, "name": "Suite 301", "night_price": "120.00"},
            {"id": 4, "name": "Family Room 401", "night_price": "150.00"},
            {"id": 5, "name": "Penthouse 501", "night_price": "200.00"},
        ]
