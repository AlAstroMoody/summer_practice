from rest_framework.viewsets import ModelViewSet
from url_filter.integrations.drf import DjangoFilterBackend

from apps.main.permission import IsOwnerPlaceWithDishOrReadOnly
from apps.places.models import Dish
from apps.places.serializers import DishSerializer


class DishViewSet(ModelViewSet):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('place', 'ingredients',)
#     permission_classes = (IsOwnerPlaceWithDishOrReadOnly,)

