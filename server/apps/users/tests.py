from django.urls import reverse

from rest_framework.test import APITestCase


class UserAPITests(APITestCase):
    def setUp(self):
        self.data = {'username': 'TestName', 'password': 'TestPassword'}

    def test_token_return_on_request_to_users(self):
        """
        Test that the token is returned on the POST request to /api/users
        """
        url = reverse('users-list')
        response = self.client.post(url, self.data, format='json')
        user_token = response.data['token']
        self.assertTrue(user_token)

    def test_token_return_on_request_to_auth(self):
        """
        Test that the token is returned on the POST request to /api/auth/token
        """
        url = reverse('auth-list')
        response = self.client.post(url, self.data, format='json')
        auth_token = response.data
        self.assertTrue(auth_token)
