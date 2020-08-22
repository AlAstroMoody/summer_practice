from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer


class UsersSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
