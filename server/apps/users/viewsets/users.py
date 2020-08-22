from rest_framework import mixins
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.users.serializers import UsersSerializer


class UsersViewSet(mixins.CreateModelMixin, GenericViewSet):
    serializer_class = UsersSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({
            'token': token.key,
            'user': {
                'pk': serializer.instance.id,
                'username': serializer.instance.username
            }
        })


class AuthViewSet(mixins.CreateModelMixin, GenericViewSet):
    serializer_class = AuthTokenSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = Token.objects.get(user=user)
        return Response({
            'token': token.key,
            'user': {
                'pk': user.id,
                'username': user.username
            }
        })
