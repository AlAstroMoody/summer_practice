from rest_framework import routers

from apps.places.viewsets import PlaceViewSet, IngredientViewSet, DishViewSet
from apps.test.viewsets import TestViewSet
from apps.users.viewsets import UsersViewSet, AuthViewSet

router = routers.DefaultRouter()
router.register('test', TestViewSet, basename='test')
router.register('users', UsersViewSet, basename='users')
router.register('auth/token', AuthViewSet, basename='auth')
router.register('places', PlaceViewSet, basename='places')
router.register('ingredients', IngredientViewSet, basename='ingredients')
router.register('dishes', DishViewSet, basename='dishes')
