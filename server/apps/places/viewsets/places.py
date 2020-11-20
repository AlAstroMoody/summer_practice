from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from apps.main.permission import IsOwnerOrReadOnly
from apps.places.models import Place
from apps.places.serializers import PlaceSerializer
from config.settings import CACHE_TTL, GEOCODER_KEY


class PlaceViewSet(ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
