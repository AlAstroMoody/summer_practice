from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class PlacesAPITests(APITestCase):
    def setUp(self):
        # get actual tokens
        url = reverse('users-list')
        first_user = {'username': 'FirstName', 'password': 'FirstPassword'}
        second_user = {'username': 'SecondTestName', 'password': 'SecondPassword'}
        response = self.client.post(url, first_user, format='json')
        self.token = response.data['user']['token']
        response = self.client.post(url, second_user, format='json')
        self.token_two = response.data['user']['token']

        self.data_place = {'title': 'Horns and hooves', 'opening_time': '09:00',
                           'address': 'Москва Красная площадь', 'closing_time': '21:00'}
        self.data_ingredient = {'title': 'Cookies', 'calories': '100'}
        self.url_ingredient_pk = '/api/ingredients/1/'

        self.url_place = reverse('places-list')
        self.url_ingredient = reverse('ingredients-list')
        self.url_dish = reverse('dishes-list')

        # the owner creates a new place
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token}')
        response = self.client.post(self.url_place, self.data_place, format='json')
        pk_place = response.data['id']
        self.url_place_pk = f'/api/places/{pk_place}/'

        # the owner creates a new dish
        self.data_dish = {'title': 'Ordinary cookies', 'price': 100, 'ingredients': [1], 'place': pk_place}
        response = self.client.post(self.url_dish, self.data_dish, format='json')
        pk_dish = response.data['id']
        self.url_dish_pk = f'/api/dishes/{pk_dish}/'

    def test_get_request(self):
        """
        GET-requests allowed for all
        """
        self.client.credentials()
        response = self.client.get(self.url_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.url_place_pk, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.url_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.url_dish_pk, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.url_ingredient, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(self.url_ingredient_pk, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_by_place_or_ingredients_with_token(self):
        """
        by POST request to /api/places and / api/ingredients
        returns 201 only if the authorization request header is specified:
        Token <token>
        """
        self.client.credentials()
        # request to place without a token in the header
        response = self.client.post(self.url_place, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # request to ingredient without a token in the header
        response = self.client.post(self.url_ingredient, self.data_ingredient, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # add token in header
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token}')

        # request to the place
        response = self.client.post(self.url_place, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # request to the ingredient
        '''
        Из пятого задания, пункт 4:
        Настроить viewset ингредиентов только на метод GET - остальные методы запрещены.
        Соответственно, пост запросы к ингредиентам запрещены, и тест ниже и не должен проходить, закоментирован.
        Иначе, изменить наследование IngredientViewSet на ModelViewSet и добавить ограничения.
        '''
        # response = self.client.post(self.url_ingredient, self.data_ingredient, format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_patch_delete_if_owner_this_place(self):
        """
        PUT-, PATCH-, DELETE-requests can only be executed
        owners of places.
        """

        # if not authorized:
        self.client.credentials()
        response = self.client.put(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.patch(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.delete(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # if authorized, but no owner:
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token_two}')
        response = self.client.put(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response = self.client.patch(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response = self.client.delete(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # if owner
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token}')
        response = self.client.put(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.patch(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.delete(self.url_place_pk, self.data_place, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_put_patch_delete_if_owner_this_dish(self):
        """
        PUT-, PATCH-, DELETE-requests can only be executed
        owners of dish.
        """

        # if not authorized:
        self.client.credentials()
        response = self.client.put(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.patch(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.delete(self.url_dish_pk, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # if authorized, but no owner:
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token_two}')
        response = self.client.put(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response = self.client.patch(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        response = self.client.delete(self.url_dish_pk, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # if owner
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token}')

        response = self.client.put(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.patch(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.delete(self.url_dish_pk, self.data_dish, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
